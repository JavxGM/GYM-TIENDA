"use client";

import { useState, useEffect, ReactNode } from "react";
import { Dumbbell, Lock } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const ok = sessionStorage.getItem("gainrd_admin") === "true";
    setAutenticado(ok);
    setCargando(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correcta = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "gainrd2024";
    if (password === correcta) {
      sessionStorage.setItem("gainrd_admin", "true");
      setAutenticado(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (cargando) return null;

  if (!autenticado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3">
            <Dumbbell className="h-10 w-10 text-orange-500" />
            <h1 className="text-2xl font-bold text-white">
              Gain<span className="text-orange-500">RD</span> Admin
            </h1>
          </div>
          <form
            onSubmit={handleLogin}
            className="space-y-4 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-6"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#2a2a2a] bg-[#111] py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500"
                />
              </div>
              {error && (
                <p className="mt-1 text-xs text-red-400">Contraseña incorrecta</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-2.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
