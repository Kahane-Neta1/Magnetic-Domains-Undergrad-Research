/* ============================================
   SLIDE DATA
   ============================================
   Each slide contains:
   - id: unique identifier
   - number: original slide number from PPTX
   - title: slide heading
   - notes: speaker notes / description
   - images: array of figure paths
   
   Note: Slides 5 and 15 are excluded entirely
   ============================================ */

const slides = [
  {
    id: 'slide-1',
    number: 1,
    title: 'Magnetic Relaxation Characteristics',
    notes: 'No speaker notes available.',
    images: []
  },
  {
    id: 'slide-2',
    number: 2,
    title: 'Magnetic Domains',
    notes: 'What are magnetic domains, saturation, and polarity reversal. Motivation, system design, automation, and analysis are all part of the experimental setup.',
    images: [
      'assets/figures/slide-2-fig1.png',
      'assets/figures/slide-2-fig2.png',
      'assets/figures/slide-2-fig3.png',
      'assets/figures/slide-2-fig4.jpg'
    ]
  },
  {
    id: 'slide-3',
    number: 3,
    title: 'Basic Model',
    notes: 'A concise description of the model and the rules governing its dynamics.',
    images: [
      'assets/figures/slide-3-fig1.png',
      'assets/figures/slide-3-fig2.png',
      'assets/figures/slide-3-fig3.png',
      'assets/figures/slide-3-fig4.png'
    ]
  },
  {
    id: 'slide-4',
    number: 4,
    title: 'Hysteresis Loop',
    notes: 'Hysteresis behaviour across different voltage jumps. Domain boundaries are weakly driven, so many remain pinned and only some move. The result is partial equilibrium and a memory effect over time.',
    images: [
      'assets/figures/slide-4-fig1.png',
      'assets/figures/slide-4-fig2.png',
      'assets/figures/slide-4-fig3.png'
    ]
  },
  {
    id: 'slide-6',
    number: 6,
    title: 'Disappearing',
    notes: 'Three change modes are shown as motion sequences, highlighting their visual differences and physical significance.',
    images: [
      'assets/figures/slide-6-fig1.gif',
      'assets/figures/slide-6-fig2.gif',
      'assets/figures/slide-6-fig3.gif'
    ]
  },
  {
    id: 'slide-7',
    number: 7,
    title: 'Motion Types',
    notes: 'Motion types and the key decay points of each mode, highlighting when each type of domain movement begins to fade.',
    images: [
      'assets/figures/slide-7-fig1.png',
      'assets/figures/slide-7-fig2.png'
    ]
  },
  {
    id: 'slide-8',
    number: 8,
    title: 'Domain Thinning',
    notes: 'Domain width falls as voltage increases. The left histogram is vertical; the right plot shows average width shrinking toward a minimum, at which domains begin to disappear.',
    images: [
      'assets/figures/slide-8-fig1.png',
      'assets/figures/slide-8-fig2.png',
      'assets/figures/slide-8-fig3.png',
      'assets/figures/slide-8-fig4.png',
      'assets/figures/slide-8-fig5.png'
    ]
  },
  {
    id: 'slide-9',
    number: 9,
    title: 'Domain Disappearance',
    notes: 'Examples of domain jumps and the mechanism by which domains vanish during voltage-driven changes.',
    images: [
      'assets/figures/slide-9-fig1.jpg',
      'assets/figures/slide-9-fig2.png'
    ]
  },
  {
    id: 'slide-10',
    number: 10,
    title: 'Domain Curvature',
    notes: 'Domain curvature is driven by surface-energy minimization. Curvier domains are less stable and tend to disappear first as the system seeks straighter shapes.',
    images: [
      'assets/figures/slide-10-fig1.png',
      'assets/figures/slide-10-fig2.png',
      'assets/figures/slide-10-fig3.png',
      'assets/figures/slide-10-fig4.png',
      'assets/figures/slide-10-fig5.png'
    ]
  },
  {
    id: 'slide-11',
    number: 11,
    title: 'Model',
    notes: 'The model structure and equations that describe domain behavior under changing voltage.',
    images: []
  },
  {
    id: 'slide-12',
    number: 12,
    title: 'Domain Disappearance',
    notes: 'Replication distance and peak timing show an effective relaxation scale. A second plot links time between peaks to voltage, indicating a characteristic feedback timescale.',
    images: [
      'assets/figures/slide-12-fig1.png',
      'assets/figures/slide-12-fig2.png',
      'assets/figures/slide-12-fig3.png'
    ]
  },
  {
    id: 'slide-13',
    number: 13,
    title: 'Domain Disappearance',
    notes: 'Polarity reversals per frame over time. The decay rate is similar across voltage jumps, meaning disappearance probability per active change is consistent even as hysteresis width changes.',
    images: [
      'assets/figures/slide-13-fig1.png',
      'assets/figures/slide-13-fig2.png',
      'assets/figures/slide-13-fig3.png',
      'assets/figures/slide-13-fig4.png'
    ]
  },
  {
    id: 'slide-14',
    number: 14,
    title: 'Summary',
    notes: 'Thinning, motion, and disappearance all shift with higher voltage. Width decreases toward a minimum, disappearance occurs in jumps, and the same exponential decay constant appears across voltage jumps. Curvier and larger-area domains vanish first.',
    images: []
  }
];

/* ============================================
   ACCORDION INITIALIZATION
   ============================================ */

const accordion = document.getElementById('accordion');
let activeIndex = null;

/**
 * Build figure row HTML for a slide
 * @param {Array} images - Array of image paths
 * @returns {string} HTML string or empty if no images
 */
function buildFiguresRow(images) {
  if (!images || images.length === 0) {
    return '';
  }

  const figureCards = images
    .map(
      (imagePath) =>
        `<div class="figure-card"><img src="${imagePath}" alt="Slide figure" loading="lazy"></div>`
    )
    .join('');

  return `<div class="figures-row">${figureCards}</div>`;
}

/**
 * Create accordion item HTML
 * @param {Object} slide - Slide data
 * @param {number} index - Array index
 * @returns {string} HTML string
 */
function createAccordionItem(slide, index) {
  const figuresMarkup = buildFiguresRow(slide.images);
  const hasFigures = slide.images && slide.images.length > 0;

  return `
    <div class="accordion-item" data-index="${index}">
      <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
        <h2 class="accordion-title">${slide.title}</h2>
        <span class="accordion-arrow">▼</span>
      </button>
      <div class="accordion-content" id="content-${index}">
        <div class="accordion-body">
          ${figuresMarkup}
          <p class="accordion-description">${slide.notes}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render all accordion items
 */
function renderAccordion() {
  const markup = slides.map((slide, index) => createAccordionItem(slide, index)).join('');
  accordion.innerHTML = markup;

  // Attach event listeners to all headers
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', handleAccordionClick);
  });
}

/**
 * Handle accordion header clicks
 * @param {Event} event
 */
function handleAccordionClick(event) {
  const header = event.currentTarget;
  const item = header.closest('.accordion-item');
  const index = Number(item.dataset.index);

  // Close previously active item
  if (activeIndex !== null && activeIndex !== index) {
    const previousItem = document.querySelector(`.accordion-item[data-index="${activeIndex}"]`);
    if (previousItem) {
      previousItem.classList.remove('active');
      const previousHeader = previousItem.querySelector('.accordion-header');
      previousHeader.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle current item
  const isCurrentlyActive = item.classList.contains('active');
  if (isCurrentlyActive) {
    item.classList.remove('active');
    header.setAttribute('aria-expanded', 'false');
    activeIndex = null;
  } else {
    item.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    activeIndex = index;
  }
}

/* ============================================
   INITIALIZE
   ============================================ */

renderAccordion();
