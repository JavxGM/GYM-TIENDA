import { supabase } from "@/lib/supabase";
import { Producto, Categoria } from "@/lib/types";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { Dumbbell, MessageCircle, MapPin, Clock } from "lucide-react";

const CATEGORIAS: { valor: Categoria; etiqueta: string; emoji: string }[] = [
  { valor: "proteina", etiqueta: "Proteínas", emoji: "🥛" },
  { valor: "creatina", etiqueta: "Creatina", emoji: "💪" },
  { valor: "pre-entreno", etiqueta: "Pre-Entreno", emoji: "⚡" },
  { valor: "vitaminas", etiqueta: "Vitaminas", emoji: "💊" },
  { valor: "aminoacidos", etiqueta: "Aminoácidos", emoji: "🔬" },
  { valor: "otro", etiqueta: "Otros", emoji: "📦" },
];

async function getProductos(): Promise<Producto[]> {
  try {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const productos = await getProductos();

  const productosPorCategoria = CATEGORIAS.map((cat) => ({
    ...cat,
    productos: productos.filter((p) => p.categoria === cat.valor),
  })).filter((cat) => cat.productos.length > 0);

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <CartDrawer />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2a2a2a] bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] py-20">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <Dumbbell className="h-96 w-96 text-orange-500" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
            🇩🇴 República Dominicana
          </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Los mejores<br />
            <span className="text-orange-500">suplementos</span> del país
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
            Calidad comprobada, precios justos. Delivery y pickup disponible en
            toda República Dominicana.
          </p>
          <a
            href="#productos"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95"
          >
            Ver productos
          </a>
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold text-white">Categorías</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {CATEGORIAS.map((cat) => (
            <a
              key={cat.valor}
              href={`#cat-${cat.valor}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-4 text-center transition hover:border-orange-500/50 hover:bg-[#222]"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium text-gray-300">
                {cat.etiqueta}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="mx-auto max-w-6xl px-4 pb-16">
        {productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Dumbbell className="mb-4 h-16 w-16 text-gray-700" />
            <h3 className="mb-2 text-lg font-semibold text-gray-400">
              Próximamente
            </h3>
            <p className="text-sm text-gray-600">
              Estamos cargando el inventario. Escríbenos por WhatsApp para
              preguntar disponibilidad.
            </p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        ) : (
          <>
            {productosPorCategoria.map((cat) => (
              <div key={cat.valor} id={`cat-${cat.valor}`} className="mb-12">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                  <span>{cat.emoji}</span>
                  {cat.etiqueta}
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cat.productos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="border-t border-[#2a2a2a] bg-[#1a1a1a]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold text-white">Contacto</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
              <div>
                <p className="mb-1 font-semibold text-white">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-orange-500"
                >
                  Escríbenos directo
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
              <div>
                <p className="mb-1 font-semibold text-white">Ubicación</p>
                <p className="text-sm text-gray-400">
                  República Dominicana
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
              <div>
                <p className="mb-1 font-semibold text-white">Horario</p>
                <p className="text-sm text-gray-400">Lun – Sáb: 8am – 8pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] bg-[#111111] px-4 py-6 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} GainRD — República Dominicana
        </p>
      </footer>
    </div>
  );
}
