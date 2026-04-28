import "server-only";

import fs from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

export type GalleryItem = {
  src: string;
  alt: string;
  filename: string;
  updatedAtMs: number;
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const dir = path.join(process.cwd(), "public", "gallery");

  let entries: Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true }) as Dirent[];
  } catch {
    return [];
  }

  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()));

  const stats = await Promise.all(
    files.map(async (filename) => {
      const stat = await fs.stat(path.join(dir, filename));
      return { filename, stat };
    }),
  );

  return stats
    .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
    .map(({ filename, stat }) => ({
      filename,
      src: `/gallery/${encodeURIComponent(filename)}`,
      alt: filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      updatedAtMs: stat.mtimeMs,
    }));
}

