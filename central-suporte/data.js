// Dados e helpers compartilhados entre o Painel administrativo e o Portal do cliente da Central de Suporte.
const MODULES = ['Plano de ação', 'Campanha', 'Fechamento', 'Pagamentos', 'Treinamento'];
const ASSIGNEES = ['Não atribuído', 'Marina Costa', 'Rafael Lima', 'Bruno Tavares', 'Ana Souza'];
// Cores por cliente espelham shared/data/brands.json (campo "primary" de cada marca).
const ENVIRONMENTS = [
  { company: 'Zoetis', platform: 'Engage', instance: 'zoetis-ru-prod', label: 'Zoetis Ruminantes', database: 'db_zoetis_ru', region: 'São Paulo', health: 'online', color: '#F65C00' },
  { company: 'Zoetis', platform: 'Engage', instance: 'zoetis-ca', label: 'Zoetis Animais e CIA', database: 'db_zoetis_ca', region: 'Miami', health: 'online', color: '#F65C00' },
  { company: 'BASF', platform: 'FieldOps', instance: 'basf-br-prod', label: 'BASF Brasil', database: 'db_basf_prod', region: 'São Paulo', health: 'warning', color: '#65AC1E' },
  { company: 'BASF', platform: 'Connect', instance: 'basf-campanhas', label: 'BASF Campanhas', database: 'db_basf_campaign', region: 'Virgínia', health: 'online', color: '#65AC1E' },
  { company: 'Elanco', platform: 'Engage', instance: 'elanco-br-prod', label: 'Elanco Brasil', database: 'db_elanco_br', region: 'São Paulo', health: 'online', color: '#0072CE' },
  { company: 'Syngenta', platform: 'Academy', instance: 'syngenta-training', label: 'Syngenta Treinamentos', database: 'db_syngenta_training', region: 'Frankfurt', health: 'online', color: '#5F7800' }
];
const INITIAL_TICKETS = [
  { id: 'TK-2081', company: 'Zoetis', platform: 'Engage', instance: 'zoetis-ru-prod', requester: 'Camila Ferreira', subject: 'Plano de ação não salva responsáveis', module: 'Plano de ação', priority: 'Alta', status: 'Em andamento', assignee: 'Rafael Lima', createdAt: '2026-08-03T10:15:00-03:00', updatedAt: '2026-08-03T18:42:00-03:00', slaHours: 4, slaState: 'risk', unreadSupport: 2, description: 'Ao concluir o cadastro do plano de ação, os responsáveis selecionados deixam de aparecer após atualizar a página.', attachments: ['captura-plano-acao.png'], history: [{ text: 'Ticket criado por Camila Ferreira', time: 'Hoje, 10:15' }, { text: 'Atribuído para Rafael Lima', time: 'Hoje, 10:24' }, { text: 'Análise iniciada na instância zoetis-ru-prod', time: 'Hoje, 11:02' }] },
  { id: 'TK-2080', company: 'BASF', platform: 'FieldOps', instance: 'basf-br-prod', requester: 'João Mendes', subject: 'Campanha regional não liberada', module: 'Campanha', priority: 'Média', status: 'Aberto', assignee: 'Não atribuído', createdAt: '2026-08-03T15:08:00-03:00', updatedAt: '2026-08-03T15:08:00-03:00', slaHours: 8, slaState: 'ok', description: 'A campanha foi publicada, mas não está disponível para os usuários da regional Sul.', attachments: [], history: [{ text: 'Ticket criado por João Mendes', time: 'Hoje, 15:08' }] },
  { id: 'TK-2079', company: 'Elanco', platform: 'Engage', instance: 'elanco-br-prod', requester: 'Patrícia Moura', subject: 'Fechamento mensal com valores divergentes', module: 'Fechamento', priority: 'Crítica', status: 'Em andamento', assignee: 'Bruno Tavares', createdAt: '2026-08-03T08:25:00-03:00', updatedAt: '2026-08-03T17:10:00-03:00', slaHours: 1, slaState: 'breached', unreadSupport: 1, description: 'O fechamento mensal apresenta total divergente do relatório financeiro e impede a conclusão do processo.', attachments: ['fechamento-julho.xlsx', 'log-fechamento.txt'], history: [{ text: 'Ticket crítico criado por Patrícia Moura', time: 'Hoje, 08:25' }, { text: 'Atribuído para Bruno Tavares', time: 'Hoje, 08:31' }, { text: 'SLA de primeira resposta ultrapassado', time: 'Hoje, 09:26' }] },
  { id: 'TK-2078', company: 'Zoetis', platform: 'Engage', instance: 'zoetis-ca', requester: 'Camila Ferreira', subject: 'Pagamento aparece duplicado no extrato', module: 'Pagamentos', priority: 'Alta', status: 'Aguardando cliente', assignee: 'Marina Costa', createdAt: '2026-08-01T13:40:00-03:00', updatedAt: '2026-08-03T09:22:00-03:00', slaHours: 4, slaState: 'ok', unreadClient: 1, description: 'O mesmo pagamento aparece duas vezes no extrato da unidade México. Solicitamos confirmação do identificador original.', attachments: ['extrato-mexico.pdf'], history: [{ text: 'Ticket criado por Camila Ferreira', time: '01 ago, 13:40' }, { text: 'Equipe solicitou o identificador do pagamento', time: 'Hoje, 09:22' }] },
  { id: 'TK-2077', company: 'Syngenta', platform: 'Academy', instance: 'syngenta-training', requester: 'Felipe Ramos', subject: 'Participantes sem certificado', module: 'Treinamento', priority: 'Média', status: 'Resolvido', assignee: 'Ana Souza', createdAt: '2026-07-31T14:30:00-03:00', updatedAt: '2026-08-02T16:15:00-03:00', slaHours: 8, slaState: 'ok', description: 'Participantes concluíram todas as aulas, mas o certificado não ficou disponível.', attachments: [], history: [{ text: 'Ticket criado por Felipe Ramos', time: '31 jul, 14:30' }, { text: 'Reprocessamento concluído', time: '02 ago, 16:10' }, { text: 'Ticket marcado como Resolvido', time: '02 ago, 16:15' }] },
  { id: 'TK-2076', company: 'BASF', platform: 'Connect', instance: 'basf-campanhas', requester: 'João Mendes', subject: 'Campanha antiga permanece no painel', module: 'Campanha', priority: 'Baixa', status: 'Fechado', assignee: 'Rafael Lima', createdAt: '2026-07-29T09:12:00-03:00', updatedAt: '2026-08-01T11:05:00-03:00', slaHours: 16, slaState: 'ok', description: 'Uma campanha encerrada ainda aparecia no painel inicial. O cache da instância foi atualizado.', attachments: ['painel-campanha.png'], history: [{ text: 'Ticket criado por João Mendes', time: '29 jul, 09:12' }, { text: 'Cache da instância atualizado', time: '01 ago, 10:40' }, { text: 'Ticket fechado após validação', time: '01 ago, 11:05' }] },
  { id: 'TK-2075', company: 'Zoetis', platform: 'Engage', instance: 'zoetis-ru-prod', requester: 'Camila Ferreira', subject: 'Treinamento não contabiliza presença', module: 'Treinamento', priority: 'Média', status: 'Aberto', assignee: 'Ana Souza', createdAt: '2026-08-02T14:18:00-03:00', updatedAt: '2026-08-03T12:30:00-03:00', slaHours: 8, slaState: 'ok', description: 'A lista de presença foi importada, mas três participantes continuam como ausentes.', attachments: ['lista-presenca.xlsx'], history: [{ text: 'Ticket criado por Camila Ferreira', time: 'Ontem, 14:18' }, { text: 'Atribuído para Ana Souza', time: 'Hoje, 12:30' }] }
];
const INITIAL_COMMENTS = {
  'TK-2081': [
    { id: 'COM-2081-1', author: 'Camila Ferreira', role: 'client', visibility: 'public', text: 'O problema acontece com qualquer usuário que tenha perfil de gestor. Anexei uma captura depois de salvar e atualizar a página.', createdAt: '2026-08-03T10:18:00-03:00', attachments: ['captura-plano-acao.png'] },
    { id: 'COM-2081-2', author: 'Rafael Lima', role: 'support', visibility: 'internal', text: 'Reproduzido em produção. A API grava os responsáveis, mas a consulta de retorno está filtrando usuários inativos de forma incorreta.', createdAt: '2026-08-03T11:12:00-03:00', attachments: [] },
    { id: 'COM-2081-3', author: 'Rafael Lima', role: 'support', visibility: 'public', text: 'Conseguimos reproduzir o comportamento e já estamos ajustando a consulta dos responsáveis. Avisaremos aqui assim que a correção estiver disponível para validação.', createdAt: '2026-08-03T11:20:00-03:00', attachments: [] }
  ],
  'TK-2080': [
    { id: 'COM-2080-1', author: 'João Mendes', role: 'client', visibility: 'public', text: 'A campanha deveria estar disponível para Paraná, Santa Catarina e Rio Grande do Sul. Os usuários da regional Sudeste conseguem visualizá-la normalmente.', createdAt: '2026-08-03T15:12:00-03:00', attachments: [] }
  ],
  'TK-2079': [
    { id: 'COM-2079-1', author: 'Patrícia Moura', role: 'client', visibility: 'public', text: 'O total correto esperado é R$ 184.320,50. O fechamento está exibindo R$ 196.870,50 e bloqueia a confirmação.', createdAt: '2026-08-03T08:28:00-03:00', attachments: ['fechamento-julho.xlsx'] },
    { id: 'COM-2079-2', author: 'Bruno Tavares', role: 'support', visibility: 'internal', text: 'Diferença concentrada em pagamentos reprocessados. Validar duplicidade no lote 7842 antes de qualquer alteração no banco.', createdAt: '2026-08-03T09:04:00-03:00', attachments: ['log-fechamento.txt'] },
    { id: 'COM-2079-3', author: 'Bruno Tavares', role: 'support', visibility: 'public', text: 'Identificamos divergência em um lote de pagamentos reprocessados. A análise está sendo tratada como crítica e manteremos o chamado atualizado.', createdAt: '2026-08-03T09:10:00-03:00', attachments: [] }
  ],
  'TK-2078': [
    { id: 'COM-2078-1', author: 'Marina Costa', role: 'support', visibility: 'public', text: 'Poderia confirmar o identificador do pagamento original e a data em que ele foi processado? Precisamos desses dados para comparar os dois registros.', createdAt: '2026-08-03T09:22:00-03:00', attachments: [] }
  ],
  'TK-2077': [
    { id: 'COM-2077-1', author: 'Ana Souza', role: 'support', visibility: 'public', text: 'Reprocessamos a conclusão dos participantes afetados. Os certificados já estão disponíveis; por favor, valide quando possível.', createdAt: '2026-08-02T16:10:00-03:00', attachments: [] },
    { id: 'COM-2077-2', author: 'Felipe Ramos', role: 'client', visibility: 'public', text: 'Validado. Os certificados apareceram corretamente para todos os participantes. Obrigado!', createdAt: '2026-08-02T16:14:00-03:00', attachments: [] }
  ],
  'TK-2076': [
    { id: 'COM-2076-1', author: 'Rafael Lima', role: 'support', visibility: 'internal', text: 'Cache invalidado na instância basf-campanhas. Monitorar por 30 minutos antes de solicitar validação.', createdAt: '2026-08-01T10:40:00-03:00', attachments: [] },
    { id: 'COM-2076-2', author: 'Rafael Lima', role: 'support', visibility: 'public', text: 'Atualizamos o cache da instância. A campanha encerrada não deve mais aparecer no painel inicial.', createdAt: '2026-08-01T10:45:00-03:00', attachments: [] }
  ],
  'TK-2075': [
    { id: 'COM-2075-1', author: 'Ana Souza', role: 'support', visibility: 'public', text: 'Estamos conferindo a importação da lista. Poderia informar os nomes ou e-mails dos três participantes que continuam como ausentes?', createdAt: '2026-08-03T12:30:00-03:00', attachments: [] }
  ]
};
const INITIAL_CHAT = {
  'TK-2081': [
    { id: 'CHAT-2081-1', author: 'Camila Ferreira', role: 'client', text: 'O time de campo precisa dessa correção para amanhã cedo, consegue priorizar?', createdAt: '2026-08-03T19:40:00-03:00' }
  ],
  'TK-2079': [
    { id: 'CHAT-2079-1', author: 'Bruno Tavares', role: 'support', text: 'Patrícia, estou conferindo o lote 7842 agora, retorno em breve.', createdAt: '2026-08-03T16:48:00-03:00' }
  ]
};
const INITIAL_TIME_ENTRIES = {
  'TK-2081': [
    { id: 'TIME-2081-1', date: '2026-08-03', user: 'Rafael Lima', hours: 2, description: 'Reprodução e análise da API' }
  ],
  'TK-2079': [
    { id: 'TIME-2079-1', date: '2026-08-03', user: 'Bruno Tavares', hours: 3.5, description: 'Investigação de divergência financeira' }
  ]
};
const ACTIVITIES = [
  { icon: '↻', text: 'Rafael atualizou o TK-2081 na instância zoetis-ru-prod.', time: 'há 18 minutos' },
  { icon: '⚠', text: 'O SLA do TK-2079 foi ultrapassado em elanco-br-prod.', time: 'há 42 minutos' },
  { icon: '＋', text: 'João abriu o TK-2080 para a plataforma FieldOps.', time: 'há 5 horas' },
  { icon: '✓', text: 'TK-2077 foi resolvido na instância syngenta-training.', time: 'ontem, 16:15' },
  { icon: '⇧', text: 'Um anexo foi adicionado ao TK-2078.', time: 'ontem, 09:22' }
];
const STORAGE_KEY = 'supportPrototypeTicketsV3';
const $ = id => document.getElementById(id);
function clone(v) { return JSON.parse(JSON.stringify(v)) } function normalizeTicket(t) { return { ...t, attachments: Array.isArray(t.attachments) ? t.attachments : [], history: Array.isArray(t.history) ? t.history : [], comments: Array.isArray(t.comments) ? t.comments : clone(INITIAL_COMMENTS[t.id] || []), chat: Array.isArray(t.chat) ? t.chat : clone(INITIAL_CHAT[t.id] || []), timeEntries: Array.isArray(t.timeEntries) ? t.timeEntries : clone(INITIAL_TIME_ENTRIES[t.id] || []), unreadSupport: Number(t.unreadSupport || 0), unreadClient: Number(t.unreadClient || 0) } } function loadTickets() { try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || clone(INITIAL_TICKETS); return data.map(normalizeTicket) } catch { return clone(INITIAL_TICKETS).map(normalizeTicket) } } function saveTickets() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)) } catch { /* armazenamento indisponível; mantém dados durante a sessão */ } }
let tickets = loadTickets();
function esc(v = '') { return String(v).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])) }
function unique(arr) { return [...new Set(arr)].sort((a, b) => a.localeCompare(b, 'pt-BR')) } function initials(v) { return v.split(/\s+/).map(x => x[0]).join('').slice(0, 3).toUpperCase() }
function statusClass(s) { return { 'Aberto': 'status-open', 'Em andamento': 'status-progress', 'Aguardando cliente': 'status-waiting', 'Resolvido': 'status-done', 'Fechado': 'status-closed' }[s] || 'status-open' }
function priorityClass(p) { return { 'Baixa': 'priority-low', 'Média': 'priority-medium', 'Alta': 'priority-high', 'Crítica': 'priority-critical' }[p] || 'priority-medium' }
function priorityColor(p) { return { 'Baixa': 'var(--muted)', 'Média': 'var(--blue)', 'Alta': 'var(--warning-strong)', 'Crítica': 'var(--danger-strong)' }[p] || 'var(--blue)' }
function slaInfo(t) { if (['Resolvido', 'Fechado'].includes(t.status)) return { label: 'Cumprido', sub: 'Dentro do prazo', cls: 'ok' }; if (t.slaState === 'breached') return { label: 'Ultrapassado', sub: `Meta ${t.slaHours}h`, cls: 'breached' }; if (t.slaState === 'risk') return { label: 'Em risco', sub: `Meta ${t.slaHours}h`, cls: 'risk' }; return { label: 'No prazo', sub: `Meta ${t.slaHours}h`, cls: 'ok' } }
function relativeDate(s) { const d = new Date(s), now = new Date('2026-08-03T20:22:00-03:00'), h = Math.max(0, Math.round((now - d) / 36e5)); if (h < 1) return 'há poucos minutos'; if (h < 24) return `há ${h}h`; const days = Math.round(h / 24); return days === 1 ? 'ontem' : `há ${days} dias` }
function formatDate(s) { return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(s)) }
function envFor(instance) { return ENVIRONMENTS.find(e => e.instance === instance) }
function clientColor(company) { return ENVIRONMENTS.find(e => e.company === company)?.color || 'var(--muted)' }
function totalHours(t) { return (t.timeEntries || []).reduce((sum, e) => sum + Number(e.hours || 0), 0) }
const ICONS = {
  checklist: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l2 2 4-5"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  alert: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></svg>',
  database: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  plus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  user: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
  layers: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
  calendar: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
  triangleAlert: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.6 4.4 2.9 18a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.4 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  building: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6"/></svg>'
}
function metric(label, value, foot, icon, tone) { return `<article class="metric-card"><div><h3>${esc(label)}</h3><strong>${esc(value)}</strong><p>${esc(foot)}</p></div><div class="metric-icon ${tone}">${icon}</div></article>` }
function slaTone(cls) { return { risk: 'var(--warning-strong)', breached: 'var(--danger-strong)', ok: 'var(--success-strong)' }[cls] || 'var(--success-strong)' }
function slaFoot(cls) { return { risk: 'Prazo mais apertado do ticket', breached: 'Prazo já foi ultrapassado', ok: 'Dentro do prazo combinado' }[cls] || 'Dentro do prazo combinado' }
function ticketInfoBentoHtml(t, sla) { const hasAssignee = t.assignee && t.assignee !== 'Não atribuído', tone = slaTone(sla.cls); return `<div class="info-bento"><div class="bento-card bento-card--accent" style="--bento-accent:${clientColor(t.company)}"><div class="bento-card__icon">${ICONS.building}</div><span class="bento-card__label">Cliente</span><strong class="bento-card__value">${esc(t.company)}</strong></div><div class="bento-card"><div class="bento-card__icon">${ICONS.user}</div><span class="bento-card__label">Solicitante</span><strong class="bento-card__value">${esc(t.requester)}</strong></div><div class="bento-card bento-card--sla bento-card--accent" style="--bento-accent:${tone}"><div class="bento-card__top"><div class="bento-card__icon">${ICONS.triangleAlert}</div><span class="bento-card__pill">${esc(sla.label)}</span></div><span class="bento-card__label">SLA</span><strong class="bento-card__value">${esc(sla.sub)}</strong><span class="bento-card__foot">${slaFoot(sla.cls)}</span></div><div class="bento-card"><div class="bento-card__icon">${ICONS.layers}</div><span class="bento-card__label">Plataforma</span><strong class="bento-card__value">${esc(t.platform)}</strong></div><div class="bento-card"><div class="bento-card__icon">${ICONS.database}</div><span class="bento-card__label">Instância</span><strong class="bento-card__value">${esc(t.instance)}</strong></div><div class="bento-card${hasAssignee ? ' bento-card--accent' : ''}"${hasAssignee ? ' style="--bento-accent:var(--success-strong)"' : ''}><div class="bento-card__icon">${ICONS.user}</div><div class="bento-card__body"><span class="bento-card__label">Responsável</span><div class="bento-card__person"><strong class="bento-card__value">${esc(t.assignee)}</strong></div></div></div><div class="bento-card bento-card--wide"><div class="bento-card__icon">${ICONS.calendar}</div><div class="bento-card__body"><span class="bento-card__label">Criado em</span><strong class="bento-card__value">${formatDate(t.createdAt)}</strong></div></div><div class="bento-card"><div class="bento-card__icon">${ICONS.clock}</div><span class="bento-card__label">Atualizado</span><strong class="bento-card__value">${relativeDate(t.updatedAt)}</strong></div></div>` }
function toast(message, type = '') { const el = document.createElement('div'); el.className = `toast ${type}`; el.innerHTML = `<strong>${type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}</strong><span>${esc(message)}</span>`; $('toastWrap').appendChild(el); setTimeout(() => el.remove(), 3600) }
