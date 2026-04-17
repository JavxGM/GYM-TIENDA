import { supabase } from "@/lib/supabase";
import { Producto } from "@/lib/types";
import ProductosAdmin from "@/components/admin/ProductosAdmin";

async function getProductos(): Promise<Producto[]> {
  try {
    const { data } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ProductosPage() {
  const productos = await getProductos();
  return <ProductosAdmin productosIniciales={productos} />;
}
