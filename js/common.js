window.onload = () => {
  init();
  console.dir([]);
}

const init = () => {
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

//scroll btn mov
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

//accordion
function Accordion(getEle, value) {
  this.ele = document.querySelector(getEle);
  this.value = {
    childBtn: this.ele.querySelectorAll(value.childBtn),
    ico: this.ele.querySelectorAll(value.ico),
    viewCont: this.ele.querySelectorAll(value.viewCont)
  }
  this.init();
}

Accordion.prototype.init = function () {
  this.onClick();
}

Accordion.prototype.onClick = function() {
  const accBtn = this.value.childBtn;

  accBtn.forEach(el => {
    el.addEventListener('click', this.toggleAction.bind(this));
  });
}

Accordion.prototype.toggleAction = function(el) {
  const target = el.currentTarget;
  const targetView = target.parentElement.nextElementSibling.classList;
  const targetIcon = target.children[1];

  const accIcon = this.value.ico,
        accView = this.value.viewCont;

  if(targetView.contains('active')){
    targetView.remove('active');
    targetIcon.classList.remove('ani');
  }
  else {
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

//instance
new acc = new Accordion('.acc-wrap', {
  childBtn: '.button',
  ico: 'btn-arrow',
  viewCont: 'content'
});

//pop
function ModalPop() {
  this.openBtn = null;
  this.contents = null;
  this.closeBtn = null;
  this.closeBtnDim = null;
}

ModalPop.prototype.init = function({openBtn: openBtn, openPop: contents, closeBtn: closeBtn, closeBtnDim: closeBtnDim}) {
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

ModalPop.prototype.open = function(el) {
  document.body.classList.add('pop-open');
  const target = el.currentTarget.getAttrbute('data-modal-type');
  const contTarget = document.querySelector(`[data-modal-pop=${target}]`)
  const contEle = contTarget.querySelector('.modal');
  const dim = contTarget.querySelector('.dim');

  contTarget.style.display = 'block';
  dim.style.display = 'block';
  setTimeout(() => {
    contEle.classList.add('active');    
  }, 100);
}

ModalPop.prototype.close = function(e) {
  if(e.currentTarget.className == 'dim') {
    e.currentTarget.previousElementSibling.classList.remove('active');
    e.currentTarget.style.display = 'none';
  }
  else {
    e.currentTarget.closest('modal').classList.remove('active');
  }
  this.contents.forEach(el => {
    const attrEl = el.getAttrbute('data-modal-pop');
    if(attrEl = 'alert') { //alert use
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
}

//instance
const openPop = new ModalPop();
openPop.init({
  openBtn: 'btn-open-pop',
  openPop: 'pop-cont-area',
  closeBtn: '.btn-close',
  closeBtnDim: '.dim'
});


//tab
function Tab() {
  this.tab = null,
  this.menu = null,
  this.contents = null
}

Tab.prototype.init = function({tabSec: tabEle}) {
  this.tab = document.querySelector(tabEle);
  this.menu = this.tab.querySelectorAll('.tab-menu li');
  this.contents = this.tab.querySelectorAll('.tab-cont li');
  this.menu();
}

Tab.prototype.menu = function() {
  [...this.menu].map((item, i) => {
    item.querySelector('.btn').addEventListener('click', function(e) {
      this.menu.forEach(el => {
        el.classList.remove('active');
      });
      e.target.parentElement.classList.add('active');
      this.contents(i);
    }.bind(this));
  });
}

Tab.prototype.contents = function(index) {
  this.contents.forEach(el => {
    el.classList.remove('active');
  });
  this.contents[index].classList.add('active');
}

//instance
const tabMenu = new Tab();
tabMenu.init({
  tabSec: '.tabs'
});