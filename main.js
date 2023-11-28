
const init  = () =>{
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

init();

const slider = () => {
  const wrapper = document.querySelector(".wrapper"),
    carousel = document.querySelector(".carousel"),
    images = document.querySelectorAll(".carousel img"),
    buttons = document.querySelectorAll(".button");

  let imageIndex = 1,
    intervalId;

  const autoSlide = () => {
    intervalId = setInterval(() => slideImage(++imageIndex), 2000);
  };
  autoSlide();

  const slideImage = () => {
    imageIndex = imageIndex === (images.length - 1) ? 1 : imageIndex < 1 ? (images.length - 1) - 2 : imageIndex;

    carousel.style.transform = `translate(-${imageIndex * 100}%)`;
  };

  const updateClick = (e) => {
    clearInterval(intervalId);
    imageIndex += e.target.id === "next" ? 1 : -1;
    slideImage(imageIndex);
    autoSlide();
  };

  buttons.forEach((button) => button.addEventListener("click", updateClick));

  wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
  wrapper.addEventListener("mouseleave", autoSlide);

}

slider();


const faq = () => {
  const accordionContent = document.querySelectorAll(".accordion-content");

  accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () => {
      item.classList.toggle("is-open");

      let description = item.querySelector(".accordion-content-description");
      if (item.classList.contains("is-open")) {
        description.style.height = `${description.scrollHeight}px`;
        item.querySelector("i").classList.replace("fa-plus", "fa-minus");
      } else {
        description.style.height = "0px";
        item.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }
      removeOpenedContent(index);
    })
  })

  function removeOpenedContent(index) {
    accordionContent.forEach((item2, index2) => {
      if (index != index2) {
        item2.classList.remove("is-open");
        let descrip = item2.querySelector(".accordion-content-description");
        descrip.style.height = "0px";
        item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }
    })
  }

}

faq();