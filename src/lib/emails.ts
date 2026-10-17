// Plantillas y validación de los formularios que se envían por correo con Resend.

import { whatsappLink } from "./content";

export type FormType = "distribuidor" | "resena" | "boletin";

type Field = { key: string; label: string; required?: boolean; email?: boolean; max?: number };

export const FORM_FIELDS: Record<FormType, Field[]> = {
  distribuidor: [
    { key: "nombre", label: "Nombre", required: true, max: 120 },
    { key: "empresa", label: "Empresa o tienda", required: true, max: 160 },
    { key: "ciudad", label: "Ciudad", required: true, max: 120 },
    { key: "correo", label: "Correo", required: true, email: true, max: 200 },
    { key: "telefono", label: "Teléfono", required: true, max: 40 },
  ],
  resena: [
    { key: "nombre", label: "Nombre", required: true, max: 120 },
    { key: "ciudad", label: "Ciudad", required: true, max: 120 },
    { key: "estrellas", label: "Estrellas", required: true, max: 1 },
    { key: "comentario", label: "Comentario", required: true, max: 1500 },
  ],
  boletin: [{ key: "correo", label: "Correo", required: true, email: true, max: 200 }],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isFormType = (value: unknown): value is FormType =>
  typeof value === "string" && value in FORM_FIELDS;

export const validate = (type: FormType, raw: Record<string, unknown>) => {
  const data: Record<string, string> = {};
  for (const field of FORM_FIELDS[type]) {
    const value = typeof raw[field.key] === "string" ? (raw[field.key] as string).trim() : "";
    if (field.required && !value) return { error: `Falta el campo «${field.label}».` };
    if (field.max && value.length > field.max) return { error: `El campo «${field.label}» es muy largo.` };
    if (field.email && value && !EMAIL_RE.test(value)) return { error: "Revisa tu correo, parece que tiene un error." };
    data[field.key] = value;
  }
  if (type === "resena" && !/^[1-5]$/.test(data.estrellas)) return { error: "La calificación debe ser de 1 a 5." };
  return { data };
};

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Paleta de la marca (los correos no leen CSS externo, todo va en línea)
const C = {
  grape: "#66339e",
  grapeDark: "#43226a",
  grapeSoft: "#f6f2fb",
  grapeLine: "#ece3f7",
  banana: "#ffd43b",
  leaf: "#23874a",
  leafSoft: "#eefbf2",
  cream: "#fdf9f1",
  ink: "#24182f",
  muted: "#7a6a88",
};

const FONT = "'Trebuchet MS','Segoe UI',Arial,Helvetica,sans-serif";

type LayoutOptions = {
  siteUrl: string;
  preheader: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  heroImage?: string;
  content: string;
};

const layout = ({ siteUrl, preheader, eyebrow, title, intro, heroImage, content }: LayoutOptions) => `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${C.cream};font-family:${FONT};color:${C.ink};-webkit-font-smoothing:antialiased">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream}">
      <tr><td align="center" style="padding:28px 12px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">

          <!-- Encabezado -->
          <tr><td style="background:${C.grape};background-image:linear-gradient(135deg,${C.grape},${C.grapeDark});border-radius:24px 24px 0 0;padding:28px 32px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:middle">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="width:40px;height:40px;background:#ffffff;border-radius:20px;text-align:center;vertical-align:middle;font-size:20px;font-weight:bold;color:${C.grape}">A</td>
                  <td style="padding-left:12px;font-size:26px;font-weight:bold;color:#ffffff;letter-spacing:-0.5px">Arándino<span style="color:${C.banana}">.</span></td>
                </tr></table>
              </td>
              <td align="right" style="vertical-align:middle;font-size:12px;color:#d8c6ef">La billetera de<br />gomitas crocantes</td>
            </tr></table>
          </td></tr>

          <!-- Franja de frutas -->
          <tr><td style="height:6px;line-height:6px;font-size:0;background:${C.banana};background-image:linear-gradient(90deg,${C.grape} 0%,${C.grape} 50%,${C.banana} 50%,${C.banana} 100%)">&nbsp;</td></tr>

          <!-- Cuerpo -->
          <tr><td style="background:#ffffff;padding:36px 32px 32px">
            ${eyebrow ? `<p style="margin:0 0 10px;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${C.grape}">${eyebrow}</p>` : ""}
            <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;color:#2e1649">${title}</h1>
            ${intro ? `<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4a3d57">${intro}</p>` : ""}
            ${heroImage ? `<img src="${heroImage}" width="536" alt="Billetera Arándino" style="display:block;width:100%;max-width:536px;height:auto;border-radius:18px;margin:0 0 28px" />` : ""}
            ${content}
          </td></tr>

          <!-- Pie -->
          <tr><td style="background:${C.grapeSoft};border-radius:0 0 24px 24px;padding:26px 32px;text-align:center">
            <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${C.grape}">Te comes las gomitas y te quedas con la billetera.</p>
            <p style="margin:0 0 14px;font-size:12px;color:${C.muted}">Arándano + banano · sin azúcar añadida · libre de sellos · empaque compostable</p>
            <p style="margin:0;font-size:12px">
              <a href="${siteUrl}" style="color:${C.grape};text-decoration:none;font-weight:bold">arandino</a>
              <span style="color:${C.muted}">&nbsp;·&nbsp;</span>
              <a href="${whatsappLink()}" style="color:${C.grape};text-decoration:none;font-weight:bold">WhatsApp</a>
              <span style="color:${C.muted}">&nbsp;·&nbsp; Hecho en Colombia 🇨🇴</span>
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
</html>`;

const button = (href: string, label: string, variant: "primary" | "secondary" | "whatsapp" = "primary") => {
  const styles = {
    primary: `background:${C.grape};color:#ffffff;border:2px solid ${C.grape}`,
    secondary: `background:#ffffff;color:${C.grape};border:2px solid ${C.grape}`,
    whatsapp: "background:#25D366;color:#ffffff;border:2px solid #25D366",
  }[variant];
  return `<a href="${href}" style="display:inline-block;${styles};border-radius:999px;padding:12px 22px;font-size:15px;font-weight:bold;text-decoration:none;margin:0 8px 10px 0">${label}</a>`;
};

const buttons = (...items: string[]) => `<div style="margin:26px 0 4px">${items.join("")}</div>`;

const p = (text: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#4a3d57">${text}</p>`;

const chip = (text: string, bg: string, color: string) =>
  `<span style="display:inline-block;background:${bg};color:${color};border-radius:999px;padding:5px 12px;font-size:12px;font-weight:bold;margin:0 6px 6px 0">${text}</span>`;

const dataCard = (type: FormType, data: Record<string, string>) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.grapeSoft};border-radius:18px;border-collapse:separate">
    <tr><td style="padding:8px 22px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${FORM_FIELDS[type]
        .filter((f) => !(type === "resena" && (f.key === "estrellas" || f.key === "comentario")))
        .map(
          (f, i, all) => `<tr>
            <td style="padding:12px 12px 12px 0;${i < all.length - 1 ? `border-bottom:1px solid ${C.grapeLine};` : ""}font-size:13px;font-weight:bold;color:${C.muted};white-space:nowrap;vertical-align:top;width:35%">${f.label}</td>
            <td style="padding:12px 0;${i < all.length - 1 ? `border-bottom:1px solid ${C.grapeLine};` : ""}font-size:15px;font-weight:bold;color:${C.ink};white-space:pre-wrap">${escape(data[f.key] ?? "")}</td>
          </tr>`,
        )
        .join("")}</table>
    </td></tr>
  </table>`;

const highlights = () => {
  const items = [
    { icon: "🫐", title: "Fruta real", text: "Arándano + banano, nada más." },
    { icon: "✅", title: "Libre de sellos", text: "Cero azúcar añadida." },
    { icon: "👛", title: "Billetera", text: "El empaque se queda contigo." },
  ];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 4px"><tr>${items
    .map(
      (it) => `<td width="33%" style="padding:4px;vertical-align:top">
        <div style="background:${C.leafSoft};border-radius:16px;padding:16px 10px;text-align:center">
          <div style="font-size:24px;line-height:1">${it.icon}</div>
          <div style="margin-top:8px;font-size:13px;font-weight:bold;color:${C.leaf}">${it.title}</div>
          <div style="margin-top:4px;font-size:12px;line-height:1.4;color:${C.muted}">${it.text}</div>
        </div>
      </td>`,
    )
    .join("")}</tr></table>`;
};

const receivedAt = () =>
  new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short", timeZone: "America/Bogota" }).format(new Date());

const TEAM_SUBJECT: Record<FormType, (d: Record<string, string>) => string> = {
  distribuidor: (d) => `🤝 Nuevo distribuidor: ${d.empresa} (${d.ciudad})`,
  resena: (d) => `⭐ Nueva reseña de ${d.nombre}: ${"★".repeat(Number(d.estrellas))}`,
  boletin: () => "💜 Nueva suscripción al boletín",
};

// Teléfono colombiano listo para wa.me (agrega el 57 si no lo trae)
const waPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `57${digits}` : digits;
};

// Correo para el equipo con los datos del formulario
export const teamEmail = (type: FormType, data: Record<string, string>, siteUrl: string) => {
  const subject = TEAM_SUBJECT[type](data);
  const meta = `<p style="margin:0 0 20px">${chip(`Recibido el ${receivedAt()}`, C.grapeSoft, C.grape)}</p>`;

  if (type === "distribuidor") {
    return {
      subject,
      html: layout({
        siteUrl,
        preheader: `${data.nombre} quiere distribuir Arándino en ${data.ciudad}.`,
        eyebrow: "Nueva solicitud de distribución",
        title: `${escape(data.empresa)} quiere vender Arándino`,
        intro: `<b>${escape(data.nombre)}</b> llenó el formulario desde ${escape(data.ciudad)}. Escríbele pronto: la promesa es responder en menos de 48 horas.`,
        content:
          meta +
          dataCard(type, data) +
          buttons(
            button(`mailto:${encodeURIComponent(data.correo)}?subject=${encodeURIComponent("Distribución de Arándino")}`, "Responder por correo"),
            button(
              `https://wa.me/${waPhone(data.telefono)}?text=${encodeURIComponent(`¡Hola ${data.nombre}! Te escribimos de Arándino por tu solicitud de distribución.`)}`,
              "Escribir por WhatsApp",
              "whatsapp",
            ),
          ),
      }),
    };
  }

  if (type === "resena") {
    const stars = Number(data.estrellas);
    return {
      subject,
      html: layout({
        siteUrl,
        preheader: `${data.nombre} (${data.ciudad}) dejó una reseña de ${stars} estrellas.`,
        eyebrow: "Nueva reseña",
        title: `${escape(data.nombre)} nos calificó`,
        content:
          meta +
          `<p style="margin:0 0 18px;font-size:30px;letter-spacing:4px;color:#f5c211">${"★".repeat(stars)}<span style="color:#ffec99">${"★".repeat(5 - stars)}</span></p>` +
          `<div style="border-left:4px solid ${C.banana};background:${C.cream};border-radius:0 16px 16px 0;padding:18px 22px;margin:0 0 22px;font-size:17px;line-height:1.6;font-style:italic;color:${C.ink}">“${escape(data.comentario)}”</div>` +
          dataCard(type, data) +
          `<p style="margin:22px 0 0;font-size:13px;color:${C.muted}">Revísala antes de publicarla en la página.</p>`,
      }),
    };
  }

  return {
    subject,
    html: layout({
      siteUrl,
      preheader: `${data.correo} se suscribió al boletín.`,
      eyebrow: "Boletín",
      title: "Alguien más se unió al combo crocante",
      intro: "Una persona nueva quiere enterarse de lanzamientos, ediciones de temporada y descuentos.",
      content: meta + dataCard(type, data),
    }),
  };
};

// Confirmación para quien llenó el formulario (solo los que dejan correo)
export const customerEmail = (type: FormType, data: Record<string, string>, siteUrl: string) => {
  const heroImage = `${siteUrl}/images/billetera-porciones.jpg`;
  const shop = buttons(
    button(`${siteUrl}/#comprar`, "Ver la billetera"),
    button(whatsappLink(), "Pedir por WhatsApp", "whatsapp"),
  );

  switch (type) {
    case "distribuidor":
      return {
        subject: "Recibimos tu solicitud para distribuir Arándino 🤝",
        html: layout({
          siteUrl,
          preheader: "Nuestro equipo comercial te escribe en menos de 48 horas.",
          eyebrow: "Distribución",
          title: `¡Hola, ${escape(data.nombre)}! Ya tenemos tus datos`,
          intro: `Gracias por querer llevar Arándino a <b>${escape(data.empresa)}</b>. Nos encanta llegar a más rincones de Colombia.`,
          heroImage,
          content:
            p("<b>¿Qué sigue?</b> Nuestro equipo comercial te escribe en menos de 48 horas para contarte precios por volumen, pedidos mínimos y tiempos de envío a tu ciudad.") +
            highlights() +
            buttons(button(whatsappLink(`¡Hola Arándino! Soy ${data.nombre} de ${data.empresa}, quiero hablar sobre distribución.`), "Adelantar por WhatsApp", "whatsapp")),
        }),
      };
    case "boletin":
      return {
        subject: "Bienvenido al combo crocante 💜",
        html: layout({
          siteUrl,
          preheader: "Lanzamientos, ediciones de temporada y descuentos, primero para ti.",
          eyebrow: "Boletín",
          title: "¡Ya eres parte del combo crocante!",
          intro: "Desde hoy te enteras primero de lanzamientos, ediciones de temporada y descuentos. Nada de spam, prometido.",
          heroImage,
          content:
            highlights() +
            p("<br />Gomitas crocantes 100% de fruta real, en una billetera que no se bota. ¿Ya probaste la tuya?") +
            shop,
        }),
      };
    default:
      return null;
  }
};
