# The Curated Archive — Known Limitations

This document lists things the app does **not** currently do, and the trade-offs
of the current design. It is meant to help future contributors, reviewers and
users understand what is out of scope today and what would need to be added
next.

---

## 1. No notification system

- The app never sends emails or in-app notifications.
- Authors are not told when their paper is approved, rejected or removed.
- Admins are not told when a new paper is submitted.
- There is no digest, mention, or comment notification.

**What would be needed:** an email provider (Resend, SendGrid, etc.) plus a
notifications table and a way to trigger emails from the review actions.

## 2. No institutional email verification

- Any email address can register as a researcher — the app does not check
  that the address really belongs to the claimed institution.
- The special admin email is hard-coded in `constants.js`; there is no
  self-service admin promotion.
- Papers can list any institution, including "Independent / Other", with no
  verification of the affiliation.

**What would be needed:** a domain allow-list per institution, an OAuth flow
with an academic identity provider (e.g. ORCID, university SSO), or an
invite-only signup.

## 3. No automated security / plagiarism / integrity checks on uploads

- Uploaded PDFs are accepted as-is.
- Nothing scans them for malware, embedded JavaScript, or malicious payloads.
- Nothing scans them for plagiarism or AI-generated content.
- Nothing checks that they are actually a valid PDF beyond the MIME type.

**What would be needed:** a virus scanner (e.g. ClamAV), a plagiarism
service (e.g. Turnitin, iThenticate), and PDF sanitisation before storage.

## 4. No licence / copyright metadata (Creative Commons)

- Papers have no licence field. The footer implies "copyright belongs to the
  author" but the app does not record or display which licence a paper is
  released under.
- Authors cannot choose CC-BY, CC-BY-NC, CC0, All Rights Reserved, etc.
- Downloaders have no indication of what they are allowed to do with the PDF.

**What would be needed:** a `licence` column on the papers table, a picker
during submission, and a licence badge on the paper detail page.

## 5. No versioning of manuscripts

- Once a paper is approved, there is no way to submit a v2.
- Corrections, retractions and errata are not supported.
- There is no DOI issued, so citations point at an internal ID that may
  disappear if the paper is deleted.

## 6. No search beyond simple substring matching

- Search compares the query against title, abstract, author and category as
  lowercase substrings.
- No stemming, fuzzy matching, relevance ranking, or highlighting.
- Full text of the PDF itself is not indexed.

**What would be needed:** Postgres full-text search, or an external index
(Meilisearch, Typesense, Algolia).

## 7. Peer review is a single approve/reject button

- There is no review form, no scoring rubric, no reviewer comments to the
  author, no revision loop, and no way to assign specific reviewers.
- Only admins can review; there is no separate "reviewer" role.
- A single admin's click approves a paper — there is no quorum or dual
  review.

## 8. Citation tracking is not verified

- The "Log Citation" button on the paper detail page increments the counter
  every time it is clicked, by anyone.
- Numbers can be inflated easily and are not tied to any real citing work.
- Download counts have the same problem: they increment every time the
  Download button is pressed, including repeat clicks.

## 9. Local-storage fallback is not durable

- When the backend is not configured, the app stores everything in the
  browser's `localStorage`.
- Clearing site data wipes accounts, profiles and papers.
- Data does not sync between devices or browsers.
- This mode is only appropriate for a preview / demo of the UI.

## 10. File uploads have no size / storage limits enforced in-app

- The submit form does not check PDF or cover-image file size before upload.
- Very large files can hang the UI or exhaust storage quotas.

## 11. Accessibility gaps

- Colour contrast on some muted labels is below WCAG AA.
- The paper detail page relies on hover states that do not have keyboard
  equivalents.
- No skip-to-content link. No live-region announcements for the status
  banners.

## 12. No admin audit log

- Approving, rejecting, or deleting a paper leaves no permanent trace beyond
  `reviewed_by`.
- If an admin deletes a paper by mistake it cannot be recovered.

## 13. No API for third parties

- All data access goes through the web UI.
- There is no public JSON API, no OAI-PMH endpoint, and no exportable index
  for search engines or aggregators.

## 14. Legal / compliance items are absent

- No Terms of Service, Privacy Policy, cookie banner, or data-deletion
  request form.
- No GDPR / POPIA export or portability endpoint.
- No takedown / DMCA process for disputed papers.

## 15. Minor / UI

- The Browse nav item is intentionally locked behind sign-in — this is a
  product decision, not a limitation to fix.
- Passwords in offline mode are stored in plaintext in `localStorage`. This
  is only safe because offline mode is preview-only.
- There is no "forgot password" flow when running against the backend UI
  (Supabase's own reset flow works, but the app does not link to it).
