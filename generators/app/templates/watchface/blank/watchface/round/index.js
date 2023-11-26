let start_time = 0
let rootPath = null
let week_enArray = null
let week_chArray = null
let img_bg = null
let bigNumArr = null
let smallNumArr = null
let bigNumObject = new Array(8)
let smallNumObject = new Array(8)
let flag = true
let milli_value = 0
let second_value = 0
let min_value = 0
let constSecond = 0
let constMin = 0
let secondImg = null
let minPoint = null
let hourPoint = null
let createCount = 0;


const logger = Logger.getLogger('watchface6')

const img = (function(type){
  return (path) => type + '/' + path
})('images')

function range(start, end, step = 1) {
  if (arguments.length === 1) {
    end = start
    start = 0
    step = 1
  }

  const result = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }

  return result
}

WatchFace({
  init_view() {
    rootPath = "images/"
    week_enArray = [
      rootPath + "week_en/1.png",
      rootPath + "week_en/2.png",
      rootPath + "week_en/3.png",
      rootPath + "week_en/4.png",
      rootPath + "week_en/5.png",
      rootPath + "week_en/6.png",
      rootPath + "week_en/7.png",
    ]
    week_chArray = [
      rootPath + "week_ch/1.png",
      rootPath + "week_ch/2.png",
      rootPath + "week_ch/3.png",
      rootPath + "week_ch/4.png",
      rootPath + "week_ch/5.png",
      rootPath + "week_ch/6.png",
      rootPath + "week_ch/7.png",
    ]

    bigNumArray = range(10).map((v) => {
      return img(`bigNum/${v}.png`)
    })

    smallNumArr = range(10).map((v) => {
      return img(`smallNum/${v}.png`)
    })

    dotImage = img('smallNum/d.png')

    let pointObj = {
      hour_centerX: px(239), //指针旋转中心 对应centerX
      hour_centerY: px(239), //指针旋转中心 对应centerY
      hour_posX: px(32), //指针自身旋转中心 对应positioin中的x
      hour_posY: px(167), //指针自身旋转中心 对应positioin中的yi
      hour_path: img('point/h.png'),

      //分针 秒针同上 只需要把hour替换成minute/second 即可
      minute_centerX: px(238), //指针旋转中心 对应centerX
      minute_centerY: px(238), //指针旋转中心 对应centerY
      minute_posX: px(23), //指针自身旋转中心 对应positioin中的x
      minute_posY: px(230), //指针自身旋转中心 对应positioin中的y
      minute_path: img('point/m.png'),
      //指针路径
      minute_cover_path: img('point/center.png'),
      //指针圆心图片
      minute_cover_y: px(214),
      minute_cover_x: px(214),
    }

    //息屏状态
    var screenType = hmSetting.getScreenType();
    if (screenType == hmSetting.screen_type.AOD) {
      img_bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: px(0),
        y: px(0),
        w: px(480),
        h: px(480),
        color: 0x000000,
      });

    } else {
      img_bg = hmUI.createWidget(hmUI.widget.IMG, {
        x: px(0),
        y: px(0),
        w: px(480),
        h: px(480),
        src: img('bg/bg.png'),
        show_level: hmUI.show_level.ONAL_NORML,
      });
    }

    hourPoint = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(0),
      y: px(0),
      w: px(480),
      h: px(480),
      // pos_x: 148-22,
      // pos_y: 240-71,
      pos_x: px(126),
      pos_y: px(169),
      center_x: px(148),
      center_y: px(238),
      src: img('point/left.png'),
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
    minPoint = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(0),
      y: px(0),
      w: px(480),
      h: px(480),
      // pos_x: 333-23,
      // pos_y: 240-71,
      pos_x: px(310),
      pos_y: px(169),
      center_x: px(333),
      center_y: px(238),
      src: img('point/right.png'),
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL
    });

    for (let i = 0; i < bigNumObject.length; i++) {
      console.log(i + 'uuuuu')
      if (i == 2 || i == 5) {
        bigNumObject[i] = hmUI.createWidget(hmUI.widget.IMG, {
          x: 155 + i * 22,
          y: px(108),
          src: img('bigNum/sp.png'),
          show_level: hmUI.show_level.ONLY_NORMAL
        });
      } else {
        bigNumObject[i] = hmUI.createWidget(hmUI.widget.IMG, {
          x: 150 + i * 22,
          y: px(108),
          src: img('bigNum/0.png'),
          show_level: hmUI.show_level.ONLY_NORMAL
        });
      }
      bigNumObject[i].setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
    }

    for (let j = 0; j < smallNumObject.length; j++) {
      if (j == 2 || j == 5) {
        smallNumObject[j] = hmUI.createWidget(hmUI.widget.IMG, {
          x: 182 + j * 15,
          y: px(158),
          src: img('smallNum/n.png'),
          show_level: hmUI.show_level.ONLY_NORMAL
        });
      } else {
        smallNumObject[j] = hmUI.createWidget(hmUI.widget.IMG, {
          x: 179 + j * 15,
          y: px(158),
          src: img('smallNum/0.png'),
          show_level: hmUI.show_level.ONLY_NORMAL
        });
      }
      smallNumObject[j].setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
    }

    let backBtn = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(150),
      y: px(306),
      src: img('btn/back.png'),
      show_level: hmUI.show_level.ONAL_NORML,
    });
    backBtn.setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
    let green_red_btn = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(250),
      y: px(306),
      src: img('btn/lv.png'),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
    green_red_btn.setProperty(hmUI.prop.VISIBLE, false);

    let week = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: px(155),
      y: px(97),
      week_en: week_enArray,
      week_tc: week_chArray,
      week_sc: week_chArray,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });
    let monthDay = hmUI.createWidget(hmUI.widget.IMG_DATE, {
      month_startX: px(205),
      month_startY: px(149),
      month_unit_sc: img('smallNum/d.png'),
      month_unit_tc: img('smallNum/d.png'),
      month_unit_en: img('smallNum/d.png'),
      month_align: hmUI.align.LEFT,
      month_space: 0,
      month_zero: 1,
      month_follow: 0,
      month_en_array: smallNumArr,
      month_sc_array: smallNumArr,
      month_tc_array: smallNumArr,

      day_align: hmUI.align.LEFT,
      day_space: 0,
      day_zero: 1,
      day_follow: 1,
      day_en_array: smallNumArr,
      day_sc_array: smallNumArr,
      day_tc_array: smallNumArr,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    });

    secondImg = hmUI.createWidget(hmUI.widget.IMG, {
      x: px(180),
      y: px(272),
      w: px(122),
      h: px(122),
      src: img('second/second.png'),
      show_level: hmUI.show_level.ONLY_NORMAL
    });

    let secondPointer = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_centerX: px(240), //指针旋转中心 对应centerX
      second_centerY: px(332), //指针旋转中心 对应centerY
      second_posX: px(22), //指针自身旋转中心 对应positioin中的x
      second_posY: px(71), //指针自身旋转中心 对应positioin中的y
      second_path: img('point/bottom.png'),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
    let timePointer = hmUI.createWidget(hmUI.widget.TIME_POINTER, pointObj);
    let centerSecondPointer = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_centerX: px(240), //指针旋转中心 对应centerX
      second_centerY: px(240), //指针旋转中心 对应centerY
      second_posX: px(19), //指针自身旋转中心 对应positioin中的x
      second_posY: px(263), //指针自身旋转中心 对应positioin中的y
      second_path: img('point/s.png'),
      second_cover_path: img('point/center.png'),
      second_cover_y: px(214),
      second_cover_x: px(214),
    });
    centerSecondPointer.setProperty(hmUI.prop.VISIBLE, false);

    secondImg.addEventListener(hmUI.event.CLICK_UP, (function (info) {
      week.setProperty(hmUI.prop.VISIBLE, false);
      monthDay.setProperty(hmUI.prop.VISIBLE, false);
      secondImg.setProperty(hmUI.prop.VISIBLE, false);
      secondPointer.setProperty(hmUI.prop.VISIBLE, false);
      centerSecondPointer.setProperty(hmUI.prop.VISIBLE, true);
      for (let n = 0; n < 8; n++) {
        bigNumObject[n].setProperty(hmUI.prop.VISIBLE, true); //false隐藏 true显示
        smallNumObject[n].setProperty(hmUI.prop.VISIBLE, true); //false隐藏 true显示  
        if (n == 0 || n == 1 || n == 3 || n == 4 || n == 6 || n == 7) {
          bigNumObject[n].setProperty(hmUI.prop.SRC, img('bigNum/0.png'))
          smallNumObject[n].setProperty(hmUI.prop.SRC, img('smallNum/0.png'))
        }
      }
      milli_value = 0
      second_value = 0
      min_value = 0

      constSecond = 0
      constMin = 0
      backBtn.setProperty(hmUI.prop.VISIBLE, true); //false隐藏 true显示
      green_red_btn.setProperty(hmUI.prop.VISIBLE, true); //false隐藏 true显示 
      flag = true
    }));

    backBtn.addEventListener(hmUI.event.CLICK_UP, (function (info) {
      timer.stopTimer(hsTimer)
      timer.stopTimer(sTimer)
      green_red_btn.setProperty(hmUI.prop.SRC, img('btn/lv.png')); //false隐藏 true显示 
      for (let n = 0; n < 8; n++) {
        bigNumObject[n].setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
        smallNumObject[n].setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
      }
      backBtn.setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示
      green_red_btn.setProperty(hmUI.prop.VISIBLE, false); //false隐藏 true显示

      week.setProperty(hmUI.prop.VISIBLE, true);
      monthDay.setProperty(hmUI.prop.VISIBLE, true);
      secondImg.setProperty(hmUI.prop.VISIBLE, true);
      secondPointer.setProperty(hmUI.prop.VISIBLE, true);
      centerSecondPointer.setProperty(hmUI.prop.VISIBLE, false);
      minPoint.setProperty(hmUI.prop.ANGLE, 0)
      hourPoint.setProperty(hmUI.prop.ANGLE, 0)
    }));


    green_red_btn.addEventListener(hmUI.event.CLICK_UP, (function (info) {
      flag = !flag
      minPoint.setProperty(hmUI.prop.ANGLE, 0)
      hourPoint.setProperty(hmUI.prop.ANGLE, 0)
      if (flag) {
        green_red_btn.setProperty(hmUI.prop.SRC, img("btn/lv.png")); //false隐藏 true显示 
        timer.stopTimer(hsTimer)
        timer.stopTimer(sTimer)
        bigNumObject[0].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))
        bigNumObject[1].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))
        bigNumObject[3].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))
        bigNumObject[4].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))
        bigNumObject[6].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))
        bigNumObject[7].setProperty(hmUI.prop.SRC, img("bigNum/0.png"))

        smallNumObject[0].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t0") + ".png")
        smallNumObject[1].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t1") + ".png")
        smallNumObject[3].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t3") + ".png")
        smallNumObject[4].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t4") + ".png")
        smallNumObject[6].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t6") + ".png")
        smallNumObject[7].setProperty(hmUI.prop.SRC, rootPath + "smallNum/" + hmFS
          .SysProGetInt("t7") + ".png")
      } else {
        green_red_btn.setProperty(hmUI.prop.SRC, img("btn/red.png")); //false隐藏 true显示 
        hmFS.SysProSetInt("t0", 0);
        hmFS.SysProSetInt("t1", 0);
        hmFS.SysProSetInt("t3", 0);
        hmFS.SysProSetInt("t4", 0);
        hmFS.SysProSetInt("t6", 0);
        hmFS.SysProSetInt("t7", 0);
        milli_value = 0
        second_value = 0
        min_value = 0

        constSecond = 0
        constMin = 0
        timerSample()

      }
    }));

    let hsTimer = null
    let sTimer = null

    function setHaomiao(t) {
      if (milli_value >= 99) {
        milli_value = -1
      }
      milli_value++
      bigNumObject[6].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(milli_value /
        10) + ".png")
      bigNumObject[7].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(milli_value %
        10) + ".png")

      hmFS.SysProSetInt("t6", parseInt(milli_value / 10));
      hmFS.SysProSetInt("t7", parseInt(milli_value % 10));

    }

    function setmiao(t) {
      if (second_value >= 59) {
        second_value = -1
      }
      second_value++
      constSecond++
      setAngle(constSecond)
      if (second_value == 0) {
        min_value++
        setfen()
      }
      bigNumObject[3].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(second_value /
        10) + ".png")
      bigNumObject[4].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(second_value %
        10) + ".png")

      hmFS.SysProSetInt("t3", parseInt(second_value / 10));
      hmFS.SysProSetInt("t4", parseInt(second_value % 10));

    }

    function setfen(t) {
      if (min_value > 59) {
        min_value = 59
      }
      console.log(parseInt(min_value / 10) + 'hhhhh')
      console.log(parseInt(min_value % 10) + '%%%%%')
      bigNumObject[0].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(min_value /
        10) + ".png")
      bigNumObject[1].setProperty(hmUI.prop.SRC, rootPath + "bigNum/" + parseInt(min_value %
        10) + ".png")

      hmFS.SysProSetInt("t0", parseInt(min_value / 10));
      hmFS.SysProSetInt("t1", parseInt(min_value % 10));
    }

    function timerSample() {
      console.log('999999')
      hsTimer = timer.createTimer(
        10, 10, setHaomiao, {})
      sTimer = timer.createTimer(
        1000, 1000, setmiao, {})
    }

    function setAngle(seconds) {
      minPoint.setProperty(hmUI.prop.ANGLE, parseInt(seconds * 0.008))
      hourPoint.setProperty(hmUI.prop.ANGLE, parseInt(seconds * 0.2))

    }

  },

  onInit() {
    logger.log('index page.js on init invoke')
  },

  build() {
    logger.log('index page.js on build invoke')
    this.init_view()
  },

  onDestroy() {
    logger.log('index page.js on destroy invoke')
  },
})
