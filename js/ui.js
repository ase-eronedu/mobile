
// gnb 메뉴
function gnbMenu(){
  let wrapstyle = $('.wrap').attr('style');

  // open
  $(document).on('click', '.btn-gnb-menu', function(){
      $('body, html').scrollTop(0);
      $('body, .wrap').css('overflow', 'hidden');
      $('.wrap').css('position', 'relative');
      $('.gnb-menu-wrap').show();
      $('.gnb-menu-wrap .menu-body').scrollTop(0);
      $('.gnb-menu-wrap').stop().animate({
        left: "0",
      }, 250);
    });  
  // close
  $('.gnb-menu-wrap .btn-close').on('click', function(){
      $('.gnb-menu-wrap').stop().animate({
        left: "-100%",
      }, 250, function() {
        setTimeout(function(){
          $('.gnb-menu-wrap').hide();
          $('body, .wrap').css('overflow', '');
          $('.wrap').attr('style', wrapstyle);
        }, 100)
      });
  
    });  
}


function mainSlide(){
  if($('.main-slider .swiper-slide').length <= 1){
    $('.main-slider .swiper-menu-wrap').remove();
    return;
  }
  let mainswiper = new Swiper('.main-slider', {
      loop: true,
      autoplay:{
        dealy: 300,
        disableOnInteraction: false,
      },
      speed:800,
      slidesPerView: 1,
      navigation: {
        nextEl: ".main-slider .swiper-button-next",
        prevEl: ".main-slider .swiper-button-prev",
      },
      pagination: {
        el: ".main-slider .swiper-pagination",
        type: "fraction",
      }		
  });

  $('.main-slider .stop-play .stop').on('click', function(){
    $(this).hide();
    $(this).next().show();
    mainswiper.autoplay.stop();
  });
  $('.main-slider .stop-play .play').on('click', function(){
    $(this).hide();
    $(this).prev().show();
    mainswiper.autoplay.start();
  });
}


function mainLectureSlide(){
  let list = [];
  $('.main-lecture-list-wrap').each(function(i){
      $(this).addClass('main-lecture-list-wrap'+i);
      list.push('main-lecture-list-wrap'+i);
  });    
  for(let i= 0; i<list.length;i++){    
    const lectureSlider = new Swiper('.'+list[i]+' .main-lecture-list', {
      speed:550,
      slidesPerView: 'auto',
      spaceBetween:10,
    });
  }
}  


function mainlectureSlide(){
  if($('.main-lecture-list').length <=0) return;
    let swiper = new Swiper('.main-lecture-list', {
        speed :800,
        slidesPerView: 'auto'
    });   
}  

function basicSlide(){
  if($('.basic-slider').length <=0) return;
    let list = [];
    $('.basic-slider').each(function(i){
        if($(this).find('.swiper-slide').length <= 1) return;
        $(this).addClass('basic-slider'+i);
        list.push('basic-slider'+i);
    });

    for(let i= 0; i<list.length;i++){
      let pagination = $('.'+list[i]).hasClass('fraction') ? {pagination: {
            el: '.'+list[i] +" .swiper-fraction",
            type: "fraction",
          }}
          : {pagination: {
          el: '.'+list[i] +" .swiper-pagination",
          clickable: true,
        }}
              
        let swiper = new Swiper('.'+list[i], {
            loop: true,
            autoplay:{
              dealy: 300
            },
            speed :800,
            slidesPerView: $('.'+list[i]).hasClass('auto') ? 'auto' : 1,
            ...pagination,
        });   
    }  
}  


function reviewSlide(){
  const slideNum = $('.main-review-list .swiper-slide').length;
  if(slideNum <= 3) return;
  if(slideNum >= 4 && slideNum <= 8){
    $('.main-review-list .swiper-wrapper').append($('.main-review-list .swiper-wrapper').clone().html());
  }
  const reviewSlider = new Swiper('.main-review-list', {
    loop: true,
    // autoplay:{
    //   dealy: 300
    // },
    speed:800,
    slidesPerView: 1,
    navigation: {
      nextEl: ".main-review-list-wrap .swiper-button-next",
      prevEl: ".main-review-list-wrap .swiper-button-prev",
    }, 
  });
}  


function lectureBanner() {
  const $wrap = $('.main-lecture-list');
  const $list = $('.main-lecture-list ul');
  let wrapWidth = $wrap.width();
  let listWidth = $list.width();
  const speed = 92; //1초에 몇픽셀 이동하는지 설정

  //리스트 복제
  if($list.find('li').length >= 3 ){
    let $clone = $list.clone();
    $wrap.addClass('on');
    $wrap.append($clone);
    flowBannerAct()

    //배너 실행 함수
    function flowBannerAct() {
        //복제 후 배너에 추가
        if (listWidth < wrapWidth) {
            const listCount = Math.ceil(wrapWidth * 2 / listWidth);
            for (let i = 2; i < listCount; i++) {
                $clone = $clone.clone();
                $wrap.append($clone);
            }
        }
        $wrap.find('ul').css({
            'animation': `${listWidth / speed}s linear infinite flowRolling`
        });
    }
  }

  $wrap.on('mouseenter', function () {
      $wrap.find('ul').css('animation-play-state', 'paused');
  });
  $wrap.on('mouseleave', function () {
      $wrap.find('ul').css('animation-play-state', 'running');
  });
}  


function upani(){
  if($('.merit-advantages-list li').length <= 0) return; 
  let dir = true
  let scrollPos = 0
  $(window).scroll(function(){
    let scTop = $(window).scrollTop();  
    $('.merit-advantages-list li').each(function(){
          let top = $(this).get(0).getBoundingClientRect();
          dir = scrollPos - scTop > 0
  
          let pos =  $(window).height() - $(window).height() / 4;    
  
          if(top.top < pos) {
            $(this).find('[data-ani]').each(function(){
              let $this = $(this);
              let delay =$this.data('delay')? $this.data('delay') : 0;              
              setTimeout(function(){
                $this.addClass('on');
              }, delay);
            });
          }
     })
     scrollPos = scTop;
  });
  
}

function tabEvt(){
  let tabs = [];
  $('[data-tab-id]').on('click', function(){
    let tabid = $(this).data('tab-id');
    tabs = [];
    tabs.push(tabid);

    $(window).scrollTop(0);

    $(this).parents('li').addClass('on');
    $(this).parents('li').siblings().find('[data-tab-id]').each(function(){
      $(this).parents('li').removeClass('on');
      tabs.push($(this).data('tab-id'));
    });

    tabs.forEach(function(v){
      $('#'+v).hide();
    });
    $('#'+tabid).show();
  })
}


function tabScrollEvt(){
  if($('[data-scroll-id]').length <= 0) return;
  let click = false;
  $('[data-scroll-id]').on('click', function(e){
    e.preventDefault()
		click = true
		setTimeout(function(){
			click = false
		}, 500);

		let h = $('.header').height() + $('.tab-type1').height() + 20
		let id = $(this).data('scroll-id');

		if($(this).parents('li').length > 0){
			$(this).parents('li').siblings().removeClass('on');
			$(this).parents('li').addClass('on');
		}else{
			$('[data-evt="tab-btns"] a').removeClass('on');
			$(this).addClass('on');
		}

		setTimeout(function(h){
			if($('#'+id).length <= 0 ) return;
      $('html, body').animate({scrollTop:$('#'+id).offset().top - h}, 300);
		},100, h);
  });

  $(window).on('scroll', function(){
		let sct  = $(window).scrollTop()    
    let $tab = $('[data-scroll-id]').parents('[class*=tab-type]');

    if(click) return;
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			return;
		}

		$('[data-scroll-id]').each(function(){
        let h = $('.header').height() 
        let id = $(this).data('scroll-id');

			if($('#'+id).length <= 0 ) return
			let t = $('#'+id).offset().top - h
				if(sct > t){
					$('[data-scroll-id]').parents('li').removeClass('on')
						$(this).parents('li').addClass('on');
				}
		})

	});  
}

function bottomArea(){
  if($('.bottom-area-wrap').length <= 0) return;
  function f(){
    $('.bottom-area-wrap').height($('.bottom-area').outerHeight())
    let obj = $('.bottom-area');
    let objTop = $('.bottom-area-wrap').offset().top + $('.bottom-area-wrap').height(); 
    let sc = $(window).scrollTop() + $(window).height();
    let btnBtmPos = $(document).innerHeight() - (objTop + obj.height())
    if(sc >= objTop){
      $('.bottom-area-wrap').removeClass('fixed');
    }else{
      $('.bottom-area-wrap').addClass('fixed');
    }
  }
  f();

  $(window).on('scroll resize', function(){
    f();
  });
};

function countInput(obj){  
  if($(obj).length <= 0) return;
  $(obj).each(function(){
    let $obj = $(this);
    let $up = $(this).find('.up');
    let $down = $(this).find('.down');
    let $input =  $obj.find('.num');    
    let minCnt = $obj.data('min') != undefined ? $obj.data('min') : 0;
    let maxCnt = $obj.data('max') != undefined ? $obj.data('max') : 1000;
    let cntInputNum =  $obj.find('.num').val();
    let inpval = parseInt($obj.find('input').val());

    let countChange = function(v){
      let val = parseInt(v);

      if(val >= maxCnt ){
        $up.attr('disabled', 'disabled');
        $down.removeAttr('disabled');
      }else if (val <= minCnt) {
        $down.attr('disabled', 'disabled');
        $up.removeAttr('disabled');
      }else{
        $down.removeAttr('disabled');
        $up.removeAttr('disabled');
      }

      if(val > maxCnt) val = maxCnt
      else if(val < minCnt) val = minCnt
      else if(!val) val = 0

      inpval = val;
      $($input).val(val);

      if(val == 1) $obj.addClass('one');
      else $obj.removeClass('one');
    }

    //초기화
    $obj.find('button').each(function(){
      if($(this).hasClass('down') && cntInputNum <= minCnt) $(this).attr('disabled', 'disabled');
      else if($(this).hasClass('up') && cntInputNum >= maxCnt)  $(this).attr('disabled', 'disabled');
    });
    $obj.find('button').off('click.count');
    $obj.find('button').on('click.count', function(e){
      e.stopPropagation();      
      inpval = parseInt($obj.find('input').val());
       if($(this).hasClass('up')) countChange(inpval + 1);
       if($(this).hasClass('down')) countChange(inpval - 1);
    });


    $obj.find('input').on('change', function(){
      countChange($(this).val())
    });
  });
}

// input 포커스
function inputFocus(input){
  if($(input).length <=0 ) return;
  $(input).each(function(input){
    let $inpwrap= $(this),
      $inp= $inpwrap.find('input, textarea');

      if($inp.val() != '') $inpwrap.addClass('has-value');

      $inp.on('focus', function(){
        $inpwrap.addClass('focus');
      });
      $inp.on('focusout', function(){
        $inpwrap.removeClass('focus');
      });

  });
}

function inputDel(){
	if($('.input .inp').length <= 0) return;
	function f($self){
		let $input = $self.find('input');
		let $del = $('<button type="button" style="display:none" class="btn-del"></button>');
		$self.append($del);

		if($input.val()) $del.show();
		$input.on('keyup', function(){
			if($input.val().length > 0) $del.show()
			else $del.hide()
		});
		$del.on('click', function(){
			$input.val('');
			$del.hide();
		});
	}
	$('.input .inp').each(function(){
		f($(this));
	})
}

function maxLengthChk(object){
  $(object).on('input', function(){
    if (this.value.length > this.maxLength){
      this.value = this.value.slice(0, this.maxLength);
    }
  })
}

function fileAdd(wrap, tit){
  let $wrap = $(wrap);
  
  create();
  numbering();
  function create(){
    let html =`<div class="label">${tit ? tit : '파일첨부'} <span class="num"></span></div>
            <div class="form">
              <div class="input-file">
                <div class="trigger">
                  <div class="input">
                     <input type="text" class="path">
                   </div>
                 <input type="file" class="real">
                </div>
                <div class="btns">
                  <button type="button" class="btn btn-add">파일첨부</button>
                  <button type="button" class="btn btn-del">파일삭제</button>
                </div>
              </div>
            </div>  `;

      let $fileset = $(html);
      $wrap.append($fileset);

      $fileset.find('input[type=file]').on('change', function(){
        let v = $(this).val();
        $fileset.find('input[type=text]').val(v.split('fakepath\\')[1]);
        if(v && checkInput() === 0) {
          fileAdd(wrap);numbering();
        }
      });
      $fileset.find('.btn-add').on('click', function(){
        $fileset.find('input[type=file]').click();
      });
      //del
      $fileset.find('.btn-del').on('click', function(){
        if($wrap.find('.btn-del').length <= 1) {
          $fileset.find('input[type=text]').val('');
        }else if($fileset.next().length <= 0){
          return;
        }else{
          $fileset.find('input[type=text]').val('');
          $fileset.remove();
          numbering();
        }
      });
  }

  
  function checkInput(){
    let empty = $wrap.find('.path').filter(function() {
      return $(this).val().trim() === '';
    }).length;
    return empty;
  }

  function numbering(){
    $wrap.find('.num').each(function(i){
      $(this).text(i+1)
    })
    $wrap.find('[type=file]').each(function(i){
      $(this).attr('name', 'file'+i+1)
    })
  }
}


function toggleList(){
  let $pannels = $('[data-evt="toggle-list"] .toggle-list > li > ul');
  let $lists = $('[data-evt="toggle-list"] .toggle-list > li');
  let $tog = $('[data-evt="toggle-list"] .btn-tog');
  $tog.on('click', function(){
    if($tog.hasClass('on')){
      $tog.removeClass('on');
      $tog.find('span').text('모두열기');
      $pannels.slideUp();
      $lists.removeClass('on');      
    }else{
      $tog.addClass('on');
      $tog.find('span').text('모두접기');
      $pannels.slideDown();
      $lists.addClass('on');
    }
  });
  $('[data-evt="toggle-list"] .toggle-list li > .btn').on('click', function(){
    let $pannel = $(this).next();
    if($pannel.is(':hidden')){
      $(this).parents('li').addClass('on');
      $pannel.slideDown();
    }else{
      $(this).parents('li').removeClass('on');
      $pannel.slideUp();
    }

    let $listsOn = $('[data-evt="toggle-list"] .toggle-list > li.on');
    if($listsOn.length == $lists.length){
      $tog.addClass('on');
      $tog.find('span').text('모두접기');      
    }else if(0 == $listsOn.length){
      $tog.removeClass('on');
      $tog.find('span').text('모두열기');
    }
  });
}


function datepicker(){
  if($(".datepicker").length <= 0) return;
   $(".datepicker").datepicker({
     dateFormat:'yy-dd-mm',
   });
   $.datepicker.setDefaults({
     dateFormat: 'yymmdd',
     prevText: '이전 달',
     nextText: '다음 달',
     monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     dayNames: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
     showMonthAfterYear: true,
     yearSuffix: '년'
   });
}


function layerMenu(){
  $(document).on('click', '.layer-wrap button, .layer-wrap a', function(e){
    let $wrap = $(this).parents('.layer-wrap');
    let $layer = $(this).siblings('.menu-layer');
    let $btn = $(this);
		let top =  $wrap.offset().top + $btn.outerHeight();
		let l =  $wrap.get(0).getBoundingClientRect().left;
		let t =  $wrap.get(0).getBoundingClientRect().top + $btn.outerHeight() + 5;				

    if($layer.is(':hidden')){

      $layer.show();
      $btn.addClass('on');

      $layer.find('a, button').on('click', function(){
        $layer.hide();
        $btn.removeClass('on');
        $('body').off('click.temp');
      });

      setTimeout(function(){
        $('body').off('click.temp');
        $('body').on('click.temp', function(e){
          if($btn.get(0) == e.target || $(e.target) == $layer || $(e.target).parents() ==$layer) return;
          if(!$layer.has(e.target).length){
            $layer.hide();
            $btn.removeClass('on');
            $('body').off('click.temp');
          }
        });
      });

			$(this).parents('*').on('scroll', function(){
				$layer.hide();
				$btn.removeClass('on');
			});
    }else{
      $layer.hide();
      $btn.removeClass('on');
    }

		$(window).on('scroll resize', function(){
			$('body').off('click.temp');
			$layer.hide();
			$btn.removeClass('on');
		});
  });
  
}    

/* popup */
function popClose(id){
	$(id).fadeOut(300);
	$('body').css('overflow','');
} 

function popOpen(id, callback){
	$(id).fadeIn(300);
	$('body').css('overflow','hidden');
  $(id).find('input[type=text], input[type=number], textarea').val('');
	if(callback !=undefined ) callback();

	$(id).find('.close').on('click', function(){
		popClose(id);
	})
}



//얼럿창
function alertClose(id){
  $(id).fadeOut(300, ()=>{
    $(id).remove();
  });
  $('body').css('overflow','');
}

function alertOpen(text, type, callback){
  const alertHtml = '<div class="alert-popup">' +
      '<div class="dim"></div>' +
      '<div class="popup">' +
        '<div class="pop-body">' +
          '<div class="alert-txt">'+ text +'</div>' +
        '</div>' +
        '<div class="pop-footer">' +
          '<div class="btn-wrap"></div>' +
        '</div>' +        
      '</div>';

  const $alert = $(alertHtml);

  $('.wrap').append($alert);

  function btnCheck(item){
    if(item.includes('확인') || item.includes('취소')){
      if(item.length === 1 && item[0] == '확인')  return '<button class="btn st2">확인</button>'
      else if(item.length === 1 && item[0] == '취소') return '<button class="btn">취소</button>'
      else return '<button class="btn">취소</button><button class="btn st2">확인</button>'
    }else{
      let html = ''
      for(let i=0;i<item.length;i++){
        html += '<button class="btn st'+(i+1)+'">'+item[i]+'</button>'
      }
      return html;
    }
  }
  if(!type){
    $alert.find('.btn-wrap').append(btnCheck(''));
  }else{
    console.log(type);
    $alert.find('.btn-wrap').append(btnCheck(type))
  }
  $alert.show();
  $alert.find('.btn').on('click', function(){
    if(callback) callback(type[$(this).index()]);
    alertClose($alert);
  });
}  


//loading
function loading(){
  const loadingHtml = `<div class="loading-bar">
		<div class="three-bounce">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`

  const $loading = $(loadingHtml);  
  $('.wrap').append($loading);  
  $('body, html').css('overflow', 'hidden');
}
function loadingClose(){
  $('.loading-bar').remove();  
  $('body, html').css('overflow', '');
}


$(function(){
  gnbMenu();
  basicSlide();
  tabEvt();
  tabScrollEvt();
  bottomArea();
  countInput('[data-evt*="inp-number"]');
  inputDel();
  maxLengthChk('[type=number][maxlength]');
  inputFocus('.input');
  inputFocus('.textarea');
  toggleList();
  datepicker();
  layerMenu();
  upani();
});