// otdf-ui public API.
// Styles are a separate entry: `@import "otdf-ui/styles.css";` in the app's CSS.

export { cn } from "./lib/utils";
export {
  formatBytes,
  normalizeOptions,
  searchOptions,
  type OtdfNavItem,
  type OtdfOption,
  type OtdfOptionInput,
} from "./lib/options";

// OTDF components
export { default as OtdfChoiceCard } from "./components/otdf/OtdfChoiceCard.vue";
export { default as OtdfCombobox } from "./components/otdf/OtdfCombobox.vue";
export { default as OtdfDatePicker } from "./components/otdf/OtdfDatePicker.vue";
export { default as OtdfField } from "./components/otdf/OtdfField.vue";
export { default as OtdfFileDropzone } from "./components/otdf/OtdfFileDropzone.vue";
export { default as OtdfFileList } from "./components/otdf/OtdfFileList.vue";
export { default as OtdfFlagBand } from "./components/otdf/OtdfFlagBand.vue";
export { default as OtdfInput } from "./components/otdf/OtdfInput.vue";
export { default as OtdfNotice } from "./components/otdf/OtdfNotice.vue";
export { default as OtdfPageBackground } from "./components/otdf/OtdfPageBackground.vue";
export { default as OtdfRibbon } from "./components/otdf/OtdfRibbon.vue";
export { default as OtdfSectionNav } from "./components/otdf/OtdfSectionNav.vue";
export { default as OtdfSegment } from "./components/otdf/OtdfSegment.vue";
export { default as OtdfSelect } from "./components/otdf/OtdfSelect.vue";
export { default as OtdfStatusScreen } from "./components/otdf/OtdfStatusScreen.vue";

// Illustrations (inline SVG, OTDF palette)
export { default as OtdfDoorArt } from "./components/otdf/art/OtdfDoorArt.vue";
export { default as OtdfSeedlingArt } from "./components/otdf/art/OtdfSeedlingArt.vue";
export { default as OtdfTreeArt } from "./components/otdf/art/OtdfTreeArt.vue";

// Brand artwork
export { default as otdfLogo } from "./assets/otdf-logo.jpg";
export { default as otdfDotPainting } from "./assets/dot-painting.png";

// shadcn-vue primitives, themed by styles.css
export * from "./components/ui/alert";
export * from "./components/ui/badge";
export * from "./components/ui/button";
export * from "./components/ui/calendar";
export * from "./components/ui/combobox";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/collapsible";
export * from "./components/ui/dialog";
export * from "./components/ui/input";
export * from "./components/ui/input-group";
export * from "./components/ui/label";
export * from "./components/ui/popover";
export * from "./components/ui/progress";
export * from "./components/ui/radio-group";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/sonner";
export * from "./components/ui/textarea";
export * from "./components/ui/tooltip";
export { toast } from "vue-sonner";
