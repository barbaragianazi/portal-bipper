/* Comportamento exclusivo da tela Brindes personalizados (loja): carrossel do hero, categorias,
   busca/filtros, favoritos e carrinho (client-side, sem backend). */

(function () {
    'use strict';

    var page = document.getElementById('bpPage');
    if (!page) return;

    var ICONS = {
        grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"></rect><rect x="13" y="4" width="7" height="7" rx="1.5"></rect><rect x="4" y="13" width="7" height="7" rx="1.5"></rect><rect x="13" y="13" width="7" height="7" rx="1.5"></rect>',
        percent: '<circle cx="7" cy="7" r="2.4"></circle><circle cx="17" cy="17" r="2.4"></circle><path d="M18 6 6 18"></path>',
        plane: '<path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7Z"></path>',
        home: '<path d="M4 10.5 12 4l8 6.5"></path><path d="M6 9.5V20h12V9.5"></path><path d="M10 20v-6h4v6"></path>',
        wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z"></path>',
        cutlery: '<path d="M7 3v6a2 2 0 0 0 2 2"></path><path d="M7 3v9M11 3v6a2 2 0 0 1-2 2"></path><path d="M9 12v9"></path><path d="M16 3c-1.5 0-2.5 1.6-2.5 4.5S14.5 12 16 12s2.5-1.6 2.5-4.5S17.5 3 16 3Z"></path><path d="M16 12v9"></path>',
        blender: '<path d="M7 3h10l-1 6H8L7 3Z"></path><path d="M8 9h8l-1 9.2a2 2 0 0 1-2 1.8h-2a2 2 0 0 1-2-1.8L8 9Z"></path><path d="M9.5 13h5"></path>',
        toy: '<circle cx="12" cy="7.5" r="3"></circle><path d="M7 20.5 9 14h6l2 6.5"></path><path d="M9.5 14v-2.5M14.5 14v-2.5"></path>',
        car: '<path d="M4 16.5V11l2-5h12l2 5v5.5"></path><path d="M4 16.5h16"></path><circle cx="7.5" cy="17.8" r="1.6"></circle><circle cx="16.5" cy="17.8" r="1.6"></circle>',
        broom: '<path d="M15 3 6 12"></path><path d="M4 20l3.5-3.5"></path><path d="M8.5 15.5 4 20"></path><path d="M12 9l3 3 4-4-3-3-4 4Z"></path>',
        chat: '<path d="M4 5h16v11H9l-5 4V5Z"></path>',
        gift: '<path d="M4 10h16v10H4V10Z"></path><path d="M2 7h20v3H2z"></path><path d="M12 7v13"></path><path d="M12 7c0-2.2-1.8-4-4-4-1.7 0-2.6 1.8-1 3s3.6 1 5 1Z"></path><path d="M12 7c0-2.2 1.8-4 4-4 1.7 0 2.6 1.8 1 3s-3.6 1-5 1Z"></path>',
        chip: '<rect x="6" y="6" width="12" height="12" rx="2"></rect><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"></path>',
        gear: '<path d="M12 15.3A3.3 3.3 0 1 0 12 8.7a3.3 3.3 0 0 0 0 6.6Z"></path><path d="M19 14.7c.2.5.2 1 .5 1.3l.2.2a1.7 1.7 0 1 1-2.4 2.4l-.2-.2c-.4-.3-.9-.3-1.3-.1-.5.2-.8.6-.8 1.1V20a1.7 1.7 0 1 1-3.4 0v-.1c0-.5-.3-1-.8-1.1-.4-.2-.9-.2-1.3.1l-.2.2a1.7 1.7 0 1 1-2.4-2.4l.2-.2c.3-.4.3-.9.1-1.3-.2-.5-.6-.8-1.1-.8H5a1.7 1.7 0 1 1 0-3.4h.1c.5 0 1-.3 1.1-.8.2-.4.2-.9-.1-1.3l-.2-.2A1.7 1.7 0 1 1 8.3 6.4l.2.2c.4.3.9.3 1.3.1h0c.5-.2.8-.6.8-1.1V5.5a1.7 1.7 0 1 1 3.4 0v.1c0 .5.3 1 .8 1.1h0c.4.2.9.2 1.3-.1l.2-.2a1.7 1.7 0 1 1 2.4 2.4l-.2.2c-.3.4-.3.9-.1 1.3.2.5.6.8 1.1.8H20a1.7 1.7 0 1 1 0 3.4h-.1c-.5 0-1 .3-1.1.8Z"></path>',
        notebook: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 3v18"></path><path d="M13 8h3M13 12h3"></path>',
        graduation: '<path d="M3 8l9-4 9 4-9 4-9-4Z"></path><path d="M7 10v5c2.5 2 7.5 2 10 0v-5"></path>',
        coffee: '<path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z"></path><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"></path><path d="M7.5 5.5c0-1 1-1 1-2M11.5 5.5c0-1 1-1 1-2"></path>',
        pouch: '<path d="M6 8h12l-1 12H7L6 8Z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>',
        keychain: '<circle cx="8" cy="8" r="4"></circle><path d="M11 11l9 9"></path><path d="M16.5 16.5l1.8-1.8M18.5 18.5l1.8-1.8"></path>',
        backpack: '<path d="M8 8V6a4 4 0 0 1 8 0v2"></path><path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z"></path><path d="M9.5 12h5M10 8v3h4V8"></path>',
        portfolio: '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
        'eco-kit': '<path d="M12 21c-4-2-7-6-7-11a7 7 0 0 1 14 0c0 5-3 9-7 11Z"></path><path d="M12 12v9"></path>',
        pen: '<path d="M4 20l1-4 11-11 3 3-11 11-4 1Z"></path><path d="M14 6l3 3"></path>',
        bottle: '<path d="M10 2h4v4l2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-2V2Z"></path><path d="M8 13h8"></path>',
        'cutting-board': '<rect x="4" y="5" width="16" height="14" rx="3"></rect><circle cx="16.5" cy="9" r="1"></circle>',
        'wine-kit': '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3Z"></path><path d="M12 10v8M9 21h6"></path>',
        'bbq-kit': '<path d="M4 12a8 8 0 0 0 16 0"></path><path d="M2 12h20"></path><path d="M8 12V7M16 12V7"></path>',
        flask: '<path d="M9 2h6"></path><path d="M10 2v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V2"></path>',
        'laptop-bag': '<rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 15h18"></path><path d="M9 6V4h6v2"></path>',
        box: '<path d="M3 8l9-4 9 4-9 4-9-4Z"></path><path d="M3 8v9l9 4 9-4V8"></path><path d="M12 12v9"></path>',
        spark: '<path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z"></path>',
        headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"></path><rect x="3" y="14" width="4" height="6" rx="1.5"></rect><rect x="17" y="14" width="4" height="6" rx="1.5"></rect>',
        tag: '<path d="M12 2h7v7l-9 9-7-7 9-9Z"></path><circle cx="16" cy="6" r="1.1"></circle>',
        filter: '<path d="M4 5h16"></path><path d="M7 12h10"></path><path d="M10 19h4"></path>',
        chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
        chevronRight: '<path d="m9 18 6-6-6-6"></path>'
    };

    function icon(key, cls) {
        var d = ICONS[key] || ICONS.gift;
        return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
    }

    function arrowIcon() {
        return (
            '<svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M5 12h14"></path>' +
            '<path d="m13 6 6 6-6 6"></path>' +
            '</svg>'
        );
    }

    function trashIcon(cls) {
        return (
            '<svg class="' + (cls || 'icon-xs') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M4 7h16"></path>' +
            '<path d="M10 3h4"></path>' +
            '<path d="M9 3h6l1 2H8l1-2Z"></path>' +
            '<path d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12"></path>' +
            '<path d="M10 11v6"></path>' +
            '<path d="M14 11v6"></path>' +
            '</svg>'
        );
    }

    var currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    function loadSet(key) {
        try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch (e) { return new Set(); }
    }
    function saveSet(key, set) {
        localStorage.setItem(key, JSON.stringify(Array.from(set)));
    }
    function loadNumber(key) {
        var n = parseInt(localStorage.getItem(key) || '0', 10);
        return isFinite(n) ? n : 0;
    }
    function saveNumber(key, n) {
        localStorage.setItem(key, String(n));
    }
    function loadList(key) {
        try {
            var list = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(list) ? list : [];
        } catch (e) {
            return [];
        }
    }
    function saveList(key, list) {
        localStorage.setItem(key, JSON.stringify(list));
    }
    function normalizeCartItems(items) {
        var grouped = {};

        (Array.isArray(items) ? items : []).forEach(function (entry) {
            var id = typeof entry === 'string' ? entry : entry && entry.id;
            var qty = typeof entry === 'string' ? 1 : parseInt(entry && entry.qty, 10);
            if (!id) return;
            qty = isFinite(qty) && qty > 0 ? qty : 1;
            grouped[id] = (grouped[id] || 0) + qty;
        });

        return Object.keys(grouped).map(function (id) {
            return { id: id, qty: grouped[id] };
        });
    }

    var state = {
        data: null,
        activeCategory: 'todos',
        activeFilter: 'reset',
        search: '',
        favorites: loadSet('bp_favorites'),
        cartCount: loadNumber('bp_cart_count'),
        cartItems: normalizeCartItems(loadList('bp_cart_items')),
        heroIndex: 0,
        heroTimer: null,
        balanceModalOpen: false,
        cartModalOpen: false,
        favoritesModalOpen: false,
        detailModalOpen: false,
        activeDetailId: null,
        removeCartItemId: null
    };

    var els = {
        breadcrumb: document.getElementById('bpBreadcrumb'),
        balance: document.getElementById('bpBalance'),
        balanceValue: document.querySelector('#bpBalance .bp-balance__value'),
        wishlistBtn: document.getElementById('bpWishlistBtn'),
        wishlistCount: document.getElementById('bpWishlistCount'),
        favoritesModal: document.getElementById('bpFavoritesModal'),
        favoritesOverlay: document.getElementById('bpFavoritesOverlay'),
        favoritesClose: document.getElementById('bpFavoritesClose'),
        favoritesItems: document.getElementById('bpFavoritesItems'),
        favoritesHint: document.getElementById('bpFavoritesHint'),
        detailModal: document.getElementById('bpDetailModal'),
        detailOverlay: document.getElementById('bpDetailOverlay'),
        detailClose: document.getElementById('bpDetailClose'),
        detailMedia: document.getElementById('bpDetailMedia'),
        detailFavToggle: document.getElementById('bpDetailFavToggle'),
        detailTags: document.getElementById('bpDetailTags'),
        detailTitle: document.getElementById('bpDetailTitle'),
        detailMeta: document.getElementById('bpDetailMeta'),
        detailPrice: document.getElementById('bpDetailPrice'),
        detailInsufficient: document.getElementById('bpDetailInsufficient'),
        detailAddCart: document.getElementById('bpDetailAddCart'),
        cartBtn: document.getElementById('bpCartBtn'),
        cartCount: document.getElementById('bpCartCount'),
        cartModal: document.getElementById('bpCartModal'),
        cartOverlay: document.getElementById('bpCartOverlay'),
        cartClose: document.getElementById('bpCartClose'),
        cartItems: document.getElementById('bpCartItems'),
        cartTotal: document.getElementById('bpCartTotal'),
        cartSummary: document.getElementById('bpCartSummary'),
        cartHint: document.getElementById('bpCartHint'),
        cartCheckout: document.getElementById('bpCartCheckout'),
        cartRemoveModal: document.getElementById('bpCartRemoveModal'),
        cartRemoveClose: document.getElementById('bpCartRemoveClose'),
        cartRemoveCancel: document.getElementById('bpCartRemoveCancel'),
        cartRemoveConfirm: document.getElementById('bpCartRemoveConfirm'),
        cartRemoveDescription: document.getElementById('bpCartRemoveDescription'),
        balanceModal: document.getElementById('bpBalanceModal'),
        balanceOverlay: document.getElementById('bpBalanceOverlay'),
        balanceClose: document.getElementById('bpBalanceClose'),
        balanceTitle: document.getElementById('bpBalanceTitle'),
        balanceEligibleProducts: document.getElementById('bpBalanceEligibleProducts'),
        balanceUsagePercent: document.getElementById('bpBalanceUsagePercent'),
        balanceCartValue: document.getElementById('bpBalanceCartValue'),
        balanceRemainingValue: document.getElementById('bpBalanceRemainingValue'),
        balanceRing: document.getElementById('bpBalanceRing'),
        balanceCard: document.getElementById('bpBalanceCard'),
        heroTrack: document.getElementById('bpHeroTrack'),
        heroDots: document.getElementById('bpHeroDots'),
        heroPrev: document.getElementById('bpHeroPrev'),
        heroNext: document.getElementById('bpHeroNext'),
        hero: document.getElementById('bpHero'),
        categories: document.getElementById('bpCategories'),
        search: document.getElementById('bpSearch'),
        filters: document.getElementById('bpFilters'),
        gridPrimary: document.getElementById('bpGridPrimary'),
        productsPrimary: document.getElementById('bpProductsPrimary'),
        sideBanner: document.getElementById('bpSideBanner'),
        productsSecondary: document.getElementById('bpProductsSecondary'),
        productsTertiary: document.getElementById('bpProductsTertiary'),
        emptyState: document.getElementById('bpEmptyState'),
        promotions: document.getElementById('bpPromotions'),
        giftCards: document.getElementById('bpGiftCards'),
        finalBanner: document.getElementById('bpFinalBanner'),
        skeleton: document.getElementById('bpSkeleton'),
        toast: document.getElementById('bpToast')
    };

    fetch(page.dataset.jsonUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            state.data = data;
            init();
        })
        .catch(function (err) {
            console.error('Não foi possível carregar os dados de brindes personalizados.', err);
            showLoadError();
        });

    function init() {
        renderBreadcrumb();
        updateBalance();
        updateWishlistCount();
        updateCartCount();
        renderHero();
        renderCategories();
        renderFilters();
        enhanceScrollableRail(els.categories, 'categorias');
        enhanceScrollableRail(els.filters, 'filtros');
        renderProducts();
        renderSideBanner();
        renderPromotions();
        renderGiftCards();
        renderFinalBanner();
        bindSearch();
        bindHeroNav();
        bindBalanceModal();
        syncCartState();
        setPageReady();
    }

    function setPageReady() {
        page.classList.remove('is-loading');
        page.classList.add('is-ready');
        page.querySelector('.bp-content-ready')?.removeAttribute('aria-hidden');
    }

    function showLoadError() {
        page.classList.remove('is-ready');
        page.classList.add('is-loading');
        if (!els.skeleton) return;
        els.skeleton.innerHTML = (
            '<div class="bp-skeleton__error" role="alert">' +
            '<strong>Não foi possível carregar os brindes.</strong>' +
            '<span>Atualize a página ou tente novamente em instantes.</span>' +
            '</div>'
        );
    }

    function renderBreadcrumb() {
        els.breadcrumb.innerHTML = state.data.breadcrumb.map(function (item) {
            var inner = item.href ? '<a href="' + item.href + '">' + item.label + '</a>' : '<span>' + item.label + '</span>';
            return '<li>' + inner + '</li>';
        }).join('');
    }

    function updateBalance() {
        var value = els.balanceValue || els.balance.querySelector('.bp-balance__value');
        if (value) {
            value.textContent = currency.format(state.data.balance);
            return;
        }
        els.balance.textContent = 'Saldo: ' + currency.format(state.data.balance);
    }

    function updateWishlistCount() {
        els.wishlistCount.textContent = state.favorites.size;
        els.wishlistCount.dataset.empty = state.favorites.size === 0;
    }

    function getFavoriteProducts() {
        return Array.from(state.favorites).map(function (id) {
            return state.data.products.find(function (p) { return p.id === id; });
        }).filter(Boolean);
    }

    function updateCartCount() {
        els.cartCount.textContent = state.cartCount;
        els.cartCount.dataset.empty = state.cartCount === 0;
    }

    function getCartProducts() {
        return state.cartItems.map(function (item) {
            var product = state.data.products.find(function (p) { return p.id === item.id; });
            if (!product) return null;
            return {
                id: item.id,
                qty: item.qty,
                product: product,
                lineTotal: product.price * item.qty
            };
        }).filter(Boolean);
    }

    function getCartQuantity(productId) {
        var entry = state.cartItems.find(function (item) { return item.id === productId; });
        return entry ? entry.qty : 0;
    }

    function getCartTotal() {
        return getCartProducts().reduce(function (sum, item) {
            return sum + item.lineTotal;
        }, 0);
    }

    function getRemainingBalance() {
        return Math.max(0, state.data.balance - getCartTotal());
    }

    function getUsagePercent() {
        if (!state.data.balance) return 0;
        return (getCartTotal() / state.data.balance) * 100;
    }

    function getEligibleProductCount() {
        var remaining = getRemainingBalance();
        return state.data.products.filter(function (product) {
            return product.price <= remaining;
        }).length;
    }

    function syncCartState() {
        state.cartItems = normalizeCartItems(state.cartItems);
        state.cartCount = state.cartItems.reduce(function (sum, item) {
            return sum + item.qty;
        }, 0);
        saveList('bp_cart_items', state.cartItems);
        saveNumber('bp_cart_count', state.cartCount);
        updateCartCount();
        updateWishlistCount();
        updateBalanceDetails();
        renderCartModal();
        renderFavoritesModal();
        renderProducts();
        if (state.detailModalOpen) renderDetailModal();
    }

    function updateBalanceDetails() {
        if (!state.data) return;

        var total = getCartTotal();
        var remaining = getRemainingBalance();
        var percent = getUsagePercent();
        var displayPercent = Math.ceil(percent * 100) / 100;
        var eligible = getEligibleProductCount();
        var percentText = displayPercent.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + '%';
        var circumference = 2 * Math.PI * 44;
        var clampedPercent = Math.min(percent, 100);

        updateBalance();

        if (els.balanceTitle) els.balanceTitle.textContent = currency.format(state.data.balance);
        if (els.balanceEligibleProducts) els.balanceEligibleProducts.textContent = eligible + ' produtos';
        if (els.balanceUsagePercent) els.balanceUsagePercent.textContent = percentText;
        if (els.balanceCartValue) els.balanceCartValue.textContent = currency.format(total);
        if (els.balanceRemainingValue) els.balanceRemainingValue.textContent = currency.format(remaining);
        if (els.balanceRing) {
            els.balanceRing.style.strokeDasharray = String(circumference);
            els.balanceRing.style.strokeDashoffset = String(circumference * (1 - clampedPercent / 100));
        }
        if (els.balance) {
            els.balance.classList.toggle('is-warning', percent >= 75);
        }
        if (els.balanceCard) {
            els.balanceCard.classList.toggle('is-warning', percent >= 75);
            els.balanceCard.classList.toggle('is-empty-cart', total === 0);
        }
    }

    function openBalanceModal() {
        state.balanceModalOpen = true;
        updateBalanceDetails();
        els.balanceModal.hidden = false;
        page.classList.add('has-balance-modal');
        document.body.classList.add('bp-modal-open');
    }

    function closeBalanceModal() {
        state.balanceModalOpen = false;
        els.balanceModal.hidden = true;
        page.classList.remove('has-balance-modal');
        document.body.classList.remove('bp-modal-open');
    }

    function renderCartModal() {
        var items = getCartProducts();

        if (els.cartTotal) {
            els.cartTotal.textContent = currency.format(getCartTotal());
        }
        if (els.cartHint) {
            els.cartHint.textContent = items.length
                ? 'Ajuste as quantidades antes de finalizar o resgate.'
                : 'Seu carrinho está vazio no momento.';
        }
        if (els.cartCheckout) {
            els.cartCheckout.disabled = items.length === 0;
            els.cartCheckout.setAttribute('aria-disabled', String(items.length === 0));
            els.cartCheckout.textContent = items.length ? 'Finalizar resgate' : 'Resgatar produtos';
        }
        if (els.cartSummary) {
            els.cartSummary.hidden = items.length === 0;
        }
        if (!els.cartItems) return;

        if (!items.length) {
            els.cartItems.innerHTML = (
                '<div class="bp-cart-card__empty">' +
                '<img class="bp-cart-card__empty-illustration" src="assets/hero/empty-cart.png" alt="" loading="lazy">' +
                '<strong>Nenhum produto no carrinho.</strong>' +
                '<p>Adicione itens do catálogo para continuar o resgate.</p>' +
                '</div>'
            );
            return;
        }

        els.cartItems.innerHTML = items.map(function (item) {
            return (
                '<article class="bp-cart-card__item" data-cart-item-id="' + item.id + '">' +
                '<div class="bp-cart-card__thumb">' +
                '<img src="' + item.product.image + '" alt="' + item.product.name + '" loading="lazy">' +
                '</div>' +
                '<div class="bp-cart-card__meta">' +
                '<h3 class="bp-cart-card__name">' + item.product.name + '</h3>' +
                '<span class="bp-cart-card__unit">' + 'Valor unitário: '+ currency.format(item.product.price) + '</span>' +
                '<strong class="bp-cart-card__value">' + currency.format(item.lineTotal) + '</strong>' +
                '</div>' +
                '<div class="bp-cart-card__actions">' +
                '<div class="bp-cart-card__qty" aria-label="Alterar quantidade de ' + item.product.name + '">' +
                '<button class="bp-cart-card__qty-btn" type="button" data-cart-decrease aria-label="Remover uma unidade de ' + item.product.name + '">-</button>' +
                '<span class="bp-cart-card__qty-value">' + item.qty + '</span>' +
                '<button class="bp-cart-card__qty-btn" type="button" data-cart-increase aria-label="Adicionar uma unidade de ' + item.product.name + '">+</button>' +
                '</div>' +
                '<button class="bp-cart-card__remove" type="button" data-cart-remove>' + 
                '<span>Remover produto</span></button>' +
                '</div>' +
                '</article>'
            );
        }).join('');
    }

    function renderFavoritesModal() {
        var items = getFavoriteProducts();

        if (els.favoritesHint) {
            els.favoritesHint.textContent = items.length
                ? 'Acesse seus produtos favoritos e mova-os para o carrinho.'
                : 'Você ainda não salvou produtos nos favoritos.';
        }
        if (!els.favoritesItems) return;

        if (!items.length) {
            els.favoritesItems.innerHTML = (
                '<div class="bp-cart-card__empty">' +
                '<strong>Nenhum produto favorito.</strong>' +
                '<p>Use o coração nos cards para salvar itens aqui.</p>' +
                '</div>'
            );
            return;
        }

        els.favoritesItems.innerHTML = items.map(function (product) {
            return (
                '<article class="bp-favorites-card__item" data-favorite-item-id="' + product.id + '">' +
                '<div class="bp-favorites-card__thumb">' +
                '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">' +
                '</div>' +
                '<div class="bp-favorites-card__meta">' +
                '<h3 class="bp-favorites-card__name">' + product.name + '</h3>' +
                '<strong class="bp-cart-card__value">' + currency.format(product.price) + '</strong>' +
                '</div>' +
                '<div class="bp-favorites-card__actions">' +
                '<button class="bp-favorites-card__move" type="button" data-favorite-add-cart>Adicionar ao carrinho</button>' +
                '<button class="bp-favorites-card__remove" type="button" data-favorite-remove>' + '<span>Remover dos favoritos</span></button>' +
                '</div>' +
                '</article>'
            );
        }).join('');
    }

    function openCartModal() {
        state.cartModalOpen = true;
        renderCartModal();
        els.cartModal.hidden = false;
        document.body.classList.add('bp-modal-open');
    }

    function closeCartModal() {
        state.cartModalOpen = false;
        els.cartModal.hidden = true;
        if (els.cartRemoveModal.getAttribute('aria-hidden') === 'true' || !els.cartRemoveModal.classList.contains('is-visible')) {
            document.body.classList.remove('bp-modal-open');
        }
    }

    function openFavoritesModal() {
        state.favoritesModalOpen = true;
        renderFavoritesModal();
        els.favoritesModal.hidden = false;
        document.body.classList.add('bp-modal-open');
    }

    function closeFavoritesModal() {
        state.favoritesModalOpen = false;
        els.favoritesModal.hidden = true;
        document.body.classList.remove('bp-modal-open');
    }

    function getCategoryLabel(categoryId) {
        var category = (state.data.categories || []).find(function (c) { return c.id === categoryId; });
        return category ? category.label : '';
    }

    function renderDetailModal() {
        var product = state.data.products.find(function (p) { return p.id === state.activeDetailId; });
        if (!product) return;

        var isFav = state.favorites.has(product.id);
        var cartQty = getCartQuantity(product.id);
        var insufficient = product.price > getRemainingBalance();

        els.detailMedia.innerHTML = (
            '<span class="bp-product-card__badge">' + product.badge + '</span>' +
            (cartQty ? '<span class="bp-product-card__cart-indicator">No carrinho: ' + cartQty + '</span>' : '') +
            productMediaHtml(product)
        );

        var tags = [];
        var categoryLabel = getCategoryLabel(product.category);
        if (categoryLabel) tags.push('<span class="bp-detail-card__tag">' + categoryLabel + '</span>');
        if (product.type) tags.push('<span class="bp-detail-card__tag">' + (product.type === 'fisico' ? 'Produto físico' : 'Produto digital') + '</span>');
        if (product.isPersonalized) tags.push('<span class="bp-detail-card__tag is-positive">Personalizável</span>');
        tags.push(product.redeemNow
            ? '<span class="bp-detail-card__tag is-positive">Resgate imediato</span>'
            : '<span class="bp-detail-card__tag">Sob encomenda</span>');
        els.detailTags.innerHTML = tags.join('');

        els.detailTitle.textContent = product.name;
        els.detailMeta.innerHTML = icon('spark', 'icon-xs') + '<span>' + product.rating.toFixed(1) + ' · ' + product.soldCount + ' resgatados</span>';
        els.detailPrice.innerHTML = productPriceHtml(product);

        els.detailInsufficient.hidden = !insufficient;

        els.detailFavToggle.classList.toggle('is-active', isFav);
        els.detailFavToggle.setAttribute('aria-pressed', String(isFav));
        els.detailFavToggle.setAttribute('aria-label', (isFav ? 'Remover dos favoritos: ' : 'Favoritar ') + product.name);

        els.detailAddCart.disabled = insufficient;
        els.detailAddCart.setAttribute('aria-disabled', String(insufficient));
        els.detailAddCart.textContent = insufficient ? 'Saldo insuficiente' : 'Resgatar';
    }

    function openDetailModal(productId) {
        var product = state.data.products.find(function (p) { return p.id === productId; });
        if (!product) return;
        state.activeDetailId = productId;
        state.detailModalOpen = true;
        renderDetailModal();
        els.detailModal.hidden = false;
        document.body.classList.add('bp-modal-open');
    }

    function closeDetailModal() {
        state.detailModalOpen = false;
        state.activeDetailId = null;
        els.detailModal.hidden = true;
        document.body.classList.remove('bp-modal-open');
    }

    function openCartRemoveModal(itemId) {
        var item = getCartProducts().find(function (entry) { return entry.id === itemId; });
        if (!item) return;
        state.removeCartItemId = itemId;
        els.cartRemoveDescription.textContent = '"' + item.product.name + '" será removido do seu carrinho.';
        els.cartRemoveModal.classList.add('is-visible');
        els.cartRemoveModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('bp-modal-open');
    }

    function closeCartRemoveModal() {
        state.removeCartItemId = null;
        els.cartRemoveModal.classList.remove('is-visible');
        els.cartRemoveModal.setAttribute('aria-hidden', 'true');
        if (!state.cartModalOpen) {
            document.body.classList.remove('bp-modal-open');
        }
    }

    function requestCartItemRemoval(itemId) {
        openCartRemoveModal(itemId);
    }

    function changeCartItemQuantity(itemId, delta) {
        var item = state.cartItems.find(function (entry) { return entry.id === itemId; });
        if (!item) return;
        var product = state.data.products.find(function (p) { return p.id === itemId; });
        if (delta > 0 && product && product.price > getRemainingBalance()) {
            showToast('Saldo insuficiente para adicionar mais uma unidade.');
            return;
        }
        var nextQty = item.qty + delta;
        if (nextQty <= 0) {
            requestCartItemRemoval(itemId);
            return;
        }
        item.qty = nextQty;
        syncCartState();
    }

    function addToCart(productId) {
        var product = state.data.products.find(function (p) { return p.id === productId; });
        if (product && product.price > getRemainingBalance()) {
            showToast('Saldo insuficiente para adicionar este item.');
            return false;
        }
        var item = state.cartItems.find(function (entry) { return entry.id === productId; });
        if (item) {
            item.qty += 1;
        } else {
            state.cartItems.push({ id: productId, qty: 1 });
        }
        syncCartState();
        return true;
    }

    function removeCartItem(itemId) {
        state.cartItems = state.cartItems.filter(function (entry) {
            return entry.id !== itemId;
        });
        syncCartState();
    }

    function removeFavorite(itemId) {
        state.favorites.delete(itemId);
        saveSet('bp_favorites', state.favorites);
        updateWishlistCount();
        renderFavoritesModal();
        renderProducts();
    }

    function moveFavoriteToCart(itemId) {
        if (!addToCart(itemId)) return false;
        removeFavorite(itemId);
        return true;
    }

    function bindBalanceModal() {
        els.balance.addEventListener('click', openBalanceModal);
        els.wishlistBtn.addEventListener('click', openFavoritesModal);
        els.cartBtn.addEventListener('click', openCartModal);
        els.balanceOverlay.addEventListener('click', closeBalanceModal);
        els.balanceClose.addEventListener('click', closeBalanceModal);
        els.favoritesOverlay.addEventListener('click', closeFavoritesModal);
        els.favoritesClose.addEventListener('click', closeFavoritesModal);
        els.cartOverlay.addEventListener('click', closeCartModal);
        els.cartClose.addEventListener('click', closeCartModal);
        els.detailOverlay.addEventListener('click', closeDetailModal);
        els.detailClose.addEventListener('click', closeDetailModal);
        els.cartRemoveCancel.addEventListener('click', closeCartRemoveModal);
        els.cartRemoveClose.addEventListener('click', closeCartRemoveModal);
        els.cartRemoveConfirm.addEventListener('click', function () {
            if (!state.removeCartItemId) return;
            removeCartItem(state.removeCartItemId);
            closeCartRemoveModal();
            showToast('Produto removido do carrinho.');
        });
        els.cartRemoveModal.querySelectorAll('[data-close-cart-remove-modal]').forEach(function (node) {
            node.addEventListener('click', closeCartRemoveModal);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && els.cartRemoveModal.classList.contains('is-visible')) {
                closeCartRemoveModal();
                return;
            }
            if (event.key === 'Escape' && state.cartModalOpen) {
                closeCartModal();
                return;
            }
            if (event.key === 'Escape' && state.favoritesModalOpen) {
                closeFavoritesModal();
                return;
            }
            if (event.key === 'Escape' && state.detailModalOpen) {
                closeDetailModal();
                return;
            }
            if (event.key === 'Escape' && state.balanceModalOpen) {
                closeBalanceModal();
            }
        });
    }

    function showToast(message) {
        els.toast.textContent = message;
        els.toast.classList.add('is-visible');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () {
            els.toast.classList.remove('is-visible');
        }, 2600);
    }

    /* Hero carrossel */

    function heroMediaHtml(slide) {
        var fallback = icon(slide.icon);
        if (!slide.image) return fallback;
        return '<img class="bp-hero__photo" src="' + slide.image + '" alt="" loading="lazy" onerror="this.remove()">' + fallback;
    }

    function renderHero() {
        els.heroTrack.innerHTML = state.data.heroSlides.map(function (slide) {
            return (
                '<article class="bp-hero__slide">' +
                '<div class="bp-hero__content">' +
                '<span class="bp-hero__eyebrow">' + icon('spark', 'icon-xs') + slide.eyebrow + '</span>' +
                '<h2>' + slide.title + '</h2>' +
                '<p>' + slide.subtitle + '</p>' +
                '<button class="btn btn-primary" type="button" data-hero-cta>' + slide.cta + '</button>' +
                '</div>' +
                '<div class="bp-hero__icon">' + heroMediaHtml(slide) + '</div>' +
                '</article>'
            );
        }).join('');

        els.heroDots.innerHTML = state.data.heroSlides.map(function (_, i) {
            return '<button class="bp-hero__dot' + (i === 0 ? ' is-active' : '') + '" type="button" role="tab" aria-selected="' + (i === 0) + '" aria-label="Ir para slide ' + (i + 1) + '" data-index="' + i + '"></button>';
        }).join('');

        Array.prototype.forEach.call(els.heroDots.children, function (dot) {
            dot.addEventListener('click', function () {
                goToHeroSlide(parseInt(dot.dataset.index, 10));
                restartHeroAutoplay();
            });
        });

        Array.prototype.forEach.call(els.heroTrack.querySelectorAll('[data-hero-cta]'), function (btn) {
            btn.addEventListener('click', function () {
                document.getElementById('bpCategories').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        startHeroAutoplay();
    }

    function goToHeroSlide(index) {
        var total = state.data.heroSlides.length;
        state.heroIndex = (index + total) % total;
        els.heroTrack.style.transform = 'translateX(-' + (state.heroIndex * 100) + '%)';
        Array.prototype.forEach.call(els.heroDots.children, function (dot, i) {
            dot.classList.toggle('is-active', i === state.heroIndex);
            dot.setAttribute('aria-selected', String(i === state.heroIndex));
        });
    }

    function startHeroAutoplay() {
        clearInterval(state.heroTimer);
        state.heroTimer = setInterval(function () {
            goToHeroSlide(state.heroIndex + 1);
        }, 6000);
    }

    function restartHeroAutoplay() {
        startHeroAutoplay();
    }

    function bindHeroNav() {
        els.heroPrev.addEventListener('click', function () {
            goToHeroSlide(state.heroIndex - 1);
            restartHeroAutoplay();
        });
        els.heroNext.addEventListener('click', function () {
            goToHeroSlide(state.heroIndex + 1);
            restartHeroAutoplay();
        });
        els.hero.addEventListener('mouseenter', function () { clearInterval(state.heroTimer); });
        els.hero.addEventListener('mouseleave', startHeroAutoplay);
    }

    /* Categorias */

    function renderCategories() {
        updateCategoryMode();
        els.categories.innerHTML = state.data.categories.map(function (cat) {
            var active = cat.id === state.activeCategory;
            var iconMarkup = cat.iconPath
                ? '<img src="' + cat.iconPath + '" alt="" aria-hidden="true">'
                : icon(cat.icon);
            return (
                '<button class="bp-category' + (active ? ' is-active' : '') + '" type="button" data-category="' + cat.id + '" aria-pressed="' + active + '" style="--category-color:' + (cat.color || '#111111') + '">' +
                '<span class="bp-category__icon">' + iconMarkup + '</span>' +
                '<span class="bp-category__label">' + cat.label + '</span>' +
                '</button>'
            );
        }).join('');

        els.categories.addEventListener('click', function (e) {
            var btn = e.target.closest('.bp-category');
            if (!btn) return;
            state.activeCategory = state.activeCategory === btn.dataset.category && btn.dataset.category !== 'todos'
                ? 'todos'
                : btn.dataset.category;
            updateCategoryMode();
            Array.prototype.forEach.call(els.categories.children, function (el) {
                var active = el.dataset.category === state.activeCategory;
                el.classList.toggle('is-active', active);
                el.setAttribute('aria-pressed', String(active));
            });
            renderProducts();
        });
    }

    function updateCategoryMode() {
        els.categories.classList.toggle('is-showing-all', state.activeCategory === 'todos');
    }

    /* Filtros e busca */

    function renderFilters() {
        els.filters.innerHTML = state.data.filters.map(function (f) {
            var active = f.id === state.activeFilter;
            return (
                '<button class="filter-chip' + (active ? ' is-active' : '') + '" type="button" data-filter="' + f.id + '">' +
                f.label +
                '<span>' + getFilterCount(f.id) + '</span>' +
                '</button>'
            );
        }).join('');

        els.filters.addEventListener('click', function (e) {
            var btn = e.target.closest('.filter-chip');
            if (!btn) return;
            var id = btn.dataset.filter;
            state.activeFilter = (id === state.activeFilter || id === 'reset') ? 'reset' : id;
            Array.prototype.forEach.call(els.filters.children, function (el) {
                el.classList.toggle('is-active', el.dataset.filter === state.activeFilter);
            });
            renderProducts();
        });
    }

    function enhanceScrollableRail(rail, label) {
        if (!rail || rail.dataset.scrollEnhanced === 'true') return;
        rail.dataset.scrollEnhanced = 'true';

        var wrapper = document.createElement('div');
        wrapper.className = 'bp-scroll-rail';
        wrapper.setAttribute('data-scroll-rail', label);

        var prev = document.createElement('button');
        prev.className = 'bp-scroll-rail__arrow bp-scroll-rail__arrow--prev';
        prev.type = 'button';
        prev.setAttribute('aria-label', 'Rolar ' + label + ' para a esquerda');
        prev.innerHTML = icon('chevronLeft', 'icon-xs');

        var next = document.createElement('button');
        next.className = 'bp-scroll-rail__arrow bp-scroll-rail__arrow--next';
        next.type = 'button';
        next.setAttribute('aria-label', 'Rolar ' + label + ' para a direita');
        next.innerHTML = icon('chevronRight', 'icon-xs');

        rail.parentNode.insertBefore(wrapper, rail);
        wrapper.appendChild(prev);
        wrapper.appendChild(rail);
        wrapper.appendChild(next);

        var isDown = false;
        var didDrag = false;
        var suppressClick = false;
        var startX = 0;
        var startScroll = 0;

        function updateArrows() {
            var hasOverflow = rail.scrollWidth > rail.clientWidth + 2;
            wrapper.classList.toggle('has-overflow', hasOverflow);
            prev.disabled = !hasOverflow || rail.scrollLeft <= 1;
            next.disabled = !hasOverflow || rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;
        }

        function scrollByPage(direction) {
            rail.scrollBy({
                left: direction * Math.max(180, rail.clientWidth * .75),
                behavior: 'smooth'
            });
        }

        prev.addEventListener('click', function () { scrollByPage(-1); });
        next.addEventListener('click', function () { scrollByPage(1); });
        rail.addEventListener('scroll', updateArrows, { passive: true });

        rail.addEventListener('pointerdown', function (event) {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            isDown = true;
            didDrag = false;
            suppressClick = false;
            startX = event.clientX;
            startScroll = rail.scrollLeft;
            rail.classList.add('is-dragging');
        });

        rail.addEventListener('pointermove', function (event) {
            if (!isDown) return;
            var delta = event.clientX - startX;
            if (Math.abs(delta) <= 10 && !didDrag) return;
            didDrag = true;
            rail.scrollLeft = startScroll - delta;
        });

        function stopDrag(event) {
            if (!isDown) return;
            isDown = false;
            suppressClick = didDrag;
            rail.classList.remove('is-dragging');
        }

        rail.addEventListener('pointerup', stopDrag);
        rail.addEventListener('pointercancel', stopDrag);
        rail.addEventListener('click', function (event) {
            if (!suppressClick) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick = false;
        }, true);

        window.addEventListener('resize', updateArrows);
        requestAnimationFrame(updateArrows);
    }

    function getFilterCount(filterId) {
        var products = state.data.products || [];
        if (filterId === 'redeem-now') {
            return products.filter(function (p) { return p.redeemNow; }).length;
        }
        if (filterId === 'physical') {
            return products.filter(function (p) { return p.type === 'fisico'; }).length;
        }
        if (filterId === 'digital') {
            return products.filter(function (p) { return p.type === 'digital'; }).length;
        }
        return products.length;
    }

    function bindSearch() {
        els.search.addEventListener('input', function () {
            state.search = els.search.value;
            updateSearchMode();
            renderProducts();
        });
    }

    /* Produtos */

    function isSearchMode() {
        return state.search.trim().length > 0;
    }

    function updateSearchMode() {
        page.classList.toggle('is-searching', isSearchMode());
    }

    function getFilteredProducts() {
        var q = state.search.trim().toLowerCase();
        var list = state.data.products.filter(function (p) {
            if (q && p.name.toLowerCase().indexOf(q) === -1) return false;

            if (!q) {
                if (state.activeCategory === 'ofertas') {
                    var discount = (p.oldPrice - p.price) / p.oldPrice;
                    if (discount < 0.3) return false;
                } else if (state.activeCategory !== 'todos' && p.category !== state.activeCategory) {
                    return false;
                }
                if (state.activeFilter === 'redeem-now' && !p.redeemNow) return false;
                if (state.activeFilter === 'physical' && p.type !== 'fisico') return false;
                if (state.activeFilter === 'digital' && p.type !== 'digital') return false;
            }

            return true;
        });

        if (!q && state.activeFilter === 'most-redeemed') {
            list = list.slice().sort(function (a, b) { return b.soldCount - a.soldCount; });
        } else if (!q && state.activeFilter === 'lowest-price') {
            list = list.slice().sort(function (a, b) { return a.price - b.price; });
        }

        return list;
    }

    function productMediaHtml(p) {
        var fallback = '<span class="bp-product-card__fallback">' + icon(p.icon) + '</span>';
        if (!p.image) return fallback;
        return (
            '<img class="bp-product-card__photo" src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">' +
            '<span class="bp-product-card__fallback" hidden>' + icon(p.icon) + '</span>'
        );
    }

    function priceParts(value) {
        var formatted = currency.format(value).replace(/\s/g, ' ');
        var parts = formatted.replace('R$ ', '').split(',');
        return {
            integer: parts[0],
            cents: parts[1] || '00'
        };
    }

    function discountPercent(p) {
        if (!p.oldPrice || !p.price || p.oldPrice <= p.price) return 0;
        return Math.round((1 - (p.price / p.oldPrice)) * 100);
    }

    function productPriceHtml(p) {
        var price = priceParts(p.price);
        var installment = priceParts(p.price / 8);
        var discount = discountPercent(p);

        return (
            '<div class="bp-product-card__price">' +
            '<span class="bp-product-card__old">de ' + currency.format(p.oldPrice) + ' por</span>' +
            '<div class="bp-product-card__price-row">' +
            '<span class="bp-product-card__currency">R$</span>' +
            '<span class="bp-product-card__amount">' + price.integer + '</span>' +
            '<span class="bp-product-card__cents">,' + price.cents + '</span>' +
            (discount ? '<span class="bp-product-card__discount">-' + discount + '%</span>' : '') +
            '</div>' +
            '<span class="bp-product-card__installment">ou até <strong>8x de R$ ' + installment.integer + ',' + installment.cents + '</strong></span>' +
            '</div>'
        );
    }

    function productCardHtml(p) {
        var isFav = state.favorites.has(p.id);
        var insufficient = p.price > getRemainingBalance();
        var cartQty = getCartQuantity(p.id);
        return (
            '<article class="bp-product-card' + (insufficient ? ' is-insufficient' : '') + '" data-product-id="' + p.id + '">' +
            '<div class="bp-product-card__media">' +
            '<span class="bp-product-card__badge">' + p.badge + '</span>' +
            (cartQty ? '<span class="bp-product-card__cart-indicator">No carrinho: ' + cartQty + '</span>' : '') +
            productMediaHtml(p) +
            '</div>' +
            '<button class="favorite-btn bp-product-card__fav' + (isFav ? ' is-active' : '') + '" type="button" data-fav-toggle aria-pressed="' + isFav + '" aria-label="Favoritar ' + p.name + '">♥</button>' +
            '<div class="bp-product-card__meta">' +
            icon('spark', 'icon-xs') +
            '<span>' + p.rating.toFixed(1) + ' · ' + p.soldCount + ' resgatados</span>' +
            '</div>' +
            '<h3 class="bp-product-card__name">' + p.name + '</h3>' +
            productPriceHtml(p) +
            '<button class="btn btn-primary bp-product-card__cta" type="button" data-add-cart ' + (insufficient ? 'disabled aria-disabled="true"' : '') + '>' + (insufficient ? 'Saldo insuficiente' : 'Resgatar') + '</button>' +
            '</article>'
        );
    }

    function renderProductGroup(container, products) {
        container.innerHTML = products.map(productCardHtml).join('');
    }

    function renderProducts() {
        var filtered = getFilteredProducts();
        var searching = isSearchMode();
        var primary = searching ? filtered : filtered.slice(0, 8);
        var secondary = searching ? [] : filtered.slice(8, 13);
        var tertiary = searching ? [] : filtered.slice(13, 18);

        var hasResults = filtered.length > 0;
        els.emptyState.textContent = searching
            ? 'Nenhum produto encontrado para a busca.'
            : 'Nenhum produto encontrado para os filtros selecionados.';
        els.emptyState.hidden = hasResults;
        els.gridPrimary.hidden = !hasResults;
        els.productsSecondary.hidden = secondary.length === 0;
        els.productsTertiary.hidden = tertiary.length === 0;

        renderProductGroup(els.productsPrimary, primary);
        renderProductGroup(els.productsSecondary, secondary);
        renderProductGroup(els.productsTertiary, tertiary);
    }

    page.addEventListener('click', function (e) {
        var favBtn = e.target.closest('[data-fav-toggle]');
        if (favBtn) {
            var card = favBtn.closest('.bp-product-card');
            var id = card.dataset.productId;
            var isFav = state.favorites.has(id);
            if (isFav) {
                state.favorites.delete(id);
            } else {
                state.favorites.add(id);
            }
            saveSet('bp_favorites', state.favorites);
            favBtn.classList.toggle('is-active', !isFav);
            favBtn.setAttribute('aria-pressed', String(!isFav));
            updateWishlistCount();
            renderFavoritesModal();
            return;
        }

        var cartBtn = e.target.closest('[data-add-cart]');
        if (cartBtn) {
            var productCard = cartBtn.closest('.bp-product-card');
            var product = state.data.products.find(function (p) { return p.id === productCard.dataset.productId; });
            if (product && product.price > getRemainingBalance()) {
                showToast('Saldo insuficiente para adicionar este item.');
                return;
            }
            if (addToCart(productCard.dataset.productId)) {
                showToast('"' + (product ? product.name : 'Produto') + '" adicionado ao carrinho.');
            }
            return;
        }

        var detailFav = e.target.closest('[data-detail-fav-toggle]');
        if (detailFav) {
            var detailId = state.activeDetailId;
            if (!detailId) return;
            var detailIsFav = state.favorites.has(detailId);
            if (detailIsFav) {
                state.favorites.delete(detailId);
            } else {
                state.favorites.add(detailId);
            }
            saveSet('bp_favorites', state.favorites);
            updateWishlistCount();
            renderFavoritesModal();
            renderProducts();
            renderDetailModal();
            return;
        }

        var detailAddCart = e.target.closest('[data-detail-add-cart]');
        if (detailAddCart) {
            var detailProductId = state.activeDetailId;
            if (!detailProductId) return;
            var detailProduct = state.data.products.find(function (p) { return p.id === detailProductId; });
            if (detailProduct && detailProduct.price > getRemainingBalance()) {
                showToast('Saldo insuficiente para adicionar este item.');
                return;
            }
            if (addToCart(detailProductId)) {
                showToast('"' + (detailProduct ? detailProduct.name : 'Produto') + '" adicionado ao carrinho.');
            }
            renderDetailModal();
            return;
        }

        var productCardClicked = e.target.closest('.bp-product-card');
        if (productCardClicked) {
            openDetailModal(productCardClicked.dataset.productId);
            return;
        }

        var cartItem = e.target.closest('[data-cart-item-id]');
        if (cartItem) {
            if (e.target.closest('[data-cart-increase]')) {
                changeCartItemQuantity(cartItem.dataset.cartItemId, 1);
                return;
            }
            if (e.target.closest('[data-cart-decrease]')) {
                changeCartItemQuantity(cartItem.dataset.cartItemId, -1);
                return;
            }
            if (e.target.closest('[data-cart-remove]')) {
                requestCartItemRemoval(cartItem.dataset.cartItemId);
            }
        }

        var favoriteItem = e.target.closest('[data-favorite-item-id]');
        if (favoriteItem) {
            if (e.target.closest('[data-favorite-add-cart]')) {
                var favoriteProduct = state.data.products.find(function (p) { return p.id === favoriteItem.dataset.favoriteItemId; });
                if (moveFavoriteToCart(favoriteItem.dataset.favoriteItemId)) {
                    showToast('"' + (favoriteProduct ? favoriteProduct.name : 'Produto') + '" movido para o carrinho.');
                }
                return;
            }
            if (e.target.closest('[data-favorite-remove]')) {
                var removedProduct = state.data.products.find(function (p) { return p.id === favoriteItem.dataset.favoriteItemId; });
                removeFavorite(favoriteItem.dataset.favoriteItemId);
                showToast('"' + (removedProduct ? removedProduct.name : 'Produto') + '" removido dos favoritos.');
            }
        }
    });

    /* Banner lateral */

    function renderSideBanner() {
        var b = state.data.sideBanner;
        els.sideBanner.innerHTML = (
            '<span class="bp-side-banner__icon">' + icon(b.icon) + '</span>' +
            '<h3>' + b.title + '</h3>' +
            '<p>' + b.subtitle + '</p>' +
            '<button class="btn btn-secondary" type="button" data-side-cta>' + b.cta + '</button>'
        );
        els.sideBanner.querySelector('[data-side-cta]').addEventListener('click', function () {
            document.getElementById('bpCategories').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    /* Promoções ativas */

    function renderPromotions() {
        var section = state.data.promotions;
        els.promotions.innerHTML = (
            '<div class="bp-dark-section__head">' +
            '<h2>' + section.title + '</h2>' +
            '<a href="#" data-promo-all>' + section.linkLabel + arrowIcon() + '</a>' +
            '</div>' +
            '<div class="bp-promotions__grid">' +
            section.items.map(function (item) {
                return (
                    '<article class="bp-promo-card">' +
                    '<div class="bp-promo-card__media">' +
                    (item.image ? '<img src="' + item.image + '" alt="" loading="lazy">' : '<span class="bp-promo-card__icon">' + icon(item.icon || 'spark') + '</span>') +
                    '</div>' +
                    '<div class="bp-promo-card__body">' +
                    '<h3>' + item.title + '</h3>' +
                    '<p>' + item.subtitle + '</p>' +
                    '<button type="button" data-promo-cta="' + item.title + '">' + item.cta + icon('chevronRight', 'icon-xs') + '</button>' +
                    '</div>' +
                    '</article>'
                );
            }).join('') +
            '</div>'
        );

        els.promotions.addEventListener('click', function (e) {
            var link = e.target.closest('[data-promo-all]');
            if (link) {
                e.preventDefault();
                showToast('Em breve: todas as promoções ativas.');
                return;
            }
            var cta = e.target.closest('[data-promo-cta]');
            if (cta) {
                showToast('Confira: ' + cta.dataset.promoCta);
                document.getElementById('bpCategories').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    /* Gift cards */

    var GIFTCARD_LABELS = { 'Google Play': 'GP', PlayStation: 'PS' };

    function giftInitials(name) {
        if (GIFTCARD_LABELS[name]) return GIFTCARD_LABELS[name];
        return name.slice(0, 2).toUpperCase();
    }

    function giftMediaHtml(item) {
        var fallback = giftInitials(item.name);
        if (!item.image) return fallback;
        return '<img class="bp-giftcard__photo" src="' + item.image + '" alt="" loading="lazy" onerror="this.remove()">' + fallback;
    }

    function renderGiftCards() {
        var section = state.data.giftCards;
        els.giftCards.innerHTML = (
            '<div class="bp-dark-section__head">' +
            '<h2>' + section.title + '</h2>' +
            '<a href="#" data-gift-all>' + section.linkLabel + arrowIcon() + '</a>' +
            '</div>' +
            '<div class="bp-giftcards__grid">' +
            section.items.map(function (item) {
                return (
                    '<button class="bp-giftcard" type="button" data-gift="' + item.name + '">' +
                    '<span class="bp-giftcard__logo">' + giftMediaHtml(item) + '</span>' +
                    '<span>' + item.name + '</span>' +
                    '</button>'
                );
            }).join('') +
            '</div>'
        );

        els.giftCards.addEventListener('click', function (e) {
            var link = e.target.closest('[data-gift-all]');
            if (link) {
                e.preventDefault();
                showToast('Em breve: todos os gift cards.');
                return;
            }
            var tile = e.target.closest('[data-gift]');
            if (tile) {
                showToast('Gift card ' + tile.dataset.gift + ' disponível para resgate.');
            }
        });
    }

    /* Banner final */

    function renderFinalBanner() {
        var b = state.data.finalBanner;
        els.finalBanner.innerHTML = (
            '<div>' +
            '<h2>' + b.title + '</h2>' +
            '<p>' + b.subtitle + '</p>' +
            '</div>' +
            '<button class="btn btn-primary" type="button" data-final-cta>' + b.cta + '</button>'
        );
        els.finalBanner.querySelector('[data-final-cta]').addEventListener('click', function () {
            document.getElementById('bpCategories').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (els.cartCheckout) {
        els.cartCheckout.addEventListener('click', function () {
            if (!state.cartItems.length) {
                closeCartModal();
                document.getElementById('bpCategories').scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            showToast('Fluxo de checkout em definição. Itens salvos no carrinho.');
        });
    }
})();
