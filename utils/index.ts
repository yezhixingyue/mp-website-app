export const isBrower = () => {
  return typeof window !== 'undefined';
}

export const delay = async (duration = 1000) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * 函数防抖
 */
export const debounce = (callback: { apply: (arg0: any, arg1: IArguments) => void; }, time: number) => {
  let timer: NodeJS.Timeout;
  return function () {
    clearTimeout(timer);//清除之前的计时
    const args = arguments; //利用闭包保存参数数组
    timer = setTimeout(function () {
      callback.apply(null, args);
    }, time);
  }
}

/**
* 函数节流
*/
export const throttle = (callback: { apply: (arg0: any, arg1: IArguments) => void; }, time: number, immediately: boolean) => {
  if (immediately === undefined) {
    immediately = true;
  }
  if (immediately) {
    let t: number;
    return function () {
      if (immediately) {
        if (!t || Date.now() - t >= time) { //之前没有计时 或 距离上次执行的时间已超过规定的值
          callback.apply(null, arguments);
          t = Date.now(); //得到的当前时间戳
        }
      }
    }
  }
  else {
    let timer: NodeJS.Timeout | null;
    return function () {
      if (timer) {
        return;
      }
      var args = arguments; //利用闭包保存参数数组
      timer = setTimeout(function () {
        callback.apply(null, args);
        timer = null;
      }, time);
    }
  }
}