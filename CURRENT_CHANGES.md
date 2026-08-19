# Current Application Changes

This document describes the uncommitted changes currently present relative to `HEAD`. It covers 45 modified tracked files and one untracked file. Class-order-only differences are identified as such because they do not change rendered behavior.

## Executive summary

The primary functional change is a redesign of the paper-browsing interface. Category and university filters were removed from the horizontal search controls and moved into a new left sidebar. Search remains in the results header. Search normalization is safer, and institution constants are exported differently to support the sidebar.

The principal layout changes are removal of several `max-w-7xl` constraints, introduction of a sidebar/content row for browsing, and conversion of the paper grid to a single-column layout. The header, main application area, and browse view can therefore expand farther across the viewport.

Most other source changes remove forced uppercase rendering. Font-size and spacing utilities have been restored to their original values in most comparable elements, although some utilities appear later in class strings and therefore still show as textual Git differences.

## Functional and data-flow changes

### Browse and search architecture

- `src/components/SideNav.jsx` is a new component.
  - Renders the current result count (`filteredPapers.length` out of `papers.length`).
  - Renders topic and university choices as lists of buttons rather than `<select>` elements.
  - Clicking an inactive option selects it; clicking the active option resets that filter to `All`.
  - Topic options deliberately omit `All` and university options come directly from `INSTITUTIONS`.
  - The selected option receives `font-bold underline` and `aria-pressed=true`.
  - The sidebar is configured as a vertical flex container with `min-h-screen`.

- `src/components/sections/BrowseResults.jsx`
  - Imports and renders `SideNav` before the results content.
  - Changes the browse root from a centered single-column container to a horizontal `flex-row` containing the sidebar and a `<main>` results area.
  - Moves `SearchFilters` into the results header, next to the title.
  - Removes the result-count paragraph from the header because the sidebar now owns it.
  - Continues passing category and institution setters to `SearchFilters`, although the revised component no longer consumes them.
  - Keeps reset behavior unchanged: query, category, institution, and “show results anyway” are reset.
  - The back link now has a persistent underline instead of only underlining on hover.

- `src/components/sections/SearchFilters.jsx`
  - Is reduced from a combined search/category/university control to a search-only control.
  - Removes the `INSTITUTION_FILTER_OPTIONS` import.
  - Removes the local `FilterSelect` component and both dropdowns.
  - Removes category/institution props from the destructured API.
  - Places the search icon after the input instead of absolutely positioning it before the input.
  - The search input currently has `bg-red-500`, producing a red background.

- `src/pages/SearchAndBrowse.jsx`
  - Trims leading and trailing whitespace before lowercasing the search query.
  - Protects title matching with `(p.title || '')`, preventing a runtime error when a paper has a missing/null title.
  - Existing matching against abstracts, authors, institutions, categories, and collaborators remains unchanged.

- `src/constants/institutions.js`
  - Changes `INSTITUTIONS` from a private constant to a named export used by `SideNav`.
  - Removes `INSTITUTION_FILTER_OPTIONS`, including its prepended `All` option.
  - Removes explanatory comments; the institution values themselves are unchanged.

### Paper grid behavior

- `src/components/sections/PaperGrid.jsx`
  - Removes the `columns` default and stops deriving responsive column classes.
  - Ignores the `columns` prop still supplied by `BrowseResults`.
  - Loading placeholders now render in one column and are explicitly full width.
  - The empty state is explicitly full width.
  - Loaded results attempt to render one full-width column, but the class is currently misspelled as `gird-cols-1`; because this utility is invalid, only `grid` and `w-full` reliably apply.

## Global and shared layout changes

- `src/App.jsx`
  - Removes `max-w-7xl` from the primary application content container. Pages can now use the full available width while retaining responsive horizontal padding.

- `src/components/sections/Header.jsx`
  - Removes `max-w-7xl` from the header’s inner container. Header content can spread across the full viewport width while retaining responsive padding.

- `src/components/ui/Logo.jsx`
  - Changes the rendered logo dimensions from 64×64 to 48×48 pixels.
  - Removes forced uppercase styling from both text lines; the literal strings remain uppercase, so their visible casing is unchanged.
  - Contains a formatting defect: there is no space between `type="button"` and `className`. JSX still compiles.

## Component-by-component presentation changes

The following changes do not alter event handling or data flow unless explicitly noted.

### Access and authentication

- `src/components/AdminRoute.jsx`: removes forced uppercase from the admin notice and sign-in button. Text sizes and spacing remain equivalent to the committed version.
- `src/components/ProtectedRoute.jsx`: removes forced uppercase from the protected-page notice and sign-in button. Text sizes and spacing remain equivalent.
- `src/components/AuthPortal.jsx`: removes forced uppercase from the close control.

### Submission flow

- `src/components/UploadPaperForm.jsx`: removes uppercase treatment from the review note and co-author heading, and removes uppercase from the submit button. Sizes and spacing are equivalent after utility restoration.
- `src/components/sections/CollaboratorFormSection.jsx`: removes uppercase from field labels, the add button, and the co-author list heading.
- `src/components/sections/UploadContentsSection.jsx`: removes uppercase and wider from Abstract, Introduction, and Conclusion labels.
- `src/components/sections/UploadDetailsSection.jsx`: removes uppercase and wider from Title, Category, and Year labels.
- `src/components/sections/FileDropZone.jsx`: removes uppercase from the field label and helper text.

### Administration

- `src/pages/AdminModeration.jsx`: removes uppercase treatment from the page subtitle and signed-in administrator badge.
- `src/components/admin/AllPapersInventory.jsx`: removes uppercase from the empty-state message.
- `src/components/admin/InventoryPaperRow.jsx`: removes uppercase from category, year/status, and delete controls. Size utilities are reordered but equivalent.
- `src/components/admin/ModerationStats.jsx`: removes uppercase from metric labels. Font-size utilities are reordered but equivalent.
- `src/components/admin/PendingPaperCard.jsx`: removes uppercase from metadata, section labels, and approval/rejection buttons.
- `src/components/admin/PendingPapersList.jsx`: removes uppercase from the empty-state detail. The heading size is unchanged but its class order differs.

### Paper cards and details

- `src/components/cards/PaperCard.jsx`
  - Removes the border and `border-border` classes from the normal card state; the hover border-color class remains.
  - Removes several font-weight, uppercase, and treatments from metadata and the “Read Paper” action.
  - Padding and font-size values are functionally equivalent to the committed version, though token order differs.

- `src/components/sections/PaperDetails.jsx`: removes forced uppercase from navigation, metadata badges, title, and section headings. Sizes and spacing remain equivalent.
- `src/components/sections/PaperDetailsActions.jsx`: removes forced uppercase from citation status, full-paper heading, and sign-in heading.
- `src/components/sections/PaperDetailsStats.jsx`: removes uppercase from the Stats, Downloads, and Citations labels.

### Researcher profile

- `src/pages/ResearcherProfile.jsx`: removes uppercase from the profile-page subtitle.
- `src/components/profile/ProfileEditForm.jsx`: removes uppercase from avatar-change text, specialty, role badge, and save button.
- `src/components/profile/UserPaperRow.jsx`: removes uppercase from category/submission metadata.
- `src/components/profile/UserPapersList.jsx`: removes uppercase from the empty-state detail. Heading sizing remains equivalent.
- `src/components/profile/DeleteAccountCard.jsx`: removes uppercase from headings, warning text, confirmation actions, and delete button. Font sizes and spacing remain equivalent.

### Navigation and shared UI

- `src/components/sections/DesktopNav.jsx`: removes the container-level uppercase transform from desktop navigation labels.
- `src/components/sections/MobileNav.jsx`: removes uppercase and wider from the mobile navigation container.
- `src/components/sections/UserMenu.jsx`: removes uppercase from the sign-out control. The literal label remains `SIGN OUT`.
- `src/components/sections/VisitorHero.jsx`: removes uppercase from topic buttons. Search input sizing and spacing remain equivalent, with class order changed.
- `src/components/ui/Button.jsx`: removes global uppercase transformation from every shared `Button` instance.
- `src/components/ui/FormField.jsx`: removes uppercase from default labels. Input/helper sizes and spacing are equivalent but class order differs.
- `src/components/ui/PaperStatusBadge.jsx`: removes uppercase from status badges; font size is unchanged but moved to the end of the class string.
- `src/components/ui/SectionHeader.jsx`: removes uppercase from shared form section headings; size and spacing are unchanged.
- `src/components/ui/StatusBanner.jsx`: removes uppercase from banner headings; message sizing is unchanged but reordered.
- `src/components/ui/SubmitterEmailBadge.jsx`: the small badge’s size and spacing are unchanged; only class order differs.
- `src/components/ui/Footer.jsx`
  - Removes uppercase from footer copy.
  - Changes `text-gray-400` to `text-gray-40`, which is not a standard Tailwind color utility and therefore may not produce a color rule.
  - Font sizes and spacing remain equivalent but class order differs.

### Informational page

- `src/pages/AboutUs.jsx`: removes uppercase from the contact prompt and main page title. Content, links, spacing, and sizes remain unchanged.

## Files whose remaining diff is primarily class ordering

Several files still appear modified because restored Tailwind utilities occur in a different order than in `HEAD`. Tailwind utility ordering generally does not change behavior when the utilities do not conflict. Examples include `InventoryPaperRow.jsx`, `ModerationStats.jsx`, `PaperStatusBadge.jsx`, `SubmitterEmailBadge.jsx`, `FormField.jsx`, and portions of `PaperCard.jsx` and `PaperDetails.jsx`.

## Current risks and inconsistencies

1. `PaperGrid.jsx` contains `gird-cols-1` instead of `grid-cols-1`, so the intended loaded-results column definition is not applied.
2. `SearchFilters.jsx` and `PaperCard.jsx` use `bg-red-500`, which appears visually diagnostic rather than production-ready.
3. `Footer.jsx` uses the likely invalid class `text-gray-40`.
4. `BrowseResults.jsx` passes category and institution props to `SearchFilters`, but that component no longer accepts or uses them.
5. `BrowseResults.jsx` still passes a `columns` prop to `PaperGrid`, but `PaperGrid` no longer reads it.
6. The new sidebar has `min-h-screen`; combined with the sticky header and page padding, it can make the browse page taller than the viewport.
7. The sidebar has no explicit width, shrink behavior, responsive stacking, or mobile visibility rule. Its width is content-driven and the root remains a row on small screens.
8. `SideNav` excludes explicit `All` choices. Resetting requires clicking the currently selected item again or using the back/reset control.
9. Removing the top-level width constraints materially changes line lengths and content distribution on wide displays.
10. Public Sans is downloaded but no longer used by the global font variable.

## Verification state

The current application completes a production Vite build successfully. This confirms syntax and bundling, but it does not validate responsive appearance, interaction behavior, or the visual issues listed above.
