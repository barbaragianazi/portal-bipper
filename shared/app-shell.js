// Comportamento da estrutura mestre. Controla abrir/fechar sidebar, menu mobile, overlay, tecla Esc, clique no logo, popup de marcas, leitura do brands.json, troca de tema e atualização dos logos.

(function () {
  const DEFAULT_BRANDS_URL = 'shared/data/brands.json';
  const DEFAULT_MENU_URL = 'config/menu.json';
  const STORAGE_KEY = 'lp_active_brand';

  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path>',
    briefcase: '<rect x="5" y="6" width="14" height="14" rx="2"></rect><path d="M9 6V4h6v2"></path>',
    handshake: '<path d="M4 12a3 3 0 0 1 3-3h2l2-2h3a3 3 0 0 1 3 3"></path><path d="M4 12a3 3 0 0 0 3 3h2l2 2h3a3 3 0 0 0 3-3"></path><path d="M17 9h3v6h-3"></path>',
    megaphone: '<path d="M4 13v-2l12-5v12L4 13Z"></path><path d="M8 14l2 5"></path><path d="M18 10h2"></path>',
    compass: '<circle cx="12" cy="12" r="8"></circle><path d="M15 9l-4 6"></path><path d="M9 15l6-4"></path>',
    wallet: '<rect x="4" y="7" width="16" height="12" rx="2"></rect><path d="M8 7V5h8v2"></path><path d="M16 13h4"></path><path d="M17.5 11.5v3"></path>',
    chart: '<path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-6"></path>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M4 10h16"></path>',
    check: '<rect x="5" y="4" width="14" height="16" rx="2"></rect><path d="M9 12l2 2 4-5"></path>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
    settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.36.4.67.6 1H20a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-.51 1Z"></path>',
    store: '<path d="M4 10h16l-1-5H5l-1 5Z"></path><path d="M5 10v9h14v-9"></path><path d="M9 19v-5h6v5"></path>',
    admin: '<rect x="4" y="8" width="16" height="11" rx="2"></rect><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M9 13h6"></path>',
    audit: '<rect x="5" y="4" width="14" height="16" rx="2"></rect><path d="M9 4v3h6V4"></path><path d="M9 13l2 2 4-5"></path>',
    flag: '<path d="M5 21V5"></path><path d="M5 5c4-2 6 2 10 0 1.5-.75 2.8-.8 4-.35v10c-1.2-.45-2.5-.4-4 .35-4 2-6-2-10 0"></path>',
    gauge: '<path d="M4 14a8 8 0 1 1 16 0"></path><path d="M12 14l3-5"></path><path d="M4 18h16"></path><path d="M7 14h.01"></path><path d="M17 14h.01"></path>',
    mapPin: '<path d="M12 21s6-5.3 6-11a6 6 0 0 0-12 0c0 5.7 6 11 6 11Z"></path><circle cx="12" cy="10" r="2"></circle>',
    actionPlan: '<path d="M4 18h16"></path><path d="M7 18V9"></path><path d="M12 18V5"></path><path d="M17 18v-6"></path><path d="M5 9h4"></path><path d="M10 5h4"></path><path d="M15 12h4"></path>',
    rocket: '<path d="M13 4c3.5.4 5.6 2.5 6 6l-5 5-5-5 4-6Z"></path><path d="M9 10l-4 1-2 4 5-1"></path><path d="M14 15l-1 5 4-2 1-4"></path><circle cx="14.5" cy="8.5" r="1.5"></circle>',
    calculator: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8"></path><path d="M8 11h.01"></path><path d="M12 11h.01"></path><path d="M16 11h.01"></path><path d="M8 15h.01"></path><path d="M12 15h.01"></path><path d="M16 15h.01"></path>',
    requests: '<path d="M4 7h6l-2-2"></path><path d="M10 7 8 9"></path><path d="M20 17h-6l2 2"></path><path d="M14 17l2-2"></path><path d="M7 17c3 0 4-10 10-10"></path>',
    training: '<path d="M3 8l9-4 9 4-9 4-9-4Z"></path><path d="M7 10v5c2.5 2 7.5 2 10 0v-5"></path><path d="M21 8v6"></path>',
    external: '<path d="M14 4h6v6"></path><path d="M10 14 20 4"></path><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"></path>'
  };

  function hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return null;
    const normalized = hex.replace('#', '').trim();
    if (![3, 6, 8].includes(normalized.length)) return null;
    const expanded = normalized.length === 3
      ? normalized.split('').map((char) => char + char).join('')
      : normalized.slice(0, 6);
    const value = Number.parseInt(expanded, 16);
    if (Number.isNaN(value)) return null;
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    };
  }

  function getShellConfig() {
    return window.BipperShellConfig || {};
  }

  function resolveAssetUrl(url) {
    const config = getShellConfig();
    if (!url || /^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('/')) return url;
    if (!config.assetPathPrefix) return url;
    return `${config.assetPathPrefix.replace(/\/?$/, '/')}${url.replace(/^\/+/, '')}`;
  }

  function applyBrand(brand) {
    const root = document.documentElement;
    const primaryRgb = hexToRgb(brand.primary);

    root.style.setProperty('--brand-primary', brand.primary);
    root.style.setProperty('--brand-secondary', brand.secondary || brand.primary);
    root.style.setProperty('--brand-soft', brand.surfaceAlt || brand.surface || '#fff1e8');
    root.style.setProperty('--zoetis-orange', brand.primary);
    root.style.setProperty('--zoetis-orange-600', brand.secondary || brand.primary);
    root.style.setProperty('--zoetis-teal', brand.secondary || brand.primary);

    if (primaryRgb) {
      root.style.setProperty('--brand-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    }

    document.querySelectorAll('[data-logo]').forEach((logo) => {
      const variant = logo.dataset.logo === 'dark' ? 'logoDark' : 'logoLight';
      logo.src = resolveAssetUrl(brand[variant] || brand.logoLight);
      logo.alt = brand.name;
    });

    document.querySelectorAll('[data-footer-logo]').forEach((logo) => {
      const variant = logo.dataset.footerLogo === 'dark' ? 'footerLogoDark' : 'footerLogoLight';
      const fallback = logo.dataset.footerLogo === 'dark' ? brand.logoDark : brand.logoLight;
      logo.src = resolveAssetUrl(brand[variant] || fallback || brand.logoLight);
      logo.alt = brand.footerLogoName || brand.name;
    });
  }

  function createIcon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = ICONS[name] || ICONS.external;
    return svg;
  }

  function resolveMenuHref(item, links) {
    if (item.href) return item.href;
    if (item.linkKey && links && links[item.linkKey]) return links[item.linkKey];
    return '#';
  }

  function createMenuItem(item, config) {
    const link = document.createElement('a');
    const activeKey = config.active || config.app;
    const isActive = item.active || (item.key && item.key === activeKey);

    link.className = 'nav-link';
    link.href = resolveMenuHref(item, config.links);
    if (isActive) link.classList.add('active');
    if (item.target) link.target = item.target;
    if (item.rel) link.rel = item.rel;
    if (item.external) {
      link.target = item.target || '_blank';
      link.rel = item.rel || 'noopener noreferrer';
    }

    link.appendChild(createIcon(item.icon));

    const label = document.createElement('span');
    label.textContent = item.label;
    link.appendChild(label);

    if (item.badge !== undefined && item.badge !== null && item.badge !== '') {
      const badge = document.createElement('span');
      badge.className = 'nav-badge';
      badge.textContent = item.badge;
      link.appendChild(badge);
    }

    return link;
  }

  function renderMenu(menuRoot, menuConfig) {
    const shellConfig = getShellConfig();
    const mergedConfig = {
      ...menuConfig,
      ...shellConfig,
      links: {
        ...(menuConfig.links || {}),
        ...(shellConfig.links || {})
      }
    };

    menuRoot.innerHTML = '';

    (menuConfig.sections || []).forEach((section) => {
      const nav = document.createElement('nav');
      nav.className = 'nav-section';
      nav.setAttribute('aria-label', section.ariaLabel || section.title || 'Menu');

      if (section.title) {
        const title = document.createElement('h2');
        title.textContent = section.title;
        nav.appendChild(title);
      }

      (section.items || []).forEach((item) => {
        nav.appendChild(createMenuItem(item, mergedConfig));
      });

      menuRoot.appendChild(nav);
    });
  }

  async function initMenu() {
    const menuRoot = document.querySelector('[data-shell-menu]');
    if (!menuRoot) return;

    const config = getShellConfig();
    const menuUrl = config.menuUrl || menuRoot.dataset.menuUrl || DEFAULT_MENU_URL;
    if (!menuUrl) return;

    const response = await fetch(menuUrl);
    const menuConfig = await response.json();
    renderMenu(menuRoot, menuConfig);
  }

  function createGroupLabel(label) {
    const group = document.createElement('div');
    group.className = 'brand-dropdown__group';
    group.textContent = label;
    return group;
  }

  function createDivider() {
    const divider = document.createElement('div');
    divider.className = 'brand-dropdown__divider';
    return divider;
  }

  function setActiveBrand(dropdown, activeKey) {
    dropdown.querySelectorAll('.brand-dropdown__item').forEach((item) => {
      item.classList.toggle('active', item.dataset.brand === activeKey);
    });
  }

  function closeBrandDropdown(brandContainer) {
    const dropdown = brandContainer.querySelector('.brand-dropdown');
    const logoBtn = brandContainer.querySelector('.brand__logo-btn');
    dropdown?.classList.remove('visible');
    brandContainer.classList.remove('open');
    logoBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggleBrandDropdown(brandContainer) {
    const dropdown = brandContainer.querySelector('.brand-dropdown');
    const logoBtn = brandContainer.querySelector('.brand__logo-btn');
    const willOpen = !dropdown?.classList.contains('visible');
    dropdown?.classList.toggle('visible', willOpen);
    brandContainer.classList.toggle('open', willOpen);
    logoBtn?.setAttribute('aria-expanded', String(willOpen));
  }

  function buildBrandDropdown(brandContainer, brands, activeKey) {
    const dropdown = brandContainer.querySelector('.brand-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = '';
    const entries = Object.entries(brands);
    const primaryEntry = entries.find(([key]) => key === 'zoetis');
    const resellerEntries = entries.filter(([, brand]) => brand.group === 'Revendas');
    const remainingBrandEntries = entries.filter(([key, brand]) => (
      key !== 'zoetis' && (brand.group || 'Marcas') === 'Marcas'
    ));

    const sections = [
      primaryEntry ? { label: null, entries: [primaryEntry] } : null,
      remainingBrandEntries.length ? { label: 'Marcas', entries: remainingBrandEntries } : null,
      resellerEntries.length ? { label: 'Revendas', entries: resellerEntries } : null
    ].filter(Boolean);

    sections.forEach((section, index) => {
      if (index > 0) dropdown.appendChild(createDivider());
      if (section.label) dropdown.appendChild(createGroupLabel(section.label));

      section.entries.forEach(([key, brand]) => {
        const group = brand.group || 'Marcas';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'brand-dropdown__item';
        button.dataset.brand = key;
        button.dataset.group = group;
        button.setAttribute('role', 'menuitem');

        if (group !== 'Marcas') button.classList.add('brand-dropdown__item--reseller');

        if (group === 'Marcas') {
          const dot = document.createElement('span');
          dot.className = 'brand-dropdown__dot';
          dot.style.background = brand.primary;
          button.appendChild(dot);
        }

        const name = document.createElement('span');
        name.textContent = brand.name;
        button.appendChild(name);

        button.addEventListener('click', () => {
          localStorage.setItem(STORAGE_KEY, key);
          applyBrand(brand);
          setActiveBrand(dropdown, key);
          closeBrandDropdown(brandContainer);
          document.dispatchEvent(new CustomEvent('app-shell:brand-change', {
            detail: { key, brand }
          }));
        });

        dropdown.appendChild(button);
      });
    });

    setActiveBrand(dropdown, activeKey);
  }

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const openMenuButton = document.getElementById('openMenu');
    const sidebarToggleButton = document.getElementById('sidebarToggle');

    if (!sidebar || sidebar.dataset.shellSidebarInitialized === 'true') return;
    sidebar.dataset.shellSidebarInitialized = 'true';

    const syncState = () => {
      const isMobile = window.matchMedia('(max-width: 980px)').matches;
      const isOpen = sidebar.classList.contains('is-open');
      overlay?.classList.toggle('is-visible', isMobile && isOpen);
      document.body.classList.toggle('sidebar-open', isMobile && isOpen);
      sidebarToggleButton?.setAttribute('aria-expanded', String(!document.body.classList.contains('sidebar-collapsed')));
      openMenuButton?.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMobileSidebar = () => {
      sidebar.classList.remove('is-open');
      syncState();
    };

    openMenuButton?.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      syncState();
    });

    sidebarToggleButton?.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        sidebar.classList.toggle('is-open');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
      syncState();
    });

    overlay?.addEventListener('click', closeMobileSidebar);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        closeMobileSidebar();
      }
    });

    window.addEventListener('resize', syncState);
    syncState();
  }

  async function initBrands() {
    const brandContainer = document.querySelector('.brand');
    if (!brandContainer) return;

    const brandsUrl = brandContainer.dataset.brandsUrl || DEFAULT_BRANDS_URL;
    const response = await fetch(brandsUrl);
    const brands = await response.json();
    const storedKey = localStorage.getItem(STORAGE_KEY);
    const activeKey = brands[storedKey] ? storedKey : (brands.zoetis ? 'zoetis' : Object.keys(brands)[0]);
    const activeBrand = brands[activeKey];

    buildBrandDropdown(brandContainer, brands, activeKey);
    applyBrand(activeBrand);

    const logoBtn = brandContainer.querySelector('.brand__logo-btn');
    logoBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleBrandDropdown(brandContainer);
    });

    document.addEventListener('click', (event) => {
      if (!brandContainer.contains(event.target)) closeBrandDropdown(brandContainer);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeBrandDropdown(brandContainer);
    });
  }

  async function initAppShell() {
    initSidebar();
    try {
      await initMenu();
    } catch (error) {
      console.error('Nao foi possivel carregar o menu do app shell.', error);
    }
    try {
      await initBrands();
    } catch (error) {
      console.error('Nao foi possivel carregar as marcas do app shell.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppShell);
  } else {
    initAppShell();
  }
})();


