// if ready
$(document).ready(function () {
  // 版頭動畫
  ani();
})

let posture = '';
// 判斷rwd尺寸爹斯
if ($(window).width() >= 768) {
  posture = 'click';
} else {
  posture = 'touchstart';
}

// 分數
var numb = 0;
var toos = document.getElementById('too');
// 計時器 
// 預設時間
var times = 15;
var timeMain = document.getElementById('timeMain');

// 按下開始遊戲
$('#start').on('click', function (e) {
  e.preventDefault();
  // 遊戲開始點擊後的動畫
  startAnt();

  // 設定延遲，不然計時器會直接開始
  setTimeout(() => {
    $('.page1').css('display', 'none')
    $('.page2').css('display', 'block')
    gsap.from('.page2_top', { duration: 0.6, y: -300 })
    gsap.from('.page2_btn', { duration: 0.6, y: 300, onComplete: function () { $('.page2_btn').attr('style', '') } })
    // 開始計時跟掉落物
    startGame();
  }, 1000)






})
$('.gogoAgain').on('click' , function(e){
  e.preventDefault();
  $('.succes , .lose').css('display','none');
  numb = numb * 0;
  toos.innerHTML = numb;
  times = 15;
  startGame();
})

// 時間、開始計時器、開始掉落紅包跟炸彈
function startGame() {
  // 啟動紅包炸彈掉落
  var step = setInterval(downEl, 500);
  // 啟動計時器
  var timeOver = setInterval(time, 1000);
  // 計時器
  function time() {
    times = times - 1;
    timeMain.innerText = times;
    // console.log(times);

    // 停止計時跟掉落＋判斷分數
    if (times == 0) {
      clearInterval(step)
      clearInterval(timeOver)
      setTimeout(() => {
        // 成功
        if (numb >= 1000) {
          $('.succes').css('display', 'flex');
        }
        // 失敗
        if (numb <= 999) {
          $('.lose').css('display', 'flex');
        }
      }, 3000)

    }


  }
}

// 紅包 炸彈掉落 觸碰移除 計分
function downEl() {
  var m = 25;
  var n = -25;
  // 等於取出0-50以下的亂數 再扣-25 
  // 範圍會是在 -25 ~ 25
  var rotateNum = Math.floor(Math.random() * (m - n + 1) + n);
  // 螢幕寬度
  var allwidth = $('.game').width();
  // 紅包
  // var envelope = $('<div class="envelope_main"><span>+100</span></div>');
  var envelll = $('<div class="envelope_box"></div>');
  $(envelll).css('transform', 'rotate(' + rotateNum + 'deg)');

  // 炸彈
  var bomb = $('<div class="bomb_box"><img class="bomb" src="img/bomb.png" alt=""><span>-50</span></div>');
  // 紅包點擊觸發事件
  $(envelll).on(posture, function (e) {
    // 加分
    too(100, 0);

    var ccx_top = $(envelll).position().top;
    var ccx_left = $(envelll).position().left;
    var ccx_main_left = ccx_left + 50;
    var spa = $('<span>+100</span>');
    $('.envelope_main').append(spa);
    $(spa).css({ 'top': '' + ccx_top + 'px', 'left': '' + ccx_main_left + 'px' })
    $(spa).fadeOut(500);
    gsap.to(spa, { duration: 1, y: -20, opacity: 0 })



    $(envelll).css({ 'pointer-events': 'none' });
    var enve = $(envelll).offset();
    console.log(enve);
    // $(envelope).append('<span>+100</span>')
    $(envelll).addClass('open');

    $(envelll).fadeOut(300);
    setTimeout(() => {
      envelll.remove();
    }, 300)

  })
  // 炸彈點擊觸發事件
  $(bomb).on(posture, function (e) {
    // 扣分
    too(0, 50);
    // 點擊炸彈螢幕晃動
    gsap.to('.page2', { duration: 0.05, x: -5, repeat: 1, yoyo: true })
    $(bomb).css({ 'pointer-events': 'none' });
    $(bomb).addClass('open');
    $(bomb).fadeOut(300);
    setTimeout(() => {
      bomb.remove();
    }, 300)
    // bomb.remove();
  })

  // 判斷數字去選擇出現的紅包或炸彈
  var all = Math.floor(Math.random() * 10);
  if (all < 3) {
    $('.envelope_main').append(bomb);
  } else {
    $('.envelope_main').append(envelll);
  }

  // x軸起始位置是在螢幕寬度的0.9內
  var SizeWidth = Math.floor(Math.random() * allwidth * 0.9);
  // duration的亂數
  var durationNum = Math.floor(Math.random() * 10);

  if (durationNum <= 3) {
    durationNum = durationNum + 2

  }
  if (durationNum <= 2) {
    durationNum = durationNum + 2
  }

  // 剩下5秒 加速
  if (times <= 5) {
    durationNum = 3;
  }
  // set不可針對class使用 不然所有left都會一樣
  // 紅包
  gsap.set(envelll, { left: SizeWidth, bottom: '100%' })
  gsap.to(envelll, {
    duration: durationNum, bottom: '0%', onComplete: function () {
      envelll.remove();
    }
  })

  // 炸彈
  gsap.set(bomb, { left: SizeWidth, bottom: '100%' })
  gsap.to(bomb, {
    duration: durationNum, bottom: '0%', onComplete: function () {
      bomb.remove();
    }
  })

}


// 計算分數
function too(x, y) {
  // x加分 y扣分

  // 加分
  numb = numb + x;
  // 扣分
  numb = numb - y;
  toos.innerText = numb
}
// 版頭動畫
function ani() {
  // boxman
  const t3 = gsap.timeline({});
  t3.to('.boxman', { duration: 0.001, y: '-10%', backgroundPosition: '100% 0' })
    .to('.boxman', { duration: 0.001, y: '-7%', backgroundPosition: '0% 0', scale: 0.7, delay: 1 })
    .to('.boxman', { duration: 0.001, y: '-4%', backgroundPosition: '100% 0', scale: 0.9, delay: 1 })
    .to('.boxman', { duration: 0.001, y: '-1%', backgroundPosition: '0% 0', scale: 1, delay: 1 })
    .to('.boxman', {
      duration: 1.2,
      backgroundPositionX: '100%',
      repeat: -1,
      ease: 'steps(1)',
    });


  // 煙火
  $('.fire').each(function (index, item) {
    
    let fireDelay = Math.floor(Math.random() * index);
    
   
    const t4 = gsap.timeline({ delay: fireDelay, repeat: -1 })
    t4.to(item, { duration: 2, scale: 1, opacity: 1 })
      .to(item, { duration:1, y: 20 }, 0.4)
      .to(item, { opacity: 0 })
  })


  // 汪汪
  gsap.to('.dog1', { duration: 0.8, scale: 1, rotate: 360, ease: 'bounce.out', delay: 1 })
  gsap.from('.dog2', { duration: 2, x: -200 })



}
// 按下開始後動畫
function startAnt() {
  // $('.dog1').fadeOut(500);
  gsap.to('.dog1', { duration: 0.5, opacity: 0 })
  gsap.to('.dog2', {
    duration: 0.5, x: '600%', onComplete: function () {
      $('.dog2').css('opacity', '0');
    }
  })
  $('.game_btn').fadeOut(500);
  // gsap.to('.footer', { duration: 0.5, y: '300%' })

}



//阻止默認的處理方式(阻止下拉滑動的效果)
document.body.addEventListener(
  'touchmove',
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
