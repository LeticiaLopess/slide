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
    event.preventDefault();
    this.dist.startX = event.clientX; // dentro do evento do mouse, em event tem o clientX (mesmo valor do pageX)
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition)
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é no momento do clique, antes de soltar
    this.wrapper.addEventListener('mouseup', this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() { // pra não dar erro devemos chamar o bind primeiro
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}