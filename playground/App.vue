<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  OtdfChoiceCard,
  OtdfDatePicker,
  OtdfDoorArt,
  OtdfSeedlingArt,
  OtdfTreeArt,
  OtdfCombobox,
  OtdfField,
  OtdfFileDropzone,
  OtdfFileList,
  OtdfFlagBand,
  OtdfInput,
  OtdfNotice,
  OtdfPageBackground,
  OtdfRibbon,
  OtdfSectionNav,
  OtdfSegment,
  OtdfSelect,
  Progress,
  Textarea,
  Toaster,
  otdfLogo,
  toast,
  type OtdfOption,
} from "../src";

const swatches = [
  ["terracotta", "bg-terracotta", "#bd5d38"],
  ["terracotta-deep", "bg-terracotta-deep", "#93432a"],
  ["ochre", "bg-ochre", "#d48a6e"],
  ["clay", "bg-clay", "#de987f"],
  ["sand", "bg-sand", "#faf5ef"],
  ["earth", "bg-earth", "#33251e"],
  ["stone-art", "bg-stone-art", "#696260"],
  ["eucalyptus", "bg-eucalyptus", "#4f7552"],
] as const;

const name = ref("");
const nameError = ref<string | null>(null);
const gender = ref("");
const amount = ref("");
const birthday = ref("");
const supplier = ref("");
const school = ref("");
const agreed = ref(false);
const notes = ref("");
const dialog = ref(false);
const files = ref<File[]>([]);
const rejected = ref<string[]>([]);
const choice = ref<"new" | "returning" | null>(null);
const active = ref("fields");

// 3000 fake suburbs to show the combobox stays quick on long lists
const suburbs = Array.from({ length: 3000 }, (_, i) => `Suburb ${String(i + 1).padStart(4, "0")}`);
const schools: OtdfOption<{ id: number }>[] = [
  {
    value: "1",
    label: "Academy of Mary Immaculate Fitzroy",
    description: "88 Nicholson Street FITZROY VIC 3065",
    data: { id: 1 },
  },
  {
    value: "2",
    label: "Aquinas College Ringwood",
    description: "46 Great Ryrie Street RINGWOOD VIC 3134",
    data: { id: 2 },
  },
  {
    value: "3",
    label: "Ballarat Clarendon College",
    description: "1220 Sturt Street BALLARAT VIC 3350",
    data: { id: 3 },
  },
];

function validateName() {
  nameError.value = name.value.trim() ? null : "Required";
}
</script>

<template>
  <OtdfPageBackground />
  <Toaster position="top-center" rich-colors />
  <OtdfFlagBand />
  <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10">
    <header class="flex items-center gap-4">
      <img
        :src="otdfLogo"
        alt="Opening the Doors Foundation"
        class="size-16 rounded-full border-4 border-white shadow"
      />
      <div>
        <h1 class="text-3xl font-extrabold">OTDF UI</h1>
        <p class="text-muted-foreground">
          shadcn-vue + Tailwind v4, themed with the apply page's Aboriginal art style
        </p>
      </div>
    </header>

    <OtdfSegment title="Palette">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          v-for="[label, cls, hex] in swatches"
          :key="label"
          class="overflow-hidden rounded-lg border"
        >
          <div :class="['h-16', cls]" />
          <div class="px-3 py-2 text-sm">
            <div class="font-medium">{{ label }}</div>
            <div class="font-mono text-xs text-muted-foreground">{{ hex }}</div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button @click="toast.success('Submission success')">Toast</Button>
        <Button variant="outline" @click="dialog = true">Dialog</Button>
      </div>
    </OtdfSegment>

    <div class="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside class="sticky top-6 hidden self-start rounded-2xl bg-sidebar p-4 lg:block">
        <OtdfSectionNav
          :items="[
            { id: 'fields', title: 'Fields', complete: true },
            { id: 'pickers', title: 'Pickers', complete: false },
            { id: 'files', title: 'Files' },
            { id: 'choice', title: 'Choice cards' },
          ]"
          :active-id="active"
          @navigate="active = $event"
        />
      </aside>

      <div class="grid gap-8">
        <OtdfSegment id="fields">
          <OtdfRibbon title="Student" />
          <div class="grid gap-5 sm:grid-cols-2">
            <OtdfField label="First name" required :error="nameError">
              <template #default="{ id, invalid, describedBy }">
                <OtdfInput
                  :id="id"
                  v-model="name"
                  :invalid="invalid"
                  :described-by="describedBy"
                  @blur="validateName"
                />
              </template>
            </OtdfField>
            <OtdfField label="Gender" required>
              <template #default="{ id, invalid, describedBy }">
                <OtdfSelect
                  :id="id"
                  v-model="gender"
                  :options="['Female', 'Male', 'Other']"
                  :invalid="invalid"
                  :described-by="describedBy"
                />
              </template>
            </OtdfField>
            <OtdfField label="Date of birth" required hint="Day, month and year">
              <template #default="{ id, invalid, describedBy }">
                <OtdfDatePicker
                  :id="id"
                  v-model="birthday"
                  min="1990-01-01"
                  :invalid="invalid"
                  :described-by="describedBy"
                />
              </template>
            </OtdfField>
            <OtdfField label="Amount" required>
              <template #default="{ id, invalid, describedBy }">
                <OtdfInput
                  :id="id"
                  v-model="amount"
                  type="number"
                  inputmode="decimal"
                  prefix="$"
                  :invalid="invalid"
                  :described-by="describedBy"
                />
              </template>
            </OtdfField>
            <OtdfField label="Notes" class="sm:col-span-2">
              <template #default="{ id }">
                <Textarea :id="id" v-model="notes" class="min-h-28 bg-card" />
              </template>
            </OtdfField>
          </div>
          <div class="mt-6 grid gap-3">
            <OtdfNotice>This section does not affect your child’s eligibility.</OtdfNotice>
            <OtdfNotice tone="warning" title="Exact amount needed"
              >Please text, call or email to confirm.</OtdfNotice
            >
            <OtdfNotice tone="error">Please complete the student section.</OtdfNotice>
          </div>
        </OtdfSegment>

        <OtdfSegment id="pickers">
          <OtdfRibbon title="Pickers" />
          <div class="grid gap-5 sm:grid-cols-2">
            <OtdfField label="School" required>
              <template #default="{ id, invalid, describedBy }">
                <OtdfCombobox
                  :id="id"
                  v-model="school"
                  :options="schools"
                  placeholder="Search school"
                  :invalid="invalid"
                  :described-by="describedBy"
                />
              </template>
            </OtdfField>
            <OtdfField label="Suburb (3000 options, free text allowed)">
              <template #default="{ id }">
                <OtdfCombobox
                  :id="id"
                  v-model="supplier"
                  :options="suburbs"
                  allow-custom
                  placeholder="Search suburb"
                />
              </template>
            </OtdfField>
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            school = {{ school || "—" }}, suburb = {{ supplier || "—" }}
          </p>
          <div class="mt-6 flex items-start gap-3">
            <Checkbox id="agree" v-model="agreed" class="mt-0.5" />
            <Label for="agree" class="leading-snug font-normal"
              >I agree to the conditions of grant approval.</Label
            >
          </div>
          <Progress :model-value="62" class="mt-6" />
        </OtdfSegment>

        <OtdfSegment id="files">
          <OtdfRibbon title="Supporting documents" />
          <OtdfFileDropzone
            id="docs"
            :accept="['application/pdf', 'image/png', 'image/jpeg']"
            multiple
            :max-files="10"
            :current-count="files.length"
            :existing="files"
            hint="PDF, PNG or JPG, up to 10MB each (maximum 10 files)"
            @add="files.push(...$event)"
            @reject="rejected = $event"
          />
          <OtdfNotice
            v-if="rejected.length"
            tone="error"
            title="These files were not added"
            class="mt-3"
          >
            <ul class="list-disc pl-5">
              <li v-for="m in rejected" :key="m">{{ m }}</li>
            </ul>
          </OtdfNotice>
          <OtdfFileList :files="files" class="mt-3" @remove="files.splice($event, 1)" />
        </OtdfSegment>

        <OtdfSegment id="choice" title="Start your application">
          <div class="grid gap-4 sm:grid-cols-2">
            <OtdfChoiceCard
              title="New student"
              description="This student has not received a grant from the Foundation before"
              :selected="choice === 'new'"
              @choose="choice = 'new'"
            >
              <template #art><OtdfSeedlingArt class="size-full" /></template>
            </OtdfChoiceCard>
            <OtdfChoiceCard
              title="Returning student"
              description="This student has received a grant from the Foundation before"
              :selected="choice === 'returning'"
              @choose="choice = 'returning'"
            >
              <template #art><OtdfTreeArt class="size-full" /></template>
            </OtdfChoiceCard>
          </div>
          <div class="mt-8 grid gap-6 sm:grid-cols-2">
            <OtdfDoorArt variant="closed" class="w-full" />
            <OtdfDoorArt variant="ajar" class="w-full" />
          </div>
        </OtdfSegment>
      </div>
    </div>
  </div>

  <Dialog v-model:open="dialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submit success</DialogTitle>
        <DialogDescription
          >We have received your application. A confirmation email is on its way.</DialogDescription
        >
      </DialogHeader>
      <DialogFooter>
        <Button @click="dialog = false">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
