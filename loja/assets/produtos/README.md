# Imagens de produtos — Brindes personalizados

Coloque aqui as fotos dos produtos que aparecem em `loja/brindes-personalizados.html`.

## Como nomear o arquivo

Use o `id` do produto (veja `loja/data/brindes-personalizados.json`) como nome do arquivo:

```
p01.jpg
p02.jpg
p03.jpg
...
```

Consulte o JSON para saber qual `id` pertence a qual produto, por exemplo:

```json
{ "id": "p01", "name": "Sachê unitário de café gourmet 500g", ... }
```
→ salve a foto como `p01.jpg`.

## Formato e tamanho recomendados

- Formato: `.jpg` (fotos) ou `.png` (se precisar de fundo transparente)
- Tamanho recomendado: **600x600px**, imagem quadrada
- Peso: idealmente abaixo de 200KB (comprima a imagem antes de subir)
- Fundo: preferencialmente branco ou neutro, para manter o catálogo visualmente consistente

## O que acontece se eu não subir uma imagem

Nenhum problema — o produto continua exibindo o ícone ilustrativo (SVG) como hoje. A foto substitui o ícone automaticamente assim que o arquivo correspondente existir nesta pasta.
