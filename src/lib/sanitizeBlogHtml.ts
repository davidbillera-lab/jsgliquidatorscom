import DOMPurify from "dompurify";

const ALLOWED_TAGS = ["p", "br", "strong", "em", "u", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "a", "img", "blockquote", "code", "pre", "span", "div"];
const ALLOWED_ATTR = ["href", "src", "alt", "title", "target", "class", "id", "style"];
const ALLOWED_URI = /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

/**
 * Sanitizes blog post HTML. In the browser this uses DOMPurify. During server
 * rendering there is no DOM, so a strict allowlist pass runs instead: unknown
 * tags are dropped (their text is kept), dangerous elements are removed with
 * their contents, and only allowlisted attributes with safe URLs survive.
 * Posts are also sanitized when they are saved.
 */
export function sanitizeBlogHtml(html: string): string {
  if (DOMPurify.isSupported) {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR, ALLOWED_URI_REGEXP: ALLOWED_URI });
  }

  const withoutDangerous = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|noscript|template|svg|math|form)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|style|iframe|object|embed|noscript|template|svg|math|form)\b[^>]*\/?>/gi, "");

  return withoutDangerous.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag: string, rawAttrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.includes(tag)) return "";
    if (match.startsWith("</")) return `</${tag}>`;

    const attrs: string[] = [];
    const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let m: RegExpExecArray | null;
    while ((m = attrRe.exec(rawAttrs)) !== null) {
      const name = (m[1] ?? "").toLowerCase();
      if (!ALLOWED_ATTR.includes(name)) continue;
      const value = m[2] ?? m[3] ?? m[4] ?? "";
      if ((name === "href" || name === "src") && !ALLOWED_URI.test(value.trim())) continue;
      if (name === "style" && /expression|url\s*\(|javascript:/i.test(value)) continue;
      attrs.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
    }
    const selfClose = tag === "br" || tag === "img";
    return `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}${selfClose ? " /" : ""}>`;
  });
}
