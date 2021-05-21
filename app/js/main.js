window.addEventListener('DOMContentLoaded', ()=>{

        accrodionMenu();
        programmMenu();
        modal('.overlay__popup','popup-btn', '.popup__close','.popup__login','reg-btn','.popup__reg', '.popup__reg-content', '.popup__test');

});

$(function(){

        const media = window.matchMedia('(max-width: 768px)');

        $(window).on('scroll', function(){
                
                if($(window).scrollTop()) {
                        $('.header__top.fix').addClass('fixed'); 
                        $('.header__content.fix').addClass('active');
                } else {
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

// Accordion About Menu
function accrodionMenu() {

        let items = document.querySelectorAll('.accordion__item');

        for (let i=0; i<items.length; i++) {
                items[i].addEventListener('click', ()=>{

                        if(items[i].classList.contains('active')) {
                                items[i].classList.remove('active');
                        } else {
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

        if(media.matches) items[0].classList.remove('active');

        for (let i=0; i<btn.length; i++) {
                btn[i].addEventListener('click', ()=>{
                        
                        if(items[i].classList.contains('active')) {
                                if(media.matches) items[i].classList.remove('active');
                        } else {
                                let activeNode = null;
                                try{
                                        activeNode = document.querySelector('.programm__menu .active');
                                } catch(msg) {}

                                if (media.matches) {
                                        items[i].classList.add('active');
                                } else {
                                        setTimeout(()=>{
                                                items[i].classList.add('active');
                                        },800);                
                                }

                                if(activeNode) {
                                        activeNode.classList.remove('active');
                                }
                        }
                })
        }
}

// MODAL 
function modal(popup, button, closeButton, displayModal, regButton, regModal, regGroup, test) {

        const popupWindow = document.querySelector(popup),
              popupBtn = document.getElementsByClassName(button),
              popupCls = document.querySelector(closeButton),
              displayPopup = document.querySelector(displayModal),
              regBtn = document.getElementsByClassName(regButton),
              registerPopup = document.querySelector(regModal),
              regRoad = document.querySelectorAll(regGroup),
              popupTest = document.querySelector(test);

        const header = document.querySelector('article');
        const styleHeader = getComputedStyle(header);
        const scroll = calcScroll();
        const media = window.matchMedia('(max-width: 769px)');

        if(popupBtn != null) {

                [].forEach.call(popupBtn, (btn)=>{

                        btn.addEventListener('click', (but)=>{

                                popupWindow.classList.add('active');
                                displayPopup.style.display = 'block';

                                if(styleHeader.minHeight === '0px') {
                                        document.body.style.overflowY = 'hidden';
                                        document.body.style.marginRight = `${scroll}px`;
                                }
        
                                if(media.matches) {
                                        document.body.style.position = 'fixed';
                                }

                                [].forEach.call(regBtn, (reg)=>{
                                        
                                        reg.addEventListener('click', (e)=>{

                                               switch(e.target) {
                                                 case regBtn[0]:
                                                        displayPopup.style.display = 'none';
                                                        registerPopup.style.display = 'block';
                                                        break;
                                                 case regBtn[1]:
                                                 case regBtn[3]:
                                                        regRoad[0].style.display = 'block';
                                                        regRoad[1].style.display = 'none';
                                                        registerPopup.style.display = 'none';
                                                        // if(btn === popupBtn[0]) {
                                                        //         popupTest.style.display = 'block';
                                                        // } else {
                                                        //         removePopup(popupWindow, styleHeader, media);
                                                        // }
                                                        removePopup(popupWindow, styleHeader, media);
                                                        break;
                                                 case regBtn[2]: 
                                                        regRoad[0].style.display = 'none';
                                                        regRoad[1].style.display = 'block';
                                                        break;                                 
                                               }
                                        })
                                
                                })
                        });
                })
               
        }

        if(popupCls != null) {

                popupCls.addEventListener('click', ()=>{

                        removePopup(popupWindow, styleHeader, media);
                        
                })
        }

}


function removePopup(window, style, mediaMatch) {
        
        const popupWindow = window,
              styleHeader = style,
              media = mediaMatch;

              popupWindow.classList.remove('active');

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


// Register
function register() {

        const regBtn = document.getElementsByClassName('popup__reg-btn');
        const frstPage = document.getElementById('first-page'),
              scndPage = document.getElementById('second-page'),
              reg = document.querySelector('.popup__reg'),
              test = document.querySelector('.popup__test');

        [].forEach.call(regBtn, (button) =>{
                button.addEventListener('click', (e)=>{
                        
                        if(e.target === regBtn[0]) {
                                frstPage.style.display = 'none';
                                scndPage.style.display = 'block';      
                        } else {
                               reg.style.display = 'none';
                               test.style.display = 'block';
                        }       
                      
                })
        })

}