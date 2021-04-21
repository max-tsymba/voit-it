window.addEventListener('DOMContentLoaded', ()=>{

        accrodionMenu();
});

$(function(){
  
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