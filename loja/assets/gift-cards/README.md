# Logos de gift cards — Brindes personalizados

Coloque aqui os logos dos gift cards exibidos na seção "Gift cards".

## Como nomear o arquivo

Use o `icon` do item (veja `loja/data/brindes-personalizados.json`, campo `giftCards.items`):

```
netflix.png
steam.png
google-play.png
spotify.png
uber.png
playstation.png
xbox.png
```

## Formato e tamanho recomendados

- Formato: `.png` ou `.jpg`, imagem quadrada preenchendo todo o quadro (estilo ícone de app, sem margens/transparência) — a foto cobre a área toda do card (`object-fit: cover`)
- Tamanho recomendado: **300x280px**
- Peso: idealmente abaixo de 150KB

## O que acontece se eu não subir uma imagem

O card continua exibindo as iniciais do nome (ex: "NE" para Netflix) como hoje. O logo substitui as iniciais automaticamente assim que o arquivo correspondente existir nesta pasta.
