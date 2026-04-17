import { Categoria } from "./types";

export interface ProductoSemilla {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string | null;
  categoria: Categoria;
  activo: boolean;
}

export const CATALOGO_INICIAL: ProductoSemilla[] = [
  // Proteínas
  {
    nombre: "ON Gold Standard Whey 5lb",
    descripcion: "Proteína whey concentrada e isolada. 24g de proteína por porción. Sabores: Doble Chocolate, Vainilla Francesa, Fresa.",
    precio: 4800,
    stock: 5,
    imagen_url: null,
    categoria: "proteina",
    activo: true,
  },
  {
    nombre: "Dymatize ISO100 5lb",
    descripcion: "Proteína hidrolizada ultrapura. 25g de proteína, sin lactosa. Sabores: Fudge Brownie, Chocolate, Gourmet Vanilla.",
    precio: 5400,
    stock: 3,
    imagen_url: null,
    categoria: "proteina",
    activo: true,
  },
  {
    nombre: "MuscleTech NitroTech 4lb",
    descripcion: "Whey protein con creatina. 30g de proteína por porción. Sabores: Chocolate, Vainilla, Fresas y Crema.",
    precio: 4500,
    stock: 4,
    imagen_url: null,
    categoria: "proteina",
    activo: true,
  },
  {
    nombre: "BSN Syntha-6 5lb",
    descripcion: "Proteína de liberación sostenida con 6 fuentes distintas. 22g de proteína por porción. Sabores: Chocolate, Vainilla, Plátano.",
    precio: 4200,
    stock: 3,
    imagen_url: null,
    categoria: "proteina",
    activo: true,
  },
  {
    nombre: "ON Gold Standard Casein 4lb",
    descripcion: "Proteína de caseína de digestión lenta. Ideal para antes de dormir. 24g de proteína. Sabor: Chocolate Cremoso.",
    precio: 4900,
    stock: 2,
    imagen_url: null,
    categoria: "proteina",
    activo: true,
  },
  // Creatina
  {
    nombre: "ON Creatine Monohydrate 300g",
    descripcion: "Creatina monohidratada micronizada. Sin sabor, se mezcla fácilmente. Aumenta fuerza y rendimiento. 60 servicios.",
    precio: 1500,
    stock: 10,
    imagen_url: null,
    categoria: "creatina",
    activo: true,
  },
  {
    nombre: "Cellucor COR-Performance Creatine 300g",
    descripcion: "Creatina micronizada de alta pureza. 5g por porción. Sin sabor. 60 servicios.",
    precio: 1600,
    stock: 8,
    imagen_url: null,
    categoria: "creatina",
    activo: true,
  },
  {
    nombre: "MuscleTech Platinum Creatine 400g",
    descripcion: "Creatina monohidratada ultrapura HPLC certificada. 4g por porción. 80 servicios.",
    precio: 1750,
    stock: 6,
    imagen_url: null,
    categoria: "creatina",
    activo: true,
  },
  // Pre-entreno
  {
    nombre: "C4 Original 30 servicios",
    descripcion: "El pre-entreno más popular del mundo. 150mg de cafeína. Sabores: Fruit Punch, Watermelon, Pink Lemonade.",
    precio: 2200,
    stock: 6,
    imagen_url: null,
    categoria: "pre-entreno",
    activo: true,
  },
  {
    nombre: "C4 Extreme 30 servicios",
    descripcion: "Versión intensificada del C4 clásico. 200mg de cafeína. Mayor energía y enfoque. Sabores: Cherry Limeade, Blue Razz.",
    precio: 2600,
    stock: 4,
    imagen_url: null,
    categoria: "pre-entreno",
    activo: true,
  },
  {
    nombre: "Ghost Legend Pre-Workout 30 servicios",
    descripcion: "Pre-entreno premium con 250mg de cafeína. Sabores exclusivos: Sour Patch Kids, Swedish Fish, Welch's Grape.",
    precio: 2900,
    stock: 3,
    imagen_url: null,
    categoria: "pre-entreno",
    activo: true,
  },
  // Vitaminas
  {
    nombre: "ON Opti-Men Multivitamínico 90 tabs",
    descripcion: "Multivitamínico completo para hombres activos. 75+ ingredientes activos. Vitaminas, minerales, enzimas y antioxidantes.",
    precio: 1750,
    stock: 8,
    imagen_url: null,
    categoria: "vitaminas",
    activo: true,
  },
  {
    nombre: "ON Opti-Women 60 caps",
    descripcion: "Multivitamínico formulado especialmente para mujeres activas. 40+ ingredientes específicos para la salud femenina.",
    precio: 1600,
    stock: 6,
    imagen_url: null,
    categoria: "vitaminas",
    activo: true,
  },
  {
    nombre: "Vitamina D3 5000 IU 90 softgels",
    descripcion: "Vitamina D3 de alta potencia para huesos, sistema inmune y energía. Formato softgel de fácil absorción.",
    precio: 850,
    stock: 12,
    imagen_url: null,
    categoria: "vitaminas",
    activo: true,
  },
  {
    nombre: "Omega 3 Fish Oil 120 softgels",
    descripcion: "Aceite de pescado purificado. EPA + DHA para salud cardiovascular, articulaciones y cerebro. 120 softgels.",
    precio: 950,
    stock: 10,
    imagen_url: null,
    categoria: "vitaminas",
    activo: true,
  },
  // Aminoácidos
  {
    nombre: "Scivation Xtend BCAA 30 servicios",
    descripcion: "BCAAs 2:1:1 + glutamina + citrulina. Mejora recuperación y resistencia. Sabores: Watermelon, Blue Raspberry.",
    precio: 1800,
    stock: 7,
    imagen_url: null,
    categoria: "aminoacidos",
    activo: true,
  },
  {
    nombre: "ON Amino Energy 30 servicios",
    descripcion: "Aminoácidos esenciales + 100mg cafeína natural. Energía y recuperación en cualquier momento. Sabores: Green Apple, Orange.",
    precio: 1750,
    stock: 5,
    imagen_url: null,
    categoria: "aminoacidos",
    activo: true,
  },
  {
    nombre: "MusclePharm BCAA 3:1:2 200g",
    descripcion: "Ratio patentado 3:1:2 de leucina, isoleucina y valina. Máxima síntesis proteica. Sin sabor, 40 servicios.",
    precio: 1400,
    stock: 6,
    imagen_url: null,
    categoria: "aminoacidos",
    activo: true,
  },
  // Otros
  {
    nombre: "ON Serious Mass 6lb",
    descripcion: "Ganador de masa extremo. 1,250 calorías y 50g de proteína por porción. Ideal para hardgainers. Sabores: Chocolate, Vainilla.",
    precio: 5500,
    stock: 3,
    imagen_url: null,
    categoria: "otro",
    activo: true,
  },
  {
    nombre: "Universal Animal Pak 44 packs",
    descripcion: "El multivitamínico para atletas más completo del mundo. 44 packs con vitaminas, minerales, antioxidantes y digestivos.",
    precio: 2400,
    stock: 5,
    imagen_url: null,
    categoria: "otro",
    activo: true,
  },
];
