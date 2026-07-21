/* Home da loja: hero, promoções, categorias, filtros, catálogo, favoritos e carrinho. */

(function () {
    'use strict';

    var page = document.getElementById('shopHomePage');
    if (!page) return;

    var ICONS = {
        grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"></rect><rect x="13" y="4" width="7" height="7" rx="1.5"></rect><rect x="4" y="13" width="7" height="7" rx="1.5"></rect><rect x="13" y="13" width="7" height="7" rx="1.5"></rect>',
        gift: '<path d="M4 10h16v10H4V10Z"></path><path d="M2 7h20v3H2z"></path><path d="M12 7v13"></path><path d="M12 7c0-2.2-1.8-4-4-4-1.7 0-2.6 1.8-1 3s3.6 1 5 1Z"></path><path d="M12 7c0-2.2 1.8-4 4-4 1.7 0 2.6 1.8 1 3s-3.6 1-5 1Z"></path>',
        spark: '<path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z"></path>',
        plane: '<path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7Z"></path>',
        chip: '<rect x="6" y="6" width="12" height="12" rx="2"></rect><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"></path>',
        home: '<path d="M4 10.5 12 4l8 6.5"></path><path d="M6 9.5V20h12V9.5"></path><path d="M10 20v-6h4v6"></path>',
        cutlery: '<path d="M7 3v6a2 2 0 0 0 2 2"></path><path d="M7 3v9M11 3v6a2 2 0 0 1-2 2"></path><path d="M9 12v9"></path><path d="M16 3c-1.5 0-2.5 1.6-2.5 4.5S14.5 12 16 12s2.5-1.6 2.5-4.5S17.5 3 16 3Z"></path><path d="M16 12v9"></path>',
        notebook: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 3v18"></path><path d="M13 8h3M13 12h3"></path>',
        wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z"></path>',
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
        chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
        chevronRight: '<path d="m9 18 6-6-6-6"></path>'
    };

    function icon(key, cls) {
        return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[key] || ICONS.gift) + '</svg>';
    }

    function arrowIcon() {
        return '<svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>';
    }

    function trashIcon() {
        return '<svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"></path><path d="M10 3h4"></path><path d="M9 3h6l1 2H8l1-2Z"></path><path d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>';
    }

    function ratingIconHtml() {
        return '<img class="icon-xs" src="assets/hero/star.svg" alt="" aria-hidden="true">';
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
        return Object.keys(grouped).map(function (id) { return { id: id, qty: grouped[id] }; });
    }

    var state = {
        data: null,
        activeCategory: 'todos',
        activeFilter: 'reset',
        advancedFilters: {
            classification: 'all',
            supplier: 'all',
            category: 'all',
            shop: 'all',
            priceMin: 0,
            priceMax: 0
        },
        draftAdvancedFilters: null,
        draftRangeInputs: null,
        filterMeta: null,
        openFilterSection: 'range',
        search: '',
        currentPage: 1,
        perPage: 8,
        favorites: loadSet('bp_favorites'),
        cartCount: loadNumber('bp_cart_count'),
        cartItems: normalizeCartItems(loadList('bp_cart_items')),
        heroIndex: 0,
        heroTimer: null,
        removeCartItemId: null,
        activeGiftName: null,
        balanceModalOpen: false,
        cartModalOpen: false,
        favoritesModalOpen: false,
        detailModalOpen: false,
        activeDetailId: null
    };

    var els = {
        breadcrumb: document.getElementById('bpBreadcrumb'),
        balance: document.getElementById('bpBalance'),
        balanceValue: document.querySelector('#bpBalance .bp-balance__value'),
        wishlistBtn: document.getElementById('bpWishlistBtn'),
        wishlistCount: document.getElementById('bpWishlistCount'),
        cartBtn: document.getElementById('bpCartBtn'),
        cartCount: document.getElementById('bpCartCount'),
        hero: document.getElementById('bpHero'),
        heroTrack: document.getElementById('bpHeroTrack'),
        heroDots: document.getElementById('bpHeroDots'),
        heroPrev: document.getElementById('bpHeroPrev'),
        heroNext: document.getElementById('bpHeroNext'),
        promoTitle: document.getElementById('shopPromoTitle'),
        promoSubtitle: document.getElementById('shopPromoSubtitle'),
        promoGrid: document.getElementById('shopPromoGrid'),
        giftCards: document.getElementById('bpGiftCards'),
        giftModal: document.getElementById('bpGiftModal'),
        giftOverlay: document.getElementById('bpGiftOverlay'),
        giftClose: document.getElementById('bpGiftClose'),
        giftBrand: document.getElementById('bpGiftBrand'),
        giftTitle: document.getElementById('bpGiftTitle'),
        giftHint: document.getElementById('bpGiftHint'),
        giftOptions: document.getElementById('bpGiftOptions'),
        categories: document.getElementById('bpCategories'),
        search: document.getElementById('bpSearch'),
        filters: document.getElementById('bpFilters'),
        filterTrigger: document.getElementById('shopFilterTrigger'),
        clearFilters: document.getElementById('shopClearFilters'),
        filterModal: document.getElementById('shopFilterModal'),
        filterOverlay: document.getElementById('shopFilterOverlay'),
        filterClose: document.getElementById('shopFilterClose'),
        filterPanel: document.getElementById('shopFilterPanel'),
        filterBody: document.getElementById('shopFilterBody'),
        filterClear: document.getElementById('shopFilterClear'),
        filterApply: document.getElementById('shopFilterApply'),
        pageIndicator: document.getElementById('shopPageIndicator'),
        productsTitle: document.getElementById('shopProductsTitle'),
        productsSubtitle: document.getElementById('shopProductsSubtitle'),
        productsPrimary: document.getElementById('bpProductsPrimary'),
        emptyState: document.getElementById('bpEmptyState'),
        pagination: document.getElementById('shopPagination'),
        secondaryBanner: document.getElementById('shopSecondaryBanner'),
        partnersTitle: document.getElementById('shopPartnersTitle'),
        partnersSubtitle: document.getElementById('shopPartnersSubtitle'),
        partnersGrid: document.getElementById('shopPartnersGrid'),
        toast: document.getElementById('bpToast'),
        skeleton: document.getElementById('shopHomeSkeleton'),
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
        cartModal: document.getElementById('bpCartModal'),
        cartOverlay: document.getElementById('bpCartOverlay'),
        cartCard: document.getElementById('bpCartCard'),
        cartClose: document.getElementById('bpCartClose'),
        cartItems: document.getElementById('bpCartItems'),
        cartTotal: document.getElementById('bpCartTotal'),
        cartSummary: document.getElementById('bpCartSummary'),
        cartHint: document.getElementById('bpCartHint'),
        cartCheckout: document.getElementById('bpCartCheckout'),
        favoritesModal: document.getElementById('bpFavoritesModal'),
        favoritesOverlay: document.getElementById('bpFavoritesOverlay'),
        favoritesCard: document.getElementById('bpFavoritesCard'),
        favoritesClose: document.getElementById('bpFavoritesClose'),
        favoritesItems: document.getElementById('bpFavoritesItems'),
        favoritesHint: document.getElementById('bpFavoritesHint'),
        cartRemoveModal: document.getElementById('bpCartRemoveModal'),
        cartRemoveClose: document.getElementById('bpCartRemoveClose'),
        cartRemoveCancel: document.getElementById('bpCartRemoveCancel'),
        cartRemoveConfirm: document.getElementById('bpCartRemoveConfirm'),
        cartRemoveDescription: document.getElementById('bpCartRemoveDescription'),
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
        detailAddCart: document.getElementById('bpDetailAddCart')
    };

    fetch(page.dataset.jsonUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            state.data = data;
            init();
        })
        .catch(function (err) {
            console.error('Não foi possível carregar os dados da loja.', err);
            showLoadError();
        });

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
            }, 280);
        });
    }

    function init() {
        buildFilterMeta();
        renderBreadcrumb();
        renderHero();
        renderPromotions();
        renderGiftCards();
        renderCategories();
        renderFilters();
        renderSecondaryBanner();
        renderPartners();
        renderSectionTitles();
        enhanceScrollableRail(els.categories, 'categorias');
        enhanceScrollableRail(els.filters, 'filtros');
        bindSearch();
        bindHeroNav();
        bindModals();
        bindStaticActions();
        syncCartState();
        setPageReady();
    }

    function setPageReady() {
        page.classList.remove('is-loading');
        page.classList.add('is-ready');
        page.querySelector('.bp-content-ready').removeAttribute('aria-hidden');
    }

    function showLoadError() {
        if (!els.skeleton) return;
        els.skeleton.innerHTML = '<div class="bp-skeleton__error" role="alert"><strong>Não foi possível carregar a loja.</strong><span>Atualize a página ou tente novamente em instantes.</span></div>';
    }

    function renderBreadcrumb() {
        els.breadcrumb.innerHTML = state.data.breadcrumb.map(function (item) {
            var inner = item.href ? '<a href="' + item.href + '">' + item.label + '</a>' : '<span>' + item.label + '</span>';
            return '<li>' + inner + '</li>';
        }).join('');
    }

    function updateBalance() {
        els.balanceValue.textContent = currency.format(state.data.balance);
    }

    function updateWishlistCount() {
        els.wishlistCount.textContent = state.favorites.size;
        els.wishlistCount.dataset.empty = state.favorites.size === 0;
    }

    function updateCartCount() {
        els.cartCount.textContent = state.cartCount;
        els.cartCount.dataset.empty = state.cartCount === 0;
    }

    function getFavoriteProducts() {
        return Array.from(state.favorites).map(findItemById).filter(Boolean);
    }

    function getCartProducts() {
        return state.cartItems.map(function (item) {
            var product = findItemById(item.id);
            if (!product) return null;
            return { id: item.id, qty: item.qty, product: product, lineTotal: product.price * item.qty };
        }).filter(Boolean);
    }

    function getCartQuantity(productId) {
        var entry = state.cartItems.find(function (item) { return item.id === productId; });
        return entry ? entry.qty : 0;
    }

    function getCartTotal() {
        return getCartProducts().reduce(function (sum, item) { return sum + item.lineTotal; }, 0);
    }

    function getRemainingBalance() {
        return Math.max(0, state.data.balance - getCartTotal());
    }

    function getUsagePercent() {
        return state.data.balance ? (getCartTotal() / state.data.balance) * 100 : 0;
    }

    function getEligibleProductCount() {
        var remaining = getRemainingBalance();
        return state.data.products.filter(function (product) { return product.price <= remaining; }).length;
    }

    function updateBalanceDetails() {
        var total = getCartTotal();
        var remaining = getRemainingBalance();
        var percent = getUsagePercent();
        var circumference = 2 * Math.PI * 44;
        var displayPercent = (Math.ceil(percent * 100) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
        updateBalance();
        els.balanceTitle.textContent = currency.format(state.data.balance);
        els.balanceEligibleProducts.textContent = getEligibleProductCount() + ' produtos';
        els.balanceUsagePercent.textContent = displayPercent;
        els.balanceCartValue.textContent = currency.format(total);
        els.balanceRemainingValue.textContent = currency.format(remaining);
        els.balanceRing.style.strokeDasharray = String(circumference);
        els.balanceRing.style.strokeDashoffset = String(circumference * (1 - Math.min(percent, 100) / 100));
        els.balance.classList.toggle('is-warning', percent >= 75);
        els.balanceCard.classList.toggle('is-warning', percent >= 75);
        els.balanceCard.classList.toggle('is-empty-cart', total === 0);
    }

    function syncCartState() {
        state.cartItems = normalizeCartItems(state.cartItems);
        state.cartCount = state.cartItems.reduce(function (sum, item) { return sum + item.qty; }, 0);
        saveList('bp_cart_items', state.cartItems);
        saveNumber('bp_cart_count', state.cartCount);
        updateBalanceDetails();
        updateWishlistCount();
        updateCartCount();
        renderProducts();
        renderCartModal();
        renderFavoritesModal();
        if (state.detailModalOpen) renderDetailModal();
    }

    function renderSectionTitles() {
        els.productsTitle.textContent = state.data.productsSection.title;
        els.productsSubtitle.textContent = state.data.productsSection.subtitle;
        els.partnersTitle.textContent = state.data.partnersSection.title;
        els.partnersSubtitle.textContent = state.data.partnersSection.subtitle;
    }

    function renderHero() {
        els.heroTrack.innerHTML = state.data.heroSlides.map(function (slide) {
            return '<article class="bp-hero__slide">' +
                '<div class="bp-hero__content">' +
                '<span class="bp-hero__eyebrow">' + slide.eyebrow + '</span>' +
                '<div><h2>' + slide.title + '</h2><p>' + slide.subtitle + '</p></div>' +
                '<div class="hero-actions"><button class="btn btn-primary" type="button" data-hero-cta="' + slide.id + '">' + slide.cta + '</button></div>' +
                '</div>' +
                '<div class="bp-hero__icon">' +
                (slide.image ? '<img class="bp-hero__photo" src="' + slide.image + '" alt="" loading="lazy">' : icon(slide.icon)) +
                '</div>' +
                '</article>';
        }).join('');
        els.heroDots.innerHTML = state.data.heroSlides.map(function (_, index) {
            return '<button class="bp-hero__dot' + (index === 0 ? ' is-active' : '') + '" type="button" data-hero-dot="' + index + '" aria-label="Ir para slide ' + (index + 1) + '"></button>';
        }).join('');
        updateHero();
    }

    function updateHero() {
        els.heroTrack.style.transform = 'translateX(' + (state.heroIndex * -100) + '%)';
        Array.prototype.forEach.call(els.heroDots.children, function (dot, index) {
            dot.classList.toggle('is-active', index === state.heroIndex);
        });
    }

    function nextHero(step) {
        var total = state.data.heroSlides.length;
        state.heroIndex = (state.heroIndex + step + total) % total;
        updateHero();
    }

    function restartHeroTimer() {
        if (state.heroTimer) clearInterval(state.heroTimer);
        state.heroTimer = setInterval(function () { nextHero(1); }, 5500);
    }

    function bindHeroNav() {
        els.heroPrev.addEventListener('click', function () { nextHero(-1); restartHeroTimer(); });
        els.heroNext.addEventListener('click', function () { nextHero(1); restartHeroTimer(); });
        els.heroDots.addEventListener('click', function (event) {
            var dot = event.target.closest('[data-hero-dot]');
            if (!dot) return;
            state.heroIndex = parseInt(dot.dataset.heroDot, 10) || 0;
            updateHero();
            restartHeroTimer();
        });
        restartHeroTimer();
    }

    function renderPromotions() {
        var section = state.data.promotionsSection;
        els.promoTitle.textContent = section.title;
        els.promoSubtitle.textContent = section.subtitle;
        els.promoGrid.innerHTML = section.items.map(function (item) {
            return '<article class="shop-home__promo-card">' +
                '<div class="shop-home__promo-media">' +
                '<span class="shop-home__promo-badge">' + item.badge + '</span>' +
                '<img src="' + item.image + '" alt="" loading="lazy">' +
                '</div>' +
                '<div class="shop-home__promo-body">' +
                '<h3>' + item.title + '</h3>' +
                '<p>' + item.subtitle + '</p>' +
                '<button class="btn btn-primary shop-home__promo-cta" type="button" data-promo-target="' + item.targetCategory + '">' + item.cta + '</button>' +
                '</div>' +
                '</article>';
        }).join('');
    }

    var GIFTCARD_LABELS = { 'Google Play': 'GP', PlayStation: 'PS' };

    function giftInitials(name) {
        if (GIFTCARD_LABELS[name]) return GIFTCARD_LABELS[name];
        return name.slice(0, 2).toUpperCase();
    }

    function renderGiftCards() {
        var section = state.data.giftCards;
        els.giftCards.innerHTML = '<div class="bp-dark-section__head"><h2>' + section.title + '</h2><a href="#" data-gift-all>' + section.linkLabel + arrowIcon() + '</a></div>' +
            '<div class="bp-giftcards__grid">' +
            section.items.map(function (item) {
                return '<button class="bp-giftcard" type="button" data-gift="' + item.name + '"><span class="bp-giftcard__logo"><img class="bp-giftcard__photo" src="' + item.image + '" alt="" loading="lazy">' + giftInitials(item.name) + '</span><span>' + item.name + '</span></button>';
            }).join('') +
            '</div>';
    }

    function getGiftValueOptions(item) {
        var values = item.values || [20, 50, 100];
        return values.map(function (value) {
            return {
                id: 'gift-' + slugify(item.name) + '-' + value,
                name: item.name + ' - R$ ' + value,
                brandName: item.name,
                badge: 'Gift card',
                category: 'giftcards',
                type: 'digital',
                redeemNow: true,
                rating: 5,
                soldCount: 0,
                oldPrice: value,
                price: value,
                icon: 'gift',
                image: item.image,
                isPersonalized: false,
                isGiftCard: true,
                giftValue: value
            };
        });
    }

    function getGiftCatalogItems() {
        return (state.data.giftCards.items || []).reduce(function (acc, item) {
            return acc.concat(getGiftValueOptions(item));
        }, []);
    }

    function renderCategories() {
        updateCategoryMode();
        els.categories.innerHTML = state.data.categories.map(function (category) {
            var isActive = category.id === state.activeCategory;
            return '<button class="bp-category' + (isActive ? ' is-active' : '') + '" type="button" data-category="' + category.id + '" aria-pressed="' + isActive + '">' +
                '<span class="bp-category__icon" style="--category-color:' + (category.color || '#111111') + '">' +
                (category.iconPath ? '<img src="' + category.iconPath + '" alt="" loading="lazy">' : icon(category.icon)) +
                '</span>' +
                '<span class="bp-category__label">' + category.label + '</span>' +
                '</button>';
        }).join('');
    }

    function updateCategoryMode() {
        els.categories.classList.toggle('is-showing-all', state.activeCategory === 'todos');
    }

    function buildFilterMeta() {
        var products = state.data.products || [];
        var prices = products.map(function (product) { return product.price; });
        var priceMin = prices.length ? Math.floor(Math.min.apply(Math, prices)) : 0;
        var priceMax = prices.length ? Math.ceil(Math.max.apply(Math, prices)) : 0;
        state.filterMeta = {
            priceMin: priceMin,
            priceMax: priceMax,
            classifications: [
                { id: 'all', label: 'Todas' },
                { id: 'most-redeemed', label: 'Mais resgatados' },
                { id: 'lowest-price', label: 'Menor valor' },
                { id: 'personalizados', label: 'Personalizados' },
                { id: 'redeem-now', label: 'Resgatáveis agora' }
            ],
            suppliers: [
                { id: 'all', label: 'Todos' },
                { id: 'bipper-store', label: 'Bipper Store' },
                { id: 'upper-premios', label: 'Upper Prêmios' },
                { id: 'magalu', label: 'Magalu' },
                { id: 'campanhas-plus', label: 'Campanhas+' }
            ],
            categories: [{ id: 'all', label: 'Todas' }].concat((state.data.categories || [])
                .filter(function (category) { return category.id !== 'todos'; })
                .map(function (category) { return { id: category.id, label: category.label }; })),
            shops: [
                { id: 'all', label: 'Todas' },
                { id: 'catalogo-geral', label: 'Catálogo geral' },
                { id: 'resgate-imediato', label: 'Resgate imediato' },
                { id: 'sob-encomenda', label: 'Sob encomenda' },
                { id: 'campanha-premium', label: 'Campanha premium' }
            ]
        };
        state.advancedFilters.priceMin = priceMin;
        state.advancedFilters.priceMax = priceMax;
    }

    function getFilterCount(filterId) {
        var products = state.data.products || [];
        if (filterId === 'personalizados') return products.filter(function (p) { return p.isPersonalized; }).length;
        if (filterId === 'redeem-now') return products.filter(function (p) { return p.redeemNow; }).length;
        return products.length;
    }

    function renderFilters() {
        els.filters.innerHTML = state.data.filters.map(function (filter) {
            var count = getFilterCount(filter.id);
            return '<button class="filter-chip' + (filter.id === state.activeFilter ? ' is-active' : '') + '" type="button" data-filter="' + filter.id + '">' + filter.label + '<span>' + count + '</span></button>';
        }).join('');
        updateFilterTriggerState();
    }

    function getDefaultAdvancedFilters() {
        return {
            classification: 'all',
            supplier: 'all',
            category: 'all',
            shop: 'all',
            priceMin: state.filterMeta.priceMin,
            priceMax: state.filterMeta.priceMax
        };
    }

    function cloneAdvancedFilters(filters) {
        return {
            classification: filters.classification,
            supplier: filters.supplier,
            category: filters.category,
            shop: filters.shop,
            priceMin: filters.priceMin,
            priceMax: filters.priceMax
        };
    }

    function syncDraftRangeInputsFromFilters(filters) {
        state.draftRangeInputs = [
            String(filters.priceMin),
            String(filters.priceMax)
        ];
    }

    function hasAdvancedFiltersApplied() {
        var defaults = getDefaultAdvancedFilters();
        return Object.keys(defaults).some(function (key) { return defaults[key] !== state.advancedFilters[key]; });
    }

    function hasDraftFilterChanges() {
        if (!state.draftAdvancedFilters) return false;
        return Object.keys(state.draftAdvancedFilters).some(function (key) {
            return state.draftAdvancedFilters[key] !== state.advancedFilters[key];
        });
    }

    function updateFilterTriggerState() {
        var hasFilters = hasAdvancedFiltersApplied();
        els.filterTrigger.classList.toggle('has-active-filters', hasFilters);
        els.clearFilters.hidden = !hasFilters;
    }

    function formatCompactCurrency(value) {
        return currency.format(value).replace(/\u00a0/g, ' ');
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getAdvancedFilterLabel(groupKey, optionId) {
        var listKey = groupKey === 'category' ? 'categories' : groupKey + 's';
        var options = state.filterMeta[listKey] || [];
        var match = options.find(function (item) { return item.id === optionId; });
        return match ? match.label : '';
    }

    function renderFilterModal() {
        if (!els.filterBody) return;
        var draft = state.draftAdvancedFilters || cloneAdvancedFilters(state.advancedFilters);
        if (!state.draftRangeInputs) {
            syncDraftRangeInputsFromFilters(draft);
        }
        var sections = [
            {
                id: 'classification',
                title: 'Classificação',
                body: renderFilterOptions('classification', state.filterMeta.classifications, draft.classification)
            },
            {
                id: 'supplier',
                title: 'Fornecedor',
                body: renderFilterOptions('supplier', state.filterMeta.suppliers, draft.supplier)
            },
            {
                id: 'category',
                title: 'Categoria',
                body: renderFilterOptions('category', state.filterMeta.categories, draft.category)
            },
            {
                id: 'shop',
                title: 'Loja',
                body: renderFilterOptions('shop', state.filterMeta.shops, draft.shop)
            }
        ];

        els.filterBody.innerHTML = '<section class="shop-filter-group shop-filter-group--range is-open">' +
            '<div class="shop-filter-group__trigger" aria-hidden="true">' +
            '<span class="shop-filter-group__title">Faixa de valores</span>' +
            '</div>' +
            '<div class="shop-filter-group__body" style="display:block;">' + renderPriceRangeSection(draft) + '</div>' +
            '</section>' +
            sections.map(function (section) {
            var isOpen = state.openFilterSection === section.id;
            return '<section class="shop-filter-group' + (isOpen ? ' is-open' : '') + '" data-filter-section="' + section.id + '">' +
                '<button class="shop-filter-group__trigger" type="button" data-filter-section-trigger="' + section.id + '" aria-expanded="' + isOpen + '">' +
                '<span class="shop-filter-group__title">' + section.title + '</span>' +
                '<svg class="shop-filter-group__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>' +
                '</button>' +
                '<div class="shop-filter-group__body">' + section.body + '</div>' +
                '</section>';
        }).join('');

        updateFilterApplyState();
        updateFilterClearState();
    }

    function renderPriceRangeSection(filters) {
        var min = state.filterMeta.priceMin;
        var max = state.filterMeta.priceMax;
        var startPercent = max === min ? 0 : ((filters.priceMin - min) / (max - min)) * 100;
        var endPercent = max === min ? 100 : ((filters.priceMax - min) / (max - min)) * 100;
        var inputValues = state.draftRangeInputs || [String(filters.priceMin), String(filters.priceMax)];
        return '<div class="shop-filter-range">' +
            '<div class="shop-filter-range__values">' +
            '<label class="shop-filter-range__field">' +
            '<input class="shop-filter-range__number" type="text" inputmode="numeric" value="' + inputValues[0] + '" data-range-number="min" aria-label="Valor mínimo">' +
            '</label>' +
            '<label class="shop-filter-range__field">' +
            '<input class="shop-filter-range__number" type="text" inputmode="numeric" value="' + inputValues[1] + '" data-range-number="max" aria-label="Valor máximo">' +
            '</label>' +
            '</div>' +
            '<div class="shop-filter-range__track">' +
            '<span class="shop-filter-range__line"></span>' +
            '<span class="shop-filter-range__active" style="left:' + startPercent + '%;right:' + (100 - endPercent) + '%;"></span>' +
            '<input class="shop-filter-range__input" type="range" min="' + min + '" max="' + max + '" value="' + filters.priceMin + '" step="1" data-range-input="min">' +
            '<input class="shop-filter-range__input" type="range" min="' + min + '" max="' + max + '" value="' + filters.priceMax + '" step="1" data-range-input="max">' +
            '</div>' +
            '</div>';
    }

    function renderFilterOptions(groupKey, options, selected) {
        return '<div class="shop-filter-options">' + options.map(function (option) {
            var checked = option.id === selected;
            return '<label class="shop-filter-option">' +
                '<input type="radio" name="shop-filter-' + groupKey + '" value="' + option.id + '" ' + (checked ? 'checked' : '') + ' data-filter-option="' + groupKey + '">' +
                '<span class="shop-filter-option__dot"></span>' +
                '<span>' + option.label + '</span>' +
                '</label>';
        }).join('') + '</div>';
    }

    function updateFilterApplyState() {
        var disabled = !hasDraftFilterChanges();
        els.filterApply.disabled = disabled;
        els.filterApply.setAttribute('aria-disabled', String(disabled));
    }

    function updateFilterClearState() {
        var defaults = getDefaultAdvancedFilters();
        var source = state.draftAdvancedFilters || state.advancedFilters;
        var disabled = !Object.keys(defaults).some(function (key) { return defaults[key] !== source[key]; });
        els.filterClear.disabled = disabled;
        els.filterClear.setAttribute('aria-disabled', String(disabled));
    }

    function positionFilterModal() {
        if (els.filterModal.hidden || !els.filterPanel) return;
        if (window.innerWidth <= 640) {
            els.filterPanel.style.top = '';
            els.filterPanel.style.left = '';
            els.filterPanel.style.right = '';
            return;
        }
        var triggerRect = els.filterTrigger.getBoundingClientRect();
        var panelWidth = Math.min(320, window.innerWidth - 24);
        var top = triggerRect.bottom + 12;
        var left = triggerRect.left;
        var maxLeft = window.innerWidth - panelWidth - 12;
        left = Math.max(12, Math.min(left, maxLeft));
        els.filterPanel.style.top = top + 'px';
        els.filterPanel.style.left = left + 'px';
        els.filterPanel.style.right = 'auto';
    }

    function openFilterModal() {
        state.draftAdvancedFilters = cloneAdvancedFilters(state.advancedFilters);
        syncDraftRangeInputsFromFilters(state.draftAdvancedFilters);
        renderFilterModal();
        els.filterModal.hidden = false;
        document.body.classList.add('bp-modal-open');
        positionFilterModal();
    }

    function closeFilterModal() {
        state.draftAdvancedFilters = null;
        state.draftRangeInputs = null;
        els.filterModal.hidden = true;
        document.body.classList.remove('bp-modal-open');
    }

    function applyAdvancedFilters() {
        if (!state.draftAdvancedFilters || !hasDraftFilterChanges()) return;
        state.advancedFilters = cloneAdvancedFilters(state.draftAdvancedFilters);
        var classification = state.advancedFilters.classification;
        state.activeFilter = (classification === 'all') ? 'reset' : classification;
        state.activeCategory = state.advancedFilters.category === 'all' ? 'todos' : state.advancedFilters.category;
        state.currentPage = 1;
        renderCategories();
        renderFilters();
        renderProducts();
        closeFilterModal();
    }

    function clearAdvancedFilters(target) {
        var defaults = getDefaultAdvancedFilters();
        if (target === 'draft') {
            state.draftAdvancedFilters = cloneAdvancedFilters(defaults);
            syncDraftRangeInputsFromFilters(state.draftAdvancedFilters);
            renderFilterModal();
            return;
        }
        state.advancedFilters = cloneAdvancedFilters(defaults);
        state.activeFilter = 'reset';
        state.activeCategory = 'todos';
        state.search = '';
        state.currentPage = 1;
        if (els.search) {
            els.search.value = '';
        }
        updateSearchMode();
        renderCategories();
        renderFilters();
        renderProducts();
    }

    function bindSearch() {
        if (!els.search) return;
        els.search.addEventListener('input', function () {
            state.search = els.search.value;
            state.currentPage = 1;
            updateSearchMode();
            renderProducts();
        });
    }

    function isSearchMode() {
        return state.search.trim().length > 0;
    }

    function updateSearchMode() {
        page.classList.toggle('is-searching', isSearchMode());
    }

    function getSupplierForProduct(product) {
        if (product.category === 'eletronicos') return 'magalu';
        if (product.category === 'brindes' || product.category === 'materiais-graficos') return 'bipper-store';
        if (product.category === 'viagens') return 'upper-premios';
        return 'campanhas-plus';
    }

    function getShopGroupForProduct(product) {
        if (product.redeemNow) return 'resgate-imediato';
        if (product.price >= 80) return 'campanha-premium';
        return 'sob-encomenda';
    }

    function renderPartners() {
        els.partnersGrid.innerHTML = state.data.partners.map(function (partner) {
            return '<article class="shop-home__partner-card"><div class="shop-home__partner-mark"><span>' + partner.name + '</span></div></article>';
        }).join('');
    }

    function renderSecondaryBanner() {
        var banner = state.data.secondaryBanner;
        els.secondaryBanner.innerHTML = '<div><span class="shop-home__secondary-eyebrow">' + banner.eyebrow + '</span><h2>' + banner.title + '</h2><p>' + banner.subtitle + '</p></div><button class="btn btn-primary" type="button" data-secondary-cta>' + banner.cta + '</button>';
    }

    function getFilteredProducts() {
        var query = state.search.trim().toLowerCase();
        var list = state.data.products.filter(function (product) {
            if (query && product.name.toLowerCase().indexOf(query) === -1) return false;
            if (product.price < state.advancedFilters.priceMin || product.price > state.advancedFilters.priceMax) return false;
            if (state.advancedFilters.supplier !== 'all' && getSupplierForProduct(product) !== state.advancedFilters.supplier) return false;
            if (state.advancedFilters.shop !== 'all' && getShopGroupForProduct(product) !== state.advancedFilters.shop) return false;
            if (state.activeCategory !== 'todos' && product.category !== state.activeCategory) return false;
            if (state.activeFilter === 'personalizados' && !product.isPersonalized) return false;
            if (state.activeFilter === 'redeem-now' && !product.redeemNow) return false;
            if (query) return true;
            return true;
        });

        if (!query && state.activeFilter === 'most-redeemed') {
            list = list.slice().sort(function (a, b) { return b.soldCount - a.soldCount; });
        } else if (!query && state.activeFilter === 'lowest-price') {
            list = list.slice().sort(function (a, b) { return a.price - b.price; });
        }

        return list;
    }

    function getPagedProducts(products) {
        var start = (state.currentPage - 1) * state.perPage;
        return products.slice(start, start + state.perPage);
    }

    function priceParts(value) {
        var formatted = currency.format(value).replace(/\s/g, ' ').replace('R$ ', '').split(',');
        return { integer: formatted[0], cents: formatted[1] || '00' };
    }

    function discountPercent(product) {
        if (!product.oldPrice || product.oldPrice <= product.price) return 0;
        return Math.round((1 - (product.price / product.oldPrice)) * 100);
    }

    function productMediaHtml(product) {
        var fallback = '<span class="bp-product-card__fallback">' + icon(product.icon) + '</span>';
        if (!product.image) return fallback;
        return '<img class="bp-product-card__photo" src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><span class="bp-product-card__fallback" hidden>' + icon(product.icon) + '</span>';
    }

    function modalMediaHtml(product) {
        if (product.image) {
            return '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">';
        }
        return '<span class="bp-product-card__fallback">' + icon(product.icon) + '</span>';
    }

    function productPriceHtml(product) {
        var price = priceParts(product.price);
        var installment = priceParts(product.price / 8);
        var discount = discountPercent(product);
        return '<div class="bp-product-card__price"><span class="bp-product-card__old">de ' + currency.format(product.oldPrice) + ' por</span><div class="bp-product-card__price-row"><span class="bp-product-card__currency">R$</span><span class="bp-product-card__amount">' + price.integer + '</span><span class="bp-product-card__cents">,' + price.cents + '</span>' + (discount ? '<span class="bp-product-card__discount">-' + discount + '%</span>' : '') + '</div><span class="bp-product-card__installment">ou até <strong>8x de R$ ' + installment.integer + ',' + installment.cents + '</strong></span></div>';
    }

    function productCardHtml(product) {
        var isFav = state.favorites.has(product.id);
        var insufficient = product.price > getRemainingBalance();
        var cartQty = getCartQuantity(product.id);
        return '<article class="bp-product-card' + (insufficient ? ' is-insufficient' : '') + '" data-product-id="' + product.id + '">' +
            '<div class="bp-product-card__media"><span class="bp-product-card__badge">' + product.badge + '</span>' + (cartQty ? '<span class="bp-product-card__cart-indicator">No carrinho: ' + cartQty + '</span>' : '') + productMediaHtml(product) + '</div>' +
            '<button class="favorite-btn bp-product-card__fav' + (isFav ? ' is-active' : '') + '" type="button" data-fav-toggle aria-pressed="' + isFav + '" aria-label="Favoritar ' + product.name + '">♥</button>' +
            '<div class="bp-product-card__meta">' + ratingIconHtml() + '<span>' + product.rating.toFixed(1) + ' · ' + product.soldCount + ' resgatados</span></div>' +
            '<h3 class="bp-product-card__name">' + product.name + '</h3>' +
            productPriceHtml(product) +
            '<button class="btn btn-primary bp-product-card__cta" type="button" data-add-cart ' + (insufficient ? 'disabled aria-disabled="true"' : '') + '>' + (insufficient ? 'Saldo insuficiente' : 'Resgatar') + '</button>' +
            '</article>';
    }

    function renderProducts() {
        var filtered = getFilteredProducts();
        var searching = isSearchMode();
        var totalPages = searching ? 1 : Math.max(1, Math.ceil(filtered.length / state.perPage));
        if (state.currentPage > totalPages) state.currentPage = totalPages;
        var paged = searching ? filtered : getPagedProducts(filtered);
        els.productsPrimary.innerHTML = paged.map(productCardHtml).join('');
        els.emptyState.hidden = filtered.length > 0;
        els.emptyState.textContent = searching ? 'Nenhum produto encontrado para a busca.' : 'Nenhum produto encontrado para os filtros selecionados.';
        els.pageIndicator.textContent = searching ? 'Resultados da busca' : 'Página ' + state.currentPage + ' de ' + totalPages;
        els.pagination.hidden = searching;
        renderPagination(totalPages);
        animateContentSwap([els.productsPrimary, els.emptyState, els.pagination]);
    }

    function renderPagination(totalPages) {
        if (isSearchMode()) {
            els.pagination.innerHTML = '';
            return;
        }
        if (totalPages <= 1) {
            els.pagination.innerHTML = '';
            return;
        }
        var html = '<button class="shop-home__page-btn" type="button" data-page="' + Math.max(1, state.currentPage - 1) + '" aria-label="Página anterior">‹</button>';
        for (var pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
            html += '<button class="shop-home__page-btn' + (pageNumber === state.currentPage ? ' is-active' : '') + '" type="button" data-page="' + pageNumber + '">' + pageNumber + '</button>';
        }
        html += '<button class="shop-home__page-btn" type="button" data-page="' + Math.min(totalPages, state.currentPage + 1) + '" aria-label="Próxima página">›</button>';
        els.pagination.innerHTML = html;
    }

    function findProductById(id) {
        return state.data.products.find(function (product) { return product.id === id; });
    }

    function findGiftCardByName(name) {
        return (state.data.giftCards.items || []).find(function (item) { return item.name === name; });
    }

    function findItemById(id) {
        return findProductById(id) || getGiftCatalogItems().find(function (item) { return item.id === id; });
    }

    function addToCart(productId) {
        var existing = state.cartItems.find(function (item) { return item.id === productId; });
        if (existing) existing.qty += 1;
        else state.cartItems.push({ id: productId, qty: 1 });
        syncCartState();
        return true;
    }

    function openCartRemoveModal(id) {
        var item = getCartProducts().find(function (entry) { return entry.id === id; });
        if (!item) return;
        state.removeCartItemId = id;
        els.cartRemoveDescription.textContent = '"' + item.product.name + '" será removido do seu carrinho.';
        els.cartRemoveModal.classList.add('is-visible');
        els.cartRemoveModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('bp-modal-open');
    }

    function closeCartRemovalModal() {
        state.removeCartItemId = null;
        els.cartRemoveModal.classList.remove('is-visible');
        els.cartRemoveModal.setAttribute('aria-hidden', 'true');
        if (!state.cartModalOpen) {
            document.body.classList.remove('bp-modal-open');
        }
    }

    function requestCartItemRemoval(id) {
        openCartRemoveModal(id);
    }

    function changeCartItemQuantity(id, delta) {
        var item = state.cartItems.find(function (entry) { return entry.id === id; });
        if (!item) return;
        var product = findProductById(id);
        if (delta > 0 && product && product.price > getRemainingBalance()) {
            showToast('Saldo insuficiente para adicionar mais uma unidade.');
            return;
        }
        var nextQty = item.qty + delta;
        if (nextQty <= 0) {
            requestCartItemRemoval(id);
            return;
        }
        item.qty = nextQty;
        syncCartState();
    }

    function removeCartItem(id) {
        state.cartItems = state.cartItems.filter(function (entry) {
            return entry.id !== id;
        });
        syncCartState();
    }

    function removeFavorite(id) {
        state.favorites.delete(id);
        saveSet('bp_favorites', state.favorites);
        updateWishlistCount();
        renderFavoritesModal();
        renderProducts();
    }

    function moveFavoriteToCart(id) {
        if (!addToCart(id)) return false;
        removeFavorite(id);
        return true;
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
            els.cartItems.innerHTML = '<div class="bp-cart-card__empty"><img class="bp-cart-card__empty-illustration" src="assets/hero/empty-cart.png" alt="" loading="lazy"><strong>Nenhum produto no carrinho.</strong><p>Adicione itens do catálogo para continuar o resgate.</p></div>';
            return;
        }

        els.cartItems.innerHTML = items.map(function (entry) {
            return '<article class="bp-cart-card__item" data-cart-item-id="' + entry.id + '">' +
                '<div class="bp-cart-card__thumb">' + modalMediaHtml(entry.product) + '</div>' +
                '<div class="bp-cart-card__meta"><h3 class="bp-cart-card__name">' + entry.product.name + '</h3><span class="bp-cart-card__unit">Valor unitário: ' + currency.format(entry.product.price) + '</span><strong class="bp-cart-card__value">' + currency.format(entry.lineTotal) + '</strong></div>' +
                '<div class="bp-cart-card__actions"><div class="bp-cart-card__qty" aria-label="Alterar quantidade de ' + entry.product.name + '"><button class="bp-cart-card__qty-btn" type="button" data-cart-decrease aria-label="Remover uma unidade de ' + entry.product.name + '">-</button><span class="bp-cart-card__qty-value">' + entry.qty + '</span><button class="bp-cart-card__qty-btn" type="button" data-cart-increase aria-label="Adicionar uma unidade de ' + entry.product.name + '">+</button></div><button class="bp-cart-card__remove" type="button" data-cart-remove>' + trashIcon() + '<span>Remover</span></button></div>' +
                '</article>';
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
            els.favoritesItems.innerHTML = '<div class="bp-cart-card__empty"><strong>Nenhum produto favorito.</strong><p>Use o coração nos cards para salvar itens aqui.</p></div>';
            return;
        }

        els.favoritesItems.innerHTML = items.map(function (product) {
            return '<article class="bp-favorites-card__item" data-favorite-item-id="' + product.id + '">' +
                '<div class="bp-favorites-card__thumb">' + modalMediaHtml(product) + '</div>' +
                '<div class="bp-favorites-card__meta"><h3 class="bp-favorites-card__name">' + product.name + '</h3><strong class="bp-cart-card__value">' + currency.format(product.price) + '</strong></div>' +
                '<div class="bp-favorites-card__actions"><button class="bp-favorites-card__move" type="button" data-favorite-add-cart>Adicionar ao carrinho</button><button class="bp-favorites-card__remove" type="button" data-favorite-remove><span>Remover dos favoritos</span></button></div>' +
                '</article>';
        }).join('');
    }

    function renderGiftModal() {
        var item = findGiftCardByName(state.activeGiftName);
        if (!item) return;
        var options = getGiftValueOptions(item);
        els.giftBrand.innerHTML = '<img src="' + item.image + '" alt="" loading="lazy"><span>' + giftInitials(item.name) + '</span>';
        els.giftTitle.textContent = item.name;
        els.giftHint.textContent = 'Escolha um valor para resgate e salve como favorito ou adicione ao carrinho.';
        els.giftOptions.innerHTML = options.map(function (option) {
            var isFav = state.favorites.has(option.id);
            var insufficient = option.price > getRemainingBalance();
            return '<article class="bp-gift-option" data-gift-option-id="' + option.id + '">' +
                '<div class="bp-gift-option__top">' +
                // '<div><span class="bp-gift-option__eyebrow">Disponível agora</span><h3 class="bp-gift-option__name">' + option.brandName + '</h3></div>' +
                '<div class="bp-gift-option__price"><span class="bp-gift-option__currency">R$</span><span class="bp-gift-option__amount">' + option.giftValue + '</span></div>'+

                '<button class="favorite-btn bp-gift-option__fav' + (isFav ? ' is-active' : '') + '" type="button" data-gift-fav-toggle aria-pressed="' + isFav + '" aria-label="Favoritar ' + option.name + '">♥</button></div>' +


                // '<p class="bp-gift-option__copy">Valor de resgate para campanhas rápidas, premiações digitais e ações de incentivo.</p>' +

                '<div class="bp-gift-option__actions"><button class="btn btn-primary" type="button" data-gift-add-cart ' + (insufficient ? 'disabled aria-disabled="true"' : '') + '>' + (insufficient ? 'Saldo insuficiente' : 'Adicionar ao carrinho') + '</button></div>' +
                '</article>';
        }).join('');
    }

    function openGiftModal(name) {
        state.activeGiftName = name;
        renderGiftModal();
        openModal(els.giftModal);
    }

    function closeGiftModal() {
        state.activeGiftName = null;
        closeModal(els.giftModal);
    }

    function openBalanceModal() {
        state.balanceModalOpen = true;
        updateBalanceDetails();
        els.balanceModal.hidden = false;
        document.body.classList.add('bp-modal-open');
    }

    function closeBalanceModal() {
        state.balanceModalOpen = false;
        els.balanceModal.hidden = true;
        document.body.classList.remove('bp-modal-open');
    }

    function openCartModal() {
        state.cartModalOpen = true;
        renderCartModal();
        els.cartModal.hidden = false;
        document.body.classList.add('bp-modal-open');
        positionFloatingPanel(els.cartBtn, els.cartCard);
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
        positionFloatingPanel(els.wishlistBtn, els.favoritesCard);
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
        var product = findProductById(state.activeDetailId);
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
        els.detailMeta.innerHTML = ratingIconHtml() + '<span>' + product.rating.toFixed(1) + ' · ' + product.soldCount + ' resgatados</span>';
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
        var product = findProductById(productId);
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

    function openModal(modal) {
        modal.hidden = false;
        document.body.classList.add('bp-modal-open');
    }

    function closeModal(modal) {
        modal.hidden = true;
        if (els.balanceModal.hidden && els.cartModal.hidden && els.favoritesModal.hidden && els.giftModal.hidden) {
            document.body.classList.remove('bp-modal-open');
        }
    }

    function positionFloatingPanel(anchor, panel) {
        if (!anchor || !panel) return;
        if (window.innerWidth <= 640) {
            panel.style.top = '';
            panel.style.left = '';
            panel.style.right = '';
            return;
        }
        var rect = anchor.getBoundingClientRect();
        var panelWidth = Math.min(panel.offsetWidth || 760, window.innerWidth - 48);
        var top = rect.bottom + 14;
        var left = rect.right - panelWidth;
        var minLeft = 24;
        var maxLeft = window.innerWidth - panelWidth - 24;
        left = Math.max(minLeft, Math.min(left, maxLeft));
        panel.style.top = top + 'px';
        panel.style.left = left + 'px';
        panel.style.right = 'auto';
    }

    function refreshAnchoredPanels() {
        if (state.cartModalOpen) {
            positionFloatingPanel(els.cartBtn, els.cartCard);
        }
        if (state.favoritesModalOpen) {
            positionFloatingPanel(els.wishlistBtn, els.favoritesCard);
        }
    }

    function bindModals() {
        els.balance.addEventListener('click', openBalanceModal);
        els.balanceOverlay.addEventListener('click', closeBalanceModal);
        els.balanceClose.addEventListener('click', closeBalanceModal);
        els.cartBtn.addEventListener('click', openCartModal);
        els.cartOverlay.addEventListener('click', closeCartModal);
        els.cartClose.addEventListener('click', closeCartModal);
        els.wishlistBtn.addEventListener('click', openFavoritesModal);
        els.favoritesOverlay.addEventListener('click', closeFavoritesModal);
        els.favoritesClose.addEventListener('click', closeFavoritesModal);
        els.giftOverlay.addEventListener('click', closeGiftModal);
        els.giftClose.addEventListener('click', closeGiftModal);
        els.filterOverlay.addEventListener('click', closeFilterModal);
        els.filterClose.addEventListener('click', closeFilterModal);
        els.detailOverlay.addEventListener('click', closeDetailModal);
        els.detailClose.addEventListener('click', closeDetailModal);
        els.cartRemoveClose.addEventListener('click', closeCartRemovalModal);
        els.cartRemoveCancel.addEventListener('click', closeCartRemovalModal);
        els.cartRemoveConfirm.addEventListener('click', function () {
            if (!state.removeCartItemId) return;
            removeCartItem(state.removeCartItemId);
            closeCartRemovalModal();
            showToast('Produto removido do carrinho.');
        });
        els.cartRemoveModal.querySelectorAll('[data-close-cart-remove-modal]').forEach(function (node) {
            node.addEventListener('click', closeCartRemovalModal);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && els.cartRemoveModal.classList.contains('is-visible')) {
                closeCartRemovalModal();
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
            if (event.key === 'Escape' && !els.filterModal.hidden) {
                closeFilterModal();
                return;
            }
            if (event.key === 'Escape' && state.detailModalOpen) {
                closeDetailModal();
            }
        });
        window.addEventListener('resize', positionFilterModal);
        window.addEventListener('scroll', positionFilterModal, { passive: true });
        window.addEventListener('resize', refreshAnchoredPanels);
        window.addEventListener('scroll', refreshAnchoredPanels, { passive: true });
    }

    function bindStaticActions() {
        els.filterTrigger.addEventListener('click', function () {
            openFilterModal();
        });

        els.filterBody.addEventListener('click', function (event) {
            var sectionTrigger = event.target.closest('[data-filter-section-trigger]');
            if (sectionTrigger) {
                var sectionId = sectionTrigger.dataset.filterSectionTrigger;
                state.openFilterSection = state.openFilterSection === sectionId ? '' : sectionId;
                renderFilterModal();
            }
        });

        els.filterBody.addEventListener('change', function (event) {
            var option = event.target.closest('[data-filter-option]');
            if (!option || !state.draftAdvancedFilters) return;
            state.draftAdvancedFilters[option.dataset.filterOption] = option.value;
            updateFilterApplyState();
        });

        els.filterBody.addEventListener('input', function (event) {
            var input = event.target.closest('[data-range-input]');
            if (input && state.draftAdvancedFilters) {
                var sliderValue = parseInt(input.value, 10) || 0;
                if (input.dataset.rangeInput === 'min') {
                    state.draftAdvancedFilters.priceMin = Math.min(sliderValue, state.draftAdvancedFilters.priceMax);
                } else {
                    state.draftAdvancedFilters.priceMax = Math.max(sliderValue, state.draftAdvancedFilters.priceMin);
                }
                syncDraftRangeInputsFromFilters(state.draftAdvancedFilters);
                renderFilterModal();
                return;
            }
            var numberInput = event.target.closest('[data-range-number]');
            if (!numberInput || !state.draftAdvancedFilters) return;
            var rawValue = numberInput.value;
            if (rawValue === '' || /^\d*$/.test(rawValue)) {
                var index = numberInput.dataset.rangeNumber === 'min' ? 0 : 1;
                state.draftRangeInputs[index] = rawValue;
            }
        });

        els.filterBody.addEventListener('change', function (event) {
            var numberInput = event.target.closest('[data-range-number]');
            if (!numberInput || !state.draftAdvancedFilters) return;
            validateAndApplyRangeInput(numberInput.dataset.rangeNumber);
            renderFilterModal();
        });

        els.filterBody.addEventListener('keydown', function (event) {
            var numberInput = event.target.closest('[data-range-number]');
            if (!numberInput || event.key !== 'Enter' || !state.draftAdvancedFilters) return;
            event.preventDefault();
            validateAndApplyRangeInput(numberInput.dataset.rangeNumber);
            renderFilterModal();
        });

        els.filterApply.addEventListener('click', function () {
            applyAdvancedFilters();
        });

        els.filterClear.addEventListener('click', function () {
            clearAdvancedFilters('draft');
        });

        els.clearFilters.addEventListener('click', function () {
            clearAdvancedFilters('live');
        });

        els.pagination.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-page]');
            if (!btn) return;
            state.currentPage = parseInt(btn.dataset.page, 10) || 1;
            renderProducts();
            page.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        els.categories.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-category]');
            if (!btn) return;
            state.activeCategory = state.activeCategory === btn.dataset.category && btn.dataset.category !== 'todos'
                ? 'todos'
                : btn.dataset.category;
            state.advancedFilters.category = state.activeCategory === 'todos' ? 'all' : state.activeCategory;
            state.currentPage = 1;
            updateCategoryMode();
            Array.prototype.forEach.call(els.categories.children, function (el) {
                var active = el.dataset.category === state.activeCategory;
                el.classList.toggle('is-active', active);
                el.setAttribute('aria-pressed', String(active));
            });
            renderProducts();
        });

        els.filters.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-filter]');
            if (!btn) return;
            var filter = btn.dataset.filter;
            state.activeFilter = (filter === state.activeFilter || filter === 'reset') ? 'reset' : filter;
            state.advancedFilters.classification = state.activeFilter === 'reset' ? 'all' : state.activeFilter;
            state.currentPage = 1;
            renderFilters();
            renderProducts();
        });

        page.addEventListener('click', function (event) {
            var heroCta = event.target.closest('[data-hero-cta]');
            if (heroCta) {
                var slideId = heroCta.dataset.heroCta;
                if (slideId === 'giftcards') {
                    els.giftCards.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (slideId === 'brindes') {
                    state.activeCategory = 'brindes';
                    state.advancedFilters.category = 'brindes';
                    state.currentPage = 1;
                    renderCategories();
                    renderProducts();
                    els.categories.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    els.productsPrimary.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }

            var promo = event.target.closest('[data-promo-target]');
            if (promo) {
                state.activeCategory = promo.dataset.promoTarget || 'todos';
                state.advancedFilters.category = state.activeCategory === 'todos' ? 'all' : state.activeCategory;
                state.currentPage = 1;
                renderCategories();
                renderProducts();
                els.categories.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            var giftAll = event.target.closest('[data-gift-all]');
            if (giftAll) {
                event.preventDefault();
                showToast('Em breve: todos os gift cards da loja.');
                return;
            }

            var gift = event.target.closest('[data-gift]');
            if (gift) {
                openGiftModal(gift.dataset.gift);
                return;
            }

            var giftOption = event.target.closest('[data-gift-option-id]');
            if (giftOption) {
                var giftId = giftOption.dataset.giftOptionId;
                var giftProduct = findItemById(giftId);
                if (event.target.closest('[data-gift-fav-toggle]')) {
                    if (state.favorites.has(giftId)) state.favorites.delete(giftId);
                    else state.favorites.add(giftId);
                    saveSet('bp_favorites', state.favorites);
                    updateWishlistCount();
                    renderFavoritesModal();
                    renderGiftModal();
                    showToast(state.favorites.has(giftId) ? 'Gift card salvo nos favoritos.' : 'Gift card removido dos favoritos.');
                    return;
                }
                if (event.target.closest('[data-gift-add-cart]')) {
                    if (giftProduct && giftProduct.price > getRemainingBalance()) {
                        showToast('Saldo insuficiente para adicionar este item.');
                        return;
                    }
                    addToCart(giftId);
                    renderGiftModal();
                    showToast('"' + (giftProduct ? giftProduct.name : 'Gift card') + '" adicionado ao carrinho.');
                    return;
                }
            }

            var secondary = event.target.closest('[data-secondary-cta]');
            if (secondary) {
                state.activeCategory = 'todos';
                state.activeFilter = 'reset';
                state.advancedFilters = getDefaultAdvancedFilters();
                state.currentPage = 1;
                renderCategories();
                renderFilters();
                renderProducts();
                els.productsPrimary.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            var favBtn = event.target.closest('[data-fav-toggle]');
            if (favBtn) {
                var card = favBtn.closest('.bp-product-card');
                var id = card.dataset.productId;
                var isFav = state.favorites.has(id);
                if (isFav) state.favorites.delete(id);
                else state.favorites.add(id);
                saveSet('bp_favorites', state.favorites);
                favBtn.classList.toggle('is-active', !isFav);
                favBtn.setAttribute('aria-pressed', String(!isFav));
                updateWishlistCount();
                renderFavoritesModal();
                return;
            }

            var addCart = event.target.closest('[data-add-cart]');
            if (addCart) {
                var productCard = addCart.closest('.bp-product-card');
                var product = findItemById(productCard.dataset.productId);
                if (product && product.price > getRemainingBalance()) {
                    showToast('Saldo insuficiente para adicionar este item.');
                    return;
                }
                addToCart(productCard.dataset.productId);
                showToast('"' + (product ? product.name : 'Produto') + '" adicionado ao carrinho.');
                return;
            }

            var detailFav = event.target.closest('[data-detail-fav-toggle]');
            if (detailFav) {
                var detailId = state.activeDetailId;
                if (!detailId) return;
                var detailIsFav = state.favorites.has(detailId);
                if (detailIsFav) state.favorites.delete(detailId);
                else state.favorites.add(detailId);
                saveSet('bp_favorites', state.favorites);
                updateWishlistCount();
                renderFavoritesModal();
                renderProducts();
                renderDetailModal();
                return;
            }

            var detailAddCart = event.target.closest('[data-detail-add-cart]');
            if (detailAddCart) {
                var detailProductId = state.activeDetailId;
                if (!detailProductId) return;
                var detailProduct = findProductById(detailProductId);
                if (detailProduct && detailProduct.price > getRemainingBalance()) {
                    showToast('Saldo insuficiente para adicionar este item.');
                    return;
                }
                addToCart(detailProductId);
                showToast('"' + (detailProduct ? detailProduct.name : 'Produto') + '" adicionado ao carrinho.');
                renderDetailModal();
                return;
            }

            var productCardClicked = event.target.closest('.bp-product-card');
            if (productCardClicked) {
                openDetailModal(productCardClicked.dataset.productId);
                return;
            }

            var cartItem = event.target.closest('[data-cart-item-id]');
            if (cartItem) {
                if (event.target.closest('[data-cart-increase]')) {
                    changeCartItemQuantity(cartItem.dataset.cartItemId, 1);
                    return;
                }
                if (event.target.closest('[data-cart-decrease]')) {
                    changeCartItemQuantity(cartItem.dataset.cartItemId, -1);
                    return;
                }
                if (event.target.closest('[data-cart-remove]')) {
                    requestCartItemRemoval(cartItem.dataset.cartItemId);
                    return;
                }
            }

            var favoriteItem = event.target.closest('[data-favorite-item-id]');
            if (favoriteItem) {
                if (event.target.closest('[data-favorite-add-cart]')) {
                    var favoriteProduct = findItemById(favoriteItem.dataset.favoriteItemId);
                    if (moveFavoriteToCart(favoriteItem.dataset.favoriteItemId)) {
                        showToast('"' + (favoriteProduct ? favoriteProduct.name : 'Produto') + '" movido para o carrinho.');
                    }
                    return;
                }
                if (event.target.closest('[data-favorite-remove]')) {
                    var removedProduct = findItemById(favoriteItem.dataset.favoriteItemId);
                    removeFavorite(favoriteItem.dataset.favoriteItemId);
                    showToast('"' + (removedProduct ? removedProduct.name : 'Produto') + '" removido dos favoritos.');
                }
            }
        });

        els.cartCheckout.addEventListener('click', function () {
            if (!state.cartItems.length) {
                closeCartModal();
                els.productsPrimary.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            showToast('Fluxo de checkout em definição. Itens salvos no carrinho.');
        });
    }

    function validateAndApplyRangeInput(kind) {
        if (!state.draftAdvancedFilters || !state.draftRangeInputs) return;
        var min = state.filterMeta.priceMin;
        var max = state.filterMeta.priceMax;
        var index = kind === 'min' ? 0 : 1;
        var rawValue = state.draftRangeInputs[index];
        if (rawValue === '') {
            rawValue = kind === 'min' ? String(min) : String(max);
        }
        var numericValue = clamp(parseInt(rawValue, 10) || 0, min, max);
        if (kind === 'min') {
            state.draftAdvancedFilters.priceMin = Math.min(numericValue, state.draftAdvancedFilters.priceMax);
        } else {
            state.draftAdvancedFilters.priceMax = Math.max(numericValue, state.draftAdvancedFilters.priceMin);
        }
        syncDraftRangeInputsFromFilters(state.draftAdvancedFilters);
    }

    function showToast(message) {
        if (state.toastTimer) clearTimeout(state.toastTimer);
        els.toast.textContent = message;
        els.toast.classList.add('is-visible');
        state.toastTimer = setTimeout(function () { els.toast.classList.remove('is-visible'); }, 2400);
    }

    function slugify(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
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

        function updateArrows() {
            var hasOverflow = rail.scrollWidth > rail.clientWidth + 2;
            wrapper.classList.toggle('has-overflow', hasOverflow);
            prev.disabled = !hasOverflow || rail.scrollLeft <= 1;
            next.disabled = !hasOverflow || rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;
        }

        prev.addEventListener('click', function () {
            rail.scrollBy({ left: -Math.max(180, rail.clientWidth * 0.75), behavior: 'smooth' });
        });
        next.addEventListener('click', function () {
            rail.scrollBy({ left: Math.max(180, rail.clientWidth * 0.75), behavior: 'smooth' });
        });
        rail.addEventListener('scroll', updateArrows, { passive: true });
        window.addEventListener('resize', updateArrows);
        requestAnimationFrame(updateArrows);
    }
})();
