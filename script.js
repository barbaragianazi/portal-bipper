 window.redirecionarPaginaSistema = window.redirecionarPaginaSistema || function (route) { console.log('Navegar para:', route); };
    const sidebar = document.getElementById('sidebar');
    sidebar.dataset.shellSidebarInitialized = 'true';
    const overlay = document.getElementById('sidebarOverlay');
    const openMenuButton = document.getElementById('openMenu');
    const sidebarToggleButton = document.getElementById('sidebarToggle');
    const mobileMedia = window.matchMedia('(max-width: 980px)');
    function syncSidebarState() {
      const isMobile = mobileMedia.matches;
      const isOpen = sidebar.classList.contains('is-open');
      overlay.classList.toggle('is-visible', isMobile && isOpen);
      document.body.classList.toggle('sidebar-open', isMobile && isOpen);
      sidebarToggleButton.setAttribute('aria-expanded', String(!document.body.classList.contains('sidebar-collapsed')));
      openMenuButton?.setAttribute('aria-expanded', String(isOpen));
    }
    function closeMobileSidebar() {
      sidebar.classList.remove('is-open');
      syncSidebarState();
    }
    openMenuButton?.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      syncSidebarState();
    });
    overlay?.addEventListener('click', closeMobileSidebar);
    sidebarToggleButton?.addEventListener('click', () => {
      if (mobileMedia.matches) {
        sidebar.classList.toggle('is-open');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
      syncSidebarState();
    });
    mobileMedia.addEventListener('change', () => {
      if (!mobileMedia.matches) {
        sidebar.classList.remove('is-open');
      }
      syncSidebarState();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        closeMobileSidebar();
      }
    });
    const search = document.getElementById('moduleSearch');
    const grid = document.getElementById('areasGrid');
    const toggle = document.getElementById('categoryToggle');
    const areasSectionHeader = document.querySelector('.section-title');
    const areasSectionTitle = document.getElementById('areasSectionTitle');
    const areasSectionSubtitle = document.getElementById('areasSectionSubtitle');
    const quickStackBody = document.getElementById('quickStackBody');
    const quickList = document.getElementById('quickList');
    const quickEmptyState = document.getElementById('quickEmptyState');
    const heroGrid = document.querySelector('.hero-grid');
    const openCustomizeAreas = document.getElementById('openCustomizeAreas');
    const openCustomizeAreasHero = document.getElementById('openCustomizeAreasHero');
    const customizeAreasModal = document.getElementById('customizeAreasModal');
    const customizeAreasModalClose = document.getElementById('customizeAreasModalClose');
    const customizeApply = document.getElementById('customizeApply');
    const customizeHideAll = document.getElementById('customizeHideAll');
    const customizeGuidedTip = document.getElementById('customizeGuidedTip');
    const customizeGuidedTipOverlay = document.getElementById('customizeGuidedTipOverlay');
    const customizeGuidedTipClose = document.getElementById('customizeGuidedTipClose');
    const customizeToggles = [...document.querySelectorAll('[data-customize-toggle]')];
    const dashboardAreas = {
      welcome: document.querySelector('[data-dashboard-area="welcome"]'),
      quick: document.querySelector('[data-dashboard-area="quick"]'),
      metrics: document.querySelector('[data-dashboard-area="metrics"]')
    };
    const favoriteModal = document.getElementById('favoriteModal');
    const favoriteModalTitle = document.getElementById('favoriteModalTitle');
    const favoriteModalDescription = document.getElementById('favoriteModalDescription');
    const favoriteModalStatus = document.getElementById('favoriteModalStatus');
    const favoriteModalConfirm = document.getElementById('favoriteModalConfirm');
    const favoriteModalCancel = document.getElementById('favoriteModalCancel');
    const favoriteModalClose = document.getElementById('favoriteModalClose');
    const modulesModal = document.getElementById('modulesModal');
    const modulesModalClose = document.getElementById('modulesModalClose');
    const openGestaoModules = document.getElementById('openGestaoModules');
    const chips = [...document.querySelectorAll('.filter-chip[data-filter]')];
    const cards = [...document.querySelectorAll('.area-card')];
    const moduleItems = [...document.querySelectorAll('.area-card .module-item')];
    const moduleSources = [...document.querySelectorAll('[data-module-id]')];
    const moduleFavorites = new Map();
    let favoriteOrder = [];
    let draggedFavoriteId = null;
    let pendingFavoriteAction = null;
    let isCustomizeGuidedTipDismissed = false;
    const dashboardVisibility = {
      welcome: true,
      quick: true,
      metrics: true
    };

    const gestaoCard = document.querySelector('.area-card[data-category="Gestão"]');
    const gestaoIconMarkup = gestaoCard?.querySelector('.area-card__icon').innerHTML || '';
    const gestaoAccent = gestaoCard?.style.getPropertyValue('--accent').trim() || '#ff6b00';
    const gestaoSoft = gestaoCard?.style.getPropertyValue('--soft').trim() || '#fff1e8';

    moduleSources.forEach((item) => {
      const card = item.closest('.area-card');
      const sourceCard = card || gestaoCard;
      const iconMarkup = card ? card.querySelector('.area-card__icon').innerHTML : gestaoIconMarkup;
      item.dataset.category = sourceCard?.dataset.category || 'Gestão';
      item.dataset.accent = sourceCard?.style.getPropertyValue('--accent').trim() || gestaoAccent;
      item.dataset.soft = sourceCard?.style.getPropertyValue('--soft').trim() || gestaoSoft;
      item.dataset.icon = iconMarkup;
      item.style.setProperty('--module-accent', item.dataset.accent);
      item.style.setProperty('--module-soft', item.dataset.soft);

      const content = item.querySelector('.module-item__content');
      const moduleTitle = content?.querySelector('span:not(.module-category-tag), strong');
      const moduleDescription = content?.querySelector('small');
      moduleTitle?.setAttribute('title', item.dataset.moduleName || moduleTitle.textContent.trim());
      moduleDescription?.setAttribute('title', item.dataset.moduleDescription || moduleDescription.textContent.trim());

      if (card) {
        if (content && !content.querySelector('.module-category-tag')) {
          const tag = document.createElement('span');
          tag.className = 'module-category-tag';
          tag.textContent = item.dataset.category;
          tag.title = item.dataset.category;
          content.prepend(tag);
        }
      }

      const moduleId = item.dataset.moduleId;
      const existing = moduleFavorites.get(moduleId);
      if (existing) {
        existing.buttons.push(item.querySelector('.module-favorite-btn'));
      } else {
        moduleFavorites.set(moduleId, {
          moduleId,
          moduleName: item.dataset.moduleName,
          moduleDescription: item.dataset.moduleDescription,
          category: item.dataset.category,
          accent: item.dataset.accent,
          soft: item.dataset.soft,
          icon: item.dataset.icon,
          buttons: [item.querySelector('.module-favorite-btn')],
        });
      }
    });

    function setFavoriteButtonState(button, isActive, moduleName) {
      button.classList.toggle('is-active', isActive);
      button.textContent = isActive ? '★' : '☆';
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute('aria-label', `${isActive ? 'Remover' : 'Favoritar'} ${moduleName}`);
      button.title = `${isActive ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}: ${moduleName}`;
    }

    function syncFavoriteButtons() {
      moduleFavorites.forEach((moduleRecord) => {
        const isFavorite = favoriteOrder.includes(moduleRecord.moduleId);
        moduleRecord.buttons.forEach((button) => {
          setFavoriteButtonState(button, isFavorite, moduleRecord.moduleName);
        });
      });
    }

    function renderQuickAccess() {
      quickList.innerHTML = '';
      quickEmptyState.hidden = favoriteOrder.length > 0;

      favoriteOrder.forEach((moduleId) => {
        const item = moduleFavorites.get(moduleId);
        if (!item) return;

        const quickCard = document.createElement('button');
        quickCard.type = 'button';
        quickCard.className = 'quick-card';
        quickCard.draggable = true;
        quickCard.dataset.moduleId = moduleId;
        quickCard.style.setProperty('--accent', item.accent);
        quickCard.innerHTML = `
          <span class="quick-card__icon">${item.icon}</span>
          <span class="quick-card__content">
            <strong title="${item.moduleName}">${item.moduleName}</strong>
            <small title="${item.moduleDescription}">${item.moduleDescription}</small>
          </span>
          <div class="remove-drag">
          <button class="quick-card__remove" type="button" aria-label="Remover ${item.moduleName} dos acessos rápidos" title="Remover dos acessos rápidos">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <span class="quick-card__drag" aria-hidden="true">⋮⋮</span>
          </div>
        `;

        quickCard.querySelector('.quick-card__remove').addEventListener('click', (event) => {
          event.stopPropagation();
          openFavoriteModal(moduleId);
        });

        quickCard.addEventListener('dragstart', () => {
          draggedFavoriteId = moduleId;
          quickCard.classList.add('is-dragging');
        });

        quickCard.addEventListener('dragend', () => {
          draggedFavoriteId = null;
          quickList.querySelectorAll('.quick-card').forEach((cardEl) => {
            cardEl.classList.remove('is-dragging', 'drag-over');
          });
        });

        quickCard.addEventListener('dragover', (event) => {
          event.preventDefault();
          if (draggedFavoriteId && draggedFavoriteId !== moduleId) {
            quickCard.classList.add('drag-over');
          }
        });

        quickCard.addEventListener('dragleave', () => {
          quickCard.classList.remove('drag-over');
        });

        quickCard.addEventListener('drop', (event) => {
          event.preventDefault();
          quickCard.classList.remove('drag-over');
          if (!draggedFavoriteId || draggedFavoriteId === moduleId) return;
          const fromIndex = favoriteOrder.indexOf(draggedFavoriteId);
          const toIndex = favoriteOrder.indexOf(moduleId);
          if (fromIndex === -1 || toIndex === -1) return;
          favoriteOrder.splice(fromIndex, 1);
          favoriteOrder.splice(toIndex, 0, draggedFavoriteId);
          renderQuickAccess();
        });

        quickList.appendChild(quickCard);
      });
    }

    function toggleFavorite(moduleId) {
      const index = favoriteOrder.indexOf(moduleId);
      if (index >= 0) {
        favoriteOrder.splice(index, 1);
      } else {
        favoriteOrder.push(moduleId);
      }
      syncFavoriteButtons();
      renderQuickAccess();
    }

    function syncCustomizeToggles() {
      customizeToggles.forEach((toggleEl) => {
        const isVisible = Boolean(dashboardVisibility[toggleEl.dataset.customizeToggle]);
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(isVisible));
        toggleEl.setAttribute('aria-label', `${isVisible ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !isVisible);
      });
      syncCustomizeBulkButton();
    }

    function syncCustomizeBulkButton() {
      if (!customizeHideAll) return;
      const hasVisibleItem = customizeToggles.some((toggleEl) => toggleEl.getAttribute('aria-pressed') === 'true');
      customizeHideAll.textContent = hasVisibleItem ? 'Ocultar todos' : 'Exibir todos';
      customizeHideAll.setAttribute('aria-label', hasVisibleItem ? 'Ocultar todas as seções' : 'Exibir todas as seções');
    }

    function applyDashboardVisibility() {
      const wasWelcomeHidden = dashboardAreas.welcome?.classList.contains('hide') || false;
      Object.entries(dashboardAreas).forEach(([areaId, areaEl]) => {
        if (!areaEl) return;
        areaEl.classList.toggle('hide', !dashboardVisibility[areaId]);
      });

      const isWelcomeHidden = !dashboardVisibility.welcome;
      if (isWelcomeHidden && !wasWelcomeHidden) {
        isCustomizeGuidedTipDismissed = false;
      }
      const isQuickHidden = !dashboardVisibility.quick;
      heroGrid?.classList.toggle('is-welcome-hidden', isWelcomeHidden && dashboardVisibility.quick);
      heroGrid?.classList.toggle('is-quick-hidden', isQuickHidden && dashboardVisibility.welcome);
      heroGrid?.classList.toggle('is-empty', isWelcomeHidden && isQuickHidden);
      syncCustomizeGuidedTip();
    }

    function syncCustomizeGuidedTip() {
      if (!customizeGuidedTip) return;
      const shouldHideTip = dashboardVisibility.welcome || customizeAreasModal.classList.contains('is-visible') || isCustomizeGuidedTipDismissed;
      customizeGuidedTip.hidden = shouldHideTip;
      if (customizeGuidedTipOverlay) {
        customizeGuidedTipOverlay.hidden = shouldHideTip;
      }
    }

    function dismissCustomizeGuidedTip() {
      isCustomizeGuidedTipDismissed = true;
      syncCustomizeGuidedTip();
    }

    function openCustomizeModal() {
      syncCustomizeToggles();
      customizeAreasModal.classList.add('is-visible');
      customizeAreasModal.setAttribute('aria-hidden', 'false');
      syncCustomizeGuidedTip();
      document.body.classList.add('modal-open');
    }

    function closeCustomizeModal() {
      customizeAreasModal.classList.remove('is-visible');
      customizeAreasModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      syncCustomizeGuidedTip();
    }

    function closeFavoriteModal(options = {}) {
      const shouldRestoreModulesModal = pendingFavoriteAction?.returnToModulesModal && options.reopenModulesModal !== false;
      favoriteModal.classList.remove('is-visible');
      favoriteModal.setAttribute('aria-hidden', 'true');
      if (shouldRestoreModulesModal) {
        openModulesModal();
      } else if (!modulesModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      pendingFavoriteAction = null;
    }

    function openModulesModal() {
      modulesModal.classList.add('is-visible', 'is-positive');
      modulesModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeModulesModal() {
      modulesModal.classList.remove('is-visible');
      modulesModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
    }

    function openFavoriteModal(moduleId, options = {}) {
      const moduleItem = moduleFavorites.get(moduleId);
      if (!moduleItem) return;
      const isFavorite = favoriteOrder.includes(moduleId);
      const returnToModulesModal = Boolean(options.returnToModulesModal);
      pendingFavoriteAction = { moduleId, returnToModulesModal };

      if (returnToModulesModal && modulesModal.classList.contains('is-visible')) {
        closeModulesModal();
      }

      favoriteModal.classList.toggle('is-positive', !isFavorite);
      favoriteModal.classList.toggle('is-negative', isFavorite);
      favoriteModalTitle.textContent = isFavorite ? `Remover ${moduleItem.moduleName} do Acesso Rápido?` : `Adicionar ${moduleItem.moduleName} ao Acesso Rápido?`;
      favoriteModalDescription.textContent = isFavorite
        ? `${moduleItem.moduleName} deixará de aparecer nos seus acessos rápidos. Você pode favoritar novamente quando quiser.`
        : `O módulo de ${moduleItem.moduleName} será exibido nos seus acessos rápidos para facilitar o retorno ao módulo.`;
      favoriteModalStatus.innerHTML = isFavorite
        ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M9.5 9.5 14.5 14.5M14.5 9.5 9.5 14.5"></path></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="m8.5 12 2.4 2.4 4.6-4.8"></path></svg>';
      favoriteModalConfirm.textContent = isFavorite ? 'Remover' : 'Adicionar';

      favoriteModal.classList.add('is-visible');
      favoriteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    moduleSources.forEach((item) => {
      const button = item.querySelector('.module-favorite-btn');
      button.addEventListener('click', () => {
        const isFromModulesModal = Boolean(item.closest('#modulesModal'));
        openFavoriteModal(item.dataset.moduleId, { returnToModulesModal: isFromModulesModal });
      });
    });

    favoriteModalConfirm.addEventListener('click', () => {
      if (!pendingFavoriteAction) return;
      const shouldScrollToQuickAccess = !favoriteOrder.includes(pendingFavoriteAction.moduleId);
      toggleFavorite(pendingFavoriteAction.moduleId);
      const shouldRestoreModulesModal = pendingFavoriteAction.returnToModulesModal;
      closeFavoriteModal();
      if (shouldScrollToQuickAccess && !shouldRestoreModulesModal) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    favoriteModalCancel.addEventListener('click', closeFavoriteModal);
    favoriteModalClose.addEventListener('click', closeFavoriteModal);
    favoriteModal.querySelectorAll('[data-close-favorite-modal]').forEach((node) => {
      node.addEventListener('click', closeFavoriteModal);
    });
    openCustomizeAreas?.addEventListener('click', openCustomizeModal);
    openCustomizeAreasHero?.addEventListener('click', openCustomizeModal);
    customizeGuidedTipOverlay?.addEventListener('click', dismissCustomizeGuidedTip);
    customizeGuidedTipClose?.addEventListener('click', dismissCustomizeGuidedTip);
    customizeAreasModalClose?.addEventListener('click', closeCustomizeModal);
    customizeAreasModal.querySelectorAll('[data-close-customize-modal]').forEach((node) => {
      node.addEventListener('click', closeCustomizeModal);
    });
    customizeToggles.forEach((toggleEl) => {
      toggleEl.addEventListener('click', () => {
        const isVisible = toggleEl.getAttribute('aria-pressed') !== 'true';
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(isVisible));
        toggleEl.setAttribute('aria-label', `${isVisible ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !isVisible);
        syncCustomizeBulkButton();
      });
    });
    customizeHideAll?.addEventListener('click', () => {
      const shouldShowAll = !customizeToggles.some((toggleEl) => toggleEl.getAttribute('aria-pressed') === 'true');
      customizeToggles.forEach((toggleEl) => {
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(shouldShowAll));
        toggleEl.setAttribute('aria-label', `${shouldShowAll ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !shouldShowAll);
      });
      syncCustomizeBulkButton();
    });
    customizeApply?.addEventListener('click', () => {
      customizeToggles.forEach((toggleEl) => {
        dashboardVisibility[toggleEl.dataset.customizeToggle] = toggleEl.getAttribute('aria-pressed') === 'true';
      });
      applyDashboardVisibility();
      closeCustomizeModal();
    });
    openGestaoModules?.addEventListener('click', openModulesModal);
    modulesModalClose?.addEventListener('click', closeModulesModal);
    modulesModal.querySelectorAll('[data-close-modules-modal]').forEach((node) => {
      node.addEventListener('click', closeModulesModal);
    });

    let activeFilter = 'all';
    function applyFilters() {
      const term = (search.value || '').trim().toLowerCase();
    //   areasSectionHeader.hidden = activeFilter !== 'all';
    //   if (activeFilter === 'all') {
    //     areasSectionTitle.textContent = 'Acesse suas áreas';
    //     areasSectionSubtitle.textContent = 'Cards maiores agrupam contexto, módulos e ação principal.';
    //   }
      grid.classList.toggle('single-filter-mode', activeFilter !== 'all');
      cards.forEach(card => {
        const byText = !term || card.dataset.search.includes(term);
        const byCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
        card.classList.toggle('hide', !(byText && byCategory));
      });
    }
    search.addEventListener('input', applyFilters);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    }));
    toggle.addEventListener('change', () => {
      grid.classList.toggle('category-mode', !toggle.checked);
      grid.classList.toggle('compact-mode', toggle.checked);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && customizeGuidedTip && !customizeGuidedTip.hidden) {
        dismissCustomizeGuidedTip();
        return;
      }
      if (event.key === 'Escape' && customizeAreasModal.classList.contains('is-visible')) {
        closeCustomizeModal();
        return;
      }
      if (event.key === 'Escape' && modulesModal.classList.contains('is-visible')) {
        closeModulesModal();
        return;
      }
      if (event.key === 'Escape' && favoriteModal.classList.contains('is-visible')) {
        closeFavoriteModal();
      }
    });
    applyDashboardVisibility();
    syncFavoriteButtons();
    renderQuickAccess();
    syncSidebarState();


