import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "GainRD — Suplementos en República Dominicana",
  description:
    "Los mejores suplementos deportivos en República Dominicana. Proteínas, creatina, pre-entrenos y más. Delivery y pickup disponible.",
  keywords: "suplementos, proteína, creatina, gym, República Dominicana, GainRD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
