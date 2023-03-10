window.onload = () => {
  init();
  console.dir([]);
}

const init = () => {
  const vers = new Date().getDate() + '' + (new Date().getHours());
  sliderOpacity();
}

//slide opacity  
const sliderOpacity = () => {
  const SHOWING_CLASS = 'showing';
  const slideBox = document.querySelector('.slider_list');

  if(slideBox){
    function slide() {
      const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
      const slideItem = document.querySelectorAll('.slider_item');
      const firstSlide = slideBox.firstElementChild;
      //console.dir(firstSlide);
    
      if(currentSlide) {
        currentSlide.classList.remove(SHOWING_CLASS);
        const nextSlide = currentSlide.nextElementSibling;
        //const prevSlide = currentSlide.previousElementSibling;
        if(nextSlide) {
          nextSlide.classList.add(SHOWING_CLASS);
        } else {
          firstSlide.classList.add(SHOWING_CLASS);
        }
      }
      else {
        firstSlide.classList.add(SHOWING_CLASS);
      }
    }
    slide();
    //setInterval(slide, 2000);
  }
}

//button click - scroll smmoth move
const scorllTargetMove = () => {
  const listEle = document.querySelectorAll('ul li');

  listEle.forEach(el => {
    const btn = el.firstElementChild;
    btn.addEventListener('click', scrollFocus);
  });

  function scrollFocus(e) {
    e.preventDefault();
    const attr = this.getAttrbute('href');
    const aName = attr.substring(1, 6);
    const ele = document.getElementById(aName);

    ele.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

//scroll 휠 반응
const scrollWheel = () => {
  var prevScrollpos = window.pageYOffset;
  console.log(prevScrollpos);
  window.onscroll = () => {
    var currentScrollPos = window.pageYOffset;
    console.log(currentScrollPos);
    if (prevScrollpos > currentScrollPos) {
      //document.getElementById("navbar").style.top = "0";
      console.log('before');
    } else {
      console.log('current');
      //document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
}

//scroll btn mov - ver1
const scorllTagetMv = () => {
  const header = document.querySelector('#header');
  const headerH = header.clientHeight;
  const btn = document.querySelectorAll('.list_btn > li');
  const targetSection = $('.target');
  const sectionHeightArr = [];

  for(let i = 0; i < btn.length; i++) {
    (function(h) {
      btn[h].addEventListener('click', function(e) {
        e.preventDefault;
        dataId = btn[h].querySelector('a').getAttribute('data-id');
        scrollAction(dataId);
      });
    })(i)
  }

  for (let i = 0; i < btn.length; i++) {
    (function(a) {
      let h = Math.ceil(targetSection.eq(a).offset().top);
      sectionHeightArr.push(h);
    })(i)
  }
  function scrollAction(dataId) {
    let calcScroll = sectionHeightArr[dataId] - 140;

    $('html, body').animate({scrollTop : calcScroll});
  }
}

//scroll btn mov - ver2(jquery)
// const scrollIdTargetMv = () => {
//   $(window).on('click', '.menu .btn', (ev) => {
//     let header = $('header').outerHeight();
//     ev.preventDefault;
//     $('html, body').animate({
//       scrollTop: $(this.hash).offset().top - header
//     },300);
//   });
// }

class Accordion {
  constructor(getEle, value) {
    this.ele = document.querySelector(getEle);
    this.value = {
      childBtn: this.ele.querySelectorAll(value.childBtn),
      ico: this.ele.querySelectorAll(value.ico),
      viewCont: this.ele.querySelectorAll(value.viewCont)
    }
    this.init();
  }
  init() {
    this.onClick();
  }
  onClick() {
    const accBtn = this.value.childBtn;
    accBtn.forEach(el => {
      el.addEventListener('click', this.toggleAction.bind(this));
    })
  }
  toggleAction(el) {
    const target = el.currentTarget;
    const targetView = target.nextElementSibling.classList;
    const targetIcon = target.children[1];
    console.log(target);

    const accIcon = this.value.ico,
    accView = this.value.viewCont;
    
    if (targetView.contains('active')) {
      targetView.remove('active');
      targetIcon.classList.remove('ani');
    }
    else {
      console.log(accIcon)
      accIcon.forEach(el => {
        el.classList.remove('ani');
      });
      accView.forEach(el => {
        el.classList.remove('active');
      });
      targetView.add('active');
      targetIcon.classList.add('ani');
    }
  }
}

//instance
// new acc = new Accordion('.acc-wrap', {
//   childBtn: '.button',
//   ico: 'btn-arrow',
//   viewCont: 'content'
// });

//pop
class ModalPop {
  constructor() {
    this.openBtn = null;
    this.contents = null;
    this.closeBtn = null;
    this.closeBtnDim = null;
  }
  init({ openBtn: openBtn, openPop: contents, closeBtn: closeBtn, closeBtnDim: closeBtnDim }) {
    this.openBtn = document.querySelectorAll(openBtn);
    this.openBtn.forEach(el => {
      el.addEventListener('click', this.open.bind(this));
    });
    this.contents = document.querySelectorAll(contents);
    this.closeBtn = document.querySelectorAll(closeBtn);
    this.closeBtn.forEach(el => {
      el.addEventListener('click', this.close.bind(this));
    });
    this.closeBtnDim = document.querySelectorAll(closeBtnDim);
    this.closeBtnDim.forEach(el => {
      el.addEventListener('click', this.close.bind(this));
    });
  }
  open(el) {
    document.body.classList.add('pop-open');
    const target = el.currentTarget.getAttribute('data-modal-type');
    const contTarget = document.querySelector(`[data-modal-pop=${target}]`);
    const contEle = contTarget.querySelector('.modal');
    const dim = contTarget.querySelector('.dim');

    contTarget.style.display = 'block';
    dim.style.display = 'block';
    setTimeout(() => {
      contEle.classList.add('active');
    }, 100);
  }
  close(e) {
    if (e.currentTarget.className == 'dim') {
      e.currentTarget.previousElementSibling.classList.remove('active');
      e.currentTarget.style.display = 'none';
    }
    else {
      e.currentTarget.closest('.modal').classList.remove('active');
    }
    this.contents.forEach(el => {
      const attrEl = el.getAttribute('data-modal-pop');
      console.log(attrEl);
      if (attrEl == 'alert') { //alert 팝업 사용할 경우
        document.body.classList.remove('pop-open');
        el.style.display = 'none';
      }
      else {
        setTimeout(() => {
          el.style.display = 'none';
          document.body.classList.remove('pop-open');
        }, 200);
      }
    })
    console.log(this.closeBtnDim);
  }
}

//instance
// const openPop = new ModalPop();
// openPop.init({
//   openBtn: '.btn-open-pop',
//   openPop: '.pop-cont-area',
//   closeBtn: '.btn-close',
//   closeBtnDim: '.dim'
// });

//dropdown
class Dropdown {
  constructor() {
    this.dropdown = null;
    this.btn = null;
    this.content = null;
    this.backBtn = null;
  }
  init({ dropdownSec: secEle }) {
    this.dropdown = document.querySelectorAll(secEle);
    this.onClick();
  }
  onClick() {
    for (let i = 0; i < this.dropdown.length; i++) {
      this.btn = this.dropdown[i].querySelector('.dropdown-name');
      this.content = this.dropdown[i].querySelector('.dropdown-content');
      this.content.style.display = 'none';
      this.backBtn = this.dropdown[i].querySelector('.back-btn');
      this.backBtn.style.display = 'none';
      this.btn.addEventListener('click', this.contView);
      this.backBtn.addEventListener('click', this.backHandler);
    }
  }
  contView(e) {
    const targetCont = e.currentTarget.nextElementSibling,
      targetBackBtn = e.currentTarget.closest('.dropdown').querySelector('.back-btn');

    targetCont.style.display = 'block';
    targetBackBtn.style.display = 'block';
  }
  backHandler(e) {
    const target = e.currentTarget,
      targetCont = e.currentTarget.previousElementSibling;
    console.log(targetCont)

    target.style.display = 'none';
    targetCont.style.display = 'none';
  }
}

//instance
// const dropdownPlay = new Dropdown();
// dropdownPlay.init({
//   dropdownSec: '.dropdown'
// });

//tab
class Tab {
  constructor() {
    this.tab = null,
    this.menus = null,
    this.contents = null
  }
  init({ tabSec: tabEle }) {
    this.tab = document.querySelector(tabEle);
    this.menus = this.tab.querySelectorAll('.tab-menu li');
    this.contents = this.tab.querySelectorAll('.tab-cont li');
    this.menu();
  }
  menu() {
    [...this.menus].map((item, i) => {
      item.querySelector('.btn').addEventListener('click', function (e) {
        this.menus.forEach(el => {
          el.classList.remove('active');
        });
        e.target.parentElement.classList.add('active');
        this.content(i);
      }.bind(this));
    });
  }
  content(index) {
    this.contents.forEach(el => {
      el.classList.remove('active');
    });
    this.contents[index].classList.add('active');
  }
}

//instance
// const tabMenu = new Tab();
// tabMenu.init({
//   tabSec: '.tabs'
// });