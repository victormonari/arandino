import { NextResponse } from "next/server";
import { Resend } from "resend";
import { customerEmail, isFormType, teamEmail, validate } from "@/lib/emails";

export async function POST(request: Request) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("[contact] Faltan variables de entorno de Resend");
    return NextResponse.json({ error: "El envío de correos no está configurado." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Campo trampa para bots: si viene lleno, respondemos OK sin enviar nada
  if (typeof body.website === "string" && body.website) {
    return NextResponse.json({ ok: true });
  }

  const { type } = body;
  if (!isFormType(type)) {
    return NextResponse.json({ error: "Formulario desconocido." }, { status: 400 });
  }

  const result = validate(type, (body.data ?? {}) as Record<string, unknown>);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { data } = result;

  const siteUrl = new URL(request.url).origin;
  const resend = new Resend(RESEND_API_KEY);
  const team = teamEmail(type, data, siteUrl);
  const { error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: CONTACT_TO_EMAIL.split(",").map((e) => e.trim()),
    replyTo: data.correo || undefined,
    subject: team.subject,
    html: team.html,
  });

  if (error) {
    console.error("[contact] Error de Resend (equipo):", error);
    return NextResponse.json({ error: "No pudimos enviar tu mensaje. Intenta de nuevo." }, { status: 502 });
  }

  // La confirmación al cliente no bloquea la respuesta si falla
  // (por ejemplo, con onboarding@resend.dev solo se puede enviar al dueño de la cuenta)
  const confirmation = data.correo ? customerEmail(type, data, siteUrl) : null;
  if (confirmation) {
    const { error: confirmationError } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: data.correo,
      replyTo: CONTACT_TO_EMAIL.split(",")[0].trim(),
      subject: confirmation.subject,
      html: confirmation.html,
    });
    if (confirmationError) console.warn("[contact] No se envió la confirmación:", confirmationError);
  }

  return NextResponse.json({ ok: true });
}
