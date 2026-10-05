// Editable section copy. The back-office (Textes du site) is the source of truth;
// SITE_TEXT_DEFS only fills keys the API leaves empty; with the API down, texts are blank.
import { SITE_TEXT_DEFS, type SiteTextDef } from "./site-text-defs";

export type TextValue = string | string[] | Record<string, string>[];
export type Texts = Record<string, TextValue>;

function parseLines(value: string): string[] {
  return value
    .split(/\r\n|\r|\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function parsePairs(value: string, fields: string[]): Record<string, string>[] {
  const [first, second] = fields;
  return parseLines(value).flatMap((line) => {
    const [a, ...rest] = line.split("|");
    const b = rest.join("|").trim();
    return a.trim() && b ? [{ [first]: a.trim(), [second]: b }] : [];
  });
}

function resolve(def: SiteTextDef, raw: unknown): TextValue {
  const value = typeof raw === "string" || Array.isArray(raw) ? raw : def.value;
  if (def.type === "lines") return Array.isArray(value) ? (value as string[]) : parseLines(String(value));
  if (def.type === "pairs") {
    return Array.isArray(value) ? (value as Record<string, string>[]) : parsePairs(String(value), def.fields ?? ["first", "second"]);
  }
  return String(value ?? "").trim();
}

/**
 * Merges the API payload over the built-in defaults. Empty values fall back to the default.
 * Without an API response every text is empty: nothing is shown when the back-end is down.
 */
export function buildTexts(raw?: Record<string, unknown> | null): Texts {
  const texts: Texts = {};
  if (!raw) {
    for (const def of SITE_TEXT_DEFS) texts[def.key] = def.type === "text" || def.type === "textarea" ? "" : [];
    return texts;
  }
  for (const def of SITE_TEXT_DEFS) {
    const fromApi = raw?.[def.key];
    const isEmpty = fromApi === undefined || fromApi === null || fromApi === "" || (Array.isArray(fromApi) && fromApi.length === 0);
    texts[def.key] = resolve(def, isEmpty ? undefined : fromApi);
  }
  return texts;
}

export function txt(texts: Texts, key: string): string {
  const v = texts[key];
  return typeof v === "string" ? v : "";
}

export function listOf(texts: Texts, key: string): string[] {
  const v = texts[key];
  return Array.isArray(v) ? (v as string[]) : [];
}

export function pairsOf(texts: Texts, key: string): Record<string, string>[] {
  const v = texts[key];
  return Array.isArray(v) ? (v as Record<string, string>[]) : [];
}
