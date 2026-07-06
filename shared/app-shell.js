// Comportamento da estrutura mestre. Controla abrir/fechar sidebar, menu mobile, overlay, tecla Esc, clique no logo, popup de marcas, leitura do brands.json, troca de tema e atualização dos logos.

(function () {
  const DEFAULT_BRANDS_URL = 'shared/data/brands.json';
  const STORAGE_KEY = 'lp_active_brand';

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
      logo.src = brand[variant] || brand.logoLight;
      logo.alt = brand.name;
    });

    document.querySelectorAll('[data-footer-logo]').forEach((logo) => {
      const variant = logo.dataset.footerLogo === 'dark' ? 'footerLogoDark' : 'footerLogoLight';
      const fallback = logo.dataset.footerLogo === 'dark' ? brand.logoDark : brand.logoLight;
      logo.src = brand[variant] || fallback || brand.logoLight;
      logo.alt = brand.footerLogoName || brand.name;
    });
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

    if (!sidebar) return;

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
