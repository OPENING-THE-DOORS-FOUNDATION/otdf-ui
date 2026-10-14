# otdf-ui

Opening the Doors Foundation UI kit: [shadcn-vue](https://www.shadcn-vue.com/) components on
Tailwind CSS v4, themed with the Aboriginal art style of the original apply page (terracotta
`#bd5d38`, ochre `#d48a6e`, the dot painting, ribbon headings).

Built with [Vite+](https://viteplus.dev/) and bun.

## What is in it

| Export                                                                                 | What it is                                                                            |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `OtdfSegment`                                                                          | Section card with the ochre border; optional centred title with a dot rule            |
| `OtdfRibbon`                                                                           | Terracotta ribbon heading that hangs off the card edge                                |
| `OtdfField`                                                                            | Label + required marker + hint + error, wired with `aria-describedby`                 |
| `OtdfInput`                                                                            | 44px text input, string model, optional prefix (`$`)                                  |
| `OtdfSelect`                                                                           | Short fixed list (YES/NO, gender, state); `""` means nothing chosen                   |
| `OtdfCombobox`                                                                         | Searchable picker for long lists (shows the best 50 matches), remote mode, free text  |
| `OtdfFileDropzone`, `OtdfFileList`                                                     | Drag-and-drop picker with type/size/count checks, picked file list                    |
| `OtdfChoiceCard`                                                                       | Big illustrated choice (new / returning student); `#art` slot for a full illustration |
| `OtdfSectionNav`                                                                       | Section list with completion ticks, for the sidebar or a sheet                        |
| `OtdfNotice`                                                                           | Info / warning / error box                                                            |
| `OtdfStatusScreen`                                                                     | Full-page message (closed, server down, loading)                                      |
| `OtdfPageBackground`, `OtdfFlagBand`                                                   | Dot painting backdrop, black/red/yellow band                                          |
| `OtdfSeedlingArt`, `OtdfTreeArt`, `OtdfDoorArt`                                        | Inline SVG illustrations: new student, returning student, door (`closed` / `ajar`)    |
| `otdfLogo`, `otdfDotPainting`                                                          | Brand images                                                                          |
| `Button`, `Dialog`, `Sheet`, `Checkbox`, `Textarea`, `Progress`, `Toaster`, `toast`, … | shadcn-vue primitives, themed                                                         |

Run `bun run dev` to open the playground with every component.

## Using it in an app

The package ships **source** (`.vue` + `.ts`); the app's Vite compiles it.

```jsonc
// package.json of the app: a tagged release from GitHub
"otdf-ui": "github:OPENING-THE-DOORS-FOUNDATION/otdf-ui#v0.1.0"
```

Working on the kit and an app at the same time: run `bun link` here, then in the app
`bun add otdf-ui@link:otdf-ui` (Vite picks up edits instantly). Switch the app back to the
`github:` tag before committing it.

Releasing: bump `version` in package.json, commit, `git tag vX.Y.Z && git push --tags`, then
update the tag in each app.

```css
/* the app's main CSS: brings in Tailwind, the theme and the kit's classes */
@import "otdf-ui/styles.css";
```

```ts
// vite.config.ts of the app
resolve: { dedupe: ["vue"] },            // a linked kit must share the app's Vue
optimizeDeps: { exclude: ["otdf-ui"] },  // it is source, do not pre-bundle
server: { fs: { allow: [/* workspace root */, /* real path of otdf-ui */] } },
```

See `../apply-page/vite.config.ts` for a working setup.

## Adding shadcn-vue components

```sh
bunx shadcn-vue@latest add <component>
bun run relativize
```

`relativize` rewrites the CLI's `@/…` imports into relative paths. Without it the imports would
resolve against the consuming app's `src/` and break. If the CLI asks to overwrite an existing
file, answer no unless you mean to lose local changes. It also tends to prepend a Google Fonts
`@import` to `src/styles/otdf.css`: remove it, the fonts are self-hosted through Fontsource.

## Commands

```sh
bun run dev         # playground on http://localhost:5173
bun run check       # vp check: format, lint, type-aware lint
bun run test        # vp test
bun run type-check  # vue-tsc
```

## Rule: no raw form elements

Pages and `src/components/otdf` use shadcn components only (`Input`, `InputGroup`, `Select`,
`Combobox`, `Button`, `Calendar`, …), never a bare `<input>`, `<select>`, `<textarea>` or
`<button>`. Inside `src/components/ui` the upstream shadcn code is left as generated (the
Calendar's month/year menus use shadcn's own `NativeSelect`, which gives phones their native
wheel picker).
