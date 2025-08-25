<script setup lang="ts"></script>

<!-- 📓 Diary Page Module Spec
🧭 1. Page Header
Date Display:

Format: DD/MM/YYYY : [Title of the Day]

Editable title field (v-text-field) only for today or yesterday

Use dayjs or similar for date comparison logic

Weather Widget Placeholder:

Reserve space in header for future weather module

Use v-skeleton-loader or placeholder icon until implemented

🧱 2. Layout & Container
Responsive Container

Uses v-container with fluid and centered v-col (cols="12", md="8", lg="6") for clean, adaptive layout

All content is displayed in a single-column format for simplicity and optimal readability across devices

No layout switcher required — the structure remains consistent regardless of screen size

Dark Mode Support

Inherits the global app theme (light or dark) via Vuetify

Diary content blocks retain their user-selected background color, ensuring visual consistency and personal expression

Theme changes do not override the styling of individual diary entries

✍️ 3. Diary Content Blocks
Each block is a modular unit stored in Pinia and synced with Supabase.

✅ Supported Block Types:
Type	Features
Text	Rich formatting (size, style, color, alignment, headings, lists)
Emoji	Inline or standalone; emoji picker via v-menu
Image	Upload via v-file-input; preview with v-img; optional caption
🔧 Block Actions:
Add new block (v-btn or floating action button)

Edit existing block (inline or modal)

Remove block (v-icon with confirmation dialog)

Autosave with debounce (e.g. 1000ms delay)

🎭 4. Mood Tags
Tag Selector:

Use v-chip-group with emoji + text

Examples:

😤 "Working hard"

😎 "Chilling"

😞 "Bad day"

🤯 "Brain fried"

🧘 "Zen mode"

🐢 "Slow day"

Allow multiple tags per entry

Placement:

Below header or above content blocks

🧠 5. State Management (Pinia)
ts
export const useDiaryStore = defineStore('diary', {
  state: () => ({
    entries: {}, // keyed by date
    currentDate: dayjs().format('YYYY-MM-DD'),
    layout: 'single-column',
  }),
  actions: {
    addBlock(date, block) { /* ... */ },
    updateBlock(date, blockId, data) { /* ... */ },
    removeBlock(date, blockId) { /* ... */ },
    setLayout(layout) { /* ... */ },
    setTitle(date, title) { /* ... */ },
    setTags(date, tags) { /* ... */ },
  }
});
Only allow editing for today and yesterday

Prevent updates to older entries (read-only mode)

☁️ 6. Supabase Integration
📤 Table: diary_entries


Fetch entries by date

Prevent updates to entries older than yesterday

🧪 7. UX Details
Autosave:

Debounced save after block edit or layout change

Visual indicator (e.g. "Saving..." → "Saved")

Block Transitions:

Use v-expand-transition for smooth add/remove

Validation:

Prevent empty blocks from being saved

Confirm before deleting a block -->

<template>
  <div>todo</div>
</template>
