# Arándino

Landing page de Arándino, la billetera de gomitas crocantes de arándano + banano. Hecha con Next.js 15, Tailwind CSS 4 y Resend.

## Correr en local

```bash
npm install
cp .env.example .env.local   # y llena las variables de Resend
npm run dev                  # http://localhost:3000
```

## Variables de entorno

| Variable | Para qué |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Remitente (dominio verificado en Resend) |
| `CONTACT_TO_EMAIL` | Bandeja que recibe distribuidores, reseñas y suscripciones |

En Vercel se crean las mismas variables en Project → Settings → Environment Variables.

## Dónde editar

- `src/lib/content.ts`: precio, packs, ediciones, reseñas, preguntas frecuentes y número de WhatsApp.
- `src/lib/emails.ts`: plantillas de los correos.
- `public/images/`: fotos del producto.
