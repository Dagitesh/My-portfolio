import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "gallery_admin";

type SessionPayload = {
  sub: "admin";
  email: string;
  iat: number;
  exp: number;
};

function b64urlEncode(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function b64urlDecodeToBuffer(input: string) {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((input.length + 3) % 4);
  return Buffer.from(padded, "base64");
}

function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function sign(payloadB64: string, secret: string) {
  return b64urlEncode(crypto.createHmac("sha256", secret).update(payloadB64).digest());
}

export function isAuthConfigured() {
  return !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);
}

export function createAdminSessionCookieValue(email: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { sub: "admin", email, iat: now, exp: now + 60 * 60 * 24 * 14 };
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  const sig = sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSessionCookieValue(value: string | undefined | null) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || !value) return null;
  const [payloadB64, sig] = value.split(".");
  if (!payloadB64 || !sig) return null;
  const expected = sign(payloadB64, secret);
  if (!timingSafeEqual(sig, expected)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(b64urlDecodeToBuffer(payloadB64).toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.sub !== "admin") return null;
  if (!payload.exp || payload.exp <= now) return null;
  if (!payload.email) return null;
  return payload;
}

export async function getAdminSession() {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;
  return verifyAdminSessionCookieValue(cookie);
}

export async function setAdminSessionCookie(email: string) {
  const store = await cookies();
  const value = createAdminSessionCookieValue(email);
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

