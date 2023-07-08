import { SlideNav } from "./slide.js";

const slide = new SlideNav('.slide', '.slide-wrapper'); // ja que eu "estendo" a classe Slide em SlideNav, eu só chamo a SlideNav
slide.init();
slide.addArrow('.prev', '.next')