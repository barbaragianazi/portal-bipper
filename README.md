# Portal Bipper

Protótipo estático de um portal corporativo/dashboard white label, com navegação lateral, troca de marca, módulos por categoria, favoritos e personalização de áreas do painel inicial.

## Visão geral

O projeto representa a tela inicial de um portal operacional com foco em acesso rápido a módulos, indicadores e atividades do usuário. A interface foi construída com HTML, CSS e JavaScript puro, sem etapa de build ou dependências de pacote.

## Funcionalidades

- Layout responsivo com sidebar recolhível e menu mobile.
- Seletor de marca com aplicação dinâmica de cores, logos e tema visual.
- Dados de marca centralizados em `data/brands.json`.
- Busca de módulos por texto.
- Filtro por categorias de módulos.
- Alternância entre visualização por categoria e visualização compacta.
- Favoritos com confirmação em modal.
- Lista de acessos rápidos com suporte a reordenação por arrastar e soltar.
- Modal de módulos adicionais da categoria Gestão.
- Personalização de áreas visíveis do dashboard.
- Cards de indicadores, agenda, tarefas e atividades recentes.

## Estrutura

```text
.
├── index.html
├── styles.css
├── script.js
├── theme-switcher.js
├── data/
│   └── brands.json
└── assets/
    ├── logo-zoetis.svg
    └── logos/
```

## Como executar

Como o projeto usa `fetch` para carregar `data/brands.json`, execute a página por um servidor local.

Com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Também é possível usar extensões como Live Server no VS Code.

## Arquivos principais

- `index.html`: estrutura da página, sidebar, cards, modais e conteúdo inicial.
- `styles.css`: estilos globais, responsividade, estados visuais e variáveis de tema.
- `script.js`: interações da interface, filtros, favoritos, modais, sidebar e personalização do dashboard.
- `theme-switcher.js`: carregamento das marcas, troca de tema, aplicação de variáveis CSS e atualização de logos.
- `data/brands.json`: configuração das marcas disponíveis, incluindo cores e caminhos de logos.
- `assets/logos/`: arquivos de logo usados pelo seletor de marca.

## Como adicionar ou alterar marcas

Edite `data/brands.json` e inclua ou ajuste uma entrada seguindo o formato existente:

```json
{
  "nome-da-marca": {
    "name": "Nome da Marca",
    "primary": "#F65C00",
    "secondary": "#00A6B5",
    "group": "Marcas",
    "logoLight": "assets/logos/marca-light.svg",
    "logoDark": "assets/logos/marca-dark.svg"
  }
}
```

Depois, adicione os arquivos de logo correspondentes em `assets/logos/`.

## Observações

- O projeto não possui `package.json`, scripts de build ou dependências externas.
- Os dados exibidos nos cards e módulos são estáticos no HTML.
- O estado de marca selecionada é salvo no `localStorage` pela chave `lp_active_brand`.
