# Portal Bipper

Portal front-end estatico com pagina inicial, shell compartilhado e app interno de loja.

## Estrutura

```text
.
├── index.html
├── css/
│   ├── home-shell.css
│   ├── home-dashboard.css
│   ├── home-modals.css
│   └── home-responsive.css
├── script.js
├── config/
│   └── menu.json
├── hub/
│   └── index.html
├── loja/
│   └── index.html
└── shared/
    ├── design.md
    ├── design-tokens.css
    ├── base-components.css
    ├── app-shell.css
    ├── app-shell.js
    ├── data/
    │   └── brands.json
    └── assets/
        └── logos/
```

## Fonte de verdade

- Shell, tokens, componentes, marcas e logos ficam em `shared/`.
- A pagina inicial e a loja consomem `shared/app-shell.js`.
- As marcas ficam em `shared/data/brands.json`.
- Os logos ficam em `shared/assets/logos/`.
- O guia visual fica em `shared/design.md`.

## Como executar

Use o Live Server do VS Code na raiz do projeto.

Depois valide:

- `/`
- `/loja/`
- troca de marca pelo logo na sidebar
- menu lateral recolhido no desktop
- menu mobile com overlay
- console sem erros 404

## Arquivos principais

- `index.html`: pagina inicial do portal.
- `css/home-*.css`: estilos especificos da pagina inicial, separados por shell, dashboard, modais e responsividade.
- `script.js`: interacoes especificas da pagina inicial, como filtros, favoritos, modais e personalizacao.
- `loja/index.html`: app da loja usando o shell compartilhado.
- `hub/index.html`: visão geral do módulo Hub usando o shell compartilhado.
- `shared/app-shell.js`: sidebar, menu mobile, menu dinamico e troca de marca.
- `shared/data/brands.json`: configuracao das marcas.

## Como adicionar ou alterar marcas

Edite `shared/data/brands.json` e adicione os logos correspondentes em `shared/assets/logos/`.

Ao usar uma tela fora da raiz, configure `assetPathPrefix` para que o shell resolva os caminhos dos logos corretamente.
