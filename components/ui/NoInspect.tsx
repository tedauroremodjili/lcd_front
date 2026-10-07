"use client";

import { useEffect } from "react";

// Blocks the right-click menu and the developer-tools shortcuts (F12, Ctrl+I,
// Ctrl+Shift+I/J/C, Ctrl+U). Right-click stays allowed in form fields (copy / paste).
// It deters casual copying; it is not a security barrier — that lives on the server.
export default function NoInspect() {
  useEffect(() => {
    const editable = (el: EventTarget | null) =>
      el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

    const onContextMenu = (e: MouseEvent) => {
      if (!editable(e.target)) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const blocked =
        e.key === "F12" ||
        (ctrl && e.shiftKey && (k === "i" || k === "j" || k === "c")) ||
        (ctrl && !e.shiftKey && (k === "i" || k === "u")) ||
        (e.metaKey && e.altKey && (k === "i" || k === "j" || k === "c"));
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
