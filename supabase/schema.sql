-- ============================================
-- GainRD — Schema de base de datos Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- Tabla de productos
CREATE TABLE IF NOT EXISTS public.productos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT '',
  precio      NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  imagen_url  TEXT,
  categoria   TEXT NOT NULL DEFAULT 'otro'
              CHECK (categoria IN ('proteina', 'creatina', 'pre-entreno', 'vitaminas', 'aminoacidos', 'otro')),
  activo      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nombre     TEXT NOT NULL,
  cliente_telefono   TEXT NOT NULL,
  cliente_direccion  TEXT NOT NULL,
  items              JSONB NOT NULL DEFAULT '[]',
  total              NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  estado             TEXT NOT NULL DEFAULT 'pendiente'
                     CHECK (estado IN ('pendiente', 'confirmado', 'entregado', 'cancelado')),
  notas              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_productos_activo ON public.productos (activo);
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos (categoria);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON public.pedidos (estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON public.pedidos (created_at DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

-- Productos: lectura pública solo activos, escritura sin auth (usamos password en frontend)
CREATE POLICY "productos_lectura_publica" ON public.productos
  FOR SELECT USING (activo = true);

CREATE POLICY "productos_admin_todo" ON public.productos
  FOR ALL USING (true);

-- Pedidos: inserción pública (el cliente crea el pedido), admin ve todo
CREATE POLICY "pedidos_insertar_publico" ON public.pedidos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "pedidos_admin_todo" ON public.pedidos
  FOR ALL USING (true);

-- ============================================
-- Datos de ejemplo (opcional, borrar en producción)
-- ============================================

INSERT INTO public.productos (nombre, descripcion, precio, stock, categoria) VALUES
  ('Whey Protein Gold Standard 5lb', 'Proteína de suero de alta calidad. Disponible en chocolate, vainilla y fresa.', 3500, 10, 'proteina'),
  ('Creatina Monohidrato 500g', 'Creatina pura 100% monohidrato. Aumenta fuerza y resistencia.', 1200, 15, 'creatina'),
  ('Pre-Entreno C4 Original', 'Energía explosiva para tu entrenamiento. Sabor sandía.', 1800, 8, 'pre-entreno'),
  ('Multivitamínico Animal Pak', 'Pack completo de vitaminas y minerales para atletas.', 2200, 6, 'vitaminas'),
  ('BCAA 2:1:1 300g', 'Aminoácidos de cadena ramificada para recuperación muscular.', 950, 20, 'aminoacidos')
ON CONFLICT DO NOTHING;
