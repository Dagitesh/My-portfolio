import { setAdminSessionCookie, isAuthConfigured } from "@/lib/auth.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { ok: false, error: "Auth is not configured (set ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET)." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  const adminEmail = String(process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = String(process.env.ADMIN_PASSWORD ?? "");

  if (email !== adminEmail || password !== adminPassword) {
    return Response.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
  }

  await setAdminSessionCookie(email);
  return Response.json({ ok: true });
}

