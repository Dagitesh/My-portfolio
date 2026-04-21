"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), {
  ssr: false,
});

export function ClientOnlyCursor() {
  return <Cursor />;
}
