const sliderInner = document.querySelector('.slider-inner');
const slides = document.querySelectorAll('.slider-item');
const prevBtn = document.getElementById('button-back');
const nextBtn = document.getElementById('button-forward');
const dotsContainer = document.querySelector('.dots');
const pausePlayBtn = document.getElementById('pause-play');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

let currentSlideIndex = 0;
let autoSlideInterval;
let isPaused = false;
let animationType = 'slide';

slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    resetAutoSlide();
    if (animationType === 'slide') {
        sliderInner.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
    } else {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlideIndex ? '1' : '0';
            slide.style.transition = 'opacity 0.5s ease-in-out';
        });
    }
    updateDots();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    if (!isPaused) startAutoSlide();
}

pausePlayBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(autoSlideInterval);
        pausePlayBtn.textContent = '▶';
    } else {
        startAutoSlide();
        pausePlayBtn.textContent = '⏸';
    }
});

slides.forEach(slide => {
    slide.querySelector('img').addEventListener('click', event => {
        lightbox.classList.remove('hidden');
        lightboxImg.src = event.target.src;
        clearInterval(autoSlideInterval);
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    if (!isPaused) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

updateSlider();
startAutoSlide();