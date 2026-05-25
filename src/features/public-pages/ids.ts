export const publicPageIds = [
  "about",
  "privacy",
  "contact",
  "disclaimer",
] as const;

export type PublicPageId = (typeof publicPageIds)[number];

export function isPublicPageId(value: string): value is PublicPageId {
  return publicPageIds.includes(value as PublicPageId);
}
