const buttonBack = document.querySelector('#button-back')
const buttonForward = document.querySelector('#button-forward')

const slides = document.querySelectorAll('.slider-item')

let currentSlideIndex = 1;

let intervalId = setInterval(setNextSlide, 5000)

function resetInterval() {
    window.clearInterval(intervalId)
    intervalId = setInterval(setNextSlide, 5000)
}


function setNextSlide() {
    slides[currentSlideIndex].classList.remove('visible')
    currentSlideIndex++;
    if (currentSlideIndex > 2) {
        currentSlideIndex = 0
    }
    slides[currentSlideIndex].classList.add('visible')
    animateSlider()
    resetInterval()
}

function setPreviouslide() {
    slides[currentSlideIndex].classList.remove('visible')
    currentSlideIndex--
    if (currentSlideIndex < 0) {
        currentSlideIndex = 2
    }
    slides[currentSlideIndex].classList.add('visible')

    resetInterval()
}

buttonForward.addEventListener('click', setNextSlide)

buttonBack.addEventListener('click', setPreviouslide)


console.log(slides)

buttonBack.add
