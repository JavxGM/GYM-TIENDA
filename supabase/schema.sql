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
-- Catálogo inicial de productos
-- ============================================

INSERT INTO public.productos (nombre, descripcion, precio, stock, categoria) VALUES
  -- Proteínas
  ('ON Gold Standard Whey 5lb', 'Proteína whey concentrada e isolada. 24g de proteína por porción. Sabores: Doble Chocolate, Vainilla Francesa, Fresa.', 4800, 5, 'proteina'),
  ('Dymatize ISO100 5lb', 'Proteína hidrolizada ultrapura. 25g de proteína, sin lactosa. Sabores: Fudge Brownie, Chocolate, Gourmet Vanilla.', 5400, 3, 'proteina'),
  ('MuscleTech NitroTech 4lb', 'Whey protein con creatina. 30g de proteína por porción. Sabores: Chocolate, Vainilla, Fresas y Crema.', 4500, 4, 'proteina'),
  ('BSN Syntha-6 5lb', 'Proteína de liberación sostenida con 6 fuentes distintas. 22g de proteína por porción.', 4200, 3, 'proteina'),
  ('ON Gold Standard Casein 4lb', 'Proteína de caseína de digestión lenta. Ideal para antes de dormir. 24g de proteína.', 4900, 2, 'proteina'),
  -- Creatina
  ('ON Creatine Monohydrate 300g', 'Creatina monohidratada micronizada. Sin sabor, se mezcla fácilmente. 60 servicios.', 1500, 10, 'creatina'),
  ('Cellucor COR-Performance Creatine 300g', 'Creatina micronizada de alta pureza. 5g por porción. Sin sabor. 60 servicios.', 1600, 8, 'creatina'),
  ('MuscleTech Platinum Creatine 400g', 'Creatina monohidratada ultrapura HPLC certificada. 4g por porción. 80 servicios.', 1750, 6, 'creatina'),
  -- Pre-Entreno
  ('C4 Original 30 servicios', 'El pre-entreno más popular del mundo. 150mg de cafeína. Sabores: Fruit Punch, Watermelon, Pink Lemonade.', 2200, 6, 'pre-entreno'),
  ('C4 Extreme 30 servicios', 'Versión intensificada del C4 clásico. 200mg de cafeína. Mayor energía y enfoque.', 2600, 4, 'pre-entreno'),
  ('Ghost Legend Pre-Workout 30 servicios', 'Pre-entreno premium con 250mg de cafeína. Sabores exclusivos: Sour Patch Kids, Swedish Fish.', 2900, 3, 'pre-entreno'),
  -- Vitaminas
  ('ON Opti-Men Multivitamínico 90 tabs', 'Multivitamínico completo para hombres activos. 75+ ingredientes activos.', 1750, 8, 'vitaminas'),
  ('ON Opti-Women 60 caps', 'Multivitamínico formulado para mujeres activas. 40+ ingredientes específicos.', 1600, 6, 'vitaminas'),
  ('Vitamina D3 5000 IU 90 softgels', 'Vitamina D3 para huesos, sistema inmune y energía. Formato softgel de fácil absorción.', 850, 12, 'vitaminas'),
  ('Omega 3 Fish Oil 120 softgels', 'Aceite de pescado purificado. EPA + DHA para salud cardiovascular y articulaciones.', 950, 10, 'vitaminas'),
  -- Aminoácidos
  ('Scivation Xtend BCAA 30 servicios', 'BCAAs 2:1:1 + glutamina + citrulina. Mejora recuperación y resistencia. Sabores: Watermelon, Blue Raspberry.', 1800, 7, 'aminoacidos'),
  ('ON Amino Energy 30 servicios', 'Aminoácidos esenciales + 100mg cafeína natural. Energía y recuperación. Sabores: Green Apple, Orange.', 1750, 5, 'aminoacidos'),
  ('MusclePharm BCAA 3:1:2 200g', 'Ratio patentado 3:1:2. Máxima síntesis proteica. Sin sabor, 40 servicios.', 1400, 6, 'aminoacidos'),
  -- Otros
  ('ON Serious Mass 6lb', 'Ganador de masa extremo. 1,250 calorías y 50g de proteína por porción. Ideal para hardgainers.', 5500, 3, 'otro'),
  ('Universal Animal Pak 44 packs', 'El multivitamínico para atletas más completo. 44 packs con vitaminas, minerales y antioxidantes.', 2400, 5, 'otro')
ON CONFLICT DO NOTHING;
