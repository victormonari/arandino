// Todo el contenido editable de la página vive aquí: precios, ediciones, reseñas, FAQ.

export const WHATSAPP_NUMBER = "573146399551"; // Con indicativo 57
export const WHATSAPP_MESSAGE = "¡Hola Arándino! 🫐🍌 Quiero comprar la Billetera Arándino de gomitas crocantes. ¿Me ayudas con mi pedido?";

export const whatsappLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Precio base de una billetera en COP. Cambia aquí y se actualiza en toda la página.
export const BASE_PRICE = 14900;

export const PACKS = [
  { id: "1", units: 1, discount: 0, label: "1 billetera" },
  { id: "3", units: 3, discount: 0.1, label: "3 billeteras" },
  { id: "6", units: 6, discount: 0.15, label: "6 billeteras" },
] as const;

export type PackId = (typeof PACKS)[number]["id"];

export const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export type EditionId = "clasica" | "amor" | "halloween" | "navidad";

export type Edition = {
  id: EditionId;
  name: string;
  month: number | null; // 1-12; null = siempre disponible
  monthLabel: string;
  emoji: string;
  line: string;
  photo: string;
  image?: string; // Ruta en /public; si no hay, se muestra el espacio reservado
  // Toque de color de la temporada (clases de Tailwind)
  accent: string;
  accentSoft: string;
  ring: string;
};

export const EDITIONS: Edition[] = [
  {
    id: "clasica",
    name: "Clásica",
    month: null,
    monthLabel: "Todo el año",
    emoji: "🫐",
    line: "La original: arándano y banano en su billetera de siempre.",
    photo: "Foto: billetera cerrada",
    accent: "bg-grape-600",
    accentSoft: "bg-grape-50",
    ring: "ring-grape-300",
  },
  {
    id: "amor",
    name: "Amor y Amistad",
    month: 9,
    monthLabel: "Septiembre",
    emoji: "💌",
    line: "Para tu pareja, tus amigos o ese amigo secreto que se lo merece todo.",
    photo: "Foto: edición Amor y Amistad",
    image: "/images/edicion-amor-amistad.jpg",
    accent: "bg-gradient-to-r from-pink-500 to-red-500",
    accentSoft: "bg-pink-50",
    ring: "ring-pink-300",
  },
  {
    id: "halloween",
    name: "Halloween",
    month: 10,
    monthLabel: "Octubre",
    emoji: "🎃",
    line: "El dulce o truco de los niños, sin sellos y sin azúcar añadida.",
    photo: "Foto: edición Halloween",
    image: "/images/edicion-halloween.jpg",
    accent: "bg-gradient-to-r from-orange-500 to-neutral-900",
    accentSoft: "bg-orange-50",
    ring: "ring-orange-300",
  },
  {
    id: "navidad",
    name: "Navidad",
    month: 12,
    monthLabel: "Diciembre",
    emoji: "🎄",
    line: "Para la novena, el detalle de fin de año o el regalo de la oficina.",
    photo: "Foto: edición Navidad",
    image: "/images/edicion-navidad.jpg",
    accent: "bg-gradient-to-r from-red-600 to-emerald-600",
    accentSoft: "bg-emerald-50",
    ring: "ring-emerald-300",
  },
];

export const SEASONAL_EDITIONS = EDITIONS.filter((e) => e.month !== null);

// Si quieres forzar una temporada (para pruebas o lanzamientos), pon aquí su id. Si es null, se usa el mes actual.
export const ACTIVE_SEASON_OVERRIDE: EditionId | null = null;

export const getActiveSeason = (date = new Date()): Edition | null => {
  if (ACTIVE_SEASON_OVERRIDE) {
    return EDITIONS.find((e) => e.id === ACTIVE_SEASON_OVERRIDE) ?? null;
  }
  // El mes se toma en hora de Colombia, no en la del servidor
  const month = Number(
    new Intl.DateTimeFormat("en-US", { month: "numeric", timeZone: "America/Bogota" }).format(date),
  );
  return SEASONAL_EDITIONS.find((e) => e.month === month) ?? null;
};


export const NAV_LINKS = [
  { href: "#mision", label: "Misión" },
  { href: "#valores", label: "Valores" },
  { href: "#producto", label: "Producto" },
  { href: "#por-que", label: "Por qué Arándino" },
  { href: "#temporadas", label: "Temporadas" },
  { href: "#resenas", label: "Reseñas" },
];

export const COMPARISON = [
  {
    topic: "Origen del dulce",
    traditional: "Azúcar refinada y jarabe de maíz.",
    arandino: "100% fruta natural: arándano + banano.",
  },
  {
    topic: "Sellos de advertencia",
    traditional: "Suelen llevar 1, 2 o 3 octágonos.",
    arandino: "0 sellos, con nuestro sello verde de garantía.",
  },
  {
    topic: "Textura",
    traditional: "Gomita blanda y elástica hecha con gelatinas y almidones.",
    arandino: "Crocante de verdad gracias a la liofilización.",
  },
  {
    topic: "Color y sabor",
    traditional: "Colorantes artificiales y saborizantes sintéticos.",
    arandino: "Morado del arándano y amarillo del banano. 100% natural.",
  },
  {
    topic: "Empaque y porción",
    traditional: "Bolsa única o empaque no hermético.",
    arandino: "3 porciones independientes de 10 g en billetera.",
  },
  {
    topic: "Después de comer",
    traditional: "Plástico de un solo uso que termina en la basura.",
    arandino: "Compostable y billetera reutilizable.",
  },
];

export const REVIEWS = [
  {
    name: "Laura M.",
    city: "Medellín",
    stars: 5,
    text: "Pensé que iban a ser blanditas y no: crujen delicioso. Ya voy por la tercera billetera.",
  },
  {
    name: "Andrés R.",
    city: "Bogotá",
    stars: 5,
    text: "Se las mando a mis hijos en la lonchera. Un bolsillo por día y no peleo con ningún octágono.",
  },
  {
    name: "Valentina G.",
    city: "Cali",
    stars: 5,
    text: "Me quedé con la billetera y ahí cargo la tarjeta del MIO. Todo el mundo me pregunta dónde la compré.",
  },
  {
    name: "Camilo P.",
    city: "Barranquilla",
    stars: 4,
    text: "Volteé el paquete buscando sellos y nada. Solo fruta. Así da gusto comer dulce.",
  },
  {
    name: "Daniela S.",
    city: "Bucaramanga",
    stars: 5,
    text: "Es mi snack después del gym. Porción de 10 g, nada de azúcar añadida y me quita el antojo.",
  },
  {
    name: "Felipe T.",
    city: "Pereira",
    stars: 5,
    text: "El sabor del arándano es brutal, se siente fruta de verdad. El banano le da el toque.",
  },
];

export const RATING = { average: 4.8, count: 1287 };

export const FAQS = [
  {
    q: "¿De verdad no tiene azúcar ni edulcorantes?",
    a: "De verdad. No le añadimos azúcar ni edulcorantes de ningún tipo. El dulzor que sientes es el natural del arándano y el banano. Por eso no lleva octágonos y sí nuestro sello verde «Libre de sellos».",
  },
  {
    q: "¿Es apto para niños?",
    a: "Sí. Es fruta real liofilizada, sin colorantes ni azúcar añadida, y viene en porciones de 10 g perfectas para la lonchera. Para los más chiquitos, recomendamos que la coman siempre acompañados de un adulto.",
  },
  {
    q: "¿Cómo se composta el empaque?",
    a: "La billetera es de papel kraft + PLA, un material de origen vegetal. Primero úsala todo lo que quieras para monedas, tarjetas o el pase del bus. Cuando se gaste, va a tu compostera o al punto de residuos orgánicos de tu ciudad.",
  },
  {
    q: "¿Cuánto dura fresca?",
    a: "Cerrada, la gomita se mantiene crocante por varios meses (revisa la fecha en el empaque). Cada bolsillo va sellado aparte, así que lo que no abres sigue intacto. Y si el indicador cambia de color, es que entró humedad.",
  },
  {
    q: "¿Hacen envíos a mi ciudad?",
    a: "Enviamos a toda Colombia. En ciudades principales llega en 1 a 3 días hábiles y en el resto del país en 3 a 6 días hábiles. Si tienes dudas, escríbenos por WhatsApp.",
  },
];
