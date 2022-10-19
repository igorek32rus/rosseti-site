class Slider {
  animStart = false
  nowIndex = 1

  constructor(selectorElements, selectorCounter = null) {
    this.selElements = selectorElements
    this.selCounter = selectorCounter

    this.showSlide(this.nowIndex)
  }

  showSlide(index, dir = null) {
    let elements = document.querySelectorAll(this.selElements)

    if (index > elements.length) {
      this.nowIndex = elements.length
      return
    }
    if (index < 1) {
      this.nowIndex = 1
      return
    }

    if (dir === 'right') {
      this.animStart = true
      elements[this.nowIndex - 2].classList.remove('turnLeft', 'turnRight', 'newTurnLeft', 'newTurnRight')
      elements[this.nowIndex - 2].classList.add('turnLeft')

      elements[this.nowIndex - 1].classList.remove('turnLeft', 'turnRight', 'newTurnLeft', 'newTurnRight')
      elements[this.nowIndex - 1].classList.add('newTurnLeft')
      elements[this.nowIndex - 1].style.display = "flex"
      setTimeout(() => {
        elements[this.nowIndex - 2].style.display = 'none'
        this.animStart = false
      }, 500)
    } else if (dir === 'left') {
      this.animStart = true
      elements[this.nowIndex].classList.remove('turnLeft', 'turnRight', 'newTurnLeft', 'newTurnRight')
      elements[this.nowIndex].classList.add('turnRight')

      elements[this.nowIndex - 1].classList.remove('turnLeft', 'turnRight', 'newTurnLeft', 'newTurnRight')
      elements[this.nowIndex - 1].classList.add('newTurnRight')
      elements[this.nowIndex - 1].style.display = "flex"
      setTimeout(() => {
        elements[this.nowIndex].style.display = 'none'
        this.animStart = false
      }, 500)
    } else {
      for (let el of elements) {
          el.style.display = "none"
      }

      elements[this.nowIndex - 1].style.display = "flex"
    }

    if (this.selCounter) {
      let counter = document.querySelector(this.selCounter)
      counter.innerHTML = this.nowIndex  + "/" + elements.length
    }
  }

  nextSlide() {
    if (!this.animStart) {
      this.showSlide(this.nowIndex += 1, 'right')
    }
  }

  previousSlide() {
    if (!this.animStart) {
      this.showSlide(this.nowIndex -= 1, 'left')
    }
  }

  currentSlide(n) {
    this.showSlide(this.nowIndex = n)
  }

}
