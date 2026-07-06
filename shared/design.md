# Design Reference - Portal Bipper

Guia principal de decisão visual. Documenta paleta, tipografia, espaçamentos, radius, sombras, botões, inputs, cards, modais, layout, responsividade e regras para criar novas telas mantendo consistência

Este documento registra os padroes visuais e tecnicos observados no projeto atual. Use-o como referencia obrigatoria ao criar novas telas em outro projeto, mantendo os mesmos tokens, componentes, proporcoes e comportamento responsivo.

Este arquivo e a fonte de decisao visual do sistema. Para reaproveitamento tecnico direto, use tambem os arquivos da pasta `shared/`:

- `shared/design-tokens.css`: variaveis globais, reset leve, tipografia base e estrutura essencial de pagina.
- `shared/base-components.css`: componentes reutilizaveis como botoes, inputs, cards, chips, listas, modais e grids.
- `shared/app-shell.css`: sidebar, topbar, perfil, notificacoes, seletor de marcas e responsividade do shell.
- `shared/app-shell.js`: comportamento compartilhado da sidebar, menu mobile e dropdown de marcas.
- `shared/master-page.html`: pagina mestre para iniciar novas telas com a mesma estrutura.
- `shared/brand-schema.json`: contrato documentado do arquivo de marcas.
- `shared/data/brands.json`: arquivo de marcas pronto para copiar junto com `shared/`.
- `shared/assets/logos/`: logos usados pelo JSON de marcas compartilhado.
- `shared/README.md`: instrucoes de uso em outro projeto.

## Como Usar Em Novos Projetos

1. Leia este documento antes de decidir cores, fontes, radius, sombras, espacamentos ou componentes.
2. Importe `shared/design-tokens.css` antes dos estilos da nova aplicacao.
3. Importe `shared/base-components.css` quando a nova tela precisar dos componentes deste sistema.
4. Importe `shared/app-shell.css` e `shared/app-shell.js` quando a tela precisar de sidebar, topbar e troca de marca.
5. Use `shared/master-page.html` como base quando a nova tela for uma tela de portal completa.
6. Use `shared/data/brands.json` ou adapte um novo JSON respeitando o contrato de `shared/brand-schema.json`.
7. Se houver troca dinamica de marca, aplique as cores da marca nas variaveis `--brand-primary`, `--brand-secondary`, `--brand-soft` e `--brand-primary-rgb`.
8. Crie estilos novos somente quando nao existir equivalente nos tokens ou componentes documentados aqui.

## Hierarquia De Decisao Visual

Ao construir novas telas, siga esta ordem:

1. Tokens oficiais: cores, tipografia, radius, sombras, medidas e breakpoints.
2. Componentes compartilhados: botoes, inputs, cards, chips, listas, modais e layout.
3. Padroes estruturais: sidebar/topbar/conteudo, grids e responsividade.
4. Ajustes locais da nova tela.
5. Novos componentes, somente quando os anteriores nao resolverem o caso.

Se houver conflito entre uma preferencia local e este documento, este documento vence.

## Paleta de Cores

### Tokens globais

```css
:root {
    --zoetis-orange: #ff6b00;
    --zoetis-orange-600: #e85900;
    --zoetis-teal: #00a7b5;
    --brand-primary: var(--zoetis-orange);
    --brand-secondary: var(--zoetis-orange-600);
    --brand-soft: #fff1e8;
    --brand-primary-rgb: 255, 107, 0;
    --ink: #0f172a;
    --text: #263447;
    --muted: #65758b;
    --line: #e5eaf0;
    --surface: #ffffff;
    --surface-2: #f8fafc;
    --surface-3: #eef4f8;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --radius-xl: 28px;
    --radius-lg: 20px;
    --radius-md: 14px;
    --shadow-sm: 0 8px 22px rgba(15, 23, 42, .06);
    --shadow-md: 0 18px 60px rgba(15, 23, 42, .11);
    --sidebar: 280px;
    --sidebar-collapsed: 92px;
    --header: 78px;
    --max: 1680px;
}
```

### Marca padrao

- Primaria: `#ff6b00`
- Primaria 600/secundaria: `#e85900`
- Teal de apoio: `#00a7b5`
- Fundo suave de marca: `#fff1e8`

### Neutros

- Texto forte: `#0f172a`
- Texto padrao: `#263447`
- Texto secundario: `#65758b`
- Bordas: `#e5eaf0`, `rgba(226, 232, 240, .9)`, `rgba(226, 232, 240, .95)`
- Superficies: `#ffffff`, `#f8fafc`, `#eef4f8`
- Sidebar escura: gradiente `#101923` para `#07111b`

### Cores semanticas e acentos

- Sucesso: `#10b981`
- Aviso: `#f59e0b`
- Perigo: `#ef4444`
- Azul: `#2563eb` / suave `#eaf2ff`
- Rosa: `#db2777` / suave `#fdf2f8`
- Roxo: `#7c3aed` / suave `#f1ecff`
- Teal: `#00a7b5` / suave `#e8fbfd`

### Temas por marca

As marcas sao configuradas em `data/brands.json` com `primary`, `secondary`, `surface`, `surfaceAlt`, `text`, `textLight`, `border`, gradientes suaves e logos. O `theme-switcher.js` aplica dinamicamente:

- `--brand-primary`
- `--brand-secondary`
- `--brand-soft`
- `--brand-primary-rgb`
- aliases `--zoetis-orange`, `--zoetis-orange-600` e `--zoetis-teal`

Ao criar novas telas, use sempre `var(--brand-primary)`, `var(--brand-secondary)`, `var(--brand-soft)` e `rgba(var(--brand-primary-rgb), alpha)` para manter suporte a troca de marca.

### Contrato do `brands.json`

Cada marca deve seguir este modelo minimo:

```json
{
  "nome-da-marca": {
    "name": "Nome exibido",
    "group": "Marcas",
    "primary": "#F65C00",
    "secondary": "#CE5208",
    "surface": "#FFF7F2",
    "surfaceAlt": "#FFF1E8",
    "text": "#1F1F1F",
    "textLight": "#FFFFFF",
    "border": "#F2E2D8",
    "gradient-soft-1": "#F65C0029",
    "gradient-soft-2": "#CE520833",
    "gradient-soft-3": "#F65C004D",
    "logoLight": "assets/logos/marca-light.svg",
    "logoDark": "assets/logos/marca-dark.svg",
    "footerLogoLight": "assets/logos/marca-light.svg",
    "footerLogoDark": "assets/logos/marca-dark.svg",
    "footerLogoName": "Nome alternativo do logo"
  }
}
```

Campos obrigatorios para troca visual: `name`, `primary`, `secondary`, `surface`, `surfaceAlt`, `text`, `textLight`, `border`, `logoLight`, `logoDark`.

Campos opcionais: `group`, `gradient-soft-1`, `gradient-soft-2`, `gradient-soft-3`, `footerLogoLight`, `footerLogoDark`, `footerLogoName`.

Regras:

- `primary` controla acentos, botoes principais, badges e estados ativos.
- `secondary` compoe gradientes e reforcos de marca.
- `surfaceAlt` deve alimentar `--brand-soft`.
- `primary` deve ser convertido para RGB e aplicado em `--brand-primary-rgb`.
- Logos devem ter variantes clara e escura quando a marca permitir.
- Revendas podem usar `group: "Revendas"` para separar a exibicao no dropdown.

## Tipografia

- Familia principal: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Corpo: texto em `var(--text)`, peso regular/medio, sem serifa.
- Titulos principais: `var(--ink)`, pesos altos, letter-spacing negativo leve.
- H1 de hero: `clamp(30px, 3vw, 46px)`, `line-height: 1.04`, `letter-spacing: -.04em`.
- Titulos de secao: `24px`, `letter-spacing: -.03em`.
- Titulos de cards: `18px` a `22px`, `letter-spacing: -.02em` a `-.03em`.
- Labels/chips/metadados: `11px` a `14px`, frequentemente com `font-weight: 700` a `900`.
- Textos auxiliares: `12px` a `13px`, cor `var(--muted)`, `line-height` entre `1.45` e `1.55`.

## Espacamentos

- Conteudo central: `width: min(100% - 64px, var(--max))`, com `--max: 1680px`.
- Padding vertical do conteudo: `32px 0 28px`.
- Sidebar: `22px 16px`.
- Topbar: `0 32px`, altura `64px`.
- Hero: `28px`, mobile `22px`.
- Cards principais: `18px` a `22px`.
- Modais: `24px`.
- Gaps recorrentes: `10px`, `12px`, `14px`, `16px`, `18px`, `24px`.
- Toolbar: `margin: 24px 0`, grid com gap `14px`.
- Grids: metricas `16px`, cards de areas `18px`, cards compactos `16px`, insights `18px`.

## Bordas e Radius

### Tokens

```css
--radius-xl: 28px;
--radius-lg: 20px;
--radius-md: 14px;
```

### Uso recorrente

- Hero: `28px`.
- Cards gerais: `20px` a `24px`.
- Cards de area: `24px`.
- Botoes e inputs: `14px` a `17px`.
- Icon buttons: `14px`.
- Badges, pills e botoes de modal: `999px`.
- Icon containers: `14px`, `18px`, `20px`.
- Bordas leves: `1px solid var(--line)` ou `1px solid rgba(226, 232, 240, .9)`.

## Sombras

### Tokens

```css
--shadow-sm: 0 8px 22px rgba(15, 23, 42, .06);
--shadow-md: 0 18px 60px rgba(15, 23, 42, .11);
```

### Uso

- `--shadow-sm`: cards, inputs, botoes secundarios, topbar elements.
- `--shadow-md`: hover de modulo e elevacoes maiores.
- Sidebar: `16px 0 42px rgba(15, 23, 42, .13)`.
- Dropdown: `0 18px 48px rgba(15, 23, 42, .22)`.
- Modal: `0 30px 80px rgba(15, 23, 42, .22)`.
- Hover de botao primario: `0 18px 36px rgba(255, 107, 0, .32)`.

## Botoes

### Base `.btn`

- Sem borda nativa.
- `border-radius: 14px`.
- `padding: 12px 16px`.
- `font-weight: 500`.
- Layout `inline-flex`, centralizado, gap `9px`.
- Transicao curta: `.18s ease`.
- Hover com `translateY(-1px)` quando aplicavel.

### Variantes

- `.btn-primary`: gradiente `linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))`, texto branco.
- `.btn-secondary`: fundo branco, texto `#0f172a`, borda `var(--line)`, sombra no hover.
- `.icon-btn`: quadrado `42px`, radius `14px`, borda `var(--line)`, fundo branco, icone `20px`.
- `.favorite-btn`: `38px`, radius `13px`, estado ativo amarelo (`#f59e0b`, `#fffbeb`, `#fde68a`).
- `.filter-chip`: altura `40px`, pill, padding horizontal `16px`, contador interno circular.
- Botoes de modal: altura minima `46px`, pill, peso `700`; primario usa fundo escuro em estado positivo ou vermelho em estado negativo.

## Inputs

### Busca `.search-box`

- Container relativo com icone absoluto a esquerda.
- Input com `height: 52px`, `border: 1px solid var(--line)`, `border-radius: 17px`.
- Fundo branco, texto `#0f172a`, padding `0 18px 0 48px`.
- Sombra `var(--shadow-sm)`.
- Foco: borda teal `rgba(0, 167, 181, .5)` e ring `0 0 0 4px rgba(0, 167, 181, .12)`.

### Controles

- Toggle visual usa grupo flex (`.toggle-group`) com label forte e estado compacto.
- Checkbox visual customizado: `18px`, radius `5px`, borda `1.5px solid #94a3b8`.

## Cards

### Cards de resumo `.summary-card`

- Fundo branco.
- Borda `rgba(226, 232, 240, .9)`.
- Radius `var(--radius-lg)`.
- Sombra `var(--shadow-sm)`.
- Padding `18px`.
- Titulo `18px`, `var(--ink)`.

### Cards metricos `.metric-card`

- Grid flex horizontal com icone.
- Fundo branco translúcido `rgba(255, 255, 255, .9)`.
- Borda leve, radius `20px`, padding `18px`.
- Min-height `132px`.
- Valor principal `34px`, peso visual alto, letter-spacing `-.04em`.
- Icone `54px`, radius `18px`, cor via `--accent`, fundo via `--soft`.

### Cards de area `.area-card`

- Fundo `rgba(255, 255, 255, .88)`.
- Borda `rgba(226, 232, 240, .95)`.
- Radius `24px`, padding `22px`, min-height `330px`.
- Barra superior decorativa com `linear-gradient(90deg, var(--accent), transparent)`.
- Icone `58px`, radius `20px`, cor `--accent`, fundo `--soft`.
- Acoes e modulos internos em lista com background `rgba(248, 250, 252, .9)`.

### Cards rapidos `.quick-card`

- Borda `var(--line)`, fundo branco, radius `18px`, padding `14px`.
- Grid: icone, conteudo, drag handle e remover.
- Icone `42px`, radius `14px`, background `color-mix(in srgb, var(--accent), white 87%)`.
- Hover eleva com `translateY(-2px)` e `var(--shadow-sm)`.
- Estado drag: `opacity: .45`; estado alvo: borda e inset shadow com `color-mix`.

## Tabelas e Listas

Nao ha tabela HTML tradicional no projeto. O padrao equivalente usa listas e grids:

- `.agenda-list`, `.todo-list`, `.activity-list`: grid com gap `12px`, sem bullets.
- Agenda: `grid-template-columns: 64px 1fr`, horario forte, conteudo com borda esquerda `3px solid var(--accent)`.
- Tarefas: `grid-template-columns: 22px 1fr auto`, padding vertical `10px`, divisorias `#edf2f7`.
- Atividades: `grid-template-columns: 42px 1fr`, icone circular/quadrado de `40px`.
- Listas de modulos: itens com grid `minmax(0, 1fr) auto`, radius `14px` a `16px`, truncamento com `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`.

Para tabelas futuras, preferir a mesma linguagem: superficie branca, bordas leves, linhas com divisorias `#edf2f7`, texto compacto, badges pill e acoes por icone.

## Modais

### Estrutura `.favorite-modal`

- Overlay fixo `inset: 0`, z-index `120`, grid centralizado, padding `20px`.
- Estado fechado: `opacity: 0`, `pointer-events: none`.
- Estado aberto `.is-visible`: `opacity: 1`, `pointer-events: auto`.
- Backdrop: `rgba(15, 23, 42, .28)` com `backdrop-filter: blur(3px)`.
- Dialog: largura `min(100%, 648px)`, max-height `calc(100vh - 40px)`, overflow-y auto.
- Radius `24px`, background `#f8f8fb`, padding `24px`, sombra forte.
- Animacao: `translateY(18px) scale(.98)` para `translateY(0) scale(1)`.

### Variantes

- `.is-positive`: status verde claro `#b9f1ca`, acao primaria escura.
- `.is-negative`: status vermelho claro `#ffd8d3`, acao primaria `#d91429`.
- `.favorite-modal--customize`: dialog menor `min(100%, 560px)`, status com cor da marca.
- `.favorite-modal--list`: lista de modulos no corpo.

## Estrutura de Layout

- Shell principal: `.app-shell` em CSS Grid com sidebar fixa/sticky e area principal.
- Larguras:
  - `--sidebar: 280px`
  - `--sidebar-collapsed: 92px`
  - `--max: 1680px`
- Sidebar:
  - `position: sticky`, `height: 100vh`, fundo escuro em gradiente.
  - Estado recolhido via `body.sidebar-collapsed`.
  - Navegacao com links de `46px`, icones `21px`, active com linha interna da marca.
- Topbar:
  - `position: sticky`, altura `64px`, fundo branco translúcido com blur.
  - Acoes alinhadas a direita, perfil em pill/card branco.
- Conteudo:
  - Container central com `width: min(100% - 64px, var(--max))`.
  - Hero + quick stack em `.hero-grid`: `1fr 360px`, gap `24px`.
  - Metricas em 4 colunas.
  - Areas em 3 colunas ou modo compacto em 4 colunas.
  - Insights em grid `1.2fr / .8fr`.

## Padroes Responsivos

### Ate 1320px

- Hero vira uma coluna.
- Metricas: 2 colunas.
- Cards de area: 2 colunas.
- Modo compacto: 3 colunas.
- Insights: 1 coluna.

### Ate 980px

- Sidebar sai do grid e vira drawer fixo com `transform: translateX(-100%)`.
- `.app-shell` vira 1 coluna.
- Botao mobile aparece.
- Conteudo reduz para `width: min(100% - 32px, var(--max))`.
- Toolbar vira 1 coluna.
- Cards de area e modo compacto viram 1 coluna.
- Perfil esconde textos, mantendo avatar.

### Ate 640px

- Topbar com padding horizontal `16px`.
- `.env-pill` e primeiro icon button da topbar sao ocultados.
- Hero actions empilham em coluna.
- Metricas e quick list ficam em 1 coluna.
- Footer empilha.

## Classes CSS Reutilizaveis

- `.app-shell`, `.sidebar`, `.main`, `.topbar`, `.content`
- `.brand`, `.brand-dropdown`, `.brand-dropdown__item`
- `.nav-section`, `.nav-link`, `.nav-badge`
- `.mobile-menu`, `.sidebar-overlay`
- `.env-pill`, `.icon-btn`, `.notification-dot`, `.profile`, `.avatar`
- `.hero-grid`, `.hero`, `.hero__content`, `.eyebrow`, `.hero-actions`
- `.btn`, `.btn-primary`, `.btn-secondary`
- `.quick-stack`, `.quick-card`, `.quick-empty-state`
- `.summary-card`, `.metrics-grid`, `.metric-card`, `.metric-icon`
- `.toolbar`, `.search-box`, `.toggle-group`, `.filter-panel`, `.filter-chip`
- `.section-title`, `.cards-layout`, `.area-card`, `.area-card__icon`
- `.module-list`, `.module-item`, `.module-category-tag`, `.more-modules-btn`
- `.favorite-btn`, `.open-link`, `.number-modules`, `.icon-xs`
- `.insights-grid`, `.performance`, `.mini-chart`
- `.agenda-list`, `.agenda-item`, `.todo-list`, `.activity-list`, `.activity-icon`
- `.checkbox`, `.priority`, `.priority.high`, `.priority.medium`, `.priority.low`
- `.favorite-modal`, `.favorite-modal__dialog`, `.favorite-modal__actions`, `.favorite-modal__btn`
- `.customize-list`, `.customize-item`, `.customize-eye`
- `.modal-module-list`, `.modal-module-item`
- `.footer`, `.hide`

## Arquivos Compartilhaveis

### `shared/design-tokens.css`

Use como primeira importacao CSS em projetos novos. Ele contem:

- `:root` oficial.
- Reset leve (`box-sizing`, links, botoes, inputs).
- Tipografia base.
- Fundo padrao do portal.
- Classes estruturais essenciais: `.app-shell`, `.main`, `.content`, `.section-title`, `.hide`.
- Breakpoint base para conteudo em `980px`.

### `shared/base-components.css`

Use depois dos tokens quando quiser reaproveitar componentes. Ele contem:

- Botoes: `.btn`, `.btn-primary`, `.btn-secondary`, `.icon-btn`.
- Inputs e toolbar: `.search-box`, `.toolbar`, `.toggle-group`.
- Chips: `.filter-panel`, `.filter-chip`.
- Cards: `.summary-card`, `.metric-card`, `.area-card`, `.quick-card`.
- Listas equivalentes a tabelas: agenda, tarefas, atividades e modulos.
- Modais: `.favorite-modal` e variantes principais.
- Grids responsivos: metricas, cards, insights e performance.

### `shared/app-shell.css`

Use quando o novo projeto precisar da estrutura-mestre do portal. Ele contem:

- Sidebar esquerda com logo, dropdown de marcas, navegacao, badges e card inferior.
- Estado recolhido no desktop via `body.sidebar-collapsed`.
- Drawer mobile via `.sidebar.is-open`.
- Overlay de fechamento `.sidebar-overlay`.
- Topbar sticky com menu mobile, pill de ambiente, botoes de icone, notificacao e perfil do usuario.
- Responsividade em `980px` e `640px`.

### `shared/app-shell.js`

Use junto com `shared/app-shell.css`. Ele contem:

- Clique no botao mobile `#openMenu`.
- Clique no botao de recolher `#sidebarToggle`.
- Overlay `#sidebarOverlay` e tecla `Escape` para fechar menu mobile.
- Leitura do JSON de marcas definido em `.brand[data-brands-url]`.
- Montagem do dropdown `.brand-dropdown`.
- Clique no logo `.brand__logo-btn` para abrir/fechar o popup de marcas.
- Persistencia da marca ativa no `localStorage` com chave `lp_active_brand`.
- Aplicacao automatica de `--brand-primary`, `--brand-secondary`, `--brand-soft` e `--brand-primary-rgb`.
- Atualizacao de imagens com `[data-logo]` e `[data-footer-logo]`.
- Evento customizado `app-shell:brand-change` para telas que precisem reagir a troca de marca.

### `shared/master-page.html`

Use como ponto de partida para telas novas. Substitua apenas a area dentro de `.content` pelo conteudo especifico da nova tela, mantendo sidebar, topbar, scripts e imports.

### `shared/brand-schema.json`

Use para documentar e validar mentalmente a estrutura de novas marcas. O arquivo nao substitui `data/brands.json`; ele descreve o contrato que novos projetos devem seguir.

## Boas Praticas Ja Usadas

- Centralizar identidade visual em variaveis CSS e trocar marca sem duplicar estilos.
- Usar `data/brands.json` para separar configuracao visual de logica.
- Preferir componentes com classes BEM-like (`block__element`, `block--modifier`).
- Usar estados explicitos: `.is-active`, `.is-visible`, `.is-open`, `.is-hidden`, `.is-positive`, `.is-negative`.
- Usar atributos ARIA em botoes, modais e controles (`aria-label`, `aria-expanded`, `aria-hidden`, `aria-modal`, `aria-pressed`).
- Manter layout responsivo via poucos breakpoints claros: `1320px`, `980px`, `640px`.
- Criar componentes densos e funcionais, adequados a portal/dashboard, sem excesso de ornamentacao.
- Usar icones inline com tamanhos consistentes (`20px`, `21px`, `24px`, `27px`, `30px`).
- Preservar legibilidade com truncamento em textos longos de modulos.
- Evitar scroll da pagina quando sidebar mobile ou modal esta aberto usando classes no `body`.
- Usar `minmax(0, 1fr)` em grids para evitar overflow.
- Usar `box-sizing: border-box` global.
- Aplicar `scroll-behavior: smooth`.
- Em novas telas, reutilizar tokens e classes antes de criar novos estilos. Quando um novo componente for necessario, seguir a mesma escala de cores, espacamentos, radius, sombras e estados.

## Regra Para Novas Telas

Antes de criar qualquer nova tela em outro projeto:

1. Importar `shared/design-tokens.css` ou replicar integralmente os tokens de `:root`.
2. Usar `var(--brand-primary)`, `var(--brand-secondary)`, `var(--brand-soft)` e `--brand-primary-rgb` para qualquer elemento de marca.
3. Montar a tela com a mesma estrutura geral: sidebar/topbar/conteudo quando for portal, ou container central com largura `min(100% - 64px, 1680px)`.
4. Importar `shared/base-components.css` quando a tela usar botoes, inputs, cards, chips, listas ou modais do sistema.
5. Importar `shared/app-shell.css` e `shared/app-shell.js` para telas com sidebar/topbar.
6. Comecar por `shared/master-page.html` quando a tela for uma pagina completa do portal.
7. Respeitar os breakpoints `1320px`, `980px` e `640px`.
8. Manter estados visuais com classes `is-*` e acessibilidade com atributos ARIA.
9. Nao introduzir uma nova paleta, nova tipografia ou novos radius/sombras sem necessidade clara.
10. Documentar qualquer excecao visual no projeto consumidor.
