/** One choice in an OTDF select or combobox. */
export interface OtdfOption<T = unknown> {
  value: string;
  label: string;
  /** Second line under the label, e.g. a school's address. */
  description?: string;
  /** Extra text that should match a search but is not shown. */
  keywords?: string;
  /** The original record, handed back on selection (e.g. a school row). */
  data?: T;
}

export type OtdfOptionInput<T = unknown> = string | OtdfOption<T>;

export function normalizeOptions<T>(options: readonly OtdfOptionInput<T>[]): OtdfOption<T>[] {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

function fold(text: string): string {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

/**
 * Filters and ranks options for a search query.
 * Ranking: exact label > label prefix > word prefix inside label > substring
 * anywhere in label/description/keywords. Ties keep the original order.
 * Returns at most `limit` options plus whether more matched.
 */
export function searchOptions<T>(
  options: readonly OtdfOption<T>[],
  query: string,
  limit: number,
): { items: OtdfOption<T>[]; truncated: boolean } {
  const q = fold(query);
  if (!q) {
    return { items: options.slice(0, limit), truncated: options.length > limit };
  }
  const scored: { option: OtdfOption<T>; score: number; index: number }[] = [];
  options.forEach((option, index) => {
    const label = fold(option.label);
    let score = 0;
    if (label === q) score = 4;
    else if (label.startsWith(q)) score = 3;
    else if (label.split(/[\s\-/(),.&]+/).some((w) => w.startsWith(q))) score = 2;
    else if (
      `${label} ${fold(option.description ?? "")} ${fold(option.keywords ?? "")}`.includes(q)
    )
      score = 1;
    if (score > 0) scored.push({ option, score, index });
  });
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return {
    items: scored.slice(0, limit).map((s) => s.option),
    truncated: scored.length > limit,
  };
}

export function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** An entry in OtdfSectionNav. */
export interface OtdfNavItem {
  id: string;
  title: string;
  /** true = done, false = still to do, undefined = no status shown. */
  complete?: boolean;
}
