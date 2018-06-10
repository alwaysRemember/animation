//requestAnimationFrame以及cancelAnimationFrame兼容问题解决
window.requestAnimationFrame = window.requestAnimationFrame || function (a) {
  return setTimeout(a, 1000 / 60)
};
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;


/*
* 参数：
* dom : 一个真实的dom节点
* mJson : 类似于jq的animate 是css的改变
* time : 动画所需时间
* callBack 动画执行完毕后的操作
* */
function move(dom, mJosn, time, callBack) {  //callBack为回调函数可有可无
  let sVal = {},        //存初始值
      tVal = {},       //存目标值
      sTime = new Date(); //存初始时间

  for (let key in mJosn) {  //遍历mJosn
    sVal[key] = parseFloat(getStyle(dom, key));   //获取初始值
    tVal[key] = parseFloat(mJosn[key]);          //获取目标值
  }

  m();

  function m() {
    let prop = (new Date() - sTime) / time;          //现在时间减去初始时间再除以time传的值
    prop >= 1 ? prop = 1 : requestAnimationFrame(m);
    for (let key in mJosn) {
      if (key === "opacity") {
        let o = sVal[key] + prop * (tVal[key] - sVal[key]);
        dom.style[key] = o;
        dom.style.filter = `alpha(opacity${100*o})`;
      } else {
        dom.style[key] = sVal[key] + prop * (tVal[key] - sVal[key]) + "px";
      }
    }
    if (prop === 1) {
      callBack && callBack.call(dom);
    }
  }

  function getStyle(dom, atr) {
    return dom.currentStyle ? dom.currentStyle[atr] : getComputedStyle(dom)[atr];
  }
}