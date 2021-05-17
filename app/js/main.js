window.addEventListener('DOMContentLoaded', ()=>{

        accrodionMenu();
        programmMenu();
        popup();

});

$(function(){

        const media = window.matchMedia('(max-width: 768px)');

        $(window).on('scroll', function(){
                
                if($(window).scrollTop()) {
                        $('.header__top').addClass('fixed'); 
                        $('.header__content').addClass('active');
                } else {
                        $('.header__top').removeClass('fixed');
                        $('.header__content').removeClass('active');
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

// Popup
function popup() {

        const media = window.matchMedia('(max-width: 769px)');

        const popup = document.querySelector('.overlay__popup');
        const popupBtn = document.getElementById('popup-Btn');
        const html = document.querySelector('html');
        const scroll = calcScroll();

        popupBtn.addEventListener('click', ()=>{

                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;

                if(media.matches) {
                        document.body.style.position = 'fixed';
                }
                
        });

        popup.addEventListener('click', (e) =>{
                if(e.target === popup) {
                        popup.classList.remove('active');
                        document.body.style.overflow = 'scroll';
                        document.body.style.marginRight = '0px';

                        if(media.matches) {
                                document.body.style.position = 'relative';
                        }
                }
        })
     
      
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
