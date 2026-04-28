import fs from "node:fs/promises";
import path from "node:path";
import { getAdminSession } from "@/lib/auth.server";

export const runtime = "nodejs";

const ALLOWED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function safeBaseName(input: string) {
  return input
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function extFromName(name: string) {
  const ext = path.extname(name).toLowerCase();
  return ext === ".jpeg" ? ".jpg" : ext;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "Missing file." }, { status: 400 });
  }

  const originalName = file.name || "upload";
  const ext = extFromName(originalName);
  if (!ALLOWED_EXTS.has(ext)) {
    return Response.json(
      { ok: false, error: `Unsupported file type (${ext || "unknown"}).` },
      { status: 400 },
    );
  }

  const title = String(formData.get("title") ?? "").trim();
  const base = safeBaseName(title || originalName) || "design";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${stamp}-${base}${ext}`;

  const outDir = path.join(process.cwd(), "public", "gallery");
  await fs.mkdir(outDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(outDir, filename), bytes);

  return Response.json({ ok: true, filename, src: `/gallery/${encodeURIComponent(filename)}` });
}

