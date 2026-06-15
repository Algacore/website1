import type { APIRoute } from "astro";

// Server endpoint — runs on the Node adapter (not prerendered).
export const prerender = false;

const MAX = { name: 120, company: 160, email: 200, message: 4000 };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const interest = String(data.interest ?? "").trim();
  const name = String(data.name ?? "").trim();
  const company = String(data.company ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const lang = data.lang === "en" ? "en" : "pt";

  // Validation.
  const errors: string[] = [];
  if (!name || name.length > MAX.name) errors.push("name");
  if (!company || company.length > MAX.company) errors.push("company");
  if (!email || !isEmail(email) || email.length > MAX.email) errors.push("email");
  if (!message || message.length > MAX.message) errors.push("message");
  if (!["investor", "partner", "other"].includes(interest)) errors.push("interest");
  if (errors.length) {
    return json({ ok: false, error: "validation", fields: errors }, 422);
  }

  const payload = {
    interest,
    name,
    company,
    email,
    message,
    lang,
    receivedAt: new Date().toISOString(),
  };

  // Forward to a configured webhook (Formspree, Make, n8n, Resend proxy ...).
  // If no endpoint is set, accept the submission and log it so the form works
  // out of the box. Set CONTACT_WEBHOOK_URL in the deploy environment to wire
  // a real inbox.
  const webhook = import.meta.env.CONTACT_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook failed:", err);
      return json({ ok: false, error: "delivery" }, 502);
    }
  } else {
    console.log("[contact] submission (no webhook configured):", payload);
  }

  return json({ ok: true });
};
