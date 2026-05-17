// Prefix a public-folder path with the GitHub Pages basePath in production.
// Use for raw <a href=...> or <img src=...> to files in /public.
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
