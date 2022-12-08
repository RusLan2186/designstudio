new Swiper('.about-slider', {
   slidesPerView: 1,
   autowidth: true,
   speed: 800,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   breakpoints: {
      320: {
         slidesPerView: 1.1,
         spaceBetween: 20,
      },
      767: {
         slidesPerView: 1,
      },
   },
});


var time = 2, cc = 1;
$(window).scroll(function () {
   $('#counter').each(function () {
      var
         cPos = $(this).offset().top,
         topWindow = $(window).scrollTop();
      if (cPos < topWindow + 500) {
         if (cc < 2) {
            $('div').each(function () {
               var
                  i = 1,
                  num = $(this).data('num'),
                  step = 1000 * time / num,
                  that = $(this),
                  int = setInterval(function () {
                     if (i <= num) {
                        that.html(i);
                     }
                     else {
                        cc = cc + 2;
                        clearInterval(int);
                     }
                     i++;
                  }, step);
            });
         }
      }
   });

});
// ..............................БУРГЕР .........................
// $(document).ready(function () {
//    // на header burger вешаем событие клик
//    $('.header__burger').click(function (event) {
//       // при клике на бургер и хедер меню добавился класс aktive (нажали-добав класс, нажали-убрался класс) 
//       $('.header__burger, .header__menu, .tools').toggleClass('active');
//       // при открытом бургере блокируем прокрутку страницы
//       $('body').toggleClass('lock');
//    });
// });



// переменная определяет, что страница открыта на мобильном устройстве. Происходит проверка, страница открыта на мобильном устройстве  либо планшете
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
// тегу body назначаем класс тачскрин либо мышь
// let body = document.querySelector('body');
// делаем проверку если мобильное, добавляем класс 'touch' 
if (isMobile.any()) {
   document.body.classList.add('_touch');
   // берем все объекты с классом arrow 
   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", function (e) {
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }

   // for (i = 0; i < arrow.length; i++) {
   //    let thisLink = arrow[i].previousElementSibling;
   //    let subMenu = arrow[i].nextElementSibling;
   //    let thisArrow = arrow[i];

   //    thisLink.classList.add('parent');
   //    arrow[i].addEventListener('click', function () {
   //       subMenu.classList.toggle('open');
   //       thisArrow.classList.toggle('active');
   //    });
   // }
   // если не болильное, добавляем класс 'mouse' 
} else {
   document.body.classList.add('_pc');
}
// меню бургер
const headerBurger = document.querySelector('.header__burger');
const menuHeader = document.querySelector('.header__menu');
if (headerBurger) {

   headerBurger.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      headerBurger.classList.toggle('_active');
      menuHeader.classList.toggle('_active');

   });


}

// .......................................................................................................
// плавная прокрутка


// будет искать только те menu-link у кого есть data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// проверка, есть ли эти классы с data-goto
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      // на menu__link вешаем событие click
      menuLink.addEventListener("click", onMenuLinkClick);
   });
   // создаем функцию
   function onMenuLinkClick(e) {
      // получаем объект, на который кликаем
      const menuLink = e.target;


      // проверяем data атрибут, есть ли там что-то, узнаем сушествю ли объект, на кот ссылается данный data атрибут  
      if (MenuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         // получаем в константу сам объект
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         // высчитываем положение объекта с учетом высоты шапки
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageXOffset - document.querySelector('header').offsetHeight;
         // закрытие бургера по нажатию на ссылку
         if (headerBurger.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            headerBurger.classList.remove('_active');
            menuHeader.classList.remove('_active');

         }
         // прокручивает скролл к нужному месту
         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         // откл ссылку, чтоб она просто переходила в прокрутку
         e.preventDefault();
      }
   }
}



