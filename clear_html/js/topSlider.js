const SLIDER_DELAY = 10000

/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;

createPaginator();

/* Вызываем функцию, которая реализована ниже: */
showSlides(slideIndex);

/* Увеличиваем индекс на 1 — показываем следующий слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливаем текущий слайд: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Функция перелистывания: */
function showSlides(n) {
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    let slides = document.getElementsByClassName("item");
    let pageSelectors = document.getElementsByClassName("sliderPageSelector");

    /* Проверяем количество слайдов: */
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    /* Проходим по каждому слайду в цикле for: */
    for (let slide of slides) {
        slide.style.display = "none";
    }

    /* Проходим по каждому селектору страниц в цикле for: */
    for (let selector of pageSelectors) {
      selector.classList.remove('active');
    }

    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.remove('fadeOut')

    pageSelectors[slideIndex - 1].classList.add('active');
}

function createPaginator() {
  let slides = document.getElementsByClassName("item");
  let paginator = document.querySelector(".sliderPaginator");

  for (let i = 0; i < slides.length; i++) {
    paginator.insertAdjacentHTML('beforeend', `<div class="sliderPageSelector" onclick=currentSlide(${i + 1})></div>`);
  }
}

setInterval(() => {
  setTimeout(() => {
    let slides = document.getElementsByClassName("item")
    slides[slideIndex - 1].classList.add('fadeOut')
  }, SLIDER_DELAY - 1500)
  nextSlide();
}, SLIDER_DELAY)

