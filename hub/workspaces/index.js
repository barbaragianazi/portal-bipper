(function () {
  'use strict';

  const page = document.getElementById('hubWorkspacesPage');
  const filesPage = document.getElementById('workspaceFilesPage');
  if (!page || !filesPage) return;

  const workspaceGrid = page.querySelector('.workspace-grid');
  let activeWorkspace = null;
  let activeFolder = null;
  let activePath = [];
  let archiveUpdateTimer = null;
  let activePreviewFile = null;
  let workspaceToastTimer = null;
  let pendingWorkspaceAction = null;
  let permissionsMultiSelect = null;
  const ELLIPSIS_ICON = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-xs lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical" width="24" height="24" viewBox="0 0 24 24" fill="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>';
  const workspaceReferenceOptions = {
    campanha: ['Black Friday 2026', 'Campanha Regional Sul', 'Catálogo Comercial 2026', 'Primavera Agro 2026'],
    'grupo VU': ['Grupo VU Comercial', 'Grupo VU Lideranças', 'Grupo VU Operações'],
    'cliente (revenda)': ['Agro Amazônia', 'Revenda Centro Oeste', 'Canal Sul Premium'],
    'usuário(s)': ['Bárbara Gianazi', 'Ana Martins', 'Bruno Lima', 'Camila Rocha'],
    produtos: ['Produto Atlas', 'Linha Premium', 'Kit Comercial Safra 2026']
  };

  const workspaceContent = {
    'campanhas-de-divulgacao': {
      key: 'campanhas-de-divulgacao',
      type: 'campanha',
      title: 'Campanhas de divulgação',
      description: 'Materiais sazonais, banners, textos e peças de mídia para comunicações ativas.',
      permissions: 'Marketing e parceiros externos',
      folders: [
        { name: 'Black Friday 2026', meta: '42 arquivos', kind: 'folder' },
        { name: 'Campanha Regional Sul', meta: '28 arquivos', kind: 'folder' },
        { name: 'Banners e redes sociais', meta: '64 arquivos', kind: 'folder' },
        { name: 'Textos aprovados', meta: '18 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Banner principal - Black Friday.png', type: 'PNG', owner: 'Ana Martins', date: 'Atualizado ontem', kind: 'file' },
        { name: 'Calendario de posts regional.xlsx', type: 'XLS', owner: 'Marketing', date: 'Atualizado há 2 dias', kind: 'file' },
        { name: 'Roteiro de comunicação parceiros.docx', type: 'DOC', owner: 'Bruno Lima', date: 'Atualizado em 12/07', kind: 'file' },
        { name: 'Teaser campanha regional.mp4', type: 'MP4', owner: 'Ana Martins', date: 'Em revisão', kind: 'file' }
      ],
      isProtected: false
    },
    lancamento: {
      key: 'lancamento',
      type: 'produtos',
      title: 'Lançamento',
      description: 'Arquivos de go-to-market, kits de produto, apresentações comerciais e assets finais.',
      permissions: 'Produto, vendas e diretoria',
      folders: [
        { name: 'Produto Atlas', meta: '36 arquivos', kind: 'folder' },
        { name: 'Kit comercial', meta: '22 arquivos', kind: 'folder' },
        { name: 'Treinamento de vendas', meta: '17 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Apresentacao Produto Atlas.pdf', type: 'PDF', owner: 'Produto', date: 'Atualizado hoje', kind: 'file' },
        { name: 'Argumentario de vendas.docx', type: 'DOC', owner: 'Vendas', date: 'Atualizado ontem', kind: 'file' },
        { name: 'Fotos oficiais do produto.zip', type: 'ZIP', owner: 'Marketing', date: 'Atualizado em 10/07', kind: 'file' }
      ],
      isProtected: false
    },
    'divulgacao-de-produtos': {
      key: 'divulgacao-de-produtos',
      type: 'cliente',
      title: 'Divulgação de produtos',
      description: 'Conteúdos prontos para clientes, campanhas cooperadas e comunicados comerciais.',
      permissions: 'Clientes selecionados',
      folders: [
        { name: 'Comunicados comerciais', meta: '21 arquivos', kind: 'folder' },
        { name: 'Campanhas cooperadas', meta: '34 arquivos', kind: 'folder' },
        { name: 'Materiais para clientes', meta: '41 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Folder linha premium.pdf', type: 'PDF', owner: 'Comercial', date: 'Atualizado hoje', kind: 'file' },
        { name: 'Email marketing revendas.html', type: 'HTML', owner: 'Marketing', date: 'Atualizado ontem', kind: 'file' },
        { name: 'Tabela comparativa.xlsx', type: 'XLS', owner: 'Produto', date: 'Atualizado em 09/07', kind: 'file' }
      ],
      isProtected: false
    },
    'grupo-vu': {
      key: 'grupo-vu',
      type: 'grupo VU',
      title: 'Grupo VU',
      description: 'Arquivos compartilhados para um grupo específico de usuários e equipes internas.',
      permissions: 'Grupo VU',
      folders: [
        { name: 'Documentos internos', meta: '19 arquivos', kind: 'folder' },
        { name: 'Guias operacionais', meta: '27 arquivos', kind: 'folder' },
        { name: 'Comunicados do grupo', meta: '12 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Manual operacional.pdf', type: 'PDF', owner: 'Operações', date: 'Atualizado há 3 dias', kind: 'file' },
        { name: 'Lista de usuários.xlsx', type: 'XLS', owner: 'Administração', date: 'Atualizado em 08/07', kind: 'file' },
        { name: 'Politica de acesso.docx', type: 'DOC', owner: 'TI', date: 'Atualizado em 07/07', kind: 'file' }
      ],
      isProtected: false
    },
    'materiais-publicos': {
      key: 'materiais-publicos',
      type: 'publica',
      title: 'Materiais públicos',
      description: 'Documentos liberados para distribuição ampla, links externos e consultas sem restrição.',
      permissions: 'Público com link',
      folders: [
        { name: 'Catálogos públicos', meta: '26 arquivos', kind: 'folder' },
        { name: 'Institucional', meta: '14 arquivos', kind: 'folder' },
        { name: 'Links externos', meta: '21 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Catálogo comercial 2026.pdf', type: 'PDF', owner: 'Marketing', date: 'Atualizado hoje', kind: 'file' },
        { name: 'Release institucional.docx', type: 'DOC', owner: 'Comunicação', date: 'Atualizado ontem', kind: 'file' },
        { name: 'Manual da marca público.pdf', type: 'PDF', owner: 'Marca', date: 'Atualizado em 11/07', kind: 'file' }
      ],
      isProtected: false
    },
    cofre: {
      key: 'cofre',
      type: 'cofre',
      title: 'Cofre',
      description: 'Arquivos sensíveis protegidos por senha e acesso restrito.',
      permissions: 'Diretoria, jurídico e financeiro',
      folders: [
        { name: 'Contratos', meta: '18 arquivos', kind: 'folder' },
        { name: 'Financeiro', meta: '11 arquivos', kind: 'folder' }
      ],
      files: [
        { name: 'Contrato matriz.pdf', type: 'PDF', owner: 'Jurídico', date: 'Atualizado hoje', kind: 'file' },
        { name: 'Forecast confidencial.xlsx', type: 'XLS', owner: 'Financeiro', date: 'Atualizado ontem', kind: 'file' }
      ],
      isProtected: true
    }
  };
  const workspaceOrder = Object.keys(workspaceContent);

  page.dataset.ready = 'true';
  filesPage.dataset.ready = 'true';

  function slugify(value) {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function getWorkspaceCardMeta(workspace) {
    const cardStyles = {
      campanha: { accent: '#2563eb', soft: '#eaf2ff', badgeClass: '', icon: '<path d="M4 13v-2l12-5v12L4 13Z"></path><path d="M8 14l2 5"></path>' },
      produtos: { accent: '#00a7b5', soft: '#e8fbfd', badgeClass: ' hub-status-badge--positive', icon: '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path>' },
      cliente: { accent: '#10b981', soft: '#ecfdf5', badgeClass: ' hub-status-badge--positive', icon: '<path d="M4 10h16l-1-5H5l-1 5Z"></path><path d="M5 10v9h14v-9"></path>' },
      'grupo VU': { accent: '#7c3aed', soft: '#ede9fe', badgeClass: '', icon: '<path d="M7 18a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4"></path><circle cx="12" cy="8" r="3"></circle>' },
      publica: { accent: '#f59e0b', soft: '#fff7ed', badgeClass: ' hub-status-badge--warning', icon: '<circle cx="12" cy="12" r="8"></circle><path d="M4 12h16"></path><path d="M12 4c2 2.4 3 5.1 3 8s-1 5.6-3 8"></path><path d="M12 4c-2 2.4-3 5.1-3 8s1 5.6 3 8"></path>' },
      cofre: { accent: '#0f172a', soft: '#f1f5f9', badgeClass: '', icon: '<rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path><path d="M12 14v2"></path>' },
      'cliente (revenda)': { accent: '#10b981', soft: '#ecfdf5', badgeClass: ' hub-status-badge--positive', icon: '<path d="M4 10h16l-1-5H5l-1 5Z"></path><path d="M5 10v9h14v-9"></path>' },
      'usuário(s)': { accent: '#0f766e', soft: '#ecfeff', badgeClass: '', icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' }
    };

    return cardStyles[workspace.type] || cardStyles.campanha;
  }

  function buildWorkspaceMenuHtml() {
    return '<div class="workspace-menu"><button class="icon-btn workspace-menu__trigger" type="button" aria-label="Abrir menu do workspace" aria-expanded="false">' + ELLIPSIS_ICON + '</button><div class="workspace-menu__list" hidden><button type="button">Compartilhar externamente</button><button type="button">Renomear</button><button type="button">Baixar todos os arquivos</button><button class="is-danger" type="button">Excluir</button></div></div>';
  }

  function renderWorkspaceCards() {
    if (!workspaceGrid) return;

    workspaceGrid.innerHTML = '';
    workspaceOrder.forEach(function (key) {
      const workspace = workspaceContent[key];
      const meta = getWorkspaceCardMeta(workspace);
      const folderLabel = workspace.folders.length + ' pastas';
      const fileLabel = workspace.files.length + ' arquivos';
      const article = document.createElement('article');
      article.className = 'area-card workspace-card' + (workspace.isProtected ? ' workspace-card--vault' : '');
      article.dataset.workspace = key;
      if (workspace.isProtected) article.dataset.protected = 'true';
      article.style.setProperty('--accent', meta.accent);
      article.style.setProperty('--soft', meta.soft);

      if (workspace.isProtected) {
        article.innerHTML = '<div class="area-card__top"><div class="area-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + meta.icon + '</svg></div></div><h3>' + workspace.title + '</h3><button class="btn btn-primary workspace-vault-access" type="button">Acessar com senha</button>';
      } else {
        article.innerHTML = '<div class="area-card__top"><div class="area-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + meta.icon + '</svg></div>' + buildWorkspaceMenuHtml() + '</div><div class="module-name"><h3>' + workspace.title + '</h3></div><p>' + workspace.description + '</p><ul class="module-list"><li class="module-item"><span>' + folderLabel + '</span><small>' + fileLabel + '</small></li><li class="module-item"><span>Permissões</span><small>' + workspace.permissions + '</small></li></ul>';
      }

      workspaceGrid.appendChild(article);
    });

    bindWorkspaceCardInteractions();
  }

  function getFolderFiles(workspace, path) {
    const folder = path[path.length - 1];
    const depth = path.length;
    const parentName = folder ? folder.name : workspace.title;
    const nestedFolders = depth < 3
      ? [
        {
          name: depth === 1 ? 'Peças aprovadas' : 'Versões finais',
          meta: depth === 1 ? '12 arquivos' : '6 arquivos',
          kind: 'folder'
        },
        {
          name: depth === 1 ? 'Em revisão' : 'Arquivos de apoio',
          meta: depth === 1 ? '8 arquivos' : '4 arquivos',
          kind: 'folder'
        }
      ]
      : [];

    return [
      ...nestedFolders,
      {
        name: parentName + ' - resumo executivo.pdf',
        type: 'PDF',
        owner: workspace.title,
        date: 'Atualizado hoje',
        preview: 'Resumo com objetivos, público, canais de distribuição e próximos passos para esta pasta.',
        kind: 'file'
      },
      {
        name: parentName + ' - assets principais.png',
        type: 'PNG',
        owner: 'Marketing',
        date: 'Atualizado ontem',
        preview: 'Imagem de apresentação dos assets principais, com áreas de segurança, chamada e assinatura visual.',
        kind: 'file'
      },
      {
        name: parentName + ' - checklist.xlsx',
        type: 'XLS',
        owner: 'Operações',
        date: 'Atualizado há 2 dias',
        preview: 'Planilha com status de aprovação, responsáveis, datas limite e observações de publicação.',
        kind: 'file'
      }
    ];
  }

  function closeWorkspaceMenus(exceptMenu) {
    document.querySelectorAll('.workspace-menu').forEach(function (menu) {
      if (menu === exceptMenu) return;

      const trigger = menu.querySelector('.workspace-menu__trigger');
      const list = menu.querySelector('.workspace-menu__list');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (list) list.hidden = true;
      menu.classList.remove('is-open');
      menu.closest('.workspace-folder-card, .workspace-file-item')?.classList.remove('has-open-menu');
    });
  }

  function handleAction(action, item, kind) {
    if (action === 'delete') {
      openWorkspaceConfirm(item, kind);
      return;
    }
    const name = item && item.name ? item.name : 'item';
    const messages = {
      share: 'Compartilhamento externo preparado para ' + name,
      copy: 'Link copiado para ' + name,
      rename: 'Renomear ' + name,
      move: 'Mover ' + name + ' para outro workspace',
      download: kind === 'folder' ? 'Baixando conteúdo da pasta ' + name + ' (.zip)' : 'Baixando arquivo ' + name,
      delete: 'Excluir ' + name
    };

    closeWorkspaceMenus();
    showWorkspaceToast(messages[action] || 'Ação aplicada em ' + name);
  }

  function showWorkspaceToast(message) {
    const toast = document.getElementById('workspaceToast');
    if (!toast) return;
    if (workspaceToastTimer) clearTimeout(workspaceToastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    workspaceToastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('workspace-preview-open');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('workspace-preview-open');
  }

  function openWorkspaceConfirm(item, kind) {
    const modal = document.getElementById('workspaceConfirmModal');
    const title = document.getElementById('workspaceConfirmTitle');
    const description = document.getElementById('workspaceConfirmDescription');
    const confirm = document.getElementById('workspaceConfirmAction');
    const status = document.getElementById('workspaceConfirmStatus');
    if (!modal || !title || !description || !confirm || !status) return;

    pendingWorkspaceAction = { item: item, kind: kind };
    title.textContent = 'Excluir ' + item.name + '?';
    description.textContent = kind === 'folder'
      ? 'A pasta e todo o conteúdo associado deixarão de aparecer neste workspace.'
      : 'O arquivo será removido deste workspace. Esta ação pode ser refeita depois manualmente.';
    confirm.textContent = 'Excluir';
    status.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M9.5 9.5 14.5 14.5M14.5 9.5 9.5 14.5"></path></svg>';
    modal.classList.add('is-visible', 'is-negative');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('workspace-preview-open');
  }

  function closeWorkspaceConfirm() {
    const modal = document.getElementById('workspaceConfirmModal');
    if (!modal) return;
    modal.classList.remove('is-visible', 'is-negative', 'is-positive');
    modal.setAttribute('aria-hidden', 'true');
    pendingWorkspaceAction = null;
    if (!document.getElementById('createWorkspaceModal')?.hidden || !document.getElementById('workspaceVaultModal')?.hidden || !document.getElementById('workspacePreview')?.hidden) return;
    document.body.classList.remove('workspace-preview-open');
  }

  function confirmWorkspaceDelete() {
    if (!pendingWorkspaceAction) return;
    const item = pendingWorkspaceAction.item;
    const kind = pendingWorkspaceAction.kind;

    if (kind === 'workspace') {
      delete workspaceContent[item.key];
      const orderIndex = workspaceOrder.indexOf(item.key);
      if (orderIndex >= 0) workspaceOrder.splice(orderIndex, 1);
      renderWorkspaceCards();
      showWorkspaceToast('Workspace excluído com sucesso.');
    } else {
      showWorkspaceToast((kind === 'folder' ? 'Pasta ' : 'Arquivo ') + item.name + ' excluído com sucesso.');
    }

    closeWorkspaceConfirm();
  }

  function createActionMenu(item, kind) {
    const menu = document.createElement('div');
    const isFolder = kind === 'folder';
    const downloadLabel = isFolder ? 'Baixar conteúdo da pasta (.zip)' : 'Baixar arquivo';
    const itemName = item && item.name ? item.name : 'item';

    menu.className = 'workspace-menu workspace-item-menu';
    menu.innerHTML = '<button class="icon-btn workspace-menu__trigger" type="button" aria-label="Abrir menu de ' + itemName + '" aria-expanded="false">' + ELLIPSIS_ICON + '</button><div class="workspace-menu__list" hidden><button type="button" data-action="share">Compartilhar externamente</button><button type="button" data-action="copy">Copiar link</button><button type="button" data-action="rename">Renomear</button><button type="button" data-action="move">Mover para outro workspace</button><button type="button" data-action="download">' + downloadLabel + '</button><button class="is-danger" type="button" data-action="delete">Excluir</button></div>';

    const trigger = menu.querySelector('.workspace-menu__trigger');
    const list = menu.querySelector('.workspace-menu__list');

    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const willOpen = list.hidden;
      closeWorkspaceMenus(menu);
      list.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', String(willOpen));
      menu.classList.toggle('is-open', willOpen);
      menu.closest('.workspace-folder-card, .workspace-file-item')?.classList.toggle('has-open-menu', willOpen);
    });

    list.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        handleAction(button.dataset.action, item, kind);
      });
    });

    return menu;
  }

  function createFolderCard(folder) {
    const card = document.createElement('article');
    card.className = 'workspace-folder-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir pasta ' + folder.name);
    card.innerHTML = '<div class="workspace-folder-card__icon" aria-hidden="true"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z"></path></svg></div><div><strong></strong><small></small></div>';
    card.querySelector('strong').textContent = folder.name;
    card.querySelector('small').textContent = folder.meta;
    card.appendChild(createActionMenu(folder, 'folder'));
    card.addEventListener('click', function () {
      openFolder(folder);
    });
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFolder(folder);
      }
    });
    return card;
  }

  function createLooseFileCard(file) {
    const card = document.createElement('article');
    card.className = 'workspace-folder-card workspace-folder-card--file';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir previa de ' + file.name);
    card.innerHTML = '<div class="workspace-file-type"></div><div><strong></strong><small></small></div>';
    card.querySelector('.workspace-file-type').textContent = file.type;
    card.querySelector('strong').textContent = file.name;
    card.querySelector('small').textContent = file.owner + ' - ' + file.date;
    card.appendChild(createActionMenu(file, 'file'));
    card.addEventListener('click', function () {
      openPreview(file);
    });
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPreview(file);
      }
    });
    return card;
  }

  function createFileItem(file) {
    const item = document.createElement('li');
    item.className = 'module-item workspace-file-item';
    item.innerHTML = '<div class="workspace-file-type"></div><div class="module-item__content"><span></span><small></small></div><button class="icon-btn workspace-file-open" type="button" aria-label="Abrir arquivo"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M8 7h9v9"></path></svg></button>';
    item.querySelector('.workspace-file-type').textContent = file.type;
    item.querySelector('span').textContent = file.name;
    item.querySelector('small').textContent = file.owner + ' - ' + file.date;
    item.appendChild(createActionMenu(file, 'file'));
    const openButton = item.querySelector('.workspace-file-open');
    openButton.setAttribute('aria-label', 'Abrir previa de ' + file.name);
    item.addEventListener('click', function () {
      openPreview(file);
    });
    openButton.addEventListener('click', function (event) {
      event.stopPropagation();
      openPreview(file);
    });
    return item;
  }

  function renderFiles(files, title, subtitle) {
    const listTitle = filesPage.querySelector('#workspaceFilesListTitle');
    const fileCount = filesPage.querySelector('#workspaceFileCount');
    const fileList = filesPage.querySelector('#workspaceFileList');

    if (listTitle) listTitle.textContent = title;
    if (fileCount) fileCount.textContent = files.length + ' arquivos';

    if (fileList) {
      fileList.innerHTML = '';
      files.forEach(function (file) {
        fileList.appendChild(createFileItem(file));
      });
    }
  }

  function renderBreadcrumb() {
    const breadcrumb = filesPage.querySelector('#workspaceFoldersTitle');
    if (!breadcrumb) return;

    breadcrumb.innerHTML = '';

    const rootButton = document.createElement('button');
    rootButton.type = 'button';
    rootButton.textContent = 'Arquivos';
    rootButton.addEventListener('click', function () {
      renderWorkspaceRoot();
    });
    breadcrumb.appendChild(rootButton);

    activePath.forEach(function (folder, index) {
      const separator = document.createElement('span');
      separator.textContent = '>';
      breadcrumb.appendChild(separator);

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = folder.name;
      button.setAttribute('aria-current', index === activePath.length - 1 ? 'page' : 'false');
      button.addEventListener('click', function () {
        openPath(activePath.slice(0, index + 1));
      });
      breadcrumb.appendChild(button);
    });
  }

  function showArchiveSkeleton() {
    const folderList = filesPage.querySelector('#workspaceFolderList');
    if (!folderList) return;

    folderList.innerHTML = '';
    for (let index = 0; index < 9; index += 1) {
      const skeleton = document.createElement('div');
      skeleton.className = 'workspace-folder-card workspace-folder-card--skeleton';
      skeleton.innerHTML = '<div></div><span></span>';
      folderList.appendChild(skeleton);
    }
  }

  function renderArchive(items) {
    const itemCount = filesPage.querySelector('#workspaceItemCount');
    const folderList = filesPage.querySelector('#workspaceFolderList');

    if (itemCount) itemCount.textContent = items.length + ' itens';
    renderBreadcrumb();

    if (folderList) {
      folderList.innerHTML = '';
      items.forEach(function (item) {
        folderList.appendChild(item.kind === 'file' ? createLooseFileCard(item) : createFolderCard(item));
      });
    }
  }

  function getRootArchiveItems(workspace) {
    return workspace.folders.concat(workspace.files.slice(0, 3).map(function (file) {
      return {
        ...file,
        kind: 'file'
      };
    }));
  }

  function updateArchive(items) {
    clearTimeout(archiveUpdateTimer);
    showArchiveSkeleton();
    archiveUpdateTimer = window.setTimeout(function () {
      renderArchive(items);
    }, 220);
  }

  function renderWorkspaceRoot() {
    if (!activeWorkspace) return;

    activeFolder = null;
    activePath = [];
    updateArchive(getRootArchiveItems(activeWorkspace));
  }

  function renderWorkspace(workspace) {
    const title = filesPage.querySelector('#workspaceFilesTitle');
    const type = filesPage.querySelector('#workspaceFilesType');
    const description = filesPage.querySelector('#workspaceFilesDescription');

    activeWorkspace = workspace;
    activeFolder = null;
    activePath = [];
    if (title) title.textContent = workspace.title;
    if (type) type.textContent = workspace.type;
    if (description) description.textContent = workspace.description;

    renderArchive(getRootArchiveItems(workspace));
    renderFiles(workspace.files, 'Arquivos recentes');
  }

  function openPath(path) {
    if (!activeWorkspace) return;

    activePath = path;
    activeFolder = activePath[activePath.length - 1] || null;
    updateArchive(getFolderFiles(activeWorkspace, activePath));
  }

  function openFolder(folder) {
    openPath(activePath.concat(folder));
  }

  function createPreviewBody(file) {
    return '<div class="workspace-preview-sheet"><div><strong>Status</strong><span>Em andamento</span></div><div><strong>Responsável</strong><span>' + file.owner + '</span></div><div><strong>Última atualização</strong><span>' + file.date + '</span></div><div><strong>Observações</strong><span>' + (file.preview || 'Dados principais do arquivo selecionado.') + '</span></div></div>';
  }

  function openPreview(file) {
    const modal = document.getElementById('workspacePreview');
    const title = document.getElementById('workspacePreviewTitle');
    const type = document.getElementById('workspacePreviewType');
    const meta = document.getElementById('workspacePreviewMeta');
    const body = document.getElementById('workspacePreviewBody');
    const menuRoot = document.getElementById('workspacePreviewMenu');
    if (!modal || !title || !type || !meta || !body) return;

    activePreviewFile = file;
    title.textContent = file.name;
    type.textContent = file.type;
    meta.textContent = file.owner + ' - ' + file.date;
    body.innerHTML = createPreviewBody(file);
    if (menuRoot) {
      menuRoot.innerHTML = '';
      menuRoot.appendChild(createActionMenu(file, 'file'));
    }
    modal.hidden = false;
    document.body.classList.add('workspace-preview-open');
  }

  function closePreview() {
    const modal = document.getElementById('workspacePreview');
    if (!modal) return;

    activePreviewFile = null;
    modal.hidden = true;
    document.body.classList.remove('workspace-preview-open');
  }

  function openFilesPage(workspaceKey, fallbackName) {
    const workspace = workspaceContent[workspaceKey] || {
      type: 'workspace',
      title: fallbackName || 'Workspace',
      description: 'Pastas e arquivos relacionados a este workspace.',
      folders: [],
      files: []
    };

    renderWorkspace(workspace);
    page.hidden = true;
    filesPage.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openVaultModal() {
    const input = document.getElementById('workspaceVaultPassword');
    const error = document.getElementById('workspaceVaultError');
    if (input) input.value = '';
    if (error) error.hidden = true;
    openModal('workspaceVaultModal');
    input?.focus();
  }

  function openCreateWorkspaceModal() {
    const form = document.getElementById('createWorkspaceForm');
    const typeSelect = document.getElementById('workspaceTypeSelect');
    const referenceField = document.getElementById('workspaceReferenceField');
    const referenceSelect = document.getElementById('workspaceReferenceSelect');

    form?.reset();
    if (typeSelect) typeSelect.value = '';
    if (referenceField) referenceField.hidden = true;
    if (referenceSelect) {
      referenceSelect.required = false;
      referenceSelect.innerHTML = '<option value="">Selecione uma opção</option>';
      referenceSelect.value = '';
    }
    updateWorkspaceReferenceField('');
    Array.from(document.getElementById('workspacePermissionsSelect')?.options || []).forEach(function (option) {
      option.selected = false;
    });
    renderPermissionsMultiSelect();
    openModal('createWorkspaceModal');
  }

  function closeCreateWorkspaceModal() {
    closeModal('createWorkspaceModal');
  }

  function closeVaultModal() {
    closeModal('workspaceVaultModal');
  }

  function updateWorkspaceReferenceField(type) {
    const field = document.getElementById('workspaceReferenceField');
    const label = document.getElementById('workspaceReferenceLabel');
    const select = document.getElementById('workspaceReferenceSelect');
    if (!field || !label || !select) return;

    const options = workspaceReferenceOptions[type] || [];
    const labels = {
      campanha: 'Qual campanha?',
      'grupo VU': 'Qual grupo VU?',
      'cliente (revenda)': 'Qual cliente (revenda)?',
      'usuário(s)': 'Qual usuário?',
      produtos: 'Qual produto?'
    };

    if (!options.length) {
      field.hidden = true;
      select.innerHTML = '<option value="">Selecione uma opção</option>';
      select.required = false;
      return;
    }

    field.hidden = false;
    label.textContent = labels[type] || 'Selecionar referência';
    select.required = true;
    select.innerHTML = '<option value="">Selecione uma opção</option>' + options.map(function (option) {
      return '<option value="' + option + '">' + option + '</option>';
    }).join('');
  }

  function getSelectedPermissions(select) {
    return Array.from(select.selectedOptions || []).map(function (option) {
      return option.value;
    }).filter(Boolean);
  }

  function closePermissionsMultiSelect() {
    if (!permissionsMultiSelect) return;
    permissionsMultiSelect.dropdown.hidden = true;
    permissionsMultiSelect.root.classList.remove('is-open');
    permissionsMultiSelect.trigger.setAttribute('aria-expanded', 'false');
  }

  function renderPermissionsMultiSelect() {
    if (!permissionsMultiSelect) return;

    const selected = getSelectedPermissions(permissionsMultiSelect.select);
    permissionsMultiSelect.value.innerHTML = '';
    permissionsMultiSelect.root.classList.toggle('has-value', selected.length > 0);

    if (!selected.length) {
      const placeholder = document.createElement('span');
      placeholder.className = 'workspace-multi-select__placeholder';
      placeholder.textContent = permissionsMultiSelect.root.dataset.placeholder || 'Selecione';
      permissionsMultiSelect.value.appendChild(placeholder);
    } else {
      selected.forEach(function (item) {
        const chip = document.createElement('span');
        chip.className = 'workspace-multi-select__chip';
        chip.innerHTML = '<span class="workspace-multi-select__chip-label"></span><button class="workspace-multi-select__chip-remove" type="button" aria-label="Remover ' + item + '">×</button>';
        chip.querySelector('.workspace-multi-select__chip-label').textContent = item;
        chip.querySelector('.workspace-multi-select__chip-remove').addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          const option = Array.from(permissionsMultiSelect.select.options).find(function (entry) {
            return entry.value === item;
          });
          if (option) option.selected = false;
          renderPermissionsMultiSelect();
        });
        permissionsMultiSelect.value.appendChild(chip);
      });
    }

    permissionsMultiSelect.options.innerHTML = '';
    Array.from(permissionsMultiSelect.select.options).forEach(function (option) {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'workspace-multi-select__option' + (option.selected ? ' is-selected' : '');
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(option.selected));
      button.innerHTML = '<span class="workspace-multi-select__option-indicator" aria-hidden="true"></span><span></span>';
      button.querySelector('span:last-child').textContent = option.textContent;
      button.addEventListener('click', function (event) {
        event.preventDefault();
        option.selected = !option.selected;
        renderPermissionsMultiSelect();
      });
      listItem.appendChild(button);
      permissionsMultiSelect.options.appendChild(listItem);
    });
  }

  function setupPermissionsMultiSelect() {
    const root = document.getElementById('workspacePermissionsMultiSelect');
    const select = document.getElementById('workspacePermissionsSelect');
    if (!root || !select) return;

    permissionsMultiSelect = {
      root: root,
      select: select,
      trigger: root.querySelector('.workspace-multi-select__trigger'),
      value: root.querySelector('.workspace-multi-select__value'),
      dropdown: root.querySelector('.workspace-multi-select__dropdown'),
      options: root.querySelector('.workspace-multi-select__options'),
      clear: root.querySelector('.workspace-multi-select__clear')
    };

    if (!permissionsMultiSelect.trigger || !permissionsMultiSelect.value || !permissionsMultiSelect.dropdown || !permissionsMultiSelect.options) {
      permissionsMultiSelect = null;
      return;
    }

    permissionsMultiSelect.trigger.addEventListener('click', function (event) {
      event.preventDefault();
      const willOpen = permissionsMultiSelect.dropdown.hidden;
      if (willOpen) {
        permissionsMultiSelect.dropdown.hidden = false;
        permissionsMultiSelect.root.classList.add('is-open');
        permissionsMultiSelect.trigger.setAttribute('aria-expanded', 'true');
      } else {
        closePermissionsMultiSelect();
      }
    });

    permissionsMultiSelect.clear?.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      Array.from(permissionsMultiSelect.select.options).forEach(function (option) {
        option.selected = false;
      });
      renderPermissionsMultiSelect();
    });

    renderPermissionsMultiSelect();
  }

  function createTestWorkspace(formData) {
    const title = formData.get('title').trim();
    const type = formData.get('type').trim();
    const reference = (formData.get('reference') || '').trim();
    const description = formData.get('description').trim();
    const permissionsSelect = document.getElementById('workspacePermissionsSelect');
    const permissions = getSelectedPermissions(permissionsSelect);
    const keyBase = slugify(title) || 'workspace-teste';
    let key = keyBase;
    let index = 2;

    while (workspaceContent[key]) {
      key = keyBase + '-' + index;
      index += 1;
    }

    workspaceContent[key] = {
      key: key,
      type: type,
      title: title,
      description: description,
      permissions: permissions.join(', '),
      folders: [
        { name: (reference || title) + ' - materiais aprovados', meta: '14 arquivos', kind: 'folder' },
        { name: (reference || title) + ' - operação', meta: '9 arquivos', kind: 'folder' }
      ],
      files: [
        { name: title + ' - guia rápido.pdf', type: 'PDF', owner: 'Bárbara Gianazi', date: 'Atualizado hoje', kind: 'file', preview: 'Arquivo de demonstração criado no fluxo do novo workspace.' },
        { name: title + ' - checklist.xlsx', type: 'XLS', owner: 'Bárbara Gianazi', date: 'Atualizado hoje', kind: 'file', preview: 'Planilha de demonstração criada para apresentar a navegação do workspace.' },
        { name: title + ' - apresentação.png', type: 'PNG', owner: 'Equipe comercial', date: 'Atualizado hoje', kind: 'file', preview: 'Material visual inicial do workspace de demonstração.' }
      ],
      isProtected: type === 'cofre'
    };

    workspaceOrder.push(key);
    renderWorkspaceCards();
    closeCreateWorkspaceModal();
    showWorkspaceToast('Workspace criado com sucesso.');
  }

  function bindWorkspaceCardInteractions() {
    page.querySelectorAll('.workspace-menu__trigger').forEach(function (trigger) {
      if (trigger.dataset.bound === 'true') return;
      trigger.dataset.bound = 'true';
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const menu = trigger.closest('.workspace-menu');
        const list = menu ? menu.querySelector('.workspace-menu__list') : null;
        if (!menu || !list) return;

        const willOpen = list.hidden;
        closeWorkspaceMenus(menu);
        list.hidden = !willOpen;
        trigger.setAttribute('aria-expanded', String(willOpen));
      });
    });

    page.querySelectorAll('.workspace-menu__list button').forEach(function (button) {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const card = button.closest('.workspace-card');
        if (card) {
          const title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Workspace';
          const label = button.textContent.trim();
          const action = label.indexOf('Compartilhar') === 0
            ? 'share'
            : label.indexOf('Renomear') === 0
              ? 'rename'
              : label.indexOf('Baixar') === 0
                ? 'download'
                : label.indexOf('Excluir') === 0
                  ? 'delete'
                  : 'copy';
          handleAction(action, { name: title, key: card.dataset.workspace }, 'workspace');
          return;
        }
        closeWorkspaceMenus();
      });
    });

    page.querySelectorAll('.workspace-card').forEach(function (card) {
      if (card.dataset.bound === 'true') return;
      card.dataset.bound = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.addEventListener('click', function (event) {
        if (event.target.closest('.workspace-menu')) return;
        if (event.target.closest('.workspace-vault-access')) {
          event.preventDefault();
          openVaultModal();
          return;
        }
        event.preventDefault();

        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Workspace';
        const workspaceKey = card.dataset.workspace || '';

        if (card.dataset.protected === 'true') {
          openVaultModal();
          return;
        }

        openFilesPage(workspaceKey, title);
      });
      card.addEventListener('keydown', function (event) {
        if (event.target.closest('.workspace-menu')) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          card.click();
        }
      });
    });
  }

  document.getElementById('backToWorkspaces')?.addEventListener('click', function () {
    filesPage.hidden = true;
    page.hidden = false;
    closePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('workspacePreviewClose')?.addEventListener('click', closePreview);
  document.getElementById('workspacePreviewOverlay')?.addEventListener('click', closePreview);
  document.getElementById('openCreateWorkspace')?.addEventListener('click', openCreateWorkspaceModal);
  document.getElementById('createWorkspaceClose')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('createWorkspaceOverlay')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('createWorkspaceCancel')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('workspaceVaultClose')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceVaultOverlay')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceVaultCancel')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceTypeSelect')?.addEventListener('change', function (event) {
    updateWorkspaceReferenceField(event.target.value);
  });
  document.getElementById('workspaceConfirmClose')?.addEventListener('click', closeWorkspaceConfirm);
  document.getElementById('workspaceConfirmCancel')?.addEventListener('click', closeWorkspaceConfirm);
  document.getElementById('workspaceConfirmAction')?.addEventListener('click', confirmWorkspaceDelete);
  document.querySelectorAll('[data-close-workspace-confirm]').forEach(function (node) {
    node.addEventListener('click', closeWorkspaceConfirm);
  });

  document.querySelector('.workspace-preview__actions .btn-secondary')?.addEventListener('click', function () {
    if (activePreviewFile) handleAction('share', activePreviewFile, 'file');
  });

  document.querySelector('.workspace-preview__actions .btn-primary')?.addEventListener('click', function () {
    if (activePreviewFile) handleAction('download', activePreviewFile, 'file');
  });

  document.addEventListener('click', function (event) {
    if (permissionsMultiSelect && !event.target.closest('#workspacePermissionsMultiSelect')) {
      closePermissionsMultiSelect();
    }
    if (!event.target.closest('.workspace-menu')) closeWorkspaceMenus();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closePermissionsMultiSelect();
      closeWorkspaceMenus();
      closePreview();
      closeCreateWorkspaceModal();
      closeVaultModal();
      closeWorkspaceConfirm();
    }
  });

  document.getElementById('workspaceVaultForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('workspaceVaultPassword');
    const error = document.getElementById('workspaceVaultError');
    const value = input ? input.value.trim() : '';

    if (value !== '1234') {
      if (error) error.hidden = false;
      return;
    }

    if (error) error.hidden = true;
    closeVaultModal();
    openFilesPage('cofre', 'Cofre');
  });

  document.getElementById('createWorkspaceForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    createTestWorkspace(new FormData(event.currentTarget));
  });

  setupPermissionsMultiSelect();
  renderWorkspaceCards();
})();
