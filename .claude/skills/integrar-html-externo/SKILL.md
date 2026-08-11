---
name: integrar-html-externo
description: Use ao trazer uma tela/HTML externo (de outro projeto, protótipo, export de ferramenta) para dentro do portal-bipper, migrando cores e tipografia para os tokens do design system em vez de mapear estilo por estilo na mão. Aciona em pedidos como "integrar esse HTML no sistema", "trazer essa tela pra cá", "adaptar esse HTML externo pro nosso padrão".
---

# Integrar HTML externo ao design system do portal-bipper

O ponto que mais dói nesse processo é migrar cores e tipografia soltas do HTML
externo para os tokens oficiais. Estrutura de HTML raramente é o problema.
Trabalhe nessa ordem — pular a etapa 3 é o que faz o resto (inclusive dark
mode) dar mais trabalho depois.

## 1. Leia a fonte de verdade primeiro

Leia [`shared/design.md`](../../../shared/design.md) inteiro antes de tocar em
qualquer CSS. Ele documenta paleta, tipografia, espaçamentos, radius,
sombras e a lista de classes reutilizáveis. Se uma decisão visual não estiver
lá, ela não deveria ir para o CSS novo sem necessidade clara (regra 9 do
próprio documento).

## 2. Importe os arquivos compartilhados, nessa ordem

```html
<link rel="stylesheet" href="shared/design-tokens.css">
<link rel="stylesheet" href="shared/base-components.css">
<link rel="stylesheet" href="shared/app-shell.css">
<!-- shared/custom-select.css se a tela tiver <select> customizado -->
<link rel="stylesheet" href="index.css"> <!-- CSS próprio da tela, por último -->
```

`design-tokens.css` primeiro (variáveis + reset), depois `base-components.css`
(botões, inputs, cards, chips, modais), depois `app-shell.css` se a tela tiver
sidebar/topbar. O CSS específico da tela nova entra por último, e só deve
conter o que sobrar depois dos passos 3–5.

## 3. Elimine cor hardcoded (o passo que mais economiza sofrimento)

Rode grep no HTML/CSS externo por valores crus:

- `#[0-9a-fA-F]{3,8}` (hex)
- `rgba?\(` que não seja `rgba(var(--...`

Para cada ocorrência, troque pelo token equivalente de
`shared/design-tokens.css` em vez de copiar o valor:

| Uso na tela externa | Token do sistema |
|---|---|
| texto forte / títulos | `var(--ink)` |
| texto padrão | `var(--text)` |
| texto secundário/legenda | `var(--muted)` |
| bordas | `var(--line)` |
| fundo de página / card | `var(--surface)`, `var(--surface-2)`, `var(--surface-3)` |
| cor de marca / destaque | `var(--brand-primary)`, `var(--brand-secondary)`, `var(--brand-soft)` |
| sucesso / aviso / erro | `var(--success)`, `var(--warning)`, `var(--danger)` (+ `-soft`, `-strong`) |

Se não existe token equivalente para uma cor realmente nova (não é o caso
comum), adicione a variável em **ambos** os blocos de `:root` e
`:root[data-theme="dark"]` do `design-tokens.css` — nunca hardcoded solto no
CSS da tela.

## 4. Elimine tipografia hardcoded

Não redeclare `font-family` — o `body` em `design-tokens.css` já define a
stack Inter. Para `font-size`/`font-weight`/`letter-spacing`, não copie os
valores arbitrários do arquivo externo: use a escala documentada na seção
"Tipografia" de `design.md` (ex.: títulos de card `18px`–`22px`, labels
`11px`–`14px` com peso `700`–`900`, texto auxiliar `12px`–`13px` em
`var(--muted)`).

## 5. Reaproveite componentes antes de criar CSS novo

Confira a lista "Classes CSS Reutilizaveis" em `design.md`
(`.btn`, `.btn-primary`, `.summary-card`, `.metric-card`, `.area-card`,
`.search-box`, `.favorite-modal`, etc.) e a seção correspondente de
`base-components.css`. Só escreva uma classe nova quando nada existente
resolver.

## 6. Procure primeiro se uma tela irmã já adaptou o mesmo protótipo

Antes de escrever qualquer classe nova, veja se outra tela do mesmo produto já passou por
esse processo com o mesmo HTML externo. Protótipos de terceiros costumam ter várias telas
no mesmo arquivo (ex.: `supportPage`, `hoursPage`, `configPage` todos no mesmo `.html`) —
se uma delas já foi integrada, o CSS próprio dela (ex.: `pasta-irma/index.css`) já deve ter
tokenizado boa parte das classes que a tela nova também usa (`.panel`, `.scope-grid`,
`.metric-icon`, `.badge`, estilos de tabela etc.). Rode grep pelas classes do trecho externo
nos CSS já existentes do projeto antes de assumir que são novas — reaproveitar aqui evita
remapear cor por cor um trabalho que outra tela já fez.

O mesmo vale para dados e lógica: se o protótipo tem um array mockado dentro do `<script>`,
veja se o projeto já tem um arquivo de dados equivalente (ex.: `data.js` compartilhado entre
telas da mesma feature) modelando a mesma entidade — reaproveite os dados e os helpers já
existentes (`esc`, `unique`, `metric`, `toast`...) em vez de copiar o array hardcoded do
protótipo para dentro da tela nova.

## 7. Dark mode deveria sair de graça — confirme, não reconstrua

Como toda cor no sistema é variável CSS, se os passos 3–5 foram feitos
direito o dark mode já funciona sozinho via os overrides em
`:root[data-theme="dark"]`. Não escreva regras de dark mode manuais para a
tela nova — se algo quebra no escuro, é sinal de uma cor que ainda ficou
hardcoded no passo 3; volte lá em vez de remendar com `[data-theme="dark"]`
específico da tela.

## 8. Estrutura HTML por último

Só ajuste marcação/estrutura depois de tokens, tipografia e componentes
resolvidos — normalmente é a parte que menos precisa mudar.

## 9. Checklist manual para a Bárbara testar

Este projeto não roda servidor local nem abre browser aqui — ela testa via
Live Server do VS Code. Ao final, entregar checklist manual:

- [ ] Visual em light mode bate com `design.md`
- [ ] Visual em dark mode (`[data-theme="dark"]`) sem cor hardcoded aparecendo
- [ ] Responsivo nos breakpoints `1320px`, `980px`, `640px`
- [ ] Nenhuma cor/fonte nova fora dos tokens documentados
