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

  document.querySelectorAll('[data-demo-role]').forEach((card) => {
    card.addEventListener('click', () => {
      const preset = DEMO_USERS[card.dataset.demoRole];
      if (preset) login(preset);
    });
  });
})();
