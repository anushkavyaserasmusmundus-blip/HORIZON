export default function safeExternalUrl(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();
  if (!candidate) return fallback;
  if (candidate.startsWith("/") && !candidate.startsWith("//")) return candidate;

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : fallback;
  } catch {
    return fallback;
  }
}