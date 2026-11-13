import { NextResponse } from "next/server";
import { validateDemoRequest, type DemoRequest } from "@/lib/demo-request";

/**
 * Receives "Book a demo" submissions.
 * If DEMO_WEBHOOK_URL is set (Slack, Zapier, Make, HubSpot, etc.), the request is forwarded there.
 * Otherwise it is only logged. Replace with your CRM or email provider before launch.
 */
export async function POST(req: Request) {
  let body: Partial<DemoRequest> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateDemoRequest(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const request: DemoRequest = {
    name: body.name!.trim().slice(0, 200),
    email: body.email!.trim().slice(0, 200),
    phone: body.phone?.trim().slice(0, 40),
    business: body.business?.trim().slice(0, 200),
    interests: Array.isArray(body.interests) ? body.interests.slice(0, 10).map(String) : [],
    plan: body.plan?.trim().slice(0, 20),
    message: body.message?.trim().slice(0, 2000),
  };

  const webhook = process.env.DEMO_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "demo_request", receivedAt: new Date().toISOString(), ...request }),
    }).catch(() => null);
    if (!res?.ok) return NextResponse.json({ ok: false, error: "We couldn’t send your request. Email us instead." }, { status: 502 });
  } else {
    console.info("[demo-request]", request);
  }

  return NextResponse.json({ ok: true });
}
