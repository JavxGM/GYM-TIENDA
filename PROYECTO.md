# GainRD — Tienda de Suplementos Online 🇩🇴

## Resumen del proyecto
Tienda online de suplementos para gimnasio en República Dominicana.
Presupuesto inicial: RD$10,000. Ventas online (primera) y física.
Pagos: transferencia bancaria o efectivo — sin gateway de pago.
Pedidos llegan por WhatsApp del dueño.

**URL producción:** https://gym-tienda.vercel.app  
**Repositorio:** github.com/JavxGM/GYM-TIENDA  
**Rama activa:** `claude/gym-store-startup-8YULM`

---

## Stack técnico
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 (CSS-first, `@import "tailwindcss"`)
- **Base de datos:** Supabase (PostgreSQL + RLS)
- **Deploy:** Vercel (auto-deploy desde GitHub)
- **Iconos:** lucide-react
- **Auth admin:** sessionStorage + contraseña en env var

---

## Variables de entorno (Vercel + .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://adimjkavydvvqbfqgvip.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_v2LZm0BkIuFfwY0P2SN0xA_8NL6ACl2
NEXT_PUBLIC_WHATSAPP_NUMBER=18097883649
NEXT_PUBLIC_ADMIN_PASSWORD=gainrd2024
```

---

## Estructura de archivos
```
src/
├── app/
│   ├── page.tsx                    # Tienda pública (hero + categorías + productos)
│   ├── layout.tsx                  # Layout raíz con CartContext
│   ├── globals.css                 # Tailwind v4 CSS
│   └── admin/
│       ├── layout.tsx              # Layout admin (sidebar + AuthGuard)
│       ├── page.tsx                # Dashboard con estadísticas
│       ├── productos/page.tsx      # Lista productos (server)
│       └── pedidos/page.tsx        # Lista pedidos (server)
├── api/
│   └── admin/seed/route.ts         # POST: carga catálogo de 20 productos
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx              # Drawer carrito → formulario → WhatsApp
│   └── admin/
│       ├── AdminAuthGuard.tsx      # Gate de contraseña con sessionStorage
│       ├── AdminSidebar.tsx
│       ├── ProductosAdmin.tsx      # CRUD productos + botón "Cargar catálogo"
│       └── PedidosAdmin.tsx        # Lista pedidos, filtros, cambio de estado
├── context/
│   └── CartContext.tsx             # Estado global del carrito
└── lib/
    ├── types.ts                    # Tipos: Producto, Pedido, ItemCarrito, Categoria
    ├── supabase.ts                 # Cliente Supabase con fallback placeholders
    ├── whatsapp.ts                 # Genera URL wa.me con mensaje formateado
    └── catalogo.ts                 # 20 productos reales con precios DR
supabase/
└── schema.sql                      # Tablas, RLS, catálogo inicial
```

---

## Base de datos (Supabase)

### Tabla `productos`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | UUID | PK auto |
| nombre | TEXT | |
| descripcion | TEXT | |
| precio | NUMERIC(10,2) | ≥ 0 |
| stock | INTEGER | ≥ 0 |
| imagen_url | TEXT | nullable |
| categoria | TEXT | proteina / creatina / pre-entreno / vitaminas / aminoacidos / otro |
| activo | BOOLEAN | default true |
| created_at | TIMESTAMPTZ | |

### Tabla `pedidos`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | UUID | PK auto |
| cliente_nombre | TEXT | |
| cliente_telefono | TEXT | |
| cliente_direccion | TEXT | |
| items | JSONB | array de ItemCarrito |
| total | NUMERIC(10,2) | |
| estado | TEXT | pendiente / confirmado / entregado / cancelado |
| notas | TEXT | nullable |
| created_at | TIMESTAMPTZ | |

### RLS Policies
- `productos`: lectura pública solo activos, admin todo
- `pedidos`: inserción pública, admin todo

---

## Flujo de compra (cliente)
1. Entra a `gym-tienda.vercel.app`
2. Ve productos por categoría, añade al carrito
3. Abre drawer → llena nombre, teléfono, dirección
4. Click "Enviar pedido por WhatsApp"
5. Se guarda en Supabase y abre WhatsApp con mensaje formateado
6. Dueño recibe el mensaje y confirma manualmente

---

## Panel admin (`/admin`)
- **Contraseña:** `gainrd2024` (cambiar en Vercel → `NEXT_PUBLIC_ADMIN_PASSWORD`)
- **Dashboard:** stats de productos activos, pedidos pendientes, sin stock, ventas totales
- **Productos:** CRUD completo + toggle activo/oculto + botón "Cargar catálogo" (20 productos de golpe)
- **Pedidos:** lista con expand, filtros por estado, cambio de estado, link WhatsApp al cliente

---

## Catálogo de 20 productos (ya en código)

### Proteínas
| Producto | Precio |
|---------|--------|
| ON Gold Standard Whey 5lb | RD$4,800 |
| Dymatize ISO100 5lb | RD$5,400 |
| MuscleTech NitroTech 4lb | RD$4,500 |
| BSN Syntha-6 5lb | RD$4,200 |
| ON Gold Standard Casein 4lb | RD$4,900 |

### Creatina
| Producto | Precio |
|---------|--------|
| ON Creatine Monohydrate 300g | RD$1,500 |
| Cellucor COR-Performance Creatine 300g | RD$1,600 |
| MuscleTech Platinum Creatine 400g | RD$1,750 |

### Pre-Entreno
| Producto | Precio |
|---------|--------|
| C4 Original 30 servicios | RD$2,200 |
| C4 Extreme 30 servicios | RD$2,600 |
| Ghost Legend Pre-Workout 30 servicios | RD$2,900 |

### Vitaminas
| Producto | Precio |
|---------|--------|
| ON Opti-Men 90 tabs | RD$1,750 |
| ON Opti-Women 60 caps | RD$1,600 |
| Vitamina D3 5000 IU 90 softgels | RD$850 |
| Omega 3 Fish Oil 120 softgels | RD$950 |

### Aminoácidos
| Producto | Precio |
|---------|--------|
| Scivation Xtend BCAA 30 servicios | RD$1,800 |
| ON Amino Energy 30 servicios | RD$1,750 |
| MusclePharm BCAA 3:1:2 200g | RD$1,400 |

### Otros
| Producto | Precio |
|---------|--------|
| ON Serious Mass 6lb | RD$5,500 |
| Universal Animal Pak 44 packs | RD$2,400 |

---

## Estado actual

### Completado ✅
- [x] Web app desplegada y funcional en Vercel
- [x] Tienda pública con carrito y checkout WhatsApp
- [x] Panel admin con CRUD productos y gestión pedidos
- [x] Supabase conectado (tablas + RLS funcionando)
- [x] Pedidos se guardan en DB antes de abrir WhatsApp
- [x] Botón "Cargar catálogo" con 20 productos reales DR
- [x] Schema SQL actualizado con catálogo real

### Pendiente 🔲

#### Alta prioridad
- [ ] Ir a `/admin/productos` → "Cargar catálogo" → confirmar
- [ ] Eliminar los 5 productos de muestra del setup inicial
- [ ] Ajustar stock real según lo disponible
- [ ] Agregar fotos a los productos (campo `imagen_url`)
- [ ] Cambiar contraseña admin en Vercel env vars

#### Instagram
- [ ] Crear cuenta → usuario `@gainrd.do` o `@gainrd`
- [ ] Cambiar a cuenta Profesional → Negocios
- [ ] Poner bio y link en bio (`https://gym-tienda.vercel.app`)
- [ ] Publicar post de lanzamiento
- [ ] Publicar posts de proteína, creatina, pre-entreno
- [ ] Conectar Instagram con WhatsApp Business

#### Mejoras futuras
- [ ] Dominio propio (ej. gainrd.com.do)
- [ ] Subida de imágenes desde el admin (Supabase Storage)
- [ ] Notificación automática al dueño cuando llega un pedido
- [ ] Página de confirmación con número de orden
- [ ] Búsqueda y filtros en la tienda
- [ ] Combos / productos relacionados
- [ ] Pasarela de pago (Azul, PayPal) cuando escale

---

## Instagram — copy listo

### Bio
```
💪 Suplementos premium en RD
🇩🇴 Delivery a todo el país
⚡ Proteínas • Creatina • Pre-entreno
📦 Pedido por link 👇
```
Link en bio: `https://gym-tienda.vercel.app`

### Hashtags base
`#GainRD #SuplementosRD #GymRD #FitnessRD #ProteinaRD #RepublicaDominicana #GymLife #Suplementos #Fitness #MuscleGain #Proteina #PreEntreno #Creatina`

---

## Notas técnicas
- Todas las páginas con Supabase tienen `export const dynamic = "force-dynamic"`
- El cliente Supabase usa placeholders para que el build no falle sin env vars
- El admin usa contraseña simple en `sessionStorage` (no Supabase Auth)
- Tailwind v4: config CSS-first en `globals.css`, sin `tailwind.config.js`
- ESLint 9 con flat config (`eslint.config.mjs` + `FlatCompat`)
