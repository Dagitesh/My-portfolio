import { clearAdminSessionCookie } from "@/lib/auth.server";

export const runtime = "nodejs";

export async function POST() {
  await clearAdminSessionCookie();
  return Response.json({ ok: true });
}

