import { supabase } from "@/lib/supabase";
import { Package, ClipboardList, AlertTriangle, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [{ data: productos }, { data: pedidos }] = await Promise.all([
      supabase.from("productos").select("id, stock, precio, activo"),
      supabase.from("pedidos").select("id, total, estado, created_at"),
    ]);

    const totalProductos = productos?.filter((p) => p.activo).length ?? 0;
    const sinStock = productos?.filter((p) => p.stock === 0).length ?? 0;
    const stockBajo = productos?.filter((p) => p.stock > 0 && p.stock <= 5).length ?? 0;

    const pedidosPendientes =
      pedidos?.filter((p) => p.estado === "pendiente").length ?? 0;

    const ventasTotales = pedidos
      ?.filter((p) => p.estado !== "cancelado")
      .reduce((acc, p) => acc + p.total, 0) ?? 0;

    const hoy = new Date().toDateString();
    const pedidosHoy =
      pedidos?.filter(
        (p) => new Date(p.created_at).toDateString() === hoy
      ).length ?? 0;

    return { totalProductos, sinStock, stockBajo, pedidosPendientes, ventasTotales, pedidosHoy };
  } catch {
    return {
      totalProductos: 0,
      sinStock: 0,
      stockBajo: 0,
      pedidosPendientes: 0,
      ventasTotales: 0,
      pedidosHoy: 0,
    };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    {
      titulo: "Productos activos",
      valor: stats.totalProductos,
      icono: Package,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      href: "/admin/productos",
    },
    {
      titulo: "Pedidos pendientes",
      valor: stats.pedidosPendientes,
      icono: ClipboardList,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      href: "/admin/pedidos",
    },
    {
      titulo: "Sin stock",
      valor: stats.sinStock,
      icono: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-400/10",
      href: "/admin/productos",
    },
    {
      titulo: "Ventas totales",
      valor: `RD$${stats.ventasTotales.toLocaleString("es-DO")}`,
      icono: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-400/10",
      href: "/admin/pedidos",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("es-DO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icono;
          return (
            <Link
              key={card.titulo}
              href={card.href}
              className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5 transition hover:border-[#3a3a3a]"
            >
              <div className={`mb-3 inline-flex rounded-lg p-2 ${card.bg}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{card.valor}</p>
              <p className="text-sm text-gray-500">{card.titulo}</p>
            </Link>
          );
        })}
      </div>

      {/* Alertas */}
      {(stats.sinStock > 0 || stats.stockBajo > 0) && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Alertas de inventario
          </h2>
          {stats.sinStock > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <p className="text-sm text-red-300">
                <strong>{stats.sinStock}</strong> producto(s) sin stock
              </p>
              <Link
                href="/admin/productos"
                className="ml-auto text-xs font-medium text-red-400 hover:underline"
              >
                Ver →
              </Link>
            </div>
          )}
          {stats.stockBajo > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <p className="text-sm text-orange-300">
                <strong>{stats.stockBajo}</strong> producto(s) con stock bajo (≤5 unidades)
              </p>
              <Link
                href="/admin/productos"
                className="ml-auto text-xs font-medium text-orange-400 hover:underline"
              >
                Ver →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
