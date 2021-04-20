$(function(){


        
        $('.about__item').on('click', '.about__item-btn', function(){


                if($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $('.about__item-btn').removeClass('active');
                    // $('.about__item-info').addClass('active');
                    $(this).addClass('active');
                }

            
        })  
  
});