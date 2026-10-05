"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { apiBase } from "@/lib/api";

const STORAGE_KEY = "engobo_visitor";

function visitorId() {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

// Sends one anonymous page-view per navigation to the back-office dashboard
// (visitors count, devices, top pages). No cookies, no personal data.
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${apiBase()}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        path: pathname,
        visitor_id: visitorId(),
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
