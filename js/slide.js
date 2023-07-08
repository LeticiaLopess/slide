// no mobile não é mousemove, é touchmove

export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.dist = { finalPosition: 0, startX: 0, movement: 0 }
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX; // dentro do evento do mouse, em event tem o clientX (mesmo valor do pageX)  
      movetype = 'mousemove'
    } else {
      this.dist.startX = event.changedTouches[0].clientX; // o primeiro é o 0 e dentro tem o clientX
      movetype = 'touchmove'
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6; // * 1.6 pra acelerar o slide
    return this.dist.finalPosition - this.dist.movement;
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition)
  }

  onEnd(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é no momento do clique, antes de soltar
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd)
    this.wrapper.addEventListener('touchend', this.onEnd)
  }

  slidePosition(slide) {
    const margin = this.wrapper.offsetWidth - slide.offsetWidth / 2 // quando pegamos o wrapper total e diminuimos pela largura da foto, sobrará uma margem e aí só precisamos dividir por 2
    return -(slide.offsetLeft - margin);
  }

  // slidesConfig - precisamos calcular a largura do slide pra quando avançarmos ele ficar certinho na tela
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.finalPosition;
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() { // pra não dar erro devemos chamar o bind primeiro
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}