// Tela "Relatório de horas" da Central de Suporte.
// Dados (tickets, timeEntries, ENVIRONMENTS, ASSIGNEES) e helpers (esc, unique, metric, ICONS, toast...)
// vêm de ../data.js — a mesma base usada pelo Painel administrativo, sem duplicar dados.
(function () {
  'use strict';

  const currentRole = 'support';
  let currentTicketId = null, commentFiles = [], commentFilter = 'all', currentDrawerTab = 'details', hoursChart = null;
  const TICKET_TABS = ['details', 'comments', 'hours', 'chat'];

  const els = {
    company: $('hoursCompany'), platform: $('hoursPlatform'), assignee: $('hoursAssignee'), period: $('hoursPeriod'),
    clear: $('hoursClear'), metrics: $('hoursMetrics'), count: $('hoursCount'), table: $('hoursTable'),
    tableWrap: $('hoursTableWrap'), cards: $('hoursCards'), viewToggle: document.querySelector('.view-toggle'),
    donutWrap: $('hoursDonutWrap'), donutCanvas: $('hoursDonutChart'), donutTotal: $('hoursDonutTotal'), donutLegend: $('hoursDonutLegend'),
    exportBtn: $('exportHours'), printBtn: $('printHours'),
    drawer: $('drawer'), overlay: $('overlay'), drawerId: $('drawerId'), drawerBadges: $('drawerBadges'),
    drawerTitle: $('drawerTitle'), drawerBody: $('drawerBody'), drawerActions: $('drawerActions')
  };

  function setOptions(select, values, label, current = 'all') {
    select.innerHTML = `<option value="all">${label}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
    select.value = values.includes(current) ? current : 'all';
  }

  function shortDate(s) { return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(s + 'T12:00:00')) }

  const TREND_UP_ICON = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  const TREND_DOWN_ICON = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>';

  // Compara o apontamento com a média de horas por apontamento do filtro atual.
  function trendIndicator(hours, avgEntryHours) {
    const diff = hours - avgEntryHours;
    if (!avgEntryHours || Math.abs(diff) < 0.01) return '';
    const isUp = diff > 0;
    const title = `${isUp ? 'Acima' : 'Abaixo'} da média de ${formatHours(avgEntryHours)} por apontamento no filtro atual`;
    return `<span class="hours-trend ${isUp ? 'up' : 'down'}" title="${esc(title)}">${isUp ? TREND_UP_ICON : TREND_DOWN_ICON}</span>`;
  }

  function rebuildFilters() {
    setOptions(els.company, unique(ENVIRONMENTS.map(e => e.company)), 'Todos os clientes', els.company.value || 'all');
    setOptions(els.platform, unique(ENVIRONMENTS.map(e => e.platform)), 'Todas as plataformas', els.platform.value || 'all');
    setOptions(els.assignee, ASSIGNEES.filter(a => a !== 'Não atribuído'), 'Todos os responsáveis', els.assignee.value || 'all');
  }

  function allTimeEntries() {
    return tickets.flatMap(t => (t.timeEntries || []).map(e => ({ ...e, ticketId: t.id, company: t.company, platform: t.platform, instance: t.instance, subject: t.subject })));
  }

  function hasActiveFilters() { return els.company.value !== 'all' || els.platform.value !== 'all' || els.assignee.value !== 'all' || els.period.value !== 'all' }
  function syncClearButton() { const active = hasActiveFilters(); els.clear.classList.toggle('btn-primary', active); els.clear.classList.toggle('btn-secondary', !active) }

  function filteredHours() {
    let rows = allTimeEntries();
    if (els.company.value !== 'all') rows = rows.filter(r => r.company === els.company.value);
    if (els.platform.value !== 'all') rows = rows.filter(r => r.platform === els.platform.value);
    if (els.assignee.value !== 'all') rows = rows.filter(r => r.user === els.assignee.value);
    if (els.period.value !== 'all') {
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - Number(els.period.value));
      rows = rows.filter(r => new Date(r.date + 'T12:00:00') >= cutoff);
    }
    return rows.sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderHours() {
    syncClearButton();
    const rows = filteredHours();
    const hours = rows.reduce((sum, r) => sum + Number(r.hours), 0);
    const clients = unique(rows.map(r => r.company)).length;
    const ticketsCount = unique(rows.map(r => r.ticketId)).length;
    const avgPerTicket = ticketsCount ? hours / ticketsCount : 0;
    const avgEntryHours = rows.length ? hours / rows.length : 0;

    els.metrics.innerHTML = [
      metric('Horas atuadas', formatHours(hours), 'No filtro selecionado', ICONS.clock, 'blue'),
      metric('Clientes atendidos', clients, 'Com apontamentos', ICONS.building, 'green'),
      metric('Tickets trabalhados', ticketsCount, 'Chamados com horas', ICONS.checklist, 'orange'),
      metric('Média por ticket', formatHours(avgPerTicket), 'Horas ÷ tickets trabalhados', ICONS.layers, 'red')
    ].join('');

    els.count.textContent = `${rows.length} registro${rows.length === 1 ? '' : 's'}`;

    els.table.innerHTML = rows.length ? rows.map(r => { const color = clientColor(r.company); return `<tr class="ticket-row" data-ticket="${esc(r.ticketId)}"><td class="ticket-cell" style="--client-color:${color}"><div class="ticket-id-row"><button class="ticket-link" data-ticket="${esc(r.ticketId)}">${esc(r.ticketId)}</button><span class="client-chip" style="--client-color:${color}">${esc(r.company)}</span></div><div class="ticket-title">${esc(r.subject)}</div></td><td><button class="context-cell context-cell-link" data-access-instance="${esc(r.instance)}" data-ticket-context="${esc(r.ticketId)}" title="Acessar instância"><strong>${esc(r.platform)} ↗</strong><span>${esc(r.instance)}</span></button></td><td>${esc(r.description)}</td><td>${shortDate(r.date)}</td><td>${esc(r.user)}</td><td><div class="hours-value"><strong>${formatHours(r.hours)}</strong>${trendIndicator(Number(r.hours), avgEntryHours)}</div></td></tr>` }).join('')
      : '<tr><td colspan="6"><div class="empty"><strong>Nenhum apontamento encontrado</strong><span>Ajuste os filtros e tente novamente.</span></div></td></tr>';

    renderHoursCards(rows, avgEntryHours);

    const grouped = {};
    rows.forEach(r => { grouped[r.company] = (grouped[r.company] || 0) + Number(r.hours) });
    renderHoursChart(grouped);
  }

  // Mesma fonte de dados da tabela (filteredHours()) — layout em card equivalente à tabela,
  // reaproveitando client-chip, hours-value/hours-trend e o avatar de iniciais (.comment-avatar).
  function renderHoursCards(rows, avgEntryHours) {
    els.cards.innerHTML = rows.length ? rows.map(r => {
      const color = clientColor(r.company);
      return `<article class="entry-card" data-ticket="${esc(r.ticketId)}" style="--client-color:${color}"><div class="entry-card__top"><span class="client-chip" style="--client-color:${color}">${esc(r.company)}</span><button class="ticket-link" data-ticket="${esc(r.ticketId)}">${esc(r.ticketId)}</button></div><p class="entry-card__activity" title="${esc(r.description)}">${esc(r.description)}</p><div class="entry-card__meta"><button class="context-cell-link" data-access-instance="${esc(r.instance)}" data-ticket-context="${esc(r.ticketId)}" title="Acessar instância"><strong>${esc(r.platform)} ↗</strong> <span>${esc(r.instance)}</span></button><span>${shortDate(r.date)}</span></div><div class="entry-card__footer"><div class="queue-card__person"><span class="comment-avatar">${initials(r.user)}</span><strong class="queue-card__person-name">${esc(r.user)}</strong></div><div class="hours-value"><strong>${formatHours(r.hours)}</strong>${trendIndicator(Number(r.hours), avgEntryHours)}</div></div></article>`;
    }).join('') : '<div class="empty"><strong>Nenhum apontamento encontrado</strong><span>Ajuste os filtros e tente novamente.</span></div>';
  }

  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  // Gráfico de rosca (Chart.js) com as cores de cada cliente vindas de ENVIRONMENTS/clientColor,
  // as mesmas usadas nos chips e na tabela — mantém a identidade visual do cliente consistente.
  function renderHoursChart(grouped) {
    if (!els.donutCanvas || typeof Chart === 'undefined') return;
    const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((sum, [, value]) => sum + value, 0);

    if (!entries.length) {
      if (hoursChart) { hoursChart.destroy(); hoursChart = null; }
      els.donutWrap.style.display = 'none';
      els.donutTotal.textContent = formatHours(0);
      els.donutLegend.innerHTML = '<div class="empty"><span>Sem dados no filtro selecionado.</span></div>';
      return;
    }
    els.donutWrap.style.display = '';

    const labels = entries.map(([name]) => name);
    const values = entries.map(([, value]) => value);
    const colors = entries.map(([name]) => clientColor(name));
    const surface = cssVar('--surface', '#ffffff');

    if (hoursChart) {
      hoursChart.data.labels = labels;
      hoursChart.data.datasets[0].data = values;
      hoursChart.data.datasets[0].backgroundColor = colors;
      hoursChart.data.datasets[0].borderColor = surface;
      hoursChart.update();
    } else {
      hoursChart = new Chart(els.donutCanvas, {
        type: 'doughnut',
        data: { labels, datasets: [{ data: values, backgroundColor: colors, borderColor: surface, borderWidth: 2, hoverOffset: 6 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          resizeDelay: 200,
          cutout: '68%',
          onClick(evt, elements) {
            if (!elements.length) return;
            const label = hoursChart.data.labels[elements[0].index];
            els.company.value = els.company.value === label ? 'all' : label;
            renderHours();
          },
          onHover(evt, elements) { evt.native.target.style.cursor = elements.length ? 'pointer' : 'default' },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const pct = sum ? (ctx.parsed / sum * 100) : 0;
                  return `${ctx.label}: ${formatHours(ctx.parsed)} (${pct.toFixed(0)}%)`;
                }
              }
            }
          }
        }
      });
      new MutationObserver(() => {
        if (!hoursChart) return;
        hoursChart.data.datasets[0].borderColor = cssVar('--surface', '#ffffff');
        hoursChart.update();
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    els.donutTotal.textContent = formatHours(total);
    els.donutLegend.innerHTML = entries.map(([name, value]) => {
      const pct = total ? (value / total * 100) : 0;
      return `<li class="donut-legend-row" style="--client-color:${clientColor(name)}"><span class="donut-legend-dot"></span><span class="donut-legend-name" title="${esc(name)}">${esc(name)}</span><span class="donut-legend-value">${formatHours(value)}</span><span class="donut-legend-pct">${pct.toFixed(0)}%</span></li>`;
    }).join('');
  }

  // Adaptação de accessInstance (central-suporte/index.js): aqui não há filtro de
  // instância proprio, entao "acessar" restringe o relatorio por cliente+plataforma.
  function accessInstance(instance, ticketId = '') {
    const env = envFor(instance); if (!env) return;
    els.company.value = env.company; els.platform.value = env.platform;
    renderHours();
    toast(`Acesso simulado a ${env.label}${ticketId ? ` para consultar o ${ticketId}` : ''}. Banco: ${env.database}.`, 'success');
  }

  function resetFilters() {
    els.company.value = 'all'; els.platform.value = 'all'; els.assignee.value = 'all'; els.period.value = 'all';
    renderHours();
  }

  function exportHoursCsv() {
    const rows = [['Data', 'Cliente', 'Plataforma', 'Ticket', 'Responsável', 'Atividade', 'Horas'], ...filteredHours().map(r => [r.date, r.company, r.platform, r.ticketId, r.user, r.description, r.hours])];
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'relatorio-horas-suporte.csv'; a.click(); URL.revokeObjectURL(url);
    toast('Relatório de horas exportado.', 'success');
  }

  // Drawer de ticket reaproveitado do Painel administrativo (central-suporte/index.js),
  // para permitir ver e atuar no chamado sem sair do Relatório de horas.
  function persistAndRefresh(tab) {
    saveTickets(); renderHours();
    if (currentTicketId) openDrawer(currentTicketId, tab);
  }

  function commentDate(value) { return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) }
  function commentThreadHtml(t) {
    const all = t.comments || [], visible = all.filter(c => commentFilter === 'all' || c.visibility === commentFilter), publicCount = all.filter(c => c.visibility === 'public').length, internalCount = all.filter(c => c.visibility === 'internal').length;
    const items = visible.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(c => `<article class="comment-item ${c.role === 'client' ? 'client' : 'support'} ${c.visibility === 'internal' ? 'internal' : ''}"><div class="comment-avatar">${initials(c.author)}</div><div class="comment-card"><div class="comment-meta"><div><span class="comment-author">${esc(c.author)}</span><span class="comment-role">${c.role === 'client' ? 'Focal point do cliente' : 'Equipe de suporte'}</span></div><span class="comment-date">${commentDate(c.createdAt)}</span></div><span class="comment-badge ${c.visibility}">${c.visibility === 'internal' ? '🔒 Nota interna' : '◉ Visível ao cliente'}</span><div class="comment-text">${esc(c.text)}</div>${c.attachments?.length ? `<div class="comment-files">${c.attachments.map(file => `<button type="button" class="comment-file" onclick="toast('Download simulado no protótipo.')">📎 ${esc(file)}</button>`).join('')}</div>` : ''}</div></article>`).join('');
    return `<section class="comment-section" id="ticketComments"><div class="comment-head"><div><h3>Comentários e atualizações</h3><p>${publicCount} pública(s) · ${internalCount} nota(s) interna(s)</p></div><select class="control comment-filter" id="commentFilter"><option value="all" ${commentFilter === 'all' ? 'selected' : ''}>Todas</option><option value="public" ${commentFilter === 'public' ? 'selected' : ''}>Públicas</option><option value="internal" ${commentFilter === 'internal' ? 'selected' : ''}>Notas internas</option></select></div><div class="comment-feed" id="commentFeed">${items || '<div class="comment-empty">Nenhuma interação neste ticket. Adicione a primeira atualização abaixo.</div>'}</div><div class="comment-composer"><div class="comment-composer-top"><strong>Adicionar atualização</strong><select class="control comment-filter" id="commentVisibility"><option value="public">Resposta pública</option><option value="internal">Nota interna</option></select></div><textarea class="control" id="commentText" maxlength="2000" placeholder="Escreva uma atualização objetiva, solicite informações ou registre uma nota interna..."></textarea><div class="comment-templates"><button type="button" class="comment-template" data-comment-template="Para avançarmos, poderia enviar uma captura da tela e informar os passos realizados antes do problema?">Solicitar evidências</button><button type="button" class="comment-template" data-comment-template="Conseguimos reproduzir o comportamento e a análise técnica está em andamento. Manteremos o ticket atualizado.">Informar análise</button><button type="button" class="comment-template" data-comment-template="A correção foi aplicada nesta instância. Por favor, valide novamente e nos informe o resultado.">Solicitar validação</button></div><input type="file" id="commentFileInput" multiple hidden accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls,.doc,.docx,.txt,.csv,.log"><div class="comment-attachment-list" id="commentAttachmentList"></div><div class="comment-toolbar"><div class="comment-toolbar-left"><button type="button" class="btn btn-secondary btn-sm" id="commentAttach">📎 Anexar</button><label class="comment-wait"><input type="checkbox" id="commentWaitCustomer"> Aguardar retorno do cliente</label></div><div class="comment-toolbar-right"><span class="hint">Ctrl + Enter para enviar</span><button type="button" class="btn btn-primary btn-sm" id="submitComment">Enviar atualização</button></div></div><div class="comment-legend"><span><i class="legend-dot"></i> Respostas públicas aparecem ao cliente</span><span><i class="legend-dot internal"></i> Notas internas ficam apenas no suporte</span></div></div></section>`;
  }
  function renderCommentAttachments() { const box = $('commentAttachmentList'); if (!box) return; box.innerHTML = commentFiles.map((f, i) => `<span class="comment-attachment">📎 ${esc(f.name)} <button type="button" data-remove-comment-file="${i}" aria-label="Remover anexo">×</button></span>`).join('') }
  function bindCommentEvents(id) {
    $('commentFilter')?.addEventListener('change', e => { commentFilter = e.target.value; openDrawer(id) });
    $('commentAttach')?.addEventListener('click', () => $('commentFileInput')?.click());
    $('commentFileInput')?.addEventListener('change', e => { const incoming = [...e.target.files]; for (const file of incoming) { if (commentFiles.length >= 5) { toast('Limite de 5 anexos por interação.', 'error'); break } if (file.size > 10 * 1024 * 1024) { toast(`${file.name} excede 10 MB.`, 'error'); continue } if (!commentFiles.some(existing => existing.name === file.name && existing.size === file.size)) commentFiles.push(file) } renderCommentAttachments(); e.target.value = '' });
    $('commentAttachmentList')?.addEventListener('click', e => { const button = e.target.closest('[data-remove-comment-file]'); if (!button) return; commentFiles.splice(Number(button.dataset.removeCommentFile), 1); renderCommentAttachments() });
    document.querySelectorAll('[data-comment-template]').forEach(button => button.addEventListener('click', () => { const textarea = $('commentText'); textarea.value = button.dataset.commentTemplate; textarea.focus() }));
    $('submitComment')?.addEventListener('click', () => postComment(id));
    $('commentText')?.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); postComment(id) } });
    $('commentVisibility')?.addEventListener('change', e => { const waiting = $('commentWaitCustomer'); if (waiting && e.target.value === 'internal') waiting.checked = false });
    renderCommentAttachments();
  }
  function postComment(id) {
    const t = tickets.find(x => x.id === id), textarea = $('commentText'); if (!t || !textarea) return; const text = textarea.value.trim(); if (!text && !commentFiles.length) { toast('Escreva uma atualização ou adicione um anexo.', 'error'); textarea.focus(); return }
    const visibility = $('commentVisibility').value, author = 'Marina Costa', now = new Date().toISOString();
    t.comments = t.comments || []; t.comments.push({ id: `COM-${Date.now()}`, author, role: currentRole, visibility, text: text || 'Anexo adicionado ao ticket.', createdAt: now, attachments: commentFiles.map(f => f.name) }); t.updatedAt = now;
    const historyText = visibility === 'internal' ? `Nota interna adicionada por ${author}` : `Atualização pública adicionada por ${author}`; t.history.push({ text: historyText, time: 'Agora' });
    if (visibility === 'public' && $('commentWaitCustomer')?.checked) { t.status = 'Aguardando cliente'; t.history.push({ text: 'Status alterado para Aguardando cliente', time: 'Agora' }) }
    commentFiles = []; commentFilter = 'all'; persistAndRefresh('comments'); toast(visibility === 'internal' ? 'Nota interna registrada.' : 'Atualização enviada.', 'success');
  }
  function timeBoxHtml(t) {
    const entries = (t.timeEntries || []).slice().sort((a, b) => b.date.localeCompare(a.date));
    return `<div class="time-box"><div class="time-row"><div class="form-group"><label>Data</label><input class="control" id="timeDate" type="date" value="${new Date().toISOString().slice(0, 10)}"></div><div class="form-group"><label>Horas</label><input class="control" id="timeHours" type="number" min="0.25" max="24" step="0.25" placeholder="1,5"></div><div class="form-group full"><label>Atividade realizada</label><input class="control" id="timeDescription" placeholder="Ex.: análise, correção e testes"></div><button class="btn btn-primary btn-sm" id="addTime">＋ Lançar</button></div><div class="time-list">${entries.length ? entries.map(e => `<div class="time-entry"><span>${shortDate(e.date)}</span><strong>${formatHours(e.hours)}</strong><span>${esc(e.user)} · ${esc(e.description)}</span><button class="btn btn-danger btn-sm" data-delete-time="${e.id}">Excluir</button></div>`).join('') : '<span style="font-size:11px;color:var(--muted)">Nenhuma hora lançada.</span>'}</div><div class="time-total"><span>Total de atuação no ticket</span><strong>${formatHours(totalHours(t))}</strong></div></div>`;
  }
  function chatPaneHtml(t) {
    const feed = (t.chat || []).length ? t.chat.map(m => `<div class="chat-message ${m.role === 'support' ? 'own' : ''}"><strong>${esc(m.author)}</strong><p>${esc(m.text)}</p><span>${formatDate(m.createdAt)}</span></div>`).join('') : '<div class="chat-empty"><div style="font-size:22px">💬</div><strong>Nenhuma conversa iniciada</strong><div>Use o chat para mensagens rápidas. Decisões formais devem ficar nos comentários.</div></div>';
    return `<div class="chat-pane"><div class="chat-feed" id="chatFeed">${feed}</div><div class="chat-composer"><textarea class="control" id="chatText" placeholder="Escreva uma mensagem rápida..."></textarea><button class="btn btn-primary btn-sm" id="sendChat">Enviar</button></div></div>`;
  }
  function openDrawer(id, tab) {
    const t = tickets.find(x => x.id === id); if (!t) return; if (currentTicketId !== id) { commentFiles = []; commentFilter = 'all'; currentDrawerTab = 'details' } currentTicketId = id;
    if (tab && TICKET_TABS.includes(tab)) currentDrawerTab = tab;
    const activeTab = currentDrawerTab;
    if (activeTab === 'chat' && t.unreadSupport) t.unreadSupport = 0;
    const sla = slaInfo(t); els.drawerId.textContent = t.id; els.drawerTitle.textContent = t.subject; els.drawerBadges.innerHTML = `<span class="badge ${statusClass(t.status)}">${esc(t.status)}</span><span class="badge ${priorityClass(t.priority)}">${esc(t.priority)}</span><span class="badge status-progress">${esc(t.module)}</span>`;
    const detailsHtml = `${ticketInfoBentoHtml(t, sla)}<div class="drawer-eyebrow">Descrição</div><div class="description">${esc(t.description)}</div><div class="drawer-two-col"><div><div class="drawer-eyebrow">Histórico de movimentações</div><div class="timeline">${t.history.map((h, i) => `<div class="timeline-item"><div class="timeline-dot">${i + 1}</div><div><strong>${esc(h.text)}</strong><span>${esc(h.time)}</span></div></div>`).join('')}</div></div><div><div class="drawer-eyebrow">Anexos do chamado</div><div class="files">${t.attachments.length ? t.attachments.map(n => `<div class="file"><span>📎 ${esc(n)}</span><button type="button" onclick="toast('Download simulado no protótipo.')">Baixar</button></div>`).join('') : '<span style="font-size:10px;color:var(--muted)">Nenhum arquivo anexado.</span>'}</div></div></div>`;
    els.drawerBody.innerHTML = `<div class="drawer-shortcuts"><div class="ticket-tabs"><button class="ticket-tab ${activeTab === 'details' ? 'active' : ''}" data-ticket-tab="details">Dados do ticket</button><button class="ticket-tab ${activeTab === 'comments' ? 'active' : ''}" data-ticket-tab="comments">Comentários (${(t.comments || []).length})</button><button class="ticket-tab ${activeTab === 'hours' ? 'active' : ''}" data-ticket-tab="hours">Horas (${formatHours(totalHours(t))})</button><button class="ticket-tab ${activeTab === 'chat' ? 'active' : ''}" data-ticket-tab="chat">💬 Chat${(t.chat || []).length ? ` (${t.chat.length})` : ''}</button></div></div><div class="drawer-pane ${activeTab === 'details' ? 'active' : ''}" data-ticket-pane="details">${detailsHtml}</div><div class="drawer-pane ${activeTab === 'comments' ? 'active' : ''}" data-ticket-pane="comments">${commentThreadHtml(t)}</div><div class="drawer-pane ${activeTab === 'hours' ? 'active' : ''}" data-ticket-pane="hours">${timeBoxHtml(t)}</div><div class="drawer-pane ${activeTab === 'chat' ? 'active' : ''}" data-ticket-pane="chat">${chatPaneHtml(t)}</div>`;
    els.drawerActions.innerHTML = `<select class="control" id="drawerStatus" style="width:auto">${['Aberto', 'Em andamento', 'Aguardando cliente', 'Resolvido', 'Fechado'].map(s => `<option ${s === t.status ? 'selected' : ''}>${s}</option>`).join('')}</select><select class="control" id="drawerAssignee" style="width:auto">${ASSIGNEES.map(a => `<option ${a === t.assignee ? 'selected' : ''}>${a}</option>`).join('')}</select><button class="btn btn-primary btn-sm" id="saveChanges">Salvar</button>`;
    window.BipperCustomSelect?.enhanceAll(els.drawer);
    els.drawer.classList.add('open'); els.overlay.classList.add('open'); document.body.style.overflow = 'hidden';
    document.querySelectorAll('[data-ticket-tab]').forEach(b => b.addEventListener('click', () => openDrawer(id, b.dataset.ticketTab)));
    $('saveChanges')?.addEventListener('click', () => updateTicket(id));
    $('addTime')?.addEventListener('click', () => addTime(id));
    document.querySelectorAll('[data-delete-time]').forEach(b => b.addEventListener('click', () => deleteTime(id, b.dataset.deleteTime)));
    $('sendChat')?.addEventListener('click', () => sendChat(id));
    $('chatText')?.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') sendChat(id) });
    if (activeTab === 'chat') { const feed = $('chatFeed'); if (feed) feed.scrollTop = feed.scrollHeight }
    bindCommentEvents(id);
    updateNavBadge();
  }
  function addTime(id) {
    const t = tickets.find(x => x.id === id), date = $('timeDate').value, hours = Number($('timeHours').value), description = $('timeDescription').value.trim();
    if (!date || !hours || hours <= 0 || !description) { toast('Informe data, horas e atividade.', 'error'); return }
    t.timeEntries = t.timeEntries || []; t.timeEntries.push({ id: `TIME-${Date.now()}`, date, user: 'Marina Costa', hours, description });
    t.updatedAt = new Date().toISOString(); t.history.push({ text: `${formatHours(hours)} lançada(s) por Marina Costa`, time: 'Agora' });
    persistAndRefresh('hours'); toast('Horas lançadas no ticket.', 'success')
  }
  function deleteTime(ticketId, timeId) {
    const t = tickets.find(x => x.id === ticketId); t.timeEntries = (t.timeEntries || []).filter(e => e.id !== timeId);
    persistAndRefresh('hours'); toast('Apontamento removido.', 'success')
  }
  function sendChat(id) {
    const t = tickets.find(x => x.id === id), textarea = $('chatText'); if (!t || !textarea) return; const text = textarea.value.trim(); if (!text) return;
    t.chat = t.chat || []; t.chat.push({ id: `CHAT-${Date.now()}`, author: 'Marina Costa', role: 'support', text, createdAt: new Date().toISOString() });
    t.unreadClient = (t.unreadClient || 0) + 1; t.updatedAt = new Date().toISOString();
    persistAndRefresh('chat'); toast('Mensagem enviada.', 'success');
    const feed = $('chatFeed'); if (feed) feed.scrollTop = feed.scrollHeight; $('chatText')?.focus();
  }
  function updateTicket(id) { const t = tickets.find(x => x.id === id), newStatus = $('drawerStatus').value, newAssignee = $('drawerAssignee').value, changes = []; if (newStatus !== t.status) changes.push(`Status alterado de ${t.status} para ${newStatus}`); if (newAssignee !== t.assignee) changes.push(`Responsável alterado para ${newAssignee}`); t.status = newStatus; t.assignee = newAssignee; t.updatedAt = new Date().toISOString(); if (['Resolvido', 'Fechado'].includes(newStatus)) t.slaState = 'ok'; changes.forEach(text => t.history.push({ text, time: 'Agora' })); persistAndRefresh('details'); toast(changes.length ? 'Ticket atualizado.' : 'Nenhuma alteração identificada.', 'success') }
  function updateNavBadge() { const adminUnread = tickets.reduce((sum, t) => sum + Number(t.unreadSupport || 0), 0); window.BipperShell?.setNavBadge('central-suporte-admin', adminUnread) }
  function closeDrawer() { els.drawer.classList.remove('open'); els.overlay.classList.remove('open'); document.body.style.overflow = ''; currentTicketId = null; commentFiles = []; commentFilter = 'all' }

  [els.company, els.platform, els.assignee, els.period].forEach(el => el.addEventListener('change', renderHours));
  els.clear.addEventListener('click', resetFilters);
  els.exportBtn.addEventListener('click', exportHoursCsv);
  els.printBtn.addEventListener('click', () => window.print());
  function handleTicketAreaClick(e) {
    const access = e.target.closest('[data-access-instance]');
    if (access) { e.stopPropagation(); accessInstance(access.dataset.accessInstance, access.dataset.ticketContext || ''); return; }
    const btn = e.target.closest('[data-ticket]');
    if (btn) openDrawer(btn.dataset.ticket);
  }
  els.table.addEventListener('click', handleTicketAreaClick);
  els.cards.addEventListener('click', handleTicketAreaClick);
  $('closeDrawer').addEventListener('click', closeDrawer);
  els.overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && els.drawer.classList.contains('open')) closeDrawer() });

  rebuildFilters();
  renderHours();
  initViewToggle(els.viewToggle, els.tableWrap, els.cards);

  const requestedTicket = new URLSearchParams(window.location.search).get('ticket');
  if (requestedTicket && tickets.some(t => t.id === requestedTicket)) openDrawer(requestedTicket);
})();
