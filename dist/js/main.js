window.onload = function() {
        const preloader = document.querySelector('.loader');
        preloader.style.top = '-100%';
        setTimeout(() => {
                document.body.style.overflow = 'auto';
        }, 1200);
}

window.addEventListener('DOMContentLoaded', ()=>{

        mobileMenu('.menu-hamburger', '.menu', '.menu__link');

        postContactFormRequests('contact-form', '.form-control', '.form-error', config.endPoints['contact-send']);
        postLoginFormRequests('login-form', '.form-control', '.form-error' , config.endPoints['auth-login']);
        postRegisterEmailRequests('register-form', '.form-control', '.form-error', config.endPoints['auth-register']);
        postRegisterFormRequests('register-form', '.form-control', '.form-error', config.endPoints['auth-login']);

        accordionAboutMenu('.accordion__item');
        accordionProgrammMenu('.programm__menu-item','.programm__menu-btn', 913);

        modalStartedOpener('.overlay__popup','popup-btn', '.popup__close','.popup__login', 769);
        modalRegisterOpener('register-btn','.popup__reg', '.popup__login');

        addTimer('timer');

});

let token = 0;
if(document.querySelector('meta[name="csrf-token"]') !== null) {
        token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

/* ------------------------------------------------------------------------------------------------------------------ */
/* jQueary Main Function */
$(function(){

        const media = window.matchMedia('(max-width: 768px)');
        
        function scrollFixed() {
                $(window).on('scroll', function(){
                
                        if($(window).scrollTop()) {
                                if(media.matches) {
                                    $('.mobile-menu.fix').addClass('fixed');  
                                    $('.empty').addClass('active');  
                                } else {
                                        $('.header__top.fix').addClass('fixed'); 
                                        $('.fullback.fix').addClass('active');
                                        $('.article-offer.fix').addClass('active');
                                }
                        } else {
                                $('.empty').removeClass('active');
                                $('.mobile-menu.fix').removeClass('fixed');  
                                $('.header__top.fix').removeClass('fixed');
                                $('.fullback.fix').removeClass('active');
                                $('.article-offer.fix').removeClass('active');
                        }
        
                        $('a[href*="#home"]').on('click', function() {
                                $('.empty').removeClass('active');
                                $('.mobile-menu.fix').removeClass('fixed');  
                                $('.header__top.fix').removeClass('fixed');
                                $('.fullback.fix').removeClass('active');
                                $('.article-offer.fix').removeClass('active');     
                        })
                });
        }

        function slickSlider() {
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
        }

        scrollFixed();
        slickSlider();
        
});
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* Adative functions */
function mobileMenu(buttonClass, menuClass, menuLinksClass) {

        const btn = document.querySelector(buttonClass),
              menu = document.querySelector(menuClass),
              links = document.querySelectorAll(menuLinksClass);

        let isOpen = true;

        btn.addEventListener('click', (e) => {
                e.preventDefault();
                const preloader = document.querySelector('.loader');

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
        });

        links.forEach((link) => {
                link.addEventListener('click', () => {
                        btn.classList.remove('active');
                        menu.classList.remove('active');
                        document.querySelector('body').style.overflowY = 'scroll';
                        isOpen = true;  
                });
        });
}
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* POST Request functions*/
function postContactFormRequests(formID, formReq, errorLabelsClass ,url) {

    const contactForm = document.getElementById(formID),
          contactReq = document.querySelectorAll(formReq),
          label = document.querySelectorAll(errorLabelsClass),
          regRoad = document.querySelectorAll('.popup__reg-content'),
          check_group = document.querySelector('.form__gr-check');

    let checkDiv = createNewDiv('form-error checkbox-error');
    checkDiv.textContent = 'Необходимо заполнить пустое поле';

    if(contactForm!== null) {
        check_group.children[0].append(checkDiv);
        contactForm.addEventListener('submit', formSend);
    } 

    async function formSend(e) {
        e.preventDefault();
        const submitBtn = contactForm.children[5].children[0];
        submitBtn.disabled = true;

        const checkError = document.querySelector('.checkbox-error');
        checkError.style.display = 'none';

        clearErrors(contactReq, label);

        if(contactForm.id !== 'contact-form') {
                regRoad[0].style.display = 'none';
                regRoad[1].style.display = 'block'; 
        } 

        let formData = new FormData(contactForm); 
        contactForm.classList.add('_sending');

                let response = await fetch(url, {
                        credentials: 'same-origin',
                        method: 'POST',
                        body: formData,
                        headers: new Headers({
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': token
                        })
                });

                if(response.ok) {

                        contactForm.classList.remove('_sending');
                        contactForm.classList.add('active');
                        Reset(contactForm);
                        submitBtn.disabled = false;
                        location.reload();

                } else {                       
                        let result = await response.json();
                            
                        for(let error in result.errors) {
                                
                                for(let index = 0; index < contactReq.length; index++) {

                                        if(contactReq[index].name === error) {

                                                if(error === 'checkbox') {
                                                        checkError.textContent = result.errors[error];
                                                        checkError.style.display = 'block';

                                                } else {

                                                        contactReq[index].classList.add('._error');
                                                        label[index].textContent = result.errors[error];
                                                        label[index].style.display = 'block';
                                                }  
                                        }
                                }
                        }
                        submitBtn.disabled = false;
                        contactForm.classList.remove('_sending');
                }
        }
}

function postLoginFormRequests(formID, reqsInputs, errorLabelsClass, url) {

        const form = document.getElementById(formID),
              inputs = document.querySelectorAll(reqsInputs),
              label = document.querySelectorAll(errorLabelsClass),
              submitBtn = form.children[3];

        if(form !== null) form.addEventListener('submit', formSend);

        async function formSend(e) {
                e.preventDefault();
                submitBtn.disabled = true;

                clearErrors(inputs, label);

                let dataForm = new FormData();
                dataForm.set('email', inputs[0].value);
                dataForm.set('password', inputs[1].value);
                form.classList.add("_sending");
                       
                        let response = await fetch(url, {
                                credentials: 'same-origin',
                                method: 'POST',
                                body: dataForm,
                                headers: new Headers({
                                        'Accept': 'application/json',
                                        'X-CSRF-TOKEN': token
                                })
                        });
    
                        if(response.ok) {

                                form.classList.remove("_sending");
                                Reset(dataForm);
                                submitBtn.disabled = false;
                                location.reload();

                        } else {                       
                                let result = await response.json();
                            
                                for(let error in result.errors) {
                                        
                                        for(let index = 0; index < inputs.length; index++) {

                                                if(inputs[0].name === 'login-' + error) {
                                                       
                                                        inputs[0].classList.add('_error');
                                                        label[0].textContent = result.errors[error];
                                                        label[0].style.display = 'block';
                                                
                                                } 

                                                if(inputs[1].name === 'login-' + error) {
                                                        inputs[1].classList.add('_error');
                                                        label[1].textContent = result.errors[error];
                                                        label[1].style.display = 'block';
                                                }
                                        }
                                }
                                submitBtn.disabled = false;
                                form.classList.remove("_sending");
                        }
        }
}

function postRegisterEmailRequests(formID, inputsReqClass, errorLabelsClass ,url) {

    const form = document.getElementById(formID),
          inputs = document.querySelectorAll(inputsReqClass),
          btns = document.querySelectorAll('.register'),
          sendCodeButton = btns[0],
          registerButton = btns[1],
          label = document.querySelectorAll(errorLabelsClass);

    if(form !== null) form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        sendCodeButton.disabled = true;

        clearErrors(inputs, label);
        
                let dataForm = new FormData();
                dataForm.set('email', inputs[2].value);
                form.classList.add('_sending');

                let response = await fetch(url, {
                        credentials: 'same-origin',
                        method: 'POST',
                        body: dataForm,
                        headers: new Headers({
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': token
                        })
                });

                if(response.ok) {

                        form.classList.remove('_sending');

                        inputs[3].style.display = 'block';
                        sendCodeButton.disabled = false;
                        sendCodeButton.style.display = 'none';
                        registerButton.style.display = 'block'; 

                        $('.js-timeout').show();
                        $('.js-timeout').text(config.password_timeout);
                        countdown();

                } else {                       
                        let result = await response.json();

                        for(let error in result.errors) {
                                
                                if(error === 'email') {
                                        inputs[2].classList.add('_error');
                                        label[2].textContent = result.errors[error];
                                        label[2].style.display = 'block';
                                } 
                        }
                        sendCodeButton.disabled = false;
                        form.classList.remove('_sending');      
                }
        }
}

function postRegisterFormRequests(formID, inputsReqClass, errorLabelsClass, url) {

        const form = document.getElementById(formID),
              inputs = document.querySelectorAll(inputsReqClass),
              btns = document.querySelectorAll('.register'),
              sendCodeButton = btns[0],
              registerButton = btns[1],
              label = document.querySelectorAll(errorLabelsClass);

        if(form !== null) {
                registerButton.addEventListener('click', formSend);
        }

        async function formSend(e) {
                e.preventDefault();
                registerButton.disabled = true;

                clearErrors(inputs, label);

                let dataForm = new FormData();
                dataForm.set('email', inputs[2].value);
                dataForm.set('password', inputs[3].value);
                form.classList.add('_sending');

                    let response = await fetch(url, {
                        credentials: 'same-origin',
                        method: 'POST',
                        body: dataForm,
                        headers: new Headers({
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': token
                        })
                    });
    
                    if(response.ok) {

                        form.classList.remove('_sending');

                        inputs[3].style.display = 'none';
                        registerButton.disabled = false;
                        sendCodeButton.style.display = 'block';
                        registerButton.style.display = 'none'; 

                        Reset(form);
                        location.reload();

                    } else {                       
                        let result = await response.json();
                        for(let error in result.errors) {
                                        
                                if(error === 'email') {
                                        inputs[2].classList.add('_error');
                                        label[2].textContent = result.errors[error];
                                        label[2].style.display = 'block';
                                } 
                                if(error === 'password') {
                                        inputs[3].classList.add('_error');
                                        label[3].textContent = result.errors[error];
                                        label[3].style.display = 'block';
                                }
                        }  
                        registerButton.disabled = false;
                        form.classList.remove('_sending');     
                }
        }
}
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* HTML Contents functions */
function createNewDiv(setClass) {

        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', setClass);
        return newDiv;
}

function clearErrors(inputsError, labelError) {

        inputsError.forEach(item => {
                if(item.classList.contains('_error')) item.classList.remove('_error');
        });

        labelError.forEach(item => {
                item.style.display = 'none';
        });
}

function Reset(form) {
        form.reset();
}
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* Accordion functions */
function accordionAboutMenu(itemsClass) {

        const items = document.querySelectorAll(itemsClass);
        let activeNode = null;

        items.forEach((item) => {

                item.addEventListener('click', ()=>{

                        if(!(item.classList.contains('active'))) {

                                activeNode = null;
                                try{
                                        activeNode = document.querySelector('.about__accordion .active');
                                } catch(msg) {}
        
                                item.classList.add('active');

                                if(activeNode) {
                                        activeNode.classList.remove('active');
                                }
                        }
                });
        });
}

function accordionProgrammMenu(itemsClass, buttonsClass, mediaWidth) {

        const items = document.querySelectorAll(itemsClass),
              btn = document.querySelectorAll(buttonsClass),
              media = window.matchMedia(`(max-width: ${mediaWidth}px)`);

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

                                if(activeNode) activeNode.classList.remove('active');
                                if(activeButton) activeButton.classList.remove('up');    
                        }
                })
        }
}
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* Modal functions */
function modalStartedOpener(overlayModalClass, modalBtnClass, modalClsBtnClass, startedModalWindowClass, mediaWidth) {

        const modalWindow = document.querySelector(overlayModalClass),
              modalOpenBtn = document.getElementsByClassName(modalBtnClass),
              modalCloseBtn = document.querySelectorAll(modalClsBtnClass),
              modalStarted = document.querySelector(startedModalWindowClass),
              media = window.matchMedia(`(max-width: ${mediaWidth}px)`);

        const header = document.querySelector('article'),
              styleHeader = getComputedStyle(header),
              scroll = calcScroll();

        if(modalWindow !== null && modalOpenBtn != null) {

                [].forEach.call(modalOpenBtn, (openButton)=>{

                        openButton.addEventListener('click', ()=>{

                                modalWindow.classList.add('active');
                                modalStarted.style.display = 'block';

                                document.body.style.overflowY = 'hidden';
                                document.body.style.marginRight = `${scroll}px`; 
                        });
                }) 
        }

        if(modalCloseBtn != null) {

                modalCloseBtn.forEach((btnItem) => {

                        btnItem.addEventListener('click', ()=>{

                                modalRemover(modalWindow, styleHeader, media);    
                        })
                })
        }
}

function modalRegisterOpener(buttonID, modalClass, loginModalClass) {

        const openBtn = document.getElementById(buttonID),
              registerModal = document.querySelector(modalClass),
              loginModal = document.querySelector(loginModalClass);

        if(openBtn !== null) {
                openBtn.addEventListener('click', () => {
                        loginModal.style.display = 'none';
                        registerModal.style.display= 'block';
                })
        }
}

function modalRemover(overlayModal, styleCalc, mediaWidth) {
        
        const modalWindow = overlayModal,
              styleHeader = styleCalc,
              media = mediaWidth;

        const inputs = document.querySelectorAll('input'),
              labels = document.querySelectorAll('.form-error'),
              modalLogin = modalWindow.children[0].children[1],
              modalRegister = modalWindow.children[1].children[1],
              modalRegisterGroup = document.querySelector('.popup__reg'),
              codeInput = document.querySelector('._code'),
              registerSendButtons = document.querySelectorAll('.register'),
              timer = document.getElementById('timer');

              clearErrors(inputs, labels);
              Reset(modalLogin);
              Reset(modalRegister);

              modalWindow.classList.remove('active');
              modalRegisterGroup.style.display = 'none';
              codeInput.style.display = 'none';
              registerSendButtons[0].style.display = 'block';
              registerSendButtons[1].style.display = 'none';
              timer.display = 'none';

              $('.js-timeout').text(config.password_timeout);
              $('.js-timeout').hide();

              if(styleHeader.minHeight === '0px') {
                      document.body.style.overflowY = 'scroll';
                      document.body.style.marginRight = '0px';
              }

              if(media.matches) document.body.style.position = 'relative';
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
/* ------------------------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------------------------ */
/* Timer functions */
function addTimer(btnID) {
        const btn = document.getElementById(btnID);
        if(btn !== null) {
                btn.addEventListener('click', () => {
                        $('.timer').hide();   
                        $('.js-timeout').show();
                        $('.js-timeout').text(config.password_timeout);
                        countdown();
                });
        }

}

let interval;

function countdown() {
        clearInterval(interval);

        interval = setInterval( function() {

                let timer = $('.js-timeout').html();
                let minutes = 0;

                if(timer > 60) minutes = (timer/60).toFixed(0);

                let seconds = timer;
                seconds -= 1;

                if (minutes < 0) return;
                else if (seconds < 0 && minutes != 0) {

                        minutes -= 1;
                        seconds = 59;
                } else if (seconds < 10 && length.seconds != 2) seconds = seconds;

                $('.js-timeout').html(seconds);

                if (minutes == 0 && seconds == 0) {
                        $('.js-timeout').hide();
                        $('.timer').show();   
                        clearInterval(interval);
                } 

        }, 1000);
}
/* ------------------------------------------------------------------------------------------------------------------ */