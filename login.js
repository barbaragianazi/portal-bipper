// Login mockado do protótipo. Não existe backend real: grava a sessão em
// localStorage (chave lida por shared/app-shell.js) e redireciona pro portal.
(function () {
  const SESSION_KEY = 'bipper_auth_session';
  const REDIRECT_URL = 'index.html';

  const DEMO_USERS = {
    support: { role: 'support', name: 'Humberto Delazane', email: 'admin@admin.com', password: 'admin123' },
    client: { role: 'client', name: 'Bárbara Gianazi', email: 'user@user.com', password: 'user123' }
  };

  function login(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, loggedInAt: new Date().toISOString() }));
    window.location.href = REDIRECT_URL;
  }

  function showLoginError(message) {
    const error = document.getElementById('loginError');
    if (!error) return;
    error.textContent = message;
    error.hidden = false;
  }

  function hideLoginError() {
    const error = document.getElementById('loginError');
    if (error) error.hidden = true;
  }

  document.getElementById('togglePassword')?.addEventListener('click', function () {
    const input = document.getElementById('loginPassword');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    this.classList.toggle('is-visible', show);
    this.setAttribute('aria-pressed', String(show));
    this.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  });

  document.querySelector('[data-clear-target]')?.addEventListener('click', function () {
    const target = document.getElementById(this.dataset.clearTarget);
    if (!target) return;
    target.value = '';
    target.focus();
  });

  document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    hideLoginError();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const preset = Object.values(DEMO_USERS).find((user) => (
      user.email.toLowerCase() === email.toLowerCase() && user.password === password
    ));
    if (!preset) {
      showLoginError('Email ou senha inválidos.');
      return;
    }
    login(preset);
  });

  const currentYearEl = document.querySelector('[data-current-year]');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-demo-role]').forEach((card) => {
    card.addEventListener('click', () => {
      const preset = DEMO_USERS[card.dataset.demoRole];
      if (preset) login(preset);
    });
  });

  // Preferências de exibição desta tela de login (só neste navegador, não afeta outras páginas).
  const DISPLAY_SETTINGS_KEY = 'bipper_login_display_settings';
  const DEFAULT_DISPLAY_SETTINGS = { showGoogle: true, showMicrosoft: true, showDemo: true };

  function readDisplaySettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(DISPLAY_SETTINGS_KEY));
      return { ...DEFAULT_DISPLAY_SETTINGS, ...(stored || {}) };
    } catch {
      return { ...DEFAULT_DISPLAY_SETTINGS };
    }
  }

  function saveDisplaySettings(settings) {
    localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(settings));
  }

  function applyDisplaySettings(settings) {
    const googleBtn = document.querySelector('[data-social="google"]');
    const microsoftBtn = document.querySelector('[data-social="microsoft"]');
    const socialRow = document.querySelector('.login-social');
    const divider = document.querySelector('.login-divider');
    const demoSection = document.querySelector('.login-demo');
    const anySocial = settings.showGoogle || settings.showMicrosoft;

    if (googleBtn) googleBtn.hidden = !settings.showGoogle;
    if (microsoftBtn) microsoftBtn.hidden = !settings.showMicrosoft;
    if (socialRow) socialRow.hidden = !anySocial;
    if (divider) divider.hidden = !anySocial;
    if (demoSection) demoSection.hidden = !settings.showDemo;
  }

  const displaySettings = readDisplaySettings();
  applyDisplaySettings(displaySettings);

  const settingsModal = document.getElementById('loginSettingsModal');

  function openSettingsModal() {
    if (!settingsModal) return;
    settingsModal.querySelectorAll('[data-setting]').forEach((input) => {
      input.checked = !!displaySettings[input.dataset.setting];
    });
    settingsModal.hidden = false;
  }

  function closeSettingsModal() {
    if (settingsModal) settingsModal.hidden = true;
  }

  settingsModal?.querySelectorAll('[data-settings-close]').forEach((el) => {
    el.addEventListener('click', closeSettingsModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && settingsModal && !settingsModal.hidden) closeSettingsModal();
  });

  settingsModal?.querySelectorAll('[data-setting]').forEach((input) => {
    input.addEventListener('change', () => {
      displaySettings[input.dataset.setting] = input.checked;
      saveDisplaySettings(displaySettings);
      applyDisplaySettings(displaySettings);
    });
  });

  // O dropdown de marcas é montado de forma assíncrona pelo shared/app-shell.js
  // (usado por outras páginas também). Em vez de editar aquele arquivo compartilhado,
  // observamos o dropdown desta tela e anexamos a opção de configurações só aqui,
  // uma única vez, assim que ele terminar de ser construído.
  const brandContainer = document.querySelector('.login-card__brand');
  const brandDropdown = brandContainer?.querySelector('.brand-dropdown');

  function closeBrandDropdown() {
    const logoBtn = brandContainer?.querySelector('.brand__logo-btn');
    brandDropdown?.classList.remove('visible');
    brandContainer?.classList.remove('open');
    logoBtn?.setAttribute('aria-expanded', 'false');
  }

  function ensureSettingsDropdownItem() {
    if (!brandDropdown || brandDropdown.querySelector('.login-dropdown-settings')) return;

    const divider = document.createElement('div');
    divider.className = 'brand-dropdown__divider';
    brandDropdown.appendChild(divider);

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'brand-dropdown__item login-dropdown-settings';
    item.setAttribute('role', 'menuitem');
    item.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 3.6a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
      <span>Configurações de exibição</span>
    `;
    item.addEventListener('click', () => {
      closeBrandDropdown();
      openSettingsModal();
    });

    brandDropdown.appendChild(item);
  }

  if (brandDropdown) {
    ensureSettingsDropdownItem();
    new MutationObserver(ensureSettingsDropdownItem).observe(brandDropdown, { childList: true });
  }
})();
