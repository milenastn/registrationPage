const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;
let interval;

function showSlide(i) {
    slides.forEach((slide, i) => {
        slide.classList.remove('slide-active');
        dots[i].classList.remove('dot-active');
    });

    slides[i].classList.add('slide-active');
    dots[i].classList.add('dot-active');
    index = i;
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function goToSlide(i) {
    showSlide(i);
    restartSlide();
}

function startSlide() {
    interval = setInterval(nextSlide, 4000);
}

function restartSlide() {
    clearInterval(interval);
    startSlide();
}

startSlide();

const slideshow = document.querySelector('.slideshow');
let start = 0;
let end = 0;

function handleSwipe() {
    const pxLimit = 50;
    const distance = end - start;

    if (distance > pxLimit) {
        let prevIndex = (index - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        restartSlide();
    } else if (distance < -pxLimit) {
        let nextIndex = (index + 1) % slides.length;
        showSlide(nextIndex);
        restartSlide();
    }
}

slideshow.addEventListener('touchstart', e => {
    start = e.touches[0].clientX;
});

slideshow.addEventListener('touchend', e => {
    end = e.changedTouches[0].clientX;
    handleSwipe();
});