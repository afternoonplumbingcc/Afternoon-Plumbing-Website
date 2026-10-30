# Visual evidence: homepage continuity (Option C)

Captured 2026-10-30 with a headless Chromium at 1440x900 (desktop) and 390x844 (mobile).

## Side by side (the comparison Chris asked for)

| File | What it shows |
| --- | --- |
| `side-by-side-desktop-1440.png` | Live homepage (left) next to the new homepage matched water heater page (right) at 1440 wide. |
| `side-by-side-mobile-390.png` | Same comparison at 390 wide. |

## Individual captures

| File | Source |
| --- | --- |
| `homepage-desktop-1440.png` | `https://afternoonplumbing.com/` (the live site) |
| `homepage-mobile-390.png` | `https://afternoonplumbing.com/` (the live site) |
| `water-heater-home-desktop-1440.png` | `/new-design/water-heater-home.html` |
| `water-heater-home-mobile-390.png` | `/new-design/water-heater-home.html` |
| `homepage-reference-desktop-1440.png` | `/new-design/homepage-reference.html` (static snapshot) |
| `homepage-reference-mobile-390.png` | `/new-design/homepage-reference.html` (static snapshot) |
| `sandbox-index-desktop-1440.png` | `/new-design/` sandbox listing with the two new entries |
| `sandbox-index-bottom-desktop-1440.png` | Bottom of the sandbox listing, showing the two new cards |

## Notes

- The live homepage capture is the real site, not a mock.
- The homepage reference snapshot renders the captured React markup with the
  compiled bundle CSS, so it matches the live homepage pixel for pixel at the
  top of the page.
- One homepage image, `Basement tub and shower in westminster maryland with
  brushed nickle trim .webp`, reports as not decoded under headless lazy
  loading. It behaves the same way on the live homepage, so this is a
  pre-existing quirk of that asset and not a defect in the snapshot.
