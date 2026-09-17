"use client";

import { settings } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "./Header";

// Floating button present on every page (§21). Pass `message` from a page
// that has more specific context (e.g. a product page) to tailor the
// pre-filled WhatsApp text.
export default function WhatsAppButton({
  message = "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services.",
}: {
  message?: string;
}) {
  return (
    <a
      href={whatsappLink(settings.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter ENGOBO GROUP sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
