"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/layout/Header";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { getChatbotLiveData, getProducts, getProjects, submitQuoteRequest } from "@/lib/api";
import {
  advanceQuote,
  fallbackReply,
  nudgeFor,
  openingMessages,
  productCards,
  projectCards,
  quoteErrorReply,
  quoteSuccessReply,
  respond,
  startQuote,
  whatsappChip,
  type BotCard,
  type BotReply,
  type ChatContext,
  type Chip,
  type QuoteData,
  type QuoteStep,
} from "@/lib/chatbot";
import type { ChatbotConfig, CompanySettings, ServiceSlug, Service } from "@/lib/types";

type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: Chip[];
  cards?: BotCard[];
  at: number;
};

type Session = {
  messages: Msg[];
  quote: { step: QuoteStep; data: QuoteData } | null;
  misses: number;
};

const STORAGE_KEY = "engobo-chat-v1";
const NUDGE_KEY = "engobo-chat-nudge";

function loadSession(): Session {
  const empty: Session = { messages: [], quote: null, misses: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<Session>) } : empty;
  } catch {
    return empty;
  }
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ChatBot({
  settings,
  services,
  config,
}: {
  settings: CompanySettings;
  services: Service[];
  config: ChatbotConfig | null;
}) {
  const pathname = usePathname();
  // Server-rendered values are only the starting point: the widget re-fetches
  // config, settings and services from the API (see refresh) so edits made in
  // the back-office apply without reloading the page.
  const [live, setLive] = useState({ settings, services, config });
  const liveRef = useRef(live);
  const lastFetchRef = useRef(0);
  const ctx: ChatContext = { ...live, pathname };

  const [initial] = useState(loadSession);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(initial.messages);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const [unread, setUnread] = useState(false);

  const quoteRef = useRef(initial.quote);
  const missesRef = useRef(initial.misses);
  const greetedRef = useRef(initial.messages.length > 0);
  const busyRef = useRef(false);
  const openRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages, quote: quoteRef.current, misses: missesRef.current })
      );
    } catch {
      // storage unavailable: the conversation just won't survive navigation
    }
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Proactive nudge once per session, a few seconds after arrival.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY) === "1") return;
    } catch {
      return;
    }
    const show = setTimeout(() => {
      if (openRef.current) return;
      setNudge(true);
      setUnread(true);
    }, 9000);
    const hide = setTimeout(() => setNudge(false), 23000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  async function pushBot(reply: BotReply) {
    setTyping(true);
    await sleep(Math.min(1500, Math.max(650, 450 + reply.text.length * 9)));
    setMessages((m) => [
      ...m.slice(-59),
      { id: uid(), role: "bot", text: reply.text, chips: reply.chips, cards: reply.cards, at: Date.now() },
    ]);
    setTyping(false);
    if (!openRef.current) setUnread(true);
  }

  async function refresh(force = false): Promise<typeof live> {
    if (!force && Date.now() - lastFetchRef.current < 30_000) return liveRef.current;
    lastFetchRef.current = Date.now();
    try {
      const data = await getChatbotLiveData();
      const next = {
        config: data.config ?? liveRef.current.config,
        settings: data.settings ?? liveRef.current.settings,
        services: data.services?.length ? data.services : liveRef.current.services,
      };
      liveRef.current = next;
      setLive(next);
    } catch {
      // keep the last known content
    }
    return liveRef.current;
  }

  async function greet(current: typeof live = liveRef.current) {
    for (const reply of openingMessages({ ...current, pathname })) await pushBot(reply);
  }

  async function openChat() {
    setOpen(true);
    setNudge(false);
    setUnread(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      // ignore
    }
    setTimeout(() => inputRef.current?.focus(), 400);
    const fresh = await refresh(true);
    if (!greetedRef.current) {
      greetedRef.current = true;
      void greet(fresh);
    }
  }

  function reset() {
    if (busyRef.current) return;
    setMessages([]);
    quoteRef.current = null;
    missesRef.current = 0;
    greetedRef.current = true;
    void refresh(true).then((fresh) => greet(fresh));
  }

  async function searchProducts(query: string, fromFallback: boolean) {
    setTyping(true);
    let products = await getProducts(query ? { query } : { featured: true }).catch(() => []);
    if (!query && products.length === 0) products = await getProducts().catch(() => []);

    if (products.length > 0) {
      missesRef.current = 0;
      await pushBot({
        text: query
          ? `J'ai trouvé **${products.length}** produit${products.length > 1 ? "s" : ""} pour « ${query} » :`
          : "Voici quelques produits de notre catalogue. Dites-moi ce que vous cherchez pour affiner :",
        cards: productCards(products),
        chips: [
          { label: "Voir tout le catalogue", href: "/produits" },
          { label: "Demander un devis", send: "Je veux un devis" },
        ],
      });
      return;
    }

    if (fromFallback) {
      missesRef.current += 1;
      await pushBot(fallbackReply(ctx, missesRef.current));
      return;
    }

    await pushBot({
      text: `Je n'ai trouvé aucun produit pour « ${query} ». Nous fabriquons aussi **sur mesure** : décrivez-moi votre besoin et je prépare un devis.`,
      chips: [
        { label: "Demander un devis", send: "Je veux un devis" },
        { label: "Voir le catalogue", href: "/produits" },
      ],
    });
  }

  async function searchProjects(service?: string) {
    setTyping(true);
    let projects = await getProjects(service ? { service: service as ServiceSlug } : { featured: true }).catch(() => []);
    if (projects.length === 0) projects = await getProjects().catch(() => []);

    await pushBot({
      text: projects.length
        ? "Voici quelques-unes de nos réalisations récentes :"
        : "Nos réalisations seront bientôt en ligne. En attendant, je peux vous mettre en relation avec un conseiller.",
      cards: projectCards(projects),
      chips: projects.length
        ? [{ label: "Toutes les réalisations", href: "/realisations" }, { label: "Demander un devis", send: "Je veux un devis" }]
        : [whatsappChip(ctx, "Bonjour ENGOBO GROUP, j'aimerais voir vos réalisations.")],
    });
  }

  async function route(text: string) {
    const quote = quoteRef.current;
    const ctx: ChatContext = { ...(await refresh()), pathname };

    if (quote) {
      const step = advanceQuote(quote.step, quote.data, text, ctx);
      if (step.kind === "cancel") {
        quoteRef.current = null;
        await pushBot(step.reply);
      } else if (step.kind === "next") {
        quoteRef.current = { step: step.step, data: step.data };
        await pushBot(step.reply);
      } else {
        setTyping(true);
        try {
          await submitQuoteRequest({
            full_name: step.data.name ?? "",
            phone: step.data.phone ?? "",
            service: step.data.service ?? "autre",
            description: step.data.description ?? "",
            project_type: "Demande via l'assistant",
          });
          quoteRef.current = null;
          await pushBot(quoteSuccessReply(step.data, ctx));
        } catch {
          await pushBot(quoteErrorReply(step.data, ctx));
        }
      }
      return;
    }

    const { reply, fallback } = respond(text, ctx);

    if (reply.action === "start-quote") {
      const started = startQuote(reply.service);
      quoteRef.current = { step: started.step, data: started.data };
      missesRef.current = 0;
      await pushBot(started.reply);
    } else if (reply.action === "search-products") {
      await searchProducts(reply.query ?? "", fallback);
    } else if (reply.action === "search-projects") {
      missesRef.current = 0;
      await searchProjects(reply.service);
    } else {
      missesRef.current = fallback ? missesRef.current + 1 : 0;
      await pushBot(reply);
    }
  }

  async function handleUser(display: string, process = display) {
    const text = display.trim();
    if (!text || busyRef.current) return;
    busyRef.current = true;
    setInput("");
    setMessages((m) => [...m.slice(-59), { id: uid(), role: "user", text, at: Date.now() }]);
    try {
      await route(process.trim());
    } finally {
      busyRef.current = false;
      setTyping(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void handleUser(input);
  };

  const lastBotId = [...messages].reverse().find((m) => m.role === "bot")?.id;
  const nudgeText = nudgeFor(ctx);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <section
          role="dialog"
          aria-label="Assistant ENGOBO GROUP"
          className="chat-panel-in pointer-events-auto flex h-[min(640px,calc(100dvh-7.5rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-subtle/10 bg-surface shadow-[0_24px_70px_rgba(6,37,74,0.35)] max-sm:fixed max-sm:inset-0 max-sm:h-auto max-sm:w-auto max-sm:rounded-none"
        >
          <header className="relative flex items-center gap-3 bg-linear-to-br from-navy via-navy to-navy-light px-4 py-4 text-white">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
              <Image src="/icon.png" alt="" width={32} height={32} className="h-full w-full object-contain" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Assistant ENGOBO</p>
              <p className="truncate text-xs text-white/70">En ligne · répond en quelques secondes</p>
            </div>
            <a
              href={whatsappChip(ctx, "Bonjour ENGOBO GROUP, je souhaite parler à un conseiller.").href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Parler à un conseiller sur WhatsApp"
              title="Parler à un conseiller sur WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#25D366]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={reset}
              aria-label="Nouvelle conversation"
              title="Nouvelle conversation"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 10a6 6 0 1 0 2-4.5M4 3v3.5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer l'assistant"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-gold via-gold-light to-gold" />
          </header>

          <div aria-live="polite" className="flex-1 space-y-4 overflow-y-auto bg-surface-alt px-4 py-5">
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg-in flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-md bg-navy text-white"
                      : "rounded-bl-md border border-subtle/10 bg-surface text-body"
                  }`}
                >
                  <RichText text={m.text} />
                </div>

                {m.cards && m.cards.length > 0 && (
                  <div className="no-scrollbar -mx-1 flex w-full snap-x gap-3 overflow-x-auto px-1 pb-1">
                    {m.cards.map((card) => (
                      <Link
                        key={card.href}
                        href={card.href}
                        className="group w-44 shrink-0 snap-start overflow-hidden rounded-xl border border-subtle/10 bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <ImagePlaceholder
                            id={card.image}
                            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <p className="line-clamp-2 text-xs font-bold text-heading">{card.title}</p>
                          {card.subtitle && (
                            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-body/60">{card.subtitle}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {m.role === "bot" && m.id === lastBotId && !typing && m.chips && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.chips.map((chip) => (
                      <ChipButton key={chip.label} chip={chip} onSend={(d, p) => void handleUser(d, p)} />
                    ))}
                  </div>
                )}

                <span className="px-1 text-[10px] text-body/40">
                  {new Date(m.at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {typing && (
              <div className="chat-msg-in flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-subtle/10 bg-surface px-4 py-3.5 shadow-sm" aria-label="L'assistant écrit">
                <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
                <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
                <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-subtle/10 bg-surface p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message…"
                maxLength={400}
                aria-label="Votre message"
                className="min-w-0 flex-1 rounded-full border border-subtle/15 bg-surface-alt px-4 py-3 text-sm text-heading placeholder:text-body/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Envoyer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-all hover:bg-gold-light active:scale-95 disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10 17 3l-4 14-3-6-7-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-body/40">
              Assistant automatique · pour un échange humain, utilisez WhatsApp
            </p>
          </form>
        </section>
      )}

      {nudge && !open && (
        <div className="chat-msg-in pointer-events-auto relative max-w-[260px] rounded-2xl rounded-br-md border border-subtle/10 bg-surface p-4 pr-8 text-sm text-body shadow-xl">
          <button
            type="button"
            onClick={() => setNudge(false)}
            aria-label="Masquer"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-body/40 hover:bg-surface-alt hover:text-heading"
          >
            <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-bold text-heading">Besoin d&apos;aide ?</p>
          <p className="mt-1 leading-snug">{nudgeText}</p>
          <button type="button" onClick={openChat} className="mt-2 text-xs font-semibold text-gold-dark hover:underline">
            Discuter maintenant →
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={open ? () => setOpen(false) : openChat}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant ENGOBO GROUP"}
        aria-expanded={open}
        className={`pointer-events-auto relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-gold-light to-gold text-navy shadow-[0_10px_30px_rgba(217,154,34,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40" />}
        <span className={`absolute transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6A.6.6 0 0 1 4.8 19v-3.1A2.5 2.5 0 0 1 4 14V5.5Z" fill="currentColor" />
            <circle cx="9" cy="9.5" r="1.1" fill="#F0B74A" />
            <circle cx="12" cy="9.5" r="1.1" fill="#F0B74A" />
            <circle cx="15" cy="9.5" r="1.1" fill="#F0B74A" />
          </svg>
        </span>
        <span className={`absolute transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-surface bg-rose-500" />
        )}
      </button>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <p key={i} className={i > 0 ? "mt-1.5" : undefined}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      ))}
    </>
  );
}

function ChipButton({ chip, onSend }: { chip: Chip; onSend: (display: string, process?: string) => void }) {
  const cls =
    "rounded-full border border-gold/60 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-heading transition-colors hover:bg-gold hover:text-navy";

  if (chip.href) {
    const external = /^(https?:|tel:|mailto:)/.test(chip.href);
    return external ? (
      <a href={chip.href} target={chip.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
        {chip.label}
      </a>
    ) : (
      <Link href={chip.href} className={cls}>
        {chip.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onSend(chip.label, chip.send)} className={cls}>
      {chip.label}
    </button>
  );
}
