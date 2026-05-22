# Project Context

## Current Implementation (Latest Redesign)

A clean, accordion-style presentation website for Magnetic Domains research.

### Architecture
- **Single-file HTML**: `index.html` (clean, minimal markup)
- **External CSS**: `css/styles.css` (commented, organized sections)
- **External JavaScript**: `js/main.js` (accordion logic, commented slide data)

### Features
- Accordion/collapsible sections (only one open at a time)
- Smooth expand/collapse animations
- Dark academic aesthetic (navy background, warm gold accents, Inter font)
- Horizontal scrollable figure rows for each section
- Speaker notes displayed below figures
- Responsive design (works on tablet and mobile)

### Slide Content
- **13 sections** (slides 5 and 15 excluded per user request)
- Each section includes:
  - Section title (slide heading)
  - Horizontal row of figures (side-by-side, scrollable if many)
  - Speaker notes (description text)
- Slides without figures: 1, 11, 14 (display text only, no figure row)

### Figures
- All 35 extracted figures stored in `assets/figures/`
- Organized by slide: `slide-[N]-fig[M].[ext]`
- Supported formats: PNG, JPG, GIF
- Figures from slides 5 and 15 deleted as requested

## File Structure
```
.
├── index.html           # Main page
├── css/
│   └── styles.css       # All styling (commented sections)
├── js/
│   └── main.js          # Accordion logic + slide data
├── assets/
│   └── figures/         # 35 extracted images
├── presentation/        # Original PPTX file
├── context.md           # This file
└── .gitignore, .git, .venv/  # Dev files
```

## Design System
- **Colors**:
  - Background: `#050914` (deep navy)
  - Surface: `rgba(10, 17, 34, 0.95)`
  - Text: `#eef3ff` (light blue)
  - Muted: `#9bb2d3` (soft slate)
  - Accent: `#f59e0b` (warm gold)
- **Typography**: Inter (Google Fonts), 400/500/600/700 weights
- **Spacing**: Generous padding, 16-20px gaps, 40px container padding
- **Shadows**: Subtle elevation effects on hover/active states

## Technical Details
- Pure HTML/CSS/JavaScript (no frameworks)
- No external dependencies (only Google Fonts)
- All figure paths use relative `assets/figures/` directory
- Accessible markup with ARIA attributes
- Mobile-first responsive breakpoints at 768px and 480px

## Removed Files
- `sections/` folder (old fragment-based approach)
- `assets/slide_data.json` (data now in JS)
- Old slideshow-style navigation and controls
- Slides 5 and 15 figures completely removed

## To Edit Content
1. **Add/remove slides**: Modify the `slides` array in `js/main.js`
2. **Change styling**: Edit `css/styles.css` (sections are well-commented)
3. **Update text**: Edit `notes` or `title` fields in slide data
4. **Add images**: Place in `assets/figures/` and reference in `images` array

