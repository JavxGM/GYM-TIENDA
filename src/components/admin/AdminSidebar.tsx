"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell,
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem("gainrd_admin");
    window.location.href = "/admin";
  };

  return (
    <aside className="flex w-56 flex-col border-r border-[#2a2a2a] bg-[#111111]">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-5 py-4">
        <Dumbbell className="h-5 w-5 text-orange-500" />
        <span className="font-bold text-white">
          Gain<span className="text-orange-500">RD</span>
        </span>
        <span className="ml-auto rounded bg-orange-500/20 px-1.5 py-0.5 text-xs font-medium text-orange-400">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const activo = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activo
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-gray-400 hover:bg-[#222] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-[#2a2a2a] px-3 py-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-[#222] hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Ver tienda
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-[#222] hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    </aside>
  );
}
