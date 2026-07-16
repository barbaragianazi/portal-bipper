(function () {
  'use strict';

  const page = document.getElementById('hubWorkspacesPage');
  const filesPage = document.getElementById('workspaceFilesPage');
  if (!page || !filesPage) return;

  page.dataset.ready = 'true';
  filesPage.dataset.ready = 'true';

  function closeWorkspaceMenus(exceptMenu) {
    page.querySelectorAll('.workspace-menu').forEach(function (menu) {
      if (menu === exceptMenu) return;

      const trigger = menu.querySelector('.workspace-menu__trigger');
      const list = menu.querySelector('.workspace-menu__list');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (list) list.hidden = true;
    });
  }

  function openFilesPage(workspaceName) {
    const title = filesPage.querySelector('#workspaceFilesTitle');
    if (title && workspaceName) title.textContent = workspaceName;
    page.hidden = true;
    filesPage.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  page.querySelectorAll('.workspace-menu__trigger').forEach(function (trigger) {
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
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeWorkspaceMenus();
    });
  });

  page.querySelectorAll('.workspace-open').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const card = button.closest('.workspace-card');
      const title = card && card.querySelector('h3')
        ? card.querySelector('h3').textContent.trim()
        : 'Workspace';

      if (card && card.dataset.protected === 'true') {
        const password = window.prompt('Digite a senha para acessar o Cofre');
        if (!password) return;
      }

      openFilesPage(title);
    });
  });

  document.getElementById('backToWorkspaces')?.addEventListener('click', function () {
    filesPage.hidden = true;
    page.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.workspace-menu')) closeWorkspaceMenus();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeWorkspaceMenus();
  });
})();
