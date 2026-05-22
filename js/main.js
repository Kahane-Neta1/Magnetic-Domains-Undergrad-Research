const slides = [
  {
    id: 'slide-1',
    title: 'Magnetic Relaxation Characteristics',
    copy: 'No speaker notes available.',
    icon: '🔄',
    images: []
  },
  {
    id: 'slide-2',
    title: 'Magnetic Domains',
    copy: 'What are magnetic domains, saturation, and polarity reversal. Motivation, system design, automation, and analysis are all part of the experimental setup.',
    icon: '🧲',
    images: [
      'assets/figures/slide-2-fig1.png',
      'assets/figures/slide-2-fig2.png',
      'assets/figures/slide-2-fig3.png',
      'assets/figures/slide-2-fig4.jpg'
    ]
  },
  {
    id: 'slide-3',
    title: 'Basic Model',
    copy: 'A concise description of the model and the rules governing its dynamics.',
    icon: '🧩',
    images: [
      'assets/figures/slide-3-fig1.png',
      'assets/figures/slide-3-fig2.png',
      'assets/figures/slide-3-fig3.png',
      'assets/figures/slide-3-fig4.png'
    ]
  },
  {
    id: 'slide-4',
    title: 'Hysteresis Loop',
    copy: 'Hysteresis behaviour across different voltage jumps. Domain boundaries are weakly driven, so many remain pinned and only some move. The result is partial equilibrium and a memory effect over time.',
    icon: '🔁',
    images: [
      'assets/figures/slide-4-fig1.png',
      'assets/figures/slide-4-fig2.png',
      'assets/figures/slide-4-fig3.png'
    ]
  },
  {
    id: 'slide-5',
    title: 'Disappearing',
    copy: 'Three change types shown side by side, with a visual explanation of their differences and the underlying physical meaning.',
    icon: '✨',
    images: [
      'assets/figures/slide-5-fig1.png',
      'assets/figures/slide-5-fig2.png',
      'assets/figures/slide-5-fig3.jpg'
    ]
  },
  {
    id: 'slide-6',
    title: 'Disappearing',
    copy: 'Three change modes are shown as motion sequences, highlighting their visual differences and physical significance.',
    icon: '✨',
    images: [
      'assets/figures/slide-6-fig1.gif',
      'assets/figures/slide-6-fig2.gif',
      'assets/figures/slide-6-fig3.gif'
    ]
  },
  {
    id: 'slide-7',
    title: 'Motion Types',
    copy: 'Motion types and the key decay points of each mode, highlighting when each type of domain movement begins to fade.',
    icon: '🧭',
    images: [
      'assets/figures/slide-7-fig1.png',
      'assets/figures/slide-7-fig2.png'
    ]
  },
  {
    id: 'slide-8',
    title: 'Domain Thinning',
    copy: 'Domain width falls as voltage increases. The left histogram is vertical; the right plot shows average width shrinking toward a minimum, at which domains begin to disappear.',
    icon: '📉',
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
    title: 'Domain Disappearance',
    copy: 'Examples of domain jumps and the mechanism by which domains vanish during voltage-driven changes.',
    icon: '❌',
    images: [
      'assets/figures/slide-9-fig1.jpg',
      'assets/figures/slide-9-fig2.png'
    ]
  },
  {
    id: 'slide-10',
    title: 'Domain Curvature',
    copy: 'Domain curvature is driven by surface-energy minimization. Curvier domains are less stable and tend to disappear first as the system seeks straighter shapes.',
    icon: '🌊',
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
    title: 'Model',
    copy: 'The model structure and equations that describe domain behavior under changing voltage.',
    icon: '📐',
    images: []
  },
  {
    id: 'slide-12',
    title: 'Domain Disappearance',
    copy: 'Replication distance and peak timing show an effective relaxation scale. A second plot links time between peaks to voltage, indicating a characteristic feedback timescale.',
    icon: '📈',
    images: [
      'assets/figures/slide-12-fig1.png',
      'assets/figures/slide-12-fig2.png',
      'assets/figures/slide-12-fig3.png'
    ]
  },
  {
    id: 'slide-13',
    title: 'Domain Disappearance',
    copy: 'Polarity reversals per frame over time. The decay rate is similar across voltage jumps, meaning disappearance probability per active change is consistent even as hysteresis width changes.',
    icon: '🔎',
    images: [
      'assets/figures/slide-13-fig1.png',
      'assets/figures/slide-13-fig2.png',
      'assets/figures/slide-13-fig3.png',
      'assets/figures/slide-13-fig4.png'
    ]
  },
  {
    id: 'slide-14',
    title: 'Summary',
    copy: 'Thinning, motion, and disappearance all shift with higher voltage. Width decreases toward a minimum, disappearance occurs in jumps, and the same exponential decay constant appears across voltage jumps. Curvier and larger-area domains vanish first.',
    icon: '📚',
    images: []
  },
  {
    id: 'slide-15',
    title: 'Math?',
    copy: 'A final summary of the research perspective and the mathematical framing behind the domain dynamics.',
    icon: '➗',
    images: []
  }
];

const navList = document.getElementById('nav-list');
const slideshow = document.getElementById('slideshow');
const progress = document.getElementById('progress');
const slideStatus = document.getElementById('slide-status');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let activeIndex = 0;

function createNavMarkup() {
  return slides
    .map((slide, index) => `
      <div class="nav-item" data-index="${index}">
        <button type="button" class="nav-link" aria-label="Go to ${slide.title}">
          <span class="icon">${slide.icon}</span>
          <span class="label">${slide.title}</span>
        </button>
      </div>
    `)
    .join('');
}

function buildFigurePane(images) {
  if (!images.length) {
    return '';
  }

  if (images.length === 1) {
    return `
      <div class="figure-pane figure-hero">
        <img src="${images[0]}" alt="Figure for slide" loading="lazy">
      </div>
    `;
  }

  return `
    <div class="figure-pane">
      <div class="figure-grid">
        ${images
          .map(
            (image, index) =>
              `<img src="${image}" alt="Figure ${index + 1}" loading="lazy">`
          )
          .join('')}
      </div>
    </div>
  `;
}

function createSlideMarkup() {
  return slides
    .map((slide, index) => {
      const figureMarkup = buildFigurePane(slide.images);
      const slideClass = slide.images.length === 0 ? 'slide no-image' : 'slide';

      return `
        <section class="${slideClass}" data-index="${index}" aria-hidden="true">
          <div class="slide-panel">
            ${figureMarkup}
            <div class="text-pane">
              <div class="text-copy">
                <p class="slide-label">Slide ${index + 1}</p>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-copy">${slide.copy}</p>
              </div>
            </div>
          </div>
        </section>
      `;
    })
    .join('');
}

function createProgressMarkup() {
  return slides
    .map((slide, index) =>
      `<button type="button" class="progress-button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`
    )
    .join('');
}

function updateActiveSlide(index) {
  const count = slides.length;
  const newIndex = (index + count) % count;
  activeIndex = newIndex;

  document.querySelectorAll('.slide').forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === newIndex);
    slide.classList.toggle('leave-left', slideIndex < newIndex);
    slide.classList.toggle('leave-right', slideIndex > newIndex);
    slide.setAttribute('aria-hidden', slideIndex !== newIndex);
  });

  document.querySelectorAll('.nav-item').forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === newIndex);
  });

  document.querySelectorAll('.progress-button').forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === newIndex);
  });

  slideStatus.textContent = `Slide ${newIndex + 1} / ${count}`;
}

function goToSlide(index) {
  updateActiveSlide(index);
}

function handleKeyNavigation(event) {
  const target = event.target;
  if (target.matches('input, textarea, select, button')) {
    return;
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    goToSlide(activeIndex + 1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    goToSlide(activeIndex - 1);
  }
}

function attachEventListeners() {
  prevButton.addEventListener('click', () => goToSlide(activeIndex - 1));
  nextButton.addEventListener('click', () => goToSlide(activeIndex + 1));

  document.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', (event) => {
      const item = event.currentTarget.closest('.nav-item');
      const index = Number(item.dataset.index);
      goToSlide(index);
    });
  });

  document.querySelectorAll('.progress-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(event.currentTarget.dataset.index);
      goToSlide(index);
    });
  });

  document.addEventListener('keydown', handleKeyNavigation);
}

function initialize() {
  navList.innerHTML = createNavMarkup();
  slideshow.innerHTML = createSlideMarkup();
  progress.innerHTML = createProgressMarkup();
  attachEventListeners();
  updateActiveSlide(0);
}

initialize();
