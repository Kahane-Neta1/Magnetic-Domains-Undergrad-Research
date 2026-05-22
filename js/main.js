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
      'assets/figures/slide-9-fig1.mp4',
      'assets/figures/slide-9-fig2.mp4'
    ]
  },
  'slide-10': {
    id: 'slide-10',
    number: 10,
    title: 'Domain Curvature',
    notes: 'Domain curvature is driven by surface-energy minimization. Curvier domains are less stable and tend to disappear first as the system seeks straighter shapes.',
    images: [
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
      'assets/figures/slide-13-fig3.png'
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

function buildImageCard(imagePath) {
  return `
    <div class="figure-card">
      <img src="${imagePath}" alt="Slide figure" loading="lazy">
    </div>
  `;
}

function buildFigureGrid(images) {
  if (!images || images.length === 0) {
    return '';
  }

  const count = Math.min(images.length, 6);
  const gridClass = `count-${count}`;
  const cards = images
    .map((imagePath) => buildImageCard(imagePath))
    .join('');

  return `
    <div class="figures-row">
      <div class="figure-grid ${gridClass}">
        ${cards}
      </div>
    </div>
  `;
}

function buildSlide3Layout() {
  return `
    <div class="slide-3-grid">
      <div class="slide-3-card">
        <h3>Exchange interaction & energy</h3>
        <ul>
          <li>Causes neighboring spins to align in the same direction.</li>
        </ul>
        <div class="slide-3-figures">
          ${buildImageCard('assets/figures/slide-3-fig1.png')}
          ${buildImageCard('assets/figures/slide-3-fig4.png')}
        </div>
      </div>
      <div class="slide-3-card">
        <h3>Magnetostatic energy</h3>
        <ul>
          <li>Encourages splitting of domains to reduce internal local magnetic field to minimum needed.</li>
        </ul>
        <div class="slide-3-figures">
          ${buildImageCard('assets/figures/slide-3-fig2.png')}
          ${buildImageCard('assets/figures/slide-3-fig3.png')}
        </div>
      </div>
      <div class="slide-3-summary">
        <p>In general: Magnetic dipoles under external field should align with its direction, thus reducing the overall field.</p>
      </div>
    </div>
  `;
}

function buildSlide8Layout(slide) {
  const [fig1, fig2, fig3, fig4, fig5] = slide.images;
  return `
    <div class="slide-8-row slide-8-row-1">
      ${buildImageCard(fig2)}
      ${buildImageCard(fig3)}
    </div>
    <div class="slide-8-row slide-8-row-2">
      ${buildImageCard(fig1)}
      ${buildImageCard(fig4)}
      ${buildImageCard(fig5)}
    </div>
  `;
}

function buildSlide9Content(slide) {
  const [video1, video2] = slide.images;
  return `
    <div class="slide-9-layout">
      <div class="slide-9-media-column">
        <video class="slide-9-video" src="${video1}" controls autoplay muted loop playsinline></video>
        <video class="slide-9-video" src="${video2}" controls autoplay muted loop playsinline></video>
      </div>
      <div class="slide-9-description-box">
        <p>${slide.notes}</p>
      </div>
    </div>
  `;
}

function buildSlide10Layout(slide) {
  return `
    <div class="slide-10-grid">
      ${slide.images.map((imagePath) => buildImageCard(imagePath)).join('')}
    </div>
  `;
}

function buildSlide13Layout(slide) {
  return `
    <div class="slide-13-grid">
      ${slide.images.map((imagePath) => buildImageCard(imagePath)).join('')}
    </div>
  `;
}

function buildSectionContent(slide, includeHeading = false) {
  if (!slide) {
    return '';
  }

  const headingMarkup = includeHeading ? `<h3 class="section-subtitle">${slide.title}</h3>` : '';
  let contentMarkup;

  switch (slide.id) {
    case 'slide-3':
      contentMarkup = buildSlide3Layout();
      break;
    case 'slide-8':
      contentMarkup = buildSlide8Layout(slide);
      break;
    case 'slide-9':
      contentMarkup = buildSlide9Content(slide);
      break;
    case 'slide-10':
      contentMarkup = buildSlide10Layout(slide);
      break;
    case 'slide-12':
      contentMarkup = buildFigureGrid(slide.images);
      break;
    case 'slide-13':
      contentMarkup = buildSlide13Layout(slide);
      break;
    default:
      contentMarkup = buildFigureGrid(slide.images);
  }

  const noteMarkup = slide.id === 'slide-3' || slide.id === 'slide-9' ? '' : `<p class="accordion-description">${slide.notes}</p>`;

  return `
    <div class="section-panel slide-${slide.id}">
      ${headingMarkup}
      ${contentMarkup}
      ${noteMarkup}
    </div>
  `;
}

function normalizeRowImageHeights(selector) {
  const rows = Array.from(document.querySelectorAll(selector));
  rows.forEach((row) => {
    const images = Array.from(row.querySelectorAll('img'));
    if (!images.length) {
      return;
    }

    const pending = images.filter((image) => !image.complete || image.naturalHeight === 0);
    if (pending.length) {
      pending.forEach((image) => image.addEventListener('load', () => normalizeRowImageHeights(selector), { once: true }));
      return;
    }

    const minHeight = Math.min(...images.map((image) => image.naturalHeight));
    images.forEach((image) => {
      if (image.naturalHeight > minHeight) {
        image.style.height = `${minHeight}px`;
        image.style.width = 'auto';
      }
      const card = image.closest('.figure-card');
      if (card) {
        card.style.width = 'auto';
      }
    });
  });
}

function normalizeAllFigureRows() {
  normalizeRowImageHeights('.slide-3-figures');
  normalizeRowImageHeights('.slide-8-row');
  normalizeRowImageHeights('.slide-10-grid');
  normalizeRowImageHeights('.slide-12 .figure-grid');
  normalizeRowImageHeights('.slide-13-grid');
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
  normalizeAllFigureRows();
}

initialize();
