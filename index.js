import '@/scss/index.scss';

//  =========== show-hidden HEADER ================ 
const header = document.querySelector('.header');
const body = document.body;

let headerHeight = header.offsetHeight;

window.addEventListener('resize', () => {
  headerHeight = header.offsetHeight;
});

window.addEventListener('scroll', () => {
  const scrollDistance = window.scrollY;
  if (scrollDistance > 200) {
    header.classList.add('header_fixed');
    body.style.paddingTop = `${headerHeight}px`;
  } else {    
    body.style.paddingTop = "0";    
    header.classList.remove('header_fixed');      
  }
});

//  ============== show-hidden FILTER-menu =================
const adjustElementPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  // console.log('rect: ', rect);

  if (rect.left < 0) {
    element.style.left = "0";
    element.style.right = "auto";
    element.style.transform = "translateX(0)";
  } else if (rect.right > viewportWidth) {
    // console.log('Выпал вправо');
    element.style.left = "auto";
    element.style.right = "0";
    element.style.transform = "translateX(0)";
  } else {
    // console.log('Выпал вправо');
    element.style.left = "50%";
    element.style.right = "auto";
    element.style.transform = "translateX(-50%)";
  }

  const postRect = element.getBoundingClientRect();
  if ((postRect.left < 0 || postRect.right > viewportWidth) && count < 3) {
    count++;
    adjustElementPosition(element, count)
  }
};

const choiseBoxes = document.querySelectorAll('.choices__box');
const choices = document.querySelectorAll('.choices');

choices.forEach(choice => {
  const btn = choice.querySelector('.choices__btn');
  const box = choice.querySelector('.choices__box');

  btn.addEventListener('click', () => {
    if (box.classList.contains('choices__box_open')) {
      choiseBoxes.forEach(elem => elem.classList.remove('choices__box_open'))      
    } else {
      choiseBoxes.forEach(elem => elem.classList.remove('choices__box_open'))      
      box.classList.toggle('choices__box_open');
    } 

    adjustElementPosition(box);
  });  

  window.addEventListener('resize', () => {
    adjustElementPosition(box);
  });
});
