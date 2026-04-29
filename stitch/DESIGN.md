# Design System: The Curated Archive

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system rejects the cluttered, utilitarian aesthetic of traditional database software. Instead, it draws inspiration from high-end editorial journals and physical archival spaces. It is built on the principle of **Intellectual Clarity**—the idea that the interface should disappear to allow the research to breathe. 

To achieve a "High-End Editorial" feel, we move beyond standard grids. We utilize intentional asymmetry, generous margins, and a "paper-on-stone" layering logic. By prioritizing whitespace as a functional element rather than "empty" space, we guide the researcher's eye through complex data with the ease of reading a bespoke monograph.

---

## 2. Colors & The Tonal Architecture

Our palette is rooted in the "Soft White" spectrum, avoiding the harshness of pure digital white (#FFFFFF) in favor of a more organic, paper-like foundation.

### The Color Logic
*   **Primary (`#3f5f92`):** A sophisticated, scholarly blue. Use this sparingly for "Points of Intent"—critical CTAs, active states, or links.
*   **Surface & Background (`#f9f9f8`):** Our "Paper" base. It provides a warm, low-strain reading environment.
*   **Secondary/Tertiary:** Subdued tones used for metadata and categorization, ensuring the UI doesn't compete with the content.

### Style Rules
*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for sectioning content. Boundaries must be defined solely through background color shifts. For example, a sidebar should use `surface-container-low` against a `surface` main content area. 
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of stacked sheets. 
    *   *Base:* `surface`
    *   *Sectioning:* `surface-container-low`
    *   *Interactive Elements/Cards:* `surface-container-lowest` (pure white) to create a subtle "pop" of clean paper.
*   **Signature Textures:** For hero sections or primary action areas, use a subtle linear gradient from `primary` (#3f5f92) to `primary-container` (#d6e3ff) at a 15-degree angle. This adds a "silk-press" depth that flat color cannot replicate.

---

## 3. Typography: The Editorial Voice

We use a high-contrast pairing to distinguish between "The System" and "The Knowledge."

*   **The Intellectual Voice (Serif - Newsreader):** Used for all `body` and `title` tokens. This serif typeface mimics the classic paper feel of a research journal, optimized for long-form legibility.
*   **The Functional Voice (Sans-Serif - Public Sans):** Used for `display`, `headline`, and `label` tokens. This clean, neutral sans-serif handles the "work" of the UI—navigation, buttons, and data headers—providing a sharp contrast to the serif content.

**Key Scale Principles:**
*   **Display LG (3.5rem):** Reserved for major repository titles or landing headers.
*   **Body LG (1rem):** The standard for research abstracts. Ensure a line-height of 1.6 for maximum readability.
*   **Label MD (0.75rem):** Used for metadata tags (e.g., DOI numbers, Publication dates).

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "heavy" for an academic environment. We achieve depth through **Ambient Light** and **Materiality**.

*   **The Layering Principle:** To lift a card, do not use a shadow. Move from `surface-container` to `surface-container-lowest`. The slight brightness shift mimics a physical sheet of paper catching the light.
*   **Ambient Shadows:** If an element must float (e.g., a modal or a primary dropdown), use a shadow with a 32px blur and 4% opacity, tinted with the `on-surface` color.
*   **The "Ghost Border" Fallback:** For input fields or necessary containment, use the `outline-variant` (#adb3b2) at **15% opacity**. This creates a "suggestion" of a boundary without interrupting the visual flow.
*   **Glassmorphism:** Use `surface-container-lowest` at 80% opacity with a `20px` backdrop blur for navigation bars. This allows the text of the research papers to softly bleed through as the user scrolls, creating a sense of continuity.

---

## 5. Components

### Buttons
*   **Primary:** A hard-edged (`0px` radius) block using `primary`. Text is `on-primary`.
*   **Secondary:** A "Ghost" style. No background, no border—just `primary` text. Upon hover, the background shifts to `primary-container` at 30% opacity.
*   **Shape:** Strictly `0px` (Square). This reinforces the "Architectural" and "Stable" nature of a repository.

### Input Fields
*   **Style:** Minimalist underline using `outline-variant`. Upon focus, the underline transitions to `primary` (2px).
*   **Background:** A subtle `surface-container-low` fill to define the interactive area.

### Cards & Lists
*   **The "No-Divider" Rule:** Forbid the use of horizontal lines between list items. Use 24px of vertical whitespace (Gap) to separate research entries.
*   **Visual Anchor:** Use a small 4px vertical accent bar of `primary` on the left side of a selected list item instead of a full background highlight.

### The "Citation" Chip
*   A custom component for research tags. Uses `secondary-container` background with `on-secondary-container` text. These should be small, set in `label-sm` (Public Sans), and all-caps for a rhythmic, metadata-heavy look.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align the main body of text to a central column, but let metadata and citations hang in the "marginalia" (the wide right or left gutters).
*   **Prioritize the Serif:** Use Newsreader for anything the user needs to *read* and understand.
*   **Use Subtle Shifts:** If you think a section needs a border, try making the background 2% darker instead.

### Don’t:
*   **No Rounded Corners:** Do not use `border-radius`. This system is built on the "Brutalism of the Grid." Every element should have sharp, precise 90-degree angles.
*   **No High-Contrast Shadows:** Avoid black or dark grey shadows. They feel "dirty" against the soft white palette.
*   **No Standard Icons:** Avoid "bubbly" or filled icons. Use ultra-thin (1pt) stroke icons to match the "thin border" philosophy of the system.

### Accessibility Note:
While we use soft grays, ensure that all text-on-background combinations meet a minimum 4.5:1 contrast ratio. Use the `on-surface-variant` (#5a6060) for secondary text to maintain legibility while preserving the hierarchy.