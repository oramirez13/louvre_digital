# Deploy Guide

## GitHub

Este proyecto ya está preparado como repositorio independiente. Para revisar el remoto actual:

```bash
git remote -v
```

El remoto configurado actualmente es:

```text
git@github.com:oramirez13/louvre_digital.git
```

Para guardar cambios y subirlos a GitHub:

```bash
cd /home/orami/u_fidelitas/desarrollo_web/jquery/louvre_digital
git status
git add .
git commit -m "Actualizar proyecto Louvre Digital"
git push
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
