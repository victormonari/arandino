// Plantillas y validación de los formularios que se envían por correo con Resend.

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

const layout = (title: string, body: string) => `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#fdf9f1;font-family:Arial,Helvetica,sans-serif;color:#24182f">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden">
          <tr><td style="background:#66339e;padding:24px 28px;color:#ffffff;font-size:26px;font-weight:bold">
            Arándino <span style="color:#ffd43b">●</span>
          </td></tr>
          <tr><td style="padding:28px">
            <h1 style="margin:0 0 16px;font-size:22px;color:#2e1649">${title}</h1>
            ${body}
          </td></tr>
          <tr><td style="padding:16px 28px;background:#f6f2fb;font-size:12px;color:#7a6a88">
            Arándino · Gomitas crocantes de fruta real · Hecho en Colombia
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

const table = (type: FormType, data: Record<string, string>) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${FORM_FIELDS[type]
    .map(
      (f) => `<tr>
        <td style="padding:8px 12px 8px 0;border-bottom:1px solid #ece3f7;font-weight:bold;color:#532882;white-space:nowrap;vertical-align:top">${f.label}</td>
        <td style="padding:8px 0;border-bottom:1px solid #ece3f7;white-space:pre-wrap">${escape(data[f.key] ?? "")}</td>
      </tr>`,
    )
    .join("")}</table>`;

const TEAM_SUBJECT: Record<FormType, (d: Record<string, string>) => string> = {
  distribuidor: (d) => `Nuevo distribuidor: ${d.empresa} (${d.ciudad})`,
  resena: (d) => `Nueva reseña de ${d.nombre}: ${"★".repeat(Number(d.estrellas))}`,
  boletin: () => "Nueva suscripción al boletín",
};

// Correo para el equipo con los datos del formulario
export const teamEmail = (type: FormType, data: Record<string, string>) => {
  const subject = TEAM_SUBJECT[type](data);
  return { subject, html: layout(escape(subject), table(type, data)) };
};

const p = (text: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">${text}</p>`;

// Confirmación para quien llenó el formulario (solo los que dejan correo)
export const customerEmail = (type: FormType, data: Record<string, string>) => {
  switch (type) {
    case "distribuidor":
      return {
        subject: "Recibimos tu solicitud para distribuir Arándino 🤝",
        html: layout(
          `¡Hola, ${escape(data.nombre)}!`,
          p(`Gracias por querer llevar Arándino a <b>${escape(data.empresa)}</b>.`) +
            p("Nuestro equipo comercial te escribe en menos de 48 horas para contarte precios, pedidos mínimos y envíos."),
        ),
      };
    case "boletin":
      return {
        subject: "Bienvenido al combo crocante 💜",
        html: layout(
          "¡Ya eres parte del combo crocante!",
          p("Te vamos a contar primero de lanzamientos, ediciones de temporada y descuentos.") +
            p("Te comes las gomitas y te quedas con la billetera. 🫐🍌"),
        ),
      };
    default:
      return null;
  }
};
