/* ============================================
   THEME SWITCHER - White Label Engine
   ============================================ */

const ThemeSwitcher = (() => {
  const STORAGE_KEY = 'lp_active_brand';
  let brandsData = null;

  async function loadBrands() {
    const res = await fetch('data/brands.json');
    brandsData = await res.json();
    return brandsData;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : null;
  }

  function applyCSSVars(brand) {
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
  }

  function applyThemeAttr(key) {
    document.documentElement.setAttribute('data-theme', key);
  }

  function updateLogo(brand) {
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
    divider.setAttribute('aria-hidden', 'true');
    return divider;
  }

  function updateDropdownState(activeKey) {
    document.querySelectorAll('.brand-dropdown__item').forEach((item) => {
      item.classList.toggle('active', item.dataset.brand === activeKey);
    });
  }

  function switchTo(key) {
    if (!brandsData || !brandsData[key]) return;

    const brand = brandsData[key];
    applyThemeAttr(key);
    applyCSSVars(brand);
    updateLogo(brand);
    updateDropdownState(key);
    localStorage.setItem(STORAGE_KEY, key);
  }

  function buildDropdown(container, brands) {
    const dropdown = container.querySelector('.brand-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = '';
    const savedKey = localStorage.getItem(STORAGE_KEY) || 'zoetis';
    const entries = Object.entries(brands);
    const primaryEntry = entries.find(([key]) => key === 'zoetis');
    const resellerEntries = entries.filter(([, brand]) => brand.group === 'Revendas');
    const remainingBrandEntries = entries.filter(([key, brand]) => (
      key !== 'zoetis' && (brand.group || 'Marcas') === 'Marcas'
    ));
    const sections = [
      primaryEntry ? { label: null, entries: [primaryEntry] } : null,
      resellerEntries.length ? { label: 'Revendas', entries: resellerEntries } : null,
      remainingBrandEntries.length ? { label: 'Marcas', entries: remainingBrandEntries, dividerBefore: true } : null,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (section.dividerBefore) dropdown.appendChild(createDivider());
      if (section.label) dropdown.appendChild(createGroupLabel(section.label));

      section.entries.forEach(([key, brand]) => {
        const group = brand.group || 'Marcas';
        const btn = document.createElement('button');
        btn.className = 'brand-dropdown__item';
        btn.dataset.brand = key;
        btn.dataset.group = group;
        btn.type = 'button';
        btn.setAttribute('role', 'menuitem');
        if (group !== 'Marcas') btn.classList.add('brand-dropdown__item--reseller');
        if (key === savedKey) btn.classList.add('active');

        if (group === 'Marcas') {
          const dot = document.createElement('span');
          dot.className = 'brand-dropdown__dot';
          dot.style.background = brand.primary;
          btn.appendChild(dot);
        }

        const name = document.createElement('span');
        name.textContent = brand.name;
        btn.appendChild(name);
        btn.addEventListener('click', () => {
          switchTo(key);
          closeDropdown(container);
        });

        dropdown.appendChild(btn);
      });
    });
  }

  function getLogoButton(container) {
    return container.querySelector('.brand__logo-btn');
  }

  function openDropdown(container) {
    const dropdown = container.querySelector('.brand-dropdown');
    const logoBtn = getLogoButton(container);
    container.classList.add('open');
    dropdown?.classList.add('visible');
    logoBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(container) {
    const dropdown = container.querySelector('.brand-dropdown');
    const logoBtn = getLogoButton(container);
    container.classList.remove('open');
    dropdown?.classList.remove('visible');
    logoBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(container) {
    container.classList.contains('open') ? closeDropdown(container) : openDropdown(container);
  }

  async function init() {
    const brands = await loadBrands();
    const storedKey = localStorage.getItem(STORAGE_KEY);
    const savedKey = brands[storedKey] ? storedKey : 'zoetis';
    const brandContainer = document.querySelector('.brand');

    if (brandContainer) {
      buildDropdown(brandContainer, brands);

      const logoBtn = getLogoButton(brandContainer);
      logoBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDropdown(brandContainer);
      });

      document.addEventListener('click', (event) => {
        if (!brandContainer.contains(event.target)) closeDropdown(brandContainer);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeDropdown(brandContainer);
      });
    }

    switchTo(savedKey);
  }

  return { init, switchTo };
})();

document.addEventListener('DOMContentLoaded', () => {
  ThemeSwitcher.init().catch((error) => {
    console.warn('Nao foi possivel carregar as marcas.', error);
  });
});
