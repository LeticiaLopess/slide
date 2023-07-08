export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove)
  }

  onMove(event) {

  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove)
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é no momento do clique, antes de soltar
    this.wrapper.addEventListener('mouseup', this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd - this.onEnd.bind(this);
  }

  init() {
    this.addSlideEvents();
    this.bindEvents();
    return this;
  }
}