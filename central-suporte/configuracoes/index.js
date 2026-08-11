// Tela "Configurações" da Central de Suporte.
// Dados (ENVIRONMENTS, ASSIGNEES, tickets) e helpers (esc, unique, clone, initials, toast...)
// vêm de ../data.js — a mesma base usada pelo Painel administrativo e pelo Relatório de horas.
(function () {
  'use strict';

  const els = {
    newClientBtn: $('newClientBtn'), search: $('configSearch'), count: $('configCount'), list: $('configList'),
    modal: $('configModal'), modalTitle: $('configModalTitle'), form: $('configForm'), deleteBtn: $('deleteConfigBtn'),
    id: $('configId'), platform: $('configPlatform'),
    company: $('configCompany'), label: $('configLabel'), instance: $('configInstance'), image: $('configImage'),
    color: $('configColor'), api: $('configApi'), sla: $('configSla'), region: $('configRegion'),
    database: $('configDatabase'), health: $('configHealth'), supportChecks: $('configSupportChecks'), notes: $('configNotes')
  };

  function renderSupportChecks(selected = []) {
    els.supportChecks.innerHTML = ASSIGNEES.filter(a => a !== 'Não atribuído').map(a => `<label class="check-pill"><input type="checkbox" value="${esc(a)}" ${selected.includes(a) ? 'checked' : ''}>${esc(a)}</label>`).join('');
  }

  function filteredEnvironments() {
    const term = els.search.value.trim().toLowerCase();
    if (!term) return ENVIRONMENTS;
    return ENVIRONMENTS.filter(e => [e.company, e.platform, e.instance, e.label].join(' ').toLowerCase().includes(term));
  }

  function renderList() {
    const list = filteredEnvironments();
    els.count.textContent = `${list.length} ambiente${list.length === 1 ? '' : 's'}`;
    if (!list.length) { els.list.innerHTML = '<div class="empty"><strong>Nenhum ambiente encontrado</strong><span>Ajuste a busca ou inclua um novo cliente.</span></div>'; return; }
    els.list.innerHTML = list.map(e => `<article class="instance-card" style="--client-color:${esc(e.color || '')}"><div class="instance-top"><div><div class="instance-name">${esc(e.label)}</div><div class="instance-meta"> ${esc(e.platform)} · ${esc(e.instance)}</div></div><span class="health ${e.health}">${e.health === 'online' ? 'Online' : 'Atenção'}</span></div><div class="instance-stats"><div class="mini-stat"><span>Banco</span><strong>${esc(e.database || 'não informado')}</strong></div><div class="mini-stat"><span>SLA padrão</span><strong>${e.defaultSla}h</strong></div></div><div class="instance-actions"><button class="btn btn-secondary btn-sm" data-edit-config="${esc(e.id)}">Editar</button></div></article>`).join('');
  }

  // '#ff6b00' é o hex literal de --brand-primary (design.md): <input type="color"> não aceita var() no value.
  function openModal(id) {
    const editing = ENVIRONMENTS.find(e => e.id === id);
    els.form.reset();
    if (editing) {
      els.id.value = editing.id;
      els.platform.value = editing.platform;
      els.company.value = editing.company;
      els.label.value = editing.label;
      els.instance.value = editing.instance;
      els.image.value = editing.image || '';
      els.color.value = editing.color || '#ff6b00';
      els.api.value = editing.apiUrl || '';
      els.sla.value = String(editing.defaultSla || 8);
      els.region.value = editing.region || '';
      els.database.value = editing.database || '';
      els.health.value = editing.health || 'online';
      els.notes.value = editing.notes || '';
      renderSupportChecks(editing.supportUsers || []);
      els.modalTitle.textContent = `Editar ${editing.company}`;
      els.deleteBtn.classList.remove('hidden');
    } else {
      els.id.value = '';
      els.color.value = '#ff6b00';
      els.sla.value = '8';
      els.health.value = 'online';
      renderSupportChecks([]);
      els.modalTitle.textContent = 'Incluir novo cliente';
      els.deleteBtn.classList.add('hidden');
    }
    els.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    els.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function saveConfig(e) {
    e.preventDefault();
    const supportUsers = [...els.supportChecks.querySelectorAll('input:checked')].map(i => i.value);
    if (!supportUsers.length) { toast('Selecione pelo menos um responsável de suporte.', 'error'); return; }
    const id = els.id.value || `ENV-${Date.now()}`;
    const data = {
      id, platform: els.platform.value.trim(), company: els.company.value.trim(), label: els.label.value.trim(),
      instance: els.instance.value.trim(), image: els.image.value.trim(), color: els.color.value,
      apiUrl: els.api.value.trim(), defaultSla: Number(els.sla.value), region: els.region.value.trim(),
      database: els.database.value.trim(), health: els.health.value, supportUsers, notes: els.notes.value.trim()
    };
    const index = ENVIRONMENTS.findIndex(x => x.id === id);
    if (index >= 0) ENVIRONMENTS[index] = data; else ENVIRONMENTS.push(data);
    saveEnvironments();
    closeModal();
    renderList();
    toast(index >= 0 ? 'Configuração atualizada.' : 'Cliente incluído.', 'success');
  }

  function deleteConfig() {
    const id = els.id.value, env = ENVIRONMENTS.find(x => x.id === id);
    if (!env) return;
    if (tickets.some(t => t.instance === env.instance)) { toast('Não é possível excluir: existem tickets vinculados a esta instância.', 'error'); return; }
    ENVIRONMENTS = ENVIRONMENTS.filter(x => x.id !== id);
    saveEnvironments();
    closeModal();
    renderList();
    toast('Configuração excluída.', 'success');
  }

  els.newClientBtn.addEventListener('click', () => openModal(null));
  els.search.addEventListener('input', renderList);
  els.list.addEventListener('click', e => { const btn = e.target.closest('[data-edit-config]'); if (btn) openModal(btn.dataset.editConfig); });
  document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
  els.modal.addEventListener('click', e => { if (e.target === els.modal) closeModal(); });
  els.form.addEventListener('submit', saveConfig);
  els.deleteBtn.addEventListener('click', deleteConfig);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && els.modal.classList.contains('open')) closeModal(); });

  renderList();
})();
