"use client";

import { ShoppingCart, Dumbbell, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { cantidad, setAbierto } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#2a2a2a] bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            Gain<span className="text-orange-500">RD</span>
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Tienda
          </Link>
          <Link
            href="/#categorias"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Categorías
          </Link>
          <Link
            href="/#contacto"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Contacto
          </Link>
        </div>

        {/* Carrito + menu mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAbierto(true)}
            className="relative rounded-lg p-2 text-gray-400 transition hover:bg-[#222] hover:text-white"
            aria-label="Ver carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {cantidad > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {cantidad}
              </span>
            )}
          </button>

          <button
            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#222] hover:text-white md:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuAbierto && (
        <div className="border-t border-[#2a2a2a] bg-[#111111] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-sm text-gray-300" onClick={() => setMenuAbierto(false)}>
              Tienda
            </Link>
            <Link href="/#categorias" className="text-sm text-gray-300" onClick={() => setMenuAbierto(false)}>
              Categorías
            </Link>
            <Link href="/#contacto" className="text-sm text-gray-300" onClick={() => setMenuAbierto(false)}>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
