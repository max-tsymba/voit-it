window.addEventListener('DOMContentLoaded', ()=>{

        accrodionMenu();
        programmMenu();
        modal('.overlay__popup','popup-btn', '.popup__close','.popup__login');
        validatorForm('contact-form', '._req', "../sendmail.php");
        register('register-form', '._req');
        addTimer('timer');
        registerModal('register-btn','.popup__reg', '.popup__login');
        mobileMenu('.menu-hamburger', '.menu', '.menu__link');
        login('login-form', '._login-req', 'any.php');
        // validatorForm('first-page', '.form-reg-mail', "../sendCode.php");
});

let token = 0;
if(document.querySelector('meta[name="csrf-token"]') !== null) {
        token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

$(function(){

        const media = window.matchMedia('(max-width: 768px)');

        $(window).on('scroll', function(){
                
                if($(window).scrollTop()) {
                        if(media.matches) {
                            $('.mobile-menu.fix').addClass('fixed');  
                            $('.empty').addClass('active');  
                        } else {
                                $('.header__top.fix').addClass('fixed'); 
                                $('.header__content.fix').addClass('active');
                        }
                } else {
                        $('.empty').removeClass('active');
                        $('.mobile-menu.fix').removeClass('fixed');  
                        $('.header__top.fix').removeClass('fixed');
                        $('.header__content.fix').removeClass('active');
                }
        });
        
        $('.feedback__slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                prevArrow: '<button class="slider-btn slider-btn__left"><img src="./img/arr-left.svg" alt=""></button>',
                nextArrow: '<button class="slider-btn slider-btn__right"><img src="./img/arr-right.svg" alt=""></button>',

                responsive: [{

                        breakpoint: 1440,
                        settings: {
                                slidesToShow: 2,
                        },

                }, {
                        breakpoint: 913,
                        settings: {
                                slidesToShow: 1,
                        },
                }],

        });

});

// Mobile Menu
function mobileMenu(buttonClass, menuClass, menuLinksClass) {

        const btn = document.querySelector(buttonClass),
              menu = document.querySelector(menuClass),
              links = document.querySelectorAll(menuLinksClass);

        let isOpen = true;

        btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(isOpen) {
                        btn.classList.add('active');
                        menu.classList.add('active');
                        document.querySelector('body').style.overflowY = 'hidden';
                        isOpen = false;
                } else {
                        btn.classList.remove('active');
                        menu.classList.remove('active');
                        document.querySelector('body').style.overflowY = 'scroll';
                        isOpen = true;
                }
        })

        links.forEach((link) => {
                link.addEventListener('click', () => {
                        btn.classList.remove('active');
                        menu.classList.remove('active');
                        document.querySelector('body').style.overflowY = 'scroll';
                        isOpen = true;  
                });
        })
}

// Login
function login(formID, reqsInputs, phpFile) {

        const form = document.getElementById(formID),
              inputs = document.querySelectorAll(reqsInputs);

        if(form !== null) form.addEventListener('submit', formSend);

        async function formSend(e) {
                e.preventDefault();

                        let dataForm = new FormData();
                        dataForm.set('email', inputs[0].value);
                        dataForm.set('password', inputs[1].value);
                       
                        let response = await fetch(phpFile, {
                                method: 'POST',
                                body: dataForm,
                                headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-CSRF-TOKEN': token
                                })
                        });
    
                        if(response.ok) {
                                let result = await response.json();
                                console.log(result.message);
                                Reset(dataForm);
                        } else {                       
                                alert('Ошибка');
                        }
        }
}

// Accordion About Menu
function accrodionMenu() {

        let items = document.querySelectorAll('.accordion__item');

        for (let i=0; i<items.length; i++) {
                items[i].addEventListener('click', ()=>{

                        if(!(items[i].classList.contains('active'))) {
                                let activeNode = null;
                                try{
                                        activeNode = document.querySelector('.about__accordion .active');
                                } catch(msg) {}
                                
                                items[i].classList.add('active');

                                if(activeNode) {
                                        activeNode.classList.remove('active');
                                }
                        }
                })
        }
}

// Programm Section - Sub Menu
function programmMenu() {
        
        const media = window.matchMedia('(max-width: 913px)');

        let items = document.querySelectorAll('.programm__menu-item');
        let btn = document.querySelectorAll('.programm__menu-btn');

        for (let i=0; i<btn.length; i++) {
                btn[i].addEventListener('click', ()=>{
                        
                        if(items[i].classList.contains('active')) {
                                if(!(media.matches)) {
                                        items[i].classList.remove('active');
                                }  
                        } else {
                                let activeNode = null;
                                try{
                                        activeNode = document.querySelector('.programm__menu .active');
                                        activeButton = document.querySelector('.programm__menu .up');
                                } catch(msg) {}

                                if (media.matches) {
                                        items[i].classList.add('active');
                                        btn[i].classList.add('up');
                                } else {
                                        setTimeout(()=>{
                                                items[i].classList.add('active');
                                        },800);                
                                }

                                if(activeNode) {
                                        activeNode.classList.remove('active');
                                }

                                if(activeButton) {
                                        activeButton.classList.remove('up');
                                }
                        }
                })
        }
}

// MODAL 
function modal(popup, button, closeButton, displayModal) {

        const popupWindow = document.querySelector(popup),
              popupBtn = document.getElementsByClassName(button),
              popupCls = document.querySelectorAll(closeButton),
              displayPopup = document.querySelector(displayModal);

        const header = document.querySelector('article');
        const header_top = document.querySelector('.header__top');
        const styleHeader = getComputedStyle(header);
        const scroll = calcScroll();
        const media = window.matchMedia('(max-width: 769px)');

        if(popupBtn != null && popupWindow !== null) {

                [].forEach.call(popupBtn, (btn)=>{

                        btn.addEventListener('click', (but)=>{

                                popupWindow.classList.add('active');
                                displayPopup.style.display = 'block';

                                document.body.style.overflowY = 'hidden';
                                document.body.style.marginRight = `${scroll}px`;

                               
                        });
                })
               
        }

        if(popupCls != null) {

                popupCls.forEach((item) => {
                        item.addEventListener('click', ()=>{

                                removePopup(popupWindow, styleHeader, media);
                                
                        })
                })

        }

}

// Register Popup
function registerModal(buttonID, modalClass, loginModal) {

        const openBtn = document.getElementById(buttonID),
              modal = document.querySelector(modalClass),
              login = document.querySelector(loginModal);

        if(openBtn !== null) {
                openBtn.addEventListener('click',() => {
                        login.style.display = 'none';
                        modal.style.display= 'block';
                })
        }
}

function removePopup(window, style, mediaMatch) {
        
        const popupWindow = window,
              styleHeader = style,
              media = mediaMatch;

        const regModal = document.querySelector('.popup__reg');
        const loginForm = popupWindow.children[0].children[1];
        const registerForm = popupWindow.children[1].children[1];
        const codeInput = document.querySelector('._code');
        const inputs = document.querySelectorAll('input');

              inputs.forEach((input) => {
                      if(input.classList.contains('_error')) {
                              input.classList.remove('_error');
                      }
              })

              popupWindow.classList.remove('active');
              regModal.style.display = 'none';
              codeInput.style.display = 'none';
              $('.js-timeout').text("1:00");
              $('.js-timeout').hide();
              Reset(loginForm);
              Reset(registerForm);

              if(styleHeader.minHeight === '0px') {
                      document.body.style.overflowY = 'scroll';
                      document.body.style.marginRight = '0px';
              }

              if(media.matches) {
                      document.body.style.position = 'relative';
              }

}

function calcScroll() {
        
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
}

//FORM SEND
function validatorForm(form, formReq, filePhp) {

    const contactForm = document.getElementById(form);
    const contactReq = document.querySelectorAll(formReq);
    const regRoad = document.querySelectorAll('.popup__reg-content');

    if(contactForm!== null) contactForm.addEventListener('submit', formSend);

    async function formSend(e) {
            e.preventDefault();

            if(contactForm.id !== 'contact-form') {
                regRoad[0].style.display = 'none';
                regRoad[1].style.display = 'block'; 
            } 

            let formData = new FormData(contactForm);
            
                    contactForm.classList.add('_sending');

                    let response = await fetch(filePhp, {
                            method: 'POST',
                            body: formData,
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': token
                        })
                    });

                    if(response.ok) {
                            let result = await response.json();
                            console.log(result.message);
                            contactForm.classList.remove('_sending');
                            contactForm.classList.add('active');
                            Reset(contactForm);
                    } else {                       
                            alert('Ошибка');
                            contactForm.classList.remove('_sending');
                    }



    }


}

function Reset(form) {
        form.reset();
}

// Register Function
function register(formID, inputsReqClass) {

    const form = document.getElementById(formID),
          inputs = document.querySelectorAll(inputsReqClass);

    const btns = document.querySelectorAll('.register');
    const sendCodeButton = btns[0];
    const registerButton = btns[1];

    if(form !== null) form.addEventListener('submit', formSend);

    async function formSend(e) {
            e.preventDefault();
        
                let dataForm = new FormData();
                dataForm.set('register-mail', inputs[0].value);

                let response = await fetch('sendCode.php', {
                        method: 'POST',
                        body: dataForm,
                        headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': token
                        })
                });

                if(response.ok) {
                        let result = await response.json();
                        inputs[1].style.display = 'block';
                        sendCodeButton.style.display = 'none';
                        registerButton.style.display = 'block';       
                        $('.js-timeout').show();
                        $('.js-timeout').text("1:00");
                        countdown();
                        console.log(result.message);
                } else {                       
                        alert('Ошибка');
                }

    }
}

function addTimer(btnID) {
        const btn = document.getElementById(btnID);
        if(btn !== null) {
                btn.addEventListener('click', () => {
                        $('.timer').hide();   
                        $('.js-timeout').show();
                        $('.js-timeout').text("1:00");
                        countdown();
                });
        }

}

var interval;

function countdown() {
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('.js-timeout').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) {
        return;
      } 
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('.js-timeout').html(minutes + ':' + seconds);

      if (minutes == 0 && seconds == 0) {
        $('.js-timeout').hide();
        $('.timer').show();   
        clearInterval(interval);
      } 
  }, 1000);

}