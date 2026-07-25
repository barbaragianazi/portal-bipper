(function () {
  'use strict';

  const page = document.getElementById('hubWorkspacesPage');
  const filesPage = document.getElementById('workspaceFilesPage');
  if (!page || !filesPage) return;

  const workspaceGrid = page.querySelector('.workspace-grid');
  const WORKSPACE_PAGE_SIZE = 6;
  let workspacePage = 1;
  let workspaceSearchTerm = '';
  let workspaceFileSearchTerm = '';
  let workspaceFileTypeFilter = '';
  let workspaceFileSortRecent = false;
  let activeWorkspace = null;
  let activeFolder = null;
  let activePath = [];
  let archiveUpdateTimer = null;
  let activePreviewFile = null;
  let workspaceToastTimer = null;
  let pendingWorkspaceAction = null;
  let activeBrandKey = 'zoetis';
  let pendingCoverEditKey = null;
  let pendingFolderCoverTarget = null;
  let newWorkspaceCoverDataUrl = null;
  let newFolderCoverDataUrl = null;
  let coverFileInputEl = null;
  const MAX_COVER_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_UPLOAD_PREVIEW_FILE_SIZE = 5 * 1024 * 1024;
  const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];
  const ELLIPSIS_ICON = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-xs lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical" width="24" height="24" viewBox="0 0 24 24" fill="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>';
  const FILE_TYPE_ICON_PATH = '../../shared/assets/icones/';
  const FILE_TYPE_ICONS = {
    xls: 'excel.svg',
    xlsx: 'excel.svg',
    xlsm: 'excel.svg',
    doc: 'word.svg',
    docx: 'word.svg',
    ppt: 'power-point.svg',
    pptx: 'power-point.svg',
    zip: 'zip.svg',
    rar: 'zip.svg',
    '7z': 'zip.svg',
    pdf: 'pdf.svg'
  };
  let workspaceContent = {
    'campanhas-de-divulgacao': {
      key: 'campanhas-de-divulgacao',
      type: 'campanha',
      title: 'Campanhas de divulgação',
      description: 'Materiais sazonais, banners, textos e peças de mídia para comunicações ativas.',
      permissions: 'Marketing e parceiros externos',
      folders: [
        { name: 'Black Friday 2026', meta: '42 arquivos', kind: 'folder', description: 'Banners, peças e cronogramas da campanha de Black Friday 2026.' },
        { name: 'Campanha Regional Sul', meta: '28 arquivos', kind: 'folder', description: 'Materiais de comunicação segmentados para a região Sul.' },
        { name: 'Banners e redes sociais', meta: '64 arquivos', kind: 'folder', description: 'Artes prontas para banners e publicações em redes sociais.' },
        { name: 'Textos aprovados', meta: '18 arquivos', kind: 'folder', description: 'Textos e roteiros já aprovados para uso em campanhas ativas.' }
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
        { name: 'Produto Atlas', meta: '36 arquivos', kind: 'folder', description: 'Materiais comerciais e técnicos do lançamento do Produto Atlas.' },
        { name: 'Kit comercial', meta: '22 arquivos', kind: 'folder', description: 'Kit completo de apoio à venda para a equipe comercial.' },
        { name: 'Treinamento de vendas', meta: '17 arquivos', kind: 'folder', description: 'Conteúdos de capacitação para o time de vendas sobre o novo lançamento.' }
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
        { name: 'Comunicados comerciais', meta: '21 arquivos', kind: 'folder', description: 'Comunicados de condições comerciais para clientes selecionados.' },
        { name: 'Campanhas cooperadas', meta: '34 arquivos', kind: 'folder', description: 'Materiais de campanhas cooperadas com clientes parceiros.' },
        { name: 'Materiais para clientes', meta: '41 arquivos', kind: 'folder', description: 'Peças e catálogos prontos para envio direto a clientes.' }
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
        { name: 'Documentos internos', meta: '19 arquivos', kind: 'folder', description: 'Documentos de uso interno restrito ao Grupo VU.' },
        { name: 'Guias operacionais', meta: '27 arquivos', kind: 'folder', description: 'Guias e manuais de processos operacionais do grupo.' },
        { name: 'Comunicados do grupo', meta: '12 arquivos', kind: 'folder', description: 'Comunicados oficiais direcionados aos membros do Grupo VU.' }
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
        { name: 'Catálogos públicos', meta: '26 arquivos', kind: 'folder', description: 'Catálogos comerciais liberados para distribuição pública.' },
        { name: 'Institucional', meta: '14 arquivos', kind: 'folder', description: 'Materiais institucionais e de apresentação da marca.' },
        { name: 'Links externos', meta: '21 arquivos', kind: 'folder', description: 'Links e referências externas de acesso público.' }
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
        { name: 'Contratos', meta: '18 arquivos', kind: 'folder', description: 'Contratos jurídicos e comerciais confidenciais.' },
        { name: 'Financeiro', meta: '11 arquivos', kind: 'folder', description: 'Documentos financeiros de acesso restrito.' }
      ],
      files: [
        { name: 'Contrato matriz.pdf', type: 'PDF', owner: 'Jurídico', date: 'Atualizado hoje', kind: 'file' },
        { name: 'Forecast confidencial.xlsx', type: 'XLS', owner: 'Financeiro', date: 'Atualizado ontem', kind: 'file' }
      ],
      isProtected: true
    }
  };
  // Cofre oculto para atender solicitação da Zoetis (mantido em workspaceContent para reativar depois)
  // Workspaces ocultos: 'cofre' (todas as marcas) + qualquer workspace com isHidden:true nos dados carregados
  // (ex.: Agro Amazônia e Materiais públicos ocultos a pedido da Zoetis, mantidos no JSON para reativar depois)
  function isWorkspaceVisible(key) {
    const workspace = workspaceContent[key];
    return key !== 'cofre' && !(workspace && workspace.isHidden);
  }

  let workspaceOrder = Object.keys(workspaceContent).filter(isWorkspaceVisible);
  const WORKSPACE_STORAGE_KEY = 'lp_active_brand';
  const WORKSPACE_DATA_BY_BRAND = {
    zoetis: '../data/workspaces-zoetis.json',
    'agro-amazonia': '../data/workspaces-zoetis.json'
  };
  const DEFAULT_WORKSPACE_DATA_URL = '../data/workspaces-default.json';
  const WORKSPACE_COVER_PATH_BY_BRAND = {
    zoetis: '../data/workspace-covers/zoetis/',
    'agro-amazonia': '../data/workspace-covers/zoetis/'
  };
  const DEFAULT_WORKSPACE_COVER_PATH = '../data/workspace-covers/default/';
  const WORKSPACES_HERO_COVER_FILENAME = 'workspaces-hero.jpg';
  let activeCoverPath = DEFAULT_WORKSPACE_COVER_PATH;
  const FOLDER_COVER_PATH_BY_BRAND = {
    zoetis: '../data/folder-covers/zoetis/',
    'agro-amazonia': '../data/folder-covers/zoetis/'
  };
  const DEFAULT_FOLDER_COVER_PATH = '../data/folder-covers/default/';
  let activeFolderCoverPath = DEFAULT_FOLDER_COVER_PATH;
  const DOCUMENT_THUMBNAIL_PATH_BY_BRAND = {
    zoetis: '../data/document-thumbnails/zoetis/',
    'agro-amazonia': '../data/document-thumbnails/zoetis/'
  };
  const DEFAULT_DOCUMENT_THUMBNAIL_PATH = '../data/document-thumbnails/default/';
  let activeDocumentThumbnailPath = DEFAULT_DOCUMENT_THUMBNAIL_PATH;
  const PDF_THUMBNAIL_SCALE = 0.4;

  page.dataset.ready = 'true';
  filesPage.dataset.ready = 'true';

  function getFileExtension(file) {
    const name = (file && file.name) || '';
    const match = /\.([a-z0-9]+)$/i.exec(name);
    if (match) return match[1].toLowerCase();
    return ((file && file.type) || '').toLowerCase();
  }

  function getFileIconUrl(file) {
    const icon = FILE_TYPE_ICONS[getFileExtension(file)];
    return icon ? FILE_TYPE_ICON_PATH + icon : null;
  }

  function getFileTypeGroup(file) {
    const ext = getFileExtension(file);
    if (isImageEntry(file)) return 'image';
    if (ext === 'pdf') return 'pdf';
    if (ext === 'xls' || ext === 'xlsx' || ext === 'xlsm') return 'excel';
    if (ext === 'doc' || ext === 'docx') return 'word';
    if (ext === 'ppt' || ext === 'pptx') return 'ppt';
    if (ext === 'zip' || ext === 'rar' || ext === '7z') return 'zip';
    return 'other';
  }

  function parseRelativeRecency(dateText) {
    const text = (dateText || '').toLowerCase();
    if (!text) return Infinity;
    if (text.indexOf('agora') !== -1 || text.indexOf('hoje') !== -1) return 0;
    if (text.indexOf('ontem') !== -1) return 1;

    const daysAgoMatch = text.match(/h[áa]\s+(\d+)\s+dia/);
    if (daysAgoMatch) return parseInt(daysAgoMatch[1], 10);

    const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})/);
    if (dateMatch) {
      const day = parseInt(dateMatch[1], 10);
      const month = parseInt(dateMatch[2], 10) - 1;
      const now = new Date();
      const candidate = new Date(now.getFullYear(), month, day);
      if (candidate > now) candidate.setFullYear(candidate.getFullYear() - 1);
      return Math.round((now - candidate) / 86400000);
    }

    return Infinity;
  }

  function getImageSrc(file) {
    if (file.dataUrl) return file.dataUrl;
    return getDocumentThumbnailUrl(file);
  }

  function getDocumentThumbnailUrl(file) {
    if (!file || !file.thumbnail) return null;
    return activeDocumentThumbnailPath + file.thumbnail;
  }

  const GENERIC_DOCUMENT_THUMBNAIL_BY_EXTENSION = {
    pdf: 'generico-pdf.jpg',
    xls: 'generico-excel.jpg',
    xlsx: 'generico-excel.jpg',
    xlsm: 'generico-excel.jpg'
  };

  function getGenericDocumentThumbnailUrl(file) {
    const genericName = GENERIC_DOCUMENT_THUMBNAIL_BY_EXTENSION[getFileExtension(file)];
    return genericName ? activeDocumentThumbnailPath + genericName : null;
  }

  function buildFileTypeBadgeHtml(file) {
    if (isImageEntry(file)) {
      const imageSrc = getImageSrc(file);
      if (imageSrc) {
        return '<div class="workspace-file-type workspace-file-type--image" style="background-image: url(\'' + imageSrc + '\');" title="' + (file.name || 'Imagem') + '"></div>';
      }
    }
    const iconUrl = getFileIconUrl(file);
    return iconUrl
      ? '<div class="workspace-file-type workspace-file-type--icon"><img src="' + iconUrl + '" alt="" aria-hidden="true"></div>'
      : '<div class="workspace-file-type"></div>';
  }

  function fillFileTypeBadge(container, file) {
    const badge = container.querySelector('.workspace-file-type');
    if (badge && !badge.classList.contains('workspace-file-type--icon') && !badge.classList.contains('workspace-file-type--image')) {
      badge.textContent = file.type;
    }
  }

  function dataUrlToUint8Array(dataUrl) {
    const base64 = (dataUrl.split(',')[1] || '');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  function renderPdfPageThumbnail(dataUrl) {
    if (!window.pdfjsLib) return Promise.resolve(null);
    return window.pdfjsLib.getDocument({ data: dataUrlToUint8Array(dataUrl) }).promise
      .then(function (pdf) { return pdf.getPage(1); })
      .then(function (page) {
        const viewport = page.getViewport({ scale: PDF_THUMBNAIL_SCALE });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        return page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise
          .then(function () { return canvas.toDataURL('image/png'); });
      })
      .catch(function () { return null; });
  }

  const EXCEL_THUMBNAIL_MAX_ROWS = 8;
  const EXCEL_THUMBNAIL_MAX_COLS = 6;
  const EXCEL_THUMBNAIL_CELL_WIDTH = 60;
  const EXCEL_THUMBNAIL_CELL_HEIGHT = 22;

  function renderExcelThumbnail(dataUrl) {
    if (!window.XLSX) return Promise.resolve(null);
    try {
      const base64 = dataUrl.split(',')[1] || '';
      const workbook = window.XLSX.read(base64, { type: 'base64' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false })
        .slice(0, EXCEL_THUMBNAIL_MAX_ROWS)
        .map(function (row) { return row.slice(0, EXCEL_THUMBNAIL_MAX_COLS); });

      if (!rows.length) return Promise.resolve(null);

      const colCount = rows.reduce(function (max, row) { return Math.max(max, row.length); }, 1);
      const width = colCount * EXCEL_THUMBNAIL_CELL_WIDTH;
      const height = rows.length * EXCEL_THUMBNAIL_CELL_HEIGHT;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '11px Arial';
      ctx.textBaseline = 'middle';

      rows.forEach(function (row, rowIndex) {
        const y = rowIndex * EXCEL_THUMBNAIL_CELL_HEIGHT;
        ctx.fillStyle = rowIndex === 0 ? '#eaf6ee' : '#ffffff';
        ctx.fillRect(0, y, width, EXCEL_THUMBNAIL_CELL_HEIGHT);
        ctx.fillStyle = rowIndex === 0 ? '#1f2937' : '#374151';

        for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
          const x = colIndex * EXCEL_THUMBNAIL_CELL_WIDTH;
          ctx.strokeStyle = '#dde3ea';
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, EXCEL_THUMBNAIL_CELL_WIDTH, EXCEL_THUMBNAIL_CELL_HEIGHT);

          const cell = row[colIndex];
          const text = cell === undefined || cell === null ? '' : String(cell);
          const truncated = text.length > 9 ? text.slice(0, 8) + '…' : text;
          if (truncated) ctx.fillText(truncated, x + 4, y + EXCEL_THUMBNAIL_CELL_HEIGHT / 2);
        }
      });

      return Promise.resolve(canvas.toDataURL('image/png'));
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  function upgradeBadgeToImage(badge, url, altText, onError) {
    if (!url) {
      if (onError) onError();
      return;
    }
    const probe = new Image();
    probe.onload = function () {
      badge.classList.remove('workspace-file-type--icon');
      badge.classList.add('workspace-file-type--image');
      badge.innerHTML = '';
      badge.style.backgroundImage = "url('" + url + "')";
      badge.title = altText || '';
    };
    probe.onerror = function () {
      if (onError) onError();
    };
    probe.src = url;
  }

  function enhanceFileThumbnail(container, file) {
    if (isImageEntry(file)) return;
    const badge = container.querySelector('.workspace-file-type');
    if (!badge) return;

    const thumbnailUrl = getDocumentThumbnailUrl(file);
    if (thumbnailUrl) {
      upgradeBadgeToImage(badge, thumbnailUrl, file.name || 'Documento', function () {
        applyGenericDocumentThumbnail(badge, file);
      });
      return;
    }

    const ext = getFileExtension(file);

    if (ext === 'pdf' && file.dataUrl) {
      renderPdfPageThumbnail(file.dataUrl).then(function (pdfThumbnailDataUrl) {
        if (pdfThumbnailDataUrl) upgradeBadgeToImage(badge, pdfThumbnailDataUrl, file.name || 'Documento');
        else applyGenericDocumentThumbnail(badge, file);
      });
      return;
    }

    if (isSpreadsheetExtension(ext) && file.dataUrl) {
      renderExcelThumbnail(file.dataUrl).then(function (excelThumbnailDataUrl) {
        if (excelThumbnailDataUrl) upgradeBadgeToImage(badge, excelThumbnailDataUrl, file.name || 'Documento');
        else applyGenericDocumentThumbnail(badge, file);
      });
      return;
    }

    applyGenericDocumentThumbnail(badge, file);
  }

  function applyGenericDocumentThumbnail(badge, file) {
    const genericUrl = getGenericDocumentThumbnailUrl(file);
    if (genericUrl) upgradeBadgeToImage(badge, genericUrl, file.name || 'Documento');
  }

  function slugify(value) {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function normalizeWorkspaceDataset(dataset) {
    const source = dataset && dataset.workspaces ? dataset.workspaces : dataset;
    const entries = Array.isArray(source)
      ? source.map(function (workspace) { return [workspace.key || slugify(workspace.title), workspace]; })
      : Object.entries(source || {});

    return entries.reduce(function (accumulator, entry) {
      const key = entry[0];
      const workspace = entry[1];
      if (!key || !workspace) return accumulator;
      accumulator[key] = {
        ...workspace,
        key: workspace.key || key,
        folders: workspace.folders || [],
        files: workspace.files || []
      };
      return accumulator;
    }, {});
  }

  async function fetchWorkspaceDataset(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Workspace data request failed: ' + response.status);
    return normalizeWorkspaceDataset(await response.json());
  }

  function getActiveBrandKey() {
    return localStorage.getItem(WORKSPACE_STORAGE_KEY) || 'zoetis';
  }

  function animateContentSwap(nodes) {
    nodes.filter(Boolean).forEach(function (node) {
      node.classList.add('bp-transition');
      node.classList.remove('is-entering');
      node.classList.add('is-transitioning');
      window.requestAnimationFrame(function () {
        node.classList.remove('is-transitioning');
        node.classList.add('is-entering');
      });
      window.setTimeout(function () {
        node.classList.remove('is-entering');
        node.classList.remove('bp-transition');
      }, 280);
    });
  }

  function renderWorkspaceCardsSkeleton() {
    if (!workspaceGrid) return;

    workspaceGrid.innerHTML = '';
    for (let index = 0; index < 6; index += 1) {
      const card = document.createElement('article');
      card.className = 'area-card workspace-card--skeleton skeleton-shimmer';
      workspaceGrid.appendChild(card);
    }
  }

  function applyWorkspacesHeroCover() {
    const hero = document.getElementById('workspacesHero');
    const cover = document.getElementById('workspacesHeroCover');
    if (!hero || !cover) return;

    const url = activeCoverPath + WORKSPACES_HERO_COVER_FILENAME;
    const probe = new Image();
    probe.onload = function () {
      cover.style.backgroundImage = "url('" + url + "')";
      hero.classList.add('has-cover');
    };
    probe.onerror = function () {
      cover.style.backgroundImage = '';
      hero.classList.remove('has-cover');
    };
    probe.src = url;
  }

  async function loadWorkspaceData(brandKey) {
    const dataUrl = WORKSPACE_DATA_BY_BRAND[brandKey] || DEFAULT_WORKSPACE_DATA_URL;
    activeCoverPath = WORKSPACE_COVER_PATH_BY_BRAND[brandKey] || DEFAULT_WORKSPACE_COVER_PATH;
    activeFolderCoverPath = FOLDER_COVER_PATH_BY_BRAND[brandKey] || DEFAULT_FOLDER_COVER_PATH;
    activeDocumentThumbnailPath = DOCUMENT_THUMBNAIL_PATH_BY_BRAND[brandKey] || DEFAULT_DOCUMENT_THUMBNAIL_PATH;
    activeBrandKey = brandKey || 'default';
    applyWorkspacesHeroCover();
    renderWorkspaceCardsSkeleton();

    try {
      workspaceContent = await fetchWorkspaceDataset(dataUrl);
      workspaceOrder = Object.keys(workspaceContent).filter(isWorkspaceVisible);
    } catch (error) {
      console.error('Nao foi possivel carregar os dados de workspaces.', error);
      workspaceOrder = Object.keys(workspaceContent).filter(isWorkspaceVisible);
    }

    workspacePage = 1;
    renderWorkspaceCards();
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
    return '<div class="workspace-menu"><button class="icon-btn workspace-menu__trigger" type="button" aria-label="Abrir menu do workspace" aria-expanded="false">' + ELLIPSIS_ICON + '</button><div class="workspace-menu__list" hidden><button type="button" data-menu-action="edit-cover">Editar capa</button><button type="button">Renomear</button><button type="button">Baixar tudo</button><button class="is-danger" type="button">Excluir</button></div></div>';
  }

  function getWorkspaceCoverStorageKey(workspaceKey) {
    return 'lp_workspace_cover:' + activeBrandKey + ':' + workspaceKey;
  }

  function getWorkspaceCoverUrl(workspace) {
    const override = localStorage.getItem(getWorkspaceCoverStorageKey(workspace.key));
    if (override) return override;
    if (workspace.coverImage) return activeCoverPath + workspace.coverImage;
    return null;
  }

  function processCoverFile(file) {
    if (!file || file.type.indexOf('image/') !== 0) {
      showWorkspaceToast('Selecione um arquivo de imagem válido.');
      return Promise.resolve(null);
    }
    if (file.size > MAX_COVER_FILE_SIZE) {
      showWorkspaceToast('A imagem excede o limite de 5MB.');
      return Promise.resolve(null);
    }
    return new Promise(function (resolve) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        showWorkspaceToast('Não foi possível ler a imagem selecionada.');
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  }

  function ensureCoverFileInput() {
    if (coverFileInputEl) return coverFileInputEl;
    coverFileInputEl = document.createElement('input');
    coverFileInputEl.type = 'file';
    coverFileInputEl.accept = 'image/*';
    coverFileInputEl.hidden = true;
    coverFileInputEl.addEventListener('change', handleCoverFileChange);
    document.body.appendChild(coverFileInputEl);
    return coverFileInputEl;
  }

  function handleCoverFileChange(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    const workspaceKey = pendingCoverEditKey;
    const folderTarget = pendingFolderCoverTarget;
    pendingCoverEditKey = null;
    pendingFolderCoverTarget = null;
    if (!file || (!workspaceKey && !folderTarget)) return;

    processCoverFile(file).then(function (dataUrl) {
      if (!dataUrl) return;
      if (folderTarget) {
        localStorage.setItem(getFolderCoverStorageKey(folderTarget.workspaceKey, folderTarget.pathKey), dataUrl);
        refreshCurrentArchiveView();
        showWorkspaceToast('Capa da pasta atualizada com sucesso.');
        return;
      }
      localStorage.setItem(getWorkspaceCoverStorageKey(workspaceKey), dataUrl);
      renderWorkspaceCards();
      showWorkspaceToast('Capa atualizada com sucesso.');
    });
  }

  function openCoverPicker(workspaceKey) {
    pendingCoverEditKey = workspaceKey;
    ensureCoverFileInput().click();
  }

  function getFolderCoverStorageKey(workspaceKey, pathKey) {
    return 'lp_folder_cover:' + activeBrandKey + ':' + workspaceKey + ':' + pathKey;
  }

  function getFolderCoverUrl(folder, pathKey) {
    const override = activeWorkspace ? localStorage.getItem(getFolderCoverStorageKey(activeWorkspace.key, pathKey)) : null;
    if (override) return override;
    if (folder.coverImage) return activeFolderCoverPath + folder.coverImage;
    return null;
  }

  function openFolderCoverPicker(folder) {
    if (!activeWorkspace) return;
    pendingFolderCoverTarget = { workspaceKey: activeWorkspace.key, pathKey: getPathKey(activePath.concat(folder)) };
    ensureCoverFileInput().click();
  }

  function countWorkspaceContents(workspace) {
    let folderCount = 0;
    let fileCount = (workspace.files || []).length;

    function walk(folders) {
      (folders || []).forEach(function (folder) {
        folderCount += 1;
        fileCount += (folder.files || []).length;
        if (folder.folders && folder.folders.length) walk(folder.folders);
      });
    }

    walk(workspace.folders);
    return { folderCount: folderCount, fileCount: fileCount };
  }

  function getSearchableWorkspaceOrder() {
    const term = workspaceSearchTerm.trim().toLowerCase();
    if (!term) return workspaceOrder;
    return workspaceOrder.filter(function (key) {
      const workspace = workspaceContent[key];
      const haystack = (workspace.title + ' ' + (workspace.description || '')).toLowerCase();
      return haystack.indexOf(term) !== -1;
    });
  }

  function renderWorkspaceCards() {
    if (!workspaceGrid) return;

    workspaceGrid.innerHTML = '';

    if (!workspaceOrder.length) {
      const empty = document.createElement('div');
      empty.className = 'workspace-grid__empty';
      empty.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path></svg><h3>Nenhuma pasta por aqui ainda</h3><p>Crie uma nova pasta para começar a organizar campanhas e documentos.</p><button class="btn btn-primary" type="button" id="workspaceEmptyStateCreate">Nova pasta</button>';
      workspaceGrid.appendChild(empty);
      document.getElementById('workspaceEmptyStateCreate')?.addEventListener('click', openCreateWorkspaceModal);
      renderWorkspacePagination(0);
      return;
    }

    const visibleOrder = getSearchableWorkspaceOrder();

    if (!visibleOrder.length) {
      const empty = document.createElement('div');
      empty.className = 'workspace-grid__empty';
      empty.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><h3>Nenhum workspace encontrado</h3><p>Tente buscar por outro termo.</p>';
      workspaceGrid.appendChild(empty);
      renderWorkspacePagination(0);
      return;
    }

    const totalPages = Math.max(1, Math.ceil(visibleOrder.length / WORKSPACE_PAGE_SIZE));
    workspacePage = Math.min(Math.max(1, workspacePage), totalPages);
    const pageStart = (workspacePage - 1) * WORKSPACE_PAGE_SIZE;
    const pageItems = visibleOrder.slice(pageStart, pageStart + WORKSPACE_PAGE_SIZE);

    pageItems.forEach(function (key) {
      const workspace = workspaceContent[key];
      const meta = getWorkspaceCardMeta(workspace);
      const counts = countWorkspaceContents(workspace);
      const folderLabel = counts.folderCount + ' pastas';
      const fileLabel = counts.fileCount + ' arquivos';
      const article = document.createElement('article');
      article.className = 'area-card workspace-card' + (workspace.isProtected ? ' workspace-card--vault' : '');
      article.dataset.workspace = key;
      if (workspace.isProtected) article.dataset.protected = 'true';
      article.style.setProperty('--accent', meta.accent);
      article.style.setProperty('--soft', meta.soft);

      if (workspace.isProtected) {
        article.innerHTML = '<div class="area-card__top"><div class="area-card__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + meta.icon + '</svg></div></div><h3>' + workspace.title + '</h3><button class="btn btn-primary workspace-vault-access" type="button">Acessar com senha</button>';
      } else {
        article.innerHTML = '<div class="workspace-card__cover"></div><div class="workspace-card__info"><div class="module-name"><h3>' + workspace.title + '</h3></div><p>' + workspace.description + '</p></div><ul class="module-list"><li class="module-item"><span>' + folderLabel + '</span><small>' + fileLabel + '</small></li></ul>' + buildWorkspaceMenuHtml();
        
        // Trecho removido que diz respeito às permissões de acesso ao workspace. Não será usado na V1. 
        // <li class="module-item"><span>Permissões</span><small>' + workspace.permissions + '</small></li>

        const coverUrl = getWorkspaceCoverUrl(workspace);
        if (coverUrl) {
          const coverEl = article.querySelector('.workspace-card__cover');
          coverEl.style.backgroundImage = "url('" + coverUrl + "'), linear-gradient(135deg, var(--soft), var(--accent) 220%)";
        }
      }

      workspaceGrid.appendChild(article);
    });

    bindWorkspaceCardInteractions();
    animateContentSwap([workspaceGrid]);
    renderWorkspacePagination(totalPages);
  }

  function renderWorkspacePagination(totalPages) {
    const nav = document.getElementById('workspacePagination');
    if (!nav) return;

    nav.innerHTML = '';
    if (totalPages <= 1) {
      nav.hidden = true;
      return;
    }
    nav.hidden = false;

    function createPageButton(label, page, options) {
      options = options || {};
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'workspace-pagination__btn' + (options.isActive ? ' is-active' : '');
      button.textContent = label;
      button.disabled = Boolean(options.disabled);
      if (options.ariaLabel) button.setAttribute('aria-label', options.ariaLabel);
      button.addEventListener('click', function () {
        workspacePage = page;
        renderWorkspaceCards();
      });
      return button;
    }

    nav.appendChild(createPageButton('‹', workspacePage - 1, { disabled: workspacePage <= 1, ariaLabel: 'Página anterior' }));
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      nav.appendChild(createPageButton(String(pageNumber), pageNumber, { isActive: pageNumber === workspacePage }));
    }
    nav.appendChild(createPageButton('›', workspacePage + 1, { disabled: workspacePage >= totalPages, ariaLabel: 'Próxima página' }));
  }

  function getWorkspaceUploadsStorageKey(workspaceKey) {
    return 'lp_workspace_uploads:' + activeBrandKey + ':' + workspaceKey;
  }

  function getPathKey(path) {
    return (path || []).map(function (folder) { return slugify(folder.name); }).join('/');
  }

  function readWorkspaceUploads(workspaceKey) {
    try {
      const raw = localStorage.getItem(getWorkspaceUploadsStorageKey(workspaceKey));
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function writeWorkspaceUploads(workspaceKey, data) {
    try {
      localStorage.setItem(getWorkspaceUploadsStorageKey(workspaceKey), JSON.stringify(data));
      return true;
    } catch (error) {
      showWorkspaceToast('Não foi possível salvar: armazenamento local cheio.');
      return false;
    }
  }

  function getUploadedItemsForPath(workspaceKey, path) {
    const stored = readWorkspaceUploads(workspaceKey);
    const bucket = stored[getPathKey(path)];
    return bucket ? { folders: bucket.folders || [], files: bucket.files || [] } : { folders: [], files: [] };
  }

  function addUploadedItems(workspaceKey, path, newFolders, newFiles) {
    const stored = readWorkspaceUploads(workspaceKey);
    const key = getPathKey(path);
    const bucket = stored[key] || { folders: [], files: [] };
    bucket.folders = (bucket.folders || []).concat(newFolders || []);
    bucket.files = (bucket.files || []).concat(newFiles || []);
    stored[key] = bucket;
    return writeWorkspaceUploads(workspaceKey, stored);
  }

  function getWorkspaceDeletedStorageKey(workspaceKey) {
    return 'lp_workspace_deleted:' + activeBrandKey + ':' + workspaceKey;
  }

  function readWorkspaceDeleted(workspaceKey) {
    try {
      const raw = localStorage.getItem(getWorkspaceDeletedStorageKey(workspaceKey));
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function getDeletedNamesForPath(workspaceKey, pathKey) {
    const stored = readWorkspaceDeleted(workspaceKey);
    return stored[pathKey] || [];
  }

  function markItemDeleted(workspaceKey, pathKey, name) {
    const stored = readWorkspaceDeleted(workspaceKey);
    const bucket = stored[pathKey] || [];
    if (bucket.indexOf(name) === -1) bucket.push(name);
    stored[pathKey] = bucket;
    try {
      localStorage.setItem(getWorkspaceDeletedStorageKey(workspaceKey), JSON.stringify(stored));
    } catch (error) {
      showWorkspaceToast('Não foi possível salvar: armazenamento local cheio.');
    }
  }

  function excludeDeleted(deletedNames, items) {
    if (!deletedNames.length) return items;
    return items.filter(function (item) {
      return deletedNames.indexOf(item.name) === -1;
    });
  }

  function refreshCurrentArchiveView() {
    if (!activeWorkspace) return;
    updateArchive(activePath.length ? getFolderFiles(activeWorkspace, activePath) : getRootArchiveItems(activeWorkspace));
  }

  function isImageFile(file) {
    return IMAGE_EXTENSIONS.indexOf(getFileExtension(file)) !== -1;
  }

  function isImageEntry(file) {
    return !!(file && (file.isImage || isImageFile(file)));
  }

  function formatFileSize(bytes) {
    if (!bytes && bytes !== 0) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function fileNeedsDataUrl(file) {
    if (isImageFile(file)) return true;
    const ext = getFileExtension(file);
    return ext === 'pdf' || ext === 'xls' || ext === 'xlsx' || ext === 'xlsm';
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve) {
      const reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { resolve(null); };
      reader.readAsDataURL(file);
    });
  }

  function buildUploadedFileEntry(file, dataUrl) {
    const ext = getFileExtension(file);
    const isImage = isImageFile(file);
    return {
      name: file.name,
      type: ext ? ext.toUpperCase() : '',
      owner: 'Você',
      date: 'Atualizado agora',
      kind: 'file',
      isImage: isImage,
      dataUrl: dataUrl || null,
      size: file.size,
      preview: 'Arquivo enviado manualmente para este workspace.'
    };
  }

  async function handleFilesUpload(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length || !activeWorkspace) return;

    const entries = await Promise.all(files.map(async function (file) {
      let dataUrl = null;
      if (fileNeedsDataUrl(file)) {
        if (file.size > MAX_UPLOAD_PREVIEW_FILE_SIZE) {
          showWorkspaceToast('O arquivo "' + file.name + '" excede 5MB e não terá miniatura/pré-visualização.');
        } else {
          dataUrl = await readFileAsDataUrl(file);
        }
      }
      return buildUploadedFileEntry(file, dataUrl);
    }));

    if (addUploadedItems(activeWorkspace.key, activePath, [], entries)) {
      showWorkspaceToast(entries.length === 1 ? 'Arquivo adicionado com sucesso.' : entries.length + ' arquivos adicionados com sucesso.');
      refreshCurrentArchiveView();
    }
  }

  function getFolderFiles(workspace, path) {
    const folder = path[path.length - 1];
    const depth = path.length;
    const parentName = folder ? folder.name : workspace.title;
    const pathKey = getPathKey(path);
    const deletedNames = getDeletedNamesForPath(workspace.key, pathKey);
    const uploaded = getUploadedItemsForPath(workspace.key, path);
    if (folder && (Array.isArray(folder.folders) || Array.isArray(folder.files) || Array.isArray(folder.children))) {
      return excludeDeleted(deletedNames, (folder.children || []).concat(folder.folders || [], folder.files || [], uploaded.folders, uploaded.files));
    }
    const nestedFolders = depth < 3
      ? [
        {
          name: depth === 1 ? 'Peças aprovadas' : 'Versões finais',
          meta: depth === 1 ? '12 arquivos' : '6 arquivos',
          kind: 'folder',
          description: depth === 1 ? 'Peças finalizadas e aprovadas para uso.' : 'Últimas versões validadas dos arquivos.'
        },
        {
          name: depth === 1 ? 'Em revisão' : 'Arquivos de apoio',
          meta: depth === 1 ? '8 arquivos' : '4 arquivos',
          kind: 'folder',
          description: depth === 1 ? 'Materiais aguardando validação da equipe responsável.' : 'Documentos complementares de apoio ao conteúdo principal.'
        }
      ]
      : [];

    return excludeDeleted(deletedNames, [
      ...nestedFolders,
      ...uploaded.folders,
      {
        name: parentName + ' - resumo executivo.pdf',
        type: 'PDF',
        owner: workspace.title,
        date: 'Atualizado hoje',
        preview: 'Resumo com objetivos, público, canais de distribuição e próximos passos para esta pasta.',
        kind: 'file'
      },
      {
        name: parentName + ' - assets principais.pdf',
        type: 'PDF',
        owner: workspace.title,
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
      },
      ...uploaded.files
    ]);
  }

  function syncWorkspaceMenuOverlay() {
    const overlay = document.getElementById('workspaceMenuOverlay');
    if (!overlay) return;
    const hasOpenMenu = !!document.querySelector('.workspace-menu__list:not([hidden])');
    overlay.classList.toggle('is-visible', hasOpenMenu);
  }

  function clearMenuStackingContexts(menu) {
    if (!menu) return;
    [menu.closest('.bp-transition'), menu.closest('.content')].filter(Boolean).forEach(function (node) {
      node.classList.remove('bp-transition', 'is-transitioning', 'is-entering');
    });
  }

  function closeWorkspaceMenus(exceptMenu) {
    document.querySelectorAll('.workspace-menu').forEach(function (menu) {
      if (menu === exceptMenu) return;

      const trigger = menu.querySelector('.workspace-menu__trigger');
      const list = menu.querySelector('.workspace-menu__list');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (list) list.hidden = true;
      menu.classList.remove('is-open');
      menu.closest('.workspace-card, .workspace-folder-card, .workspace-file-item')?.classList.remove('has-open-menu');
    });
    syncWorkspaceMenuOverlay();
  }

  function handleAction(action, item, kind) {
    if (action === 'delete') {
      openWorkspaceConfirm(item, kind);
      return;
    }
    const name = item && item.name ? item.name : 'item';
    const messages = {
      share: 'Compartilhamento externo preparado para ' + name,
      rename: 'Renomear ' + name,
      download: kind === 'folder' ? 'Baixando conteúdo do workspace ' + name + ' (.zip)' : 'Baixando arquivo ' + name,
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
    if (!document.getElementById('createWorkspaceModal')?.hidden || !document.getElementById('workspaceVaultModal')?.hidden || !document.getElementById('workspacePreview')?.hidden || !document.getElementById('imagePreviewModal')?.hidden) return;
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
    } else if (activeWorkspace) {
      markItemDeleted(activeWorkspace.key, getPathKey(activePath), item.name);

      if (activePreviewFile === item) {
        closePreview();
        closeImagePreview();
      }

      refreshCurrentArchiveView();
      if (!activePath.length) {
        renderFiles(getVisibleWorkspaceFiles(activeWorkspace), 'Arquivos recentes');
      }
      showWorkspaceToast((kind === 'folder' ? 'Pasta ' : 'Arquivo ') + item.name + ' excluído com sucesso.');
    }

    closeWorkspaceConfirm();
  }

  function createActionMenu(item, kind) {
    const menu = document.createElement('div');
    const isFolder = kind === 'folder';
    const downloadLabel = isFolder ? 'Baixar tudo' : 'Baixar arquivo';
    const itemName = item && item.name ? item.name : 'item';
    const editCoverButtonHtml = isFolder ? '<button type="button" data-action="edit-cover">Editar capa</button>' : '';

    menu.className = 'workspace-menu workspace-item-menu';
    menu.innerHTML = '<button class="icon-btn workspace-menu__trigger" type="button" aria-label="Abrir menu de ' + itemName + '" aria-expanded="false">' + ELLIPSIS_ICON + '</button><div class="workspace-menu__list" hidden>' + editCoverButtonHtml + '<button type="button" data-action="rename">Renomear</button><button type="button" data-action="download">' + downloadLabel + '</button><button class="is-danger" type="button" data-action="delete">Excluir</button></div>';

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
      if (willOpen) clearMenuStackingContexts(menu);
      syncWorkspaceMenuOverlay();
    });

    list.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (button.dataset.action === 'edit-cover') {
          closeWorkspaceMenus();
          openFolderCoverPicker(item);
          return;
        }
        handleAction(button.dataset.action, item, kind);
      });
    });

    return menu;
  }

  function createFolderCard(folder) {
    const card = document.createElement('article');
    card.className = 'workspace-folder-card workspace-folder-card--folder';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir pasta ' + folder.name);

    const cardMeta = getWorkspaceCardMeta(activeWorkspace || {});
    card.style.setProperty('--accent', cardMeta.accent);
    card.style.setProperty('--soft', cardMeta.soft);

    card.innerHTML = '<div class="workspace-folder-card__cover" aria-hidden="true"></div>' +
      '<div class="workspace-folder-card__body"><h3></h3><p></p><small></small></div>';
    card.querySelector('h3').textContent = folder.name;
    card.querySelector('p').textContent = folder.description || 'Pasta deste workspace.';
    card.querySelector('small').textContent = folder.meta;

    const pathKey = getPathKey(activePath.concat(folder));
    const coverUrl = getFolderCoverUrl(folder, pathKey);
    const coverEl = card.querySelector('.workspace-folder-card__cover');
    coverEl.style.backgroundImage = coverUrl
      ? "url('" + coverUrl + "'), linear-gradient(135deg, var(--soft), var(--accent) 220%)"
      : 'linear-gradient(135deg, var(--soft), var(--accent) 220%)';
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
    card.innerHTML = buildFileTypeBadgeHtml(file) + '<div><strong></strong><small></small></div>';
    fillFileTypeBadge(card, file);
    enhanceFileThumbnail(card, file);
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
    item.innerHTML = buildFileTypeBadgeHtml(file) + '<div class="module-item__content"><span></span><small></small></div><button class="icon-btn workspace-file-open" type="button" aria-label="Abrir arquivo"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M8 7h9v9"></path></svg></button>';
    fillFileTypeBadge(item, file);
    enhanceFileThumbnail(item, file);
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
      animateContentSwap([fileList]);
    }
  }

  function getActiveFileTypeFilterLabel() {
    const activeChip = document.querySelector('#workspaceFileTypeFilterPanel .filter-chip.is-active');
    return activeChip && activeChip.dataset.fileTypeFilter ? activeChip.textContent.trim() : 'formato';
  }

  function createArchiveFilesEmptyState() {
    const empty = document.createElement('div');
    const hasTypeFilter = Boolean(workspaceFileTypeFilter);
    const title = hasTypeFilter ? 'Nenhum arquivo deste tipo por aqui ainda' : 'Nenhum arquivo encontrado';
    const description = hasTypeFilter
      ? 'Não há arquivos do tipo ' + getActiveFileTypeFilterLabel() + ' nesta pasta.'
      : 'Tente buscar por outro nome ou ajustar os filtros.';

    empty.className = 'workspace-grid__empty workspace-grid__empty--archive-files';
    empty.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v12"></path><path d="M14 3v5h5"></path><path d="M16 21H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6l5 5v9a2 2 0 0 1-2 2Z"></path></svg><h3></h3><p></p>';
    empty.querySelector('h3').textContent = title;
    empty.querySelector('p').textContent = description;
    return empty;
  }

  function renderBreadcrumb() {
    const breadcrumb = filesPage.querySelector('#workspaceFoldersTitle');
    if (!breadcrumb) return;

    breadcrumb.innerHTML = '';

    const workspacesButton = document.createElement('button');
    workspacesButton.type = 'button';
    workspacesButton.textContent = 'Workspaces';
    workspacesButton.addEventListener('click', function () {
      showWorkspacesPage();
    });
    breadcrumb.appendChild(workspacesButton);

    const rootSeparator = document.createElement('span');
    rootSeparator.textContent = '>';
    breadcrumb.appendChild(rootSeparator);

    const rootButton = document.createElement('button');
    rootButton.type = 'button';
    rootButton.textContent = activeWorkspace ? activeWorkspace.title : 'Arquivos';
    rootButton.setAttribute('aria-current', activePath.length ? 'false' : 'page');
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
    const fileList = filesPage.querySelector('#workspaceLooseFileList');
    if (fileList) fileList.innerHTML = '';
    if (!folderList) return;

    folderList.innerHTML = '';
    for (let index = 0; index < 9; index += 1) {
      const skeleton = document.createElement('div');
      skeleton.className = 'workspace-folder-card workspace-folder-card--skeleton';
      skeleton.innerHTML = '<div class="skeleton-shimmer"></div><span class="skeleton-shimmer"></span>';
      folderList.appendChild(skeleton);
    }
  }

  function renderArchive(items) {
    const itemCount = filesPage.querySelector('#workspaceItemCount');
    const folderList = filesPage.querySelector('#workspaceFolderList');
    const fileList = filesPage.querySelector('#workspaceLooseFileList');
    const folderSectionCount = filesPage.querySelector('#workspaceFolderSectionCount');
    const fileSectionCount = filesPage.querySelector('#workspaceFileSectionCount');
    const filesAccordion = filesPage.querySelector('#workspaceFilesAccordion');

    const hasAnyLooseFiles = items.some(function (item) { return item.kind === 'file'; });
    if (filesAccordion) filesAccordion.hidden = !hasAnyLooseFiles;

    const term = workspaceFileSearchTerm.trim().toLowerCase();
    const searchedItems = term
      ? items.filter(function (item) { return (item.name || '').toLowerCase().indexOf(term) !== -1; })
      : items;

    const folders = searchedItems.filter(function (item) { return item.kind !== 'file'; });
    const allLooseFiles = searchedItems.filter(function (item) { return item.kind === 'file'; });

    let looseFiles = allLooseFiles;
    if (workspaceFileTypeFilter) {
      looseFiles = looseFiles.filter(function (file) { return getFileTypeGroup(file) === workspaceFileTypeFilter; });
    }
    if (workspaceFileSortRecent) {
      looseFiles = looseFiles.slice().sort(function (a, b) {
        return parseRelativeRecency(a.date) - parseRelativeRecency(b.date);
      });
    }

    const isFiltering = Boolean(term || workspaceFileTypeFilter);
    const visibleCount = folders.length + looseFiles.length;

    if (itemCount) itemCount.textContent = visibleCount + ' itens' + (isFiltering ? ' encontrados' : '');
    renderBreadcrumb();

    if (folderSectionCount) folderSectionCount.textContent = folders.length;
    if (fileSectionCount) fileSectionCount.textContent = looseFiles.length;

    if (folderList) {
      folderList.innerHTML = '';
      if (isFiltering && !visibleCount) {
        const empty = document.createElement('div');
        empty.className = 'workspace-grid__empty';
        empty.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><h3>Nada encontrado</h3><p>Tente buscar por outro nome ou ajustar os filtros.</p>';
        folderList.appendChild(empty);
      } else if (!isFiltering && !folders.length) {
        const empty = document.createElement('div');
        empty.className = 'workspace-grid__empty';
        empty.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"></path></svg><h3>Nenhuma pasta por aqui ainda</h3><p>Crie uma nova pasta para começar a organizar campanhas e documentos.</p><button class="btn btn-primary" type="button" id="workspaceArchiveEmptyStateCreate">Nova pasta</button>';
        folderList.appendChild(empty);
        document.getElementById('workspaceArchiveEmptyStateCreate')?.addEventListener('click', openCreateFolderInWorkspaceModal);
      } else {
        folders.forEach(function (folder) {
          folderList.appendChild(createFolderCard(folder));
        });
      }
    }

    if (fileList) {
      fileList.innerHTML = '';
      if (isFiltering && !looseFiles.length) {
        fileList.appendChild(createArchiveFilesEmptyState());
      } else {
        looseFiles.forEach(function (file) {
          fileList.appendChild(createLooseFileCard(file));
        });
      }
    }

    animateContentSwap([folderList, fileList]);
  }

  function getVisibleWorkspaceFiles(workspace) {
    const deletedNames = getDeletedNamesForPath(workspace.key, getPathKey([]));
    return excludeDeleted(deletedNames, workspace.files || []);
  }

  function getRootArchiveItems(workspace) {
    const pathKey = getPathKey([]);
    const deletedNames = getDeletedNamesForPath(workspace.key, pathKey);
    const uploaded = getUploadedItemsForPath(workspace.key, []);
    const folders = excludeDeleted(deletedNames, (workspace.children || []).concat(workspace.folders || [], uploaded.folders));
    const visibleFiles = excludeDeleted(deletedNames, workspace.files || []);
    const uploadedFiles = excludeDeleted(deletedNames, uploaded.files);
    return folders.concat(visibleFiles.slice(0, 3).map(function (file) {
      return {
        ...file,
        kind: 'file'
      };
    }), uploadedFiles);
  }

  function updateArchive(items) {
    clearTimeout(archiveUpdateTimer);
    showArchiveSkeleton();
    archiveUpdateTimer = window.setTimeout(function () {
      renderArchive(items);
    }, 220);
  }

  function resetWorkspaceFileFilters() {
    workspaceFileSearchTerm = '';
    workspaceFileTypeFilter = '';
    workspaceFileSortRecent = false;

    const input = document.getElementById('workspaceFileSearchInput');
    if (input) input.value = '';

    document.querySelectorAll('#workspaceFileTypeFilterPanel .filter-chip').forEach(function (chip) {
      chip.classList.toggle('is-active', chip.dataset.fileTypeFilter === '');
    });

    // const sortToggle = document.getElementById('workspaceFileSortToggle');
    // if (sortToggle) {
    //   sortToggle.classList.remove('is-active');
    //   sortToggle.setAttribute('aria-pressed', 'false');
    // }
  }

  function renderWorkspaceRoot() {
    if (!activeWorkspace) return;

    activeFolder = null;
    activePath = [];
    resetWorkspaceFileFilters();
    updateArchive(getRootArchiveItems(activeWorkspace));
  }

  function showWorkspacesPage() {
    filesPage.hidden = true;
    page.hidden = false;
    closePreview();
    closeImagePreview();
    animateContentSwap([page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderWorkspace(workspace) {
    const hero = filesPage.querySelector('#workspaceFilesHero');
    const cover = filesPage.querySelector('#workspaceFilesCover');
    const title = filesPage.querySelector('#workspaceFilesTitle');
    const type = filesPage.querySelector('#workspaceFilesType');
    const description = filesPage.querySelector('#workspaceFilesDescription');

    activeWorkspace = workspace;
    activeFolder = null;
    activePath = [];
    if (title) title.textContent = workspace.title;
    if (type) type.textContent = workspace.type;
    if (description) description.textContent = workspace.description;

    const coverUrl = getWorkspaceCoverUrl(workspace);
    if (hero) hero.classList.toggle('has-cover', !!coverUrl);
    if (cover) cover.style.backgroundImage = coverUrl ? "url('" + coverUrl + "')" : '';

    resetWorkspaceFileFilters();
    renderArchive(getRootArchiveItems(workspace));
    renderFiles(getVisibleWorkspaceFiles(workspace), 'Arquivos recentes');
    animateContentSwap([filesPage]);
  }

  function openPath(path) {
    if (!activeWorkspace) return;

    activePath = path;
    activeFolder = activePath[activePath.length - 1] || null;
    resetWorkspaceFileFilters();
    updateArchive(getFolderFiles(activeWorkspace, activePath));
  }

  function openFolder(folder) {
    openPath(activePath.concat(folder));
  }

  function createPreviewBody(file) {
    const details = [
      ['Tipo', file.type || getFileExtension(file).toUpperCase() || 'Arquivo'],
      // ['Status', 'Em andamento'],
      // ['Responsável', file.owner || 'Você'],
      ['Última atualização', file.date || 'Atualizado agora'],
      ['Enviado por', file.owner || 'Você'],
      ['Data de upload', file.date || 'Atualizado agora'],
      ['Tamanho do arquivo', formatFileSize(file.size)],
      // ['Observações', file.preview || 'Dados principais do arquivo selecionado.']
    ];

    return '<aside class="workspace-preview-details" aria-label="Detalhes do arquivo">' +
      '<h3>Detalhes do arquivo</h3>' +
      details.map(function (detail) {
        return '<div class="workspace-preview-details__item"><strong>' + detail[0] + '</strong><span>' + detail[1] + '</span></div>';
      }).join('') +
      '</aside>';
  }

  function isSpreadsheetExtension(ext) {
    return ext === 'xls' || ext === 'xlsx' || ext === 'xlsm';
  }

  function buildDocumentPreviewHtml(file) {
    const ext = getFileExtension(file);

    if (ext === 'pdf' && file.dataUrl) {
      return '<div class="workspace-preview-embed"><iframe src="' + file.dataUrl + '" title="Pré-visualização do PDF"></iframe></div>';
    }

    if (isSpreadsheetExtension(ext) && file.dataUrl) {
      return '<div class="workspace-preview-embed workspace-preview-embed--table" id="workspaceExcelPreview"><p class="workspace-preview-embed__loading">Carregando planilha...</p></div>';
    }

    if (getDocumentThumbnailUrl(file) || getGenericDocumentThumbnailUrl(file)) {
      return '<div class="workspace-preview-embed workspace-preview-embed--image" id="workspaceDocumentThumbnailPreview" hidden role="img" aria-label="Pré-visualização de ' + (file.name || 'documento') + '"></div>';
    }

    return '';
  }

  function revealDocumentThumbnailPreview(url, onError) {
    const previewEl = document.getElementById('workspaceDocumentThumbnailPreview');
    if (!previewEl) return;
    if (!url) {
      if (onError) onError();
      return;
    }
    const probe = new Image();
    probe.onload = function () {
      previewEl.style.backgroundImage = "url('" + url + "')";
      previewEl.hidden = false;
    };
    probe.onerror = function () {
      if (onError) onError();
    };
    probe.src = url;
  }

  function renderExcelPreviewInto(container, dataUrl) {
    if (!container) return;
    if (!window.XLSX) {
      container.innerHTML = '<p class="workspace-preview-embed__loading">Pré-visualização de planilha indisponível.</p>';
      return;
    }
    try {
      const base64 = dataUrl.split(',')[1] || '';
      const workbook = window.XLSX.read(base64, { type: 'base64' });
      const firstSheetName = workbook.SheetNames[0];
      container.innerHTML = window.XLSX.utils.sheet_to_html(workbook.Sheets[firstSheetName], { header: '', footer: '' });
    } catch (error) {
      container.innerHTML = '<p class="workspace-preview-embed__loading">Não foi possível gerar a pré-visualização da planilha.</p>';
    }
  }

  function openImagePreview(file) {
    const modal = document.getElementById('imagePreviewModal');
    const title = document.getElementById('imagePreviewTitle');
    const type = document.getElementById('imagePreviewType');
    const meta = document.getElementById('imagePreviewMeta');
    const img = document.getElementById('imagePreviewImg');
    const fallback = document.getElementById('imagePreviewFallback');
    const sheet = document.getElementById('imagePreviewSheet');
    const menuRoot = document.getElementById('imagePreviewMenu');
    if (!modal || !title || !type || !meta || !img) return;

    activePreviewFile = file;
    title.textContent = file.name;
    type.textContent = file.type;
    meta.textContent = file.owner + ' - ' + file.date;
    if (sheet) sheet.innerHTML = createPreviewBody(file);

    const imageSrc = getImageSrc(file);
    img.onerror = function () {
      img.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    if (imageSrc) {
      img.hidden = false;
      if (fallback) fallback.hidden = true;
      img.src = imageSrc;
    } else {
      img.hidden = true;
      if (fallback) fallback.hidden = false;
    }
    img.alt = file.name;
    if (menuRoot) {
      menuRoot.innerHTML = '';
      menuRoot.appendChild(createActionMenu(file, 'file'));
    }
    modal.hidden = false;
    document.body.classList.add('workspace-preview-open');
  }

  function fitDocumentPreviewIframeHeight() {
    const dialog = document.getElementById('workspacePreviewDialog');
    const body = document.getElementById('workspacePreviewBody');
    const iframe = body ? body.querySelector('iframe') : null;
    if (!dialog || !body || !iframe) return;

    const header = dialog.querySelector('.workspace-preview__header');
    const footer = dialog.querySelector('.workspace-preview__actions');
    const dialogMaxHeight = parseFloat(window.getComputedStyle(dialog).maxHeight) || 0;
    if (!dialogMaxHeight) return;

    const headerHeight = header ? header.offsetHeight : 0;
    const footerHeight = footer ? footer.offsetHeight : 0;
    const bodyStyles = window.getComputedStyle(body);
    const bodyPaddingY = parseFloat(bodyStyles.paddingTop) + parseFloat(bodyStyles.paddingBottom);

    const availableHeight = dialogMaxHeight - headerHeight - footerHeight - bodyPaddingY;
    if (availableHeight > 240) {
      iframe.style.height = Math.min(availableHeight, 760) + 'px';
    }
  }

  function openPreview(file) {
    if (file && isImageEntry(file)) {
      openImagePreview(file);
      return;
    }

    const modal = document.getElementById('workspacePreview');
    const dialog = document.getElementById('workspacePreviewDialog');
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
    const documentPreviewHtml = buildDocumentPreviewHtml(file);
    body.innerHTML = documentPreviewHtml + createPreviewBody(file);
    body.classList.toggle('workspace-preview__body--split', Boolean(documentPreviewHtml));
    if (dialog) dialog.classList.toggle('workspace-preview__dialog--wide', Boolean(documentPreviewHtml));

    const ext = getFileExtension(file);
    if (isSpreadsheetExtension(ext) && file.dataUrl) {
      renderExcelPreviewInto(document.getElementById('workspaceExcelPreview'), file.dataUrl);
    } else {
      const specificThumbnailUrl = getDocumentThumbnailUrl(file);
      const genericThumbnailUrl = getGenericDocumentThumbnailUrl(file);
      if (specificThumbnailUrl || genericThumbnailUrl) {
        revealDocumentThumbnailPreview(specificThumbnailUrl, function () {
          revealDocumentThumbnailPreview(genericThumbnailUrl);
        });
      }
    }

    if (menuRoot) {
      menuRoot.innerHTML = '';
      menuRoot.appendChild(createActionMenu(file, 'file'));
    }
    modal.hidden = false;
    document.body.classList.add('workspace-preview-open');
    fitDocumentPreviewIframeHeight();
  }

  function closeImagePreview() {
    const modal = document.getElementById('imagePreviewModal');
    if (!modal) return;

    activePreviewFile = null;
    modal.hidden = true;
    document.body.classList.remove('workspace-preview-open');
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
      key: workspaceKey,
      type: 'workspace',
      title: fallbackName || 'Workspace',
      description: 'Pastas e arquivos relacionados a este workspace.',
      folders: [],
      files: []
    };

    renderWorkspace(workspace);
    page.hidden = true;
    filesPage.hidden = false;
    animateContentSwap([filesPage]);
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

  function resetNewWorkspaceCover() {
    newWorkspaceCoverDataUrl = null;
    const input = document.getElementById('workspaceCoverInput');
    const preview = document.getElementById('workspaceCoverPreview');
    const previewImg = document.getElementById('workspaceCoverPreviewImg');
    if (input) input.value = '';
    if (preview) preview.hidden = true;
    if (previewImg) previewImg.src = '';
  }

  function openCreateWorkspaceModal() {
    const form = document.getElementById('createWorkspaceForm');
    form?.reset();
    resetNewWorkspaceCover();
    openModal('createWorkspaceModal');
  }

  function closeCreateWorkspaceModal() {
    closeModal('createWorkspaceModal');
  }

  function closeVaultModal() {
    closeModal('workspaceVaultModal');
  }

  function createTestWorkspace(formData) {
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const keyBase = slugify(title) || 'workspace-teste';
    let key = keyBase;
    let index = 2;

    while (workspaceContent[key]) {
      key = keyBase + '-' + index;
      index += 1;
    }

    workspaceContent[key] = {
      key: key,
      title: title,
      description: description,
      folders: [
        { name: title + ' - materiais aprovados', meta: '14 arquivos', kind: 'folder' },
        { name: title + ' - operação', meta: '9 arquivos', kind: 'folder' }
      ],
      files: [
        { name: title + ' - guia rápido.pdf', type: 'PDF', owner: 'Bárbara Gianazi', date: 'Atualizado hoje', kind: 'file', preview: 'Arquivo de demonstração criado no fluxo do novo workspace.' },
        { name: title + ' - checklist.xlsx', type: 'XLS', owner: 'Bárbara Gianazi', date: 'Atualizado hoje', kind: 'file', preview: 'Planilha de demonstração criada para apresentar a navegação do workspace.' },
        { name: title + ' - apresentação.png', type: 'PNG', owner: 'Equipe comercial', date: 'Atualizado hoje', kind: 'file', preview: 'Material visual inicial do workspace de demonstração.' }
      ],
      isProtected: false
    };

    if (newWorkspaceCoverDataUrl) {
      localStorage.setItem(getWorkspaceCoverStorageKey(key), newWorkspaceCoverDataUrl);
    }

    workspaceOrder.push(key);
    workspacePage = Math.ceil(workspaceOrder.length / WORKSPACE_PAGE_SIZE);
    renderWorkspaceCards();
    closeCreateWorkspaceModal();
    showWorkspaceToast('Workspace criado com sucesso.');
  }

  function resetNewFolderCover() {
    newFolderCoverDataUrl = null;
    const input = document.getElementById('workspaceFolderCoverInput');
    const preview = document.getElementById('workspaceFolderCoverPreview');
    const previewImg = document.getElementById('workspaceFolderCoverPreviewImg');
    if (input) input.value = '';
    if (preview) preview.hidden = true;
    if (previewImg) previewImg.src = '';
  }

  function openCreateFolderInWorkspaceModal() {
    if (!activeWorkspace) return;
    const form = document.getElementById('createFolderInWorkspaceForm');
    form?.reset();
    resetNewFolderCover();
    openModal('createFolderInWorkspaceModal');
  }

  function closeCreateFolderInWorkspaceModal() {
    closeModal('createFolderInWorkspaceModal');
  }

  function createWorkspaceFolder(formData) {
    if (!activeWorkspace) return;
    const title = formData.get('title').trim();
    if (!title) return;
    const description = formData.get('description').trim();

    const folder = { name: title, description: description, meta: '0 arquivos', kind: 'folder', folders: [], files: [] };

    if (!addUploadedItems(activeWorkspace.key, activePath, [folder], [])) return;

    if (newFolderCoverDataUrl) {
      const pathKey = getPathKey(activePath.concat(folder));
      localStorage.setItem(getFolderCoverStorageKey(activeWorkspace.key, pathKey), newFolderCoverDataUrl);
    }

    refreshCurrentArchiveView();
    closeCreateFolderInWorkspaceModal();
    showWorkspaceToast('Pasta criada com sucesso.');
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
        menu.classList.toggle('is-open', willOpen);
        menu.closest('.workspace-card')?.classList.toggle('has-open-menu', willOpen);
        if (willOpen) clearMenuStackingContexts(menu);
        syncWorkspaceMenuOverlay();
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
          if (button.dataset.menuAction === 'edit-cover') {
            closeWorkspaceMenus();
            openCoverPicker(card.dataset.workspace);
            return;
          }
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

  document.getElementById('workspaceSearchInput')?.addEventListener('input', function (event) {
    workspaceSearchTerm = event.target.value;
    workspacePage = 1;
    renderWorkspaceCards();
  });

  document.getElementById('workspaceFileSearchInput')?.addEventListener('input', function (event) {
    workspaceFileSearchTerm = event.target.value;
    refreshCurrentArchiveView();
  });

  document.querySelectorAll('#workspaceFileTypeFilterPanel .filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('#workspaceFileTypeFilterPanel .filter-chip').forEach(function (c) {
        c.classList.remove('is-active');
      });
      chip.classList.add('is-active');
      workspaceFileTypeFilter = chip.dataset.fileTypeFilter || '';
      refreshCurrentArchiveView();
    });
  });

  // document.getElementById('workspaceFileSortToggle')?.addEventListener('click', function () {
  //   workspaceFileSortRecent = !workspaceFileSortRecent;
  //   this.classList.toggle('is-active', workspaceFileSortRecent);
  //   this.setAttribute('aria-pressed', String(workspaceFileSortRecent));
  //   refreshCurrentArchiveView();
  // });

  (function initWorkspaceViewToggle() {
    const toggle = document.querySelector('.workspace-view-toggle');
    if (!toggle || !workspaceGrid) return;
    const buttons = toggle.querySelectorAll('.workspace-view-toggle__btn');

    function applyView(view) {
      workspaceGrid.classList.toggle('view-list', view === 'list');
      buttons.forEach(function (btn) {
        const isActive = btn.dataset.view === view;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        localStorage.setItem('lp_workspace_view', btn.dataset.view);
        applyView(btn.dataset.view);
      });
    });

    applyView(localStorage.getItem('lp_workspace_view') || 'grid');
  })();

  (function initWorkspaceBrowserViewToggle() {
    const panel = document.querySelector('.workspace-browser__panel');
    const buttons = document.querySelectorAll('[data-browser-view]');
    if (!panel || !buttons.length) return;

    function applyView(view) {
      panel.classList.toggle('view-details', view === 'details');
      buttons.forEach(function (btn) {
        const isActive = btn.dataset.browserView === view;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        localStorage.setItem('lp_workspace_browser_view', btn.dataset.browserView);
        applyView(btn.dataset.browserView);
      });
    });

    applyView(localStorage.getItem('lp_workspace_browser_view') || 'medium');
  })();

  document.querySelectorAll('.workspace-accordion__toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const accordion = toggle.closest('.workspace-accordion');
      if (!accordion) return;
      const willOpen = !accordion.classList.contains('is-open');
      accordion.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.getElementById('workspacePreviewClose')?.addEventListener('click', closePreview);
  document.getElementById('workspacePreviewOverlay')?.addEventListener('click', closePreview);
  document.getElementById('imagePreviewClose')?.addEventListener('click', closeImagePreview);
  document.getElementById('imagePreviewOverlay')?.addEventListener('click', closeImagePreview);
  document.getElementById('openCreateWorkspace')?.addEventListener('click', openCreateWorkspaceModal);
  document.getElementById('createWorkspaceClose')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('createWorkspaceOverlay')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('createWorkspaceCancel')?.addEventListener('click', closeCreateWorkspaceModal);
  document.getElementById('openCreateFolderInWorkspace')?.addEventListener('click', openCreateFolderInWorkspaceModal);
  document.getElementById('createFolderInWorkspaceClose')?.addEventListener('click', closeCreateFolderInWorkspaceModal);
  document.getElementById('createFolderInWorkspaceOverlay')?.addEventListener('click', closeCreateFolderInWorkspaceModal);
  document.getElementById('createFolderInWorkspaceCancel')?.addEventListener('click', closeCreateFolderInWorkspaceModal);
  document.getElementById('workspaceVaultClose')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceVaultOverlay')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceVaultCancel')?.addEventListener('click', closeVaultModal);
  document.getElementById('workspaceConfirmClose')?.addEventListener('click', closeWorkspaceConfirm);
  document.getElementById('workspaceConfirmCancel')?.addEventListener('click', closeWorkspaceConfirm);
  document.getElementById('workspaceConfirmAction')?.addEventListener('click', confirmWorkspaceDelete);
  document.querySelectorAll('[data-close-workspace-confirm]').forEach(function (node) {
    node.addEventListener('click', closeWorkspaceConfirm);
  });

  document.querySelector('.workspace-preview__actions .btn-primary')?.addEventListener('click', function () {
    if (activePreviewFile) handleAction('download', activePreviewFile, 'file');
  });

  window.addEventListener('resize', function () {
    const modal = document.getElementById('workspacePreview');
    if (modal && !modal.hidden) fitDocumentPreviewIframeHeight();
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.workspace-menu')) closeWorkspaceMenus();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeWorkspaceMenus();
      closePreview();
      closeImagePreview();
      closeCreateWorkspaceModal();
      closeCreateFolderInWorkspaceModal();
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

  document.getElementById('createFolderInWorkspaceForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    createWorkspaceFolder(new FormData(event.currentTarget));
  });

  document.getElementById('workspaceFolderCoverInput')?.addEventListener('change', function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    processCoverFile(file).then(function (dataUrl) {
      if (!dataUrl) {
        event.target.value = '';
        return;
      }
      newFolderCoverDataUrl = dataUrl;
      const preview = document.getElementById('workspaceFolderCoverPreview');
      const previewImg = document.getElementById('workspaceFolderCoverPreviewImg');
      if (previewImg) previewImg.src = dataUrl;
      if (preview) preview.hidden = false;
    });
  });

  document.getElementById('workspaceFolderCoverPreviewRemove')?.addEventListener('click', function (event) {
    event.preventDefault();
    resetNewFolderCover();
  });

  document.getElementById('workspaceCoverInput')?.addEventListener('change', function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    processCoverFile(file).then(function (dataUrl) {
      if (!dataUrl) {
        event.target.value = '';
        return;
      }
      newWorkspaceCoverDataUrl = dataUrl;
      const preview = document.getElementById('workspaceCoverPreview');
      const previewImg = document.getElementById('workspaceCoverPreviewImg');
      if (previewImg) previewImg.src = dataUrl;
      if (preview) preview.hidden = false;
    });
  });

  document.getElementById('uploadFilesBtn')?.addEventListener('click', function () {
    document.getElementById('workspaceFilesUploadInput')?.click();
  });
  document.getElementById('workspaceFilesUploadInput')?.addEventListener('change', function (event) {
    handleFilesUpload(event.target.files);
    event.target.value = '';
  });

  document.getElementById('workspaceCoverPreviewRemove')?.addEventListener('click', function (event) {
    event.preventDefault();
    resetNewWorkspaceCover();
  });

  document.addEventListener('app-shell:brand-change', function (event) {
    const brandKey = event.detail && event.detail.key ? event.detail.key : getActiveBrandKey();
    const wasViewingFiles = !filesPage.hidden && !!activeWorkspace;
    const previousWorkspaceKey = wasViewingFiles ? activeWorkspace.key : null;
    const brandName = event.detail && event.detail.brand && event.detail.brand.name;

    loadWorkspaceData(brandKey).then(function () {
      if (!wasViewingFiles) return;

      closePreview();
      closeImagePreview();

      const workspace = workspaceContent[previousWorkspaceKey];
      if (workspace) {
        renderWorkspace(workspace);
      } else {
        showWorkspacesPage();
        showWorkspaceToast('Este workspace não está disponível para ' + (brandName || 'esta marca') + '.');
      }
    });
  });

  loadWorkspaceData(getActiveBrandKey());
})();
