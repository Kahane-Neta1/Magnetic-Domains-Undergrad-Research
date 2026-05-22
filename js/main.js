/* ============================================
   SLIDE DATA
   ============================================
   Each slide contains:
   - id: unique identifier
   - number: original slide number from PPTX
   - title: slide heading
   - notes: speaker notes / description
   - images: array of figure paths
   ============================================ */

const slides = {
  'slide-3': {
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
  'slide-4': {
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
  'slide-6': {
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
  'slide-7': {
    id: 'slide-7',
    number: 7,
    title: 'Motion Types',
    notes: 'Motion types and the key decay points of each mode, highlighting when each type of domain movement begins to fade.',
    images: [
      'assets/figures/slide-7-fig1.png',
      'assets/figures/slide-7-fig2.png'
    ]
  },
  'slide-8': {
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
  'slide-9': {
    id: 'slide-9',
    number: 9,
    title: 'Domain Disappearance',
    notes: 'Examples of domain jumps and the mechanism by which domains vanish during voltage-driven changes.',
    images: [
      'assets/figures/slide-9-fig1.jpg',
      'assets/figures/slide-9-fig2.png'
    ]
  },
  'slide-10': {
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
  'slide-12': {
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
  'slide-13': {
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
  'slide-14': {
    id: 'slide-14',
    number: 14,
    title: 'Summary',
    notes: 'Thinning, motion, and disappearance all shift with higher voltage. Width decreases toward a minimum, disappearance occurs in jumps, and the same exponential decay constant appears across voltage jumps. Curvier and larger-area domains vanish first.',
    images: []
  }
};

const accordionStructure = [
  { type: 'slide', slideId: 'slide-3' },
  { type: 'slide', slideId: 'slide-4' },
  { type: 'slide', slideId: 'slide-7' },
  {
    type: 'group',
    title: 'Thinning',
    contentId: 'slide-8'
  },
  {
    type: 'group',
    title: 'Disappearing',
    contentId: 'slide-9',
    children: [
      { type: 'slide', slideId: 'slide-10' },
      { type: 'slide', slideId: 'slide-12' },
      { type: 'slide', slideId: 'slide-13' }
    ]
  },
  { type: 'slide', slideId: 'slide-14' }
];

const slide6Captions = ['Thinning', 'Moving', 'Vanishing'];
const slide6Box = document.getElementById('slide6Box');
const accordion = document.getElementById('accordion');
let activeIndex = null;

function getSlide(id) {
  return slides[id] || null;
}

function buildFigureGrid(images) {
  if (!images || images.length === 0) {
    return '';
  }

  const count = Math.min(images.length, 6);
  const gridClass = `count-${count}`;
  const cards = images
    .map((imagePath) => `
      <div class="figure-card">
        <img src="${imagePath}" alt="Slide figure" loading="lazy">
      </div>
    `)
    .join('');

  return `
    <div class="figures-row">
      <div class="figure-grid ${gridClass}">
        ${cards}
      </div>
    </div>
  `;
}

function buildSectionContent(slide, includeHeading = false) {
  if (!slide) {
    return '';
  }

  const headingMarkup = includeHeading ? `<h3 class="section-subtitle">${slide.title}</h3>` : '';
  const figuresMarkup = buildFigureGrid(slide.images);

  return `
    <div class="section-panel">
      ${headingMarkup}
      ${figuresMarkup}
      <p class="accordion-description">${slide.notes}</p>
    </div>
  `;
}

function buildSlide6Box() {
  const slide = getSlide('slide-6');
  if (!slide) {
    return;
  }

  const gifCards = slide.images
    .map((imagePath, index) => `
      <div class="slide6-card">
        <img src="${imagePath}" alt="Slide 6 figure ${index + 1}" loading="lazy">
        <p class="slide6-caption">${slide6Captions[index] || 'Mode'}</p>
      </div>
    `)
    .join('');

  slide6Box.innerHTML = `
    <h2>${slide.title}</h2>
    <div class="slide6-grid">
      ${gifCards}
    </div>
  `;
}

function createRootItem(item, index) {
  if (item.type === 'slide') {
    const slide = getSlide(item.slideId);
    return `
      <div class="accordion-item" data-index="${index}">
        <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
          <h2 class="accordion-title">${slide.title}</h2>
          <span class="accordion-arrow">▼</span>
        </button>
        <div class="accordion-content" id="content-${index}">
          <div class="accordion-body">
            ${buildSectionContent(slide)}
          </div>
        </div>
      </div>
    `;
  }

  if (item.type === 'group') {
    const contentSlide = getSlide(item.contentId);
    const nestedMarkup = item.children ? buildNestedAccordion(item.children, index) : '';

    return `
      <div class="accordion-item" data-index="${index}">
        <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
          <h2 class="accordion-title">${item.title}</h2>
          <span class="accordion-arrow">▼</span>
        </button>
        <div class="accordion-content" id="content-${index}">
          <div class="accordion-body">
            ${buildSectionContent(contentSlide, true)}
            ${nestedMarkup}
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

function buildNestedAccordion(children, parentIndex) {
  return `
    <div class="nested-accordion" data-parent-index="${parentIndex}">
      ${children
        .map((child, childIndex) => buildNestedItem(child, parentIndex, childIndex))
        .join('')}
    </div>
  `;
}

function buildNestedItem(child, parentIndex, childIndex) {
  const slide = getSlide(child.slideId);
  return `
    <div class="nested-accordion-item" data-parent-index="${parentIndex}" data-nested-index="${childIndex}">
      <button class="nested-accordion-header" aria-expanded="false" aria-controls="nested-content-${parentIndex}-${childIndex}">
        <h3 class="nested-title">${slide.title}</h3>
        <span class="accordion-arrow">▼</span>
      </button>
      <div class="nested-accordion-content" id="nested-content-${parentIndex}-${childIndex}">
        <div class="accordion-body">
          ${buildSectionContent(slide, true)}
        </div>
      </div>
    </div>
  `;
}

function renderAccordion() {
  const markup = accordionStructure.map((item, index) => createRootItem(item, index)).join('');
  accordion.innerHTML = markup;

  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', handleAccordionClick);
  });

  document.querySelectorAll('.nested-accordion-header').forEach((header) => {
    header.addEventListener('click', handleNestedClick);
  });
}

function handleAccordionClick(event) {
  const header = event.currentTarget;
  const item = header.closest('.accordion-item');
  const index = Number(item.dataset.index);

  if (activeIndex !== null && activeIndex !== index) {
    const previousItem = document.querySelector(`.accordion-item[data-index="${activeIndex}"]`);
    if (previousItem) {
      previousItem.classList.remove('active');
      const previousHeader = previousItem.querySelector('.accordion-header');
      previousHeader.setAttribute('aria-expanded', 'false');
    }
  }

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

function handleNestedClick(event) {
  const header = event.currentTarget;
  const item = header.closest('.nested-accordion-item');
  const container = header.closest('.nested-accordion');
  const activeItem = container.querySelector('.nested-accordion-item.active');

  if (activeItem && activeItem !== item) {
    activeItem.classList.remove('active');
    const activeHeader = activeItem.querySelector('.nested-accordion-header');
    activeHeader.setAttribute('aria-expanded', 'false');
  }

  const isCurrentlyActive = item.classList.contains('active');
  if (isCurrentlyActive) {
    item.classList.remove('active');
    header.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
  }
}

function initialize() {
  buildSlide6Box();
  renderAccordion();
}

initialize();
