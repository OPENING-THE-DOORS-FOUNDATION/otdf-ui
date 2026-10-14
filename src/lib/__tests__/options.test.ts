import { describe, expect, it } from "vite-plus/test";
import { normalizeOptions, searchOptions } from "../options";

const options = normalizeOptions([
  "Abbotsford",
  "North Melbourne",
  "Melbourne",
  "East Melbourne",
  "Mélton",
  { value: "9", label: "St Mary's College", description: "Melbourne VIC 3000" },
]);

describe("searchOptions", () => {
  it("returns everything up to the limit for an empty query", () => {
    const r = searchOptions(options, "  ", 3);
    expect(r.items.map((o) => o.label)).toEqual(["Abbotsford", "North Melbourne", "Melbourne"]);
    expect(r.truncated).toBe(true);
  });

  it("ranks exact, then prefix, then word prefix, then substring", () => {
    const r = searchOptions(options, "melbourne", 10);
    expect(r.items.map((o) => o.label)).toEqual([
      "Melbourne",
      "North Melbourne",
      "East Melbourne",
      "St Mary's College",
    ]);
  });

  it("ignores accents and case", () => {
    expect(searchOptions(options, "MELT", 10).items.map((o) => o.label)).toEqual(["Mélton"]);
  });

  it("reports truncation when more matches exist", () => {
    const r = searchOptions(options, "mel", 2);
    expect(r.items).toHaveLength(2);
    expect(r.truncated).toBe(true);
  });
});
