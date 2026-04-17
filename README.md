# GainRD

Tienda de suplementos en República Dominicana.

## Deploy rápido a Vercel (1 click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JavxGM/GYM-TIENDA&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_WHATSAPP_NUMBER,NEXT_PUBLIC_ADMIN_PASSWORD&envDescription=Credenciales+Supabase+y+configuracion+de+la+tienda&project-name=gainrd&repository-name=gainrd)

El botón te pedirá estas 4 variables de entorno:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://adimjkavydvvqbfqgvip.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_v2LZm0BkIuFfwY0P2SN0xA_8NL6ACl2` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `18097883649` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | (inventa una propia) |

---

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Postgres + RLS)
- Vercel (hosting)

## Desarrollo local

```bash
cp .env.local.example .env.local
# edita .env.local con tus credenciales
npm install
npm run dev
```

## Estructura

- `/` — Tienda pública (catálogo + carrito + checkout por WhatsApp)
- `/admin` — Panel admin protegido por contraseña
  - `/admin/productos` — CRUD de productos + inventario
  - `/admin/pedidos` — Gestión de pedidos

## Base de datos

El schema está en `supabase/schema.sql`. Para setup inicial, ejecútalo en
Supabase → SQL Editor → New query → Run.
