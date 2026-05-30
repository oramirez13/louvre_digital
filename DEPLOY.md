# Deploy Guide

## GitHub

Si vas a subir `jquery/louvre_digital` como proyecto independiente:

```bash
cd jquery/louvre_digital
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/louvre_digital.git
git push -u origin main
```

## Render

Este proyecto se despliega como `Static Site`.

Configuracion recomendada:

- Service Type: `Static Site`
- Branch: `main`
- Build Command: dejar vacio
- Publish Directory: `.`

Si el repositorio contiene mas carpetas y `louvre_digital` vive dentro de una subcarpeta:

- Root Directory: `jquery/louvre_digital`
- Build Command: dejar vacio
- Publish Directory: `.`

## Notas

- no requiere backend
- no requiere base de datos
- no necesita proceso de build
- Render redeploya automaticamente con cada push a la rama conectada
