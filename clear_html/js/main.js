const reviewSlider = new Slider('.reviewCard', '.countReviews')

const newsSlider = new Slider('.newsPage')

function handlerNextReview() {
  reviewSlider.nextSlide()
}

function handlerPrevReview() {
  reviewSlider.previousSlide()
}

function handlerNextNews() {
  newsSlider.nextSlide()
}

function handlerPrevNews() {
  newsSlider.previousSlide()
}

function initSignLearn() {
  const $pages = document.querySelectorAll('.signLearnPage')
  const $panels = document.querySelectorAll('.signPanel')

  if (!$pages || !$panels) return

  $panels.forEach((panel, i) => {
    panel.addEventListener('click', (event) => {
      $pages.forEach((page) => {
        page.style.display = "none"
      })

      $panels.forEach((panel) => {
        panel.classList.remove('active')
      })

      $pages[i].style.display = "block"
      panel.classList.add('active')
    })
  })

  $pages[0].style.display = "block"
  $panels[0].classList.add('active')
}

initSignLearn()