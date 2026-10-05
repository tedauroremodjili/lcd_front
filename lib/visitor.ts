// Anonymous visitor identity used for "likes" (no account, no personal data).
// Stored in localStorage; every function degrades gracefully if storage is blocked.

const VISITOR_KEY = "engobo-visitor-id";
const LIKED_KEY = "engobo-liked-products";

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anonymous-visitor";
  }
}

export function getLikedSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function setLiked(slug: string, liked: boolean) {
  try {
    const current = new Set(getLikedSlugs());
    if (liked) current.add(slug);
    else current.delete(slug);
    localStorage.setItem(LIKED_KEY, JSON.stringify([...current]));
  } catch {
    // storage unavailable: the like still reaches the server
  }
}
