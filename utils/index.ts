import { IClassifyItem } from "./types4TS";

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

export const getFilterClassifyList = (list: IClassifyItem[]) => {
  let level1List = list // 挑选第一级分类
    .filter(item => item.Level === 1)
    .map(item => ({ ...item, children: [] }));
  // 设置第二级分类
  level1List.forEach(level1 => {
    const _list = list
      .filter(item => item.ParentID === level1.ID)
      .map(item => ({ ...item, children: [] }));
    level1.children = _list;
  });
  level1List = level1List.filter(_leve1 => _leve1.children.length > 0);
  return level1List;
}

export const clone = function (obj, deep) {
  if (Array.isArray(obj)) {
      if (deep) {
          //深度克隆
          var newArr = [];
          for (var i = 0; i < obj.length; i++) {
              newArr.push(this.clone(obj[i], deep));
          }
          return newArr;
      }
      else {
          return obj.slice(); //复制数组
      }
  }
  else if (typeof obj === "object") {
      var newObj = {};
      for (var prop in obj) {
          if (deep) {
              //深度克隆
              newObj[prop] = this.clone(obj[prop], deep);
          }
          else {
              newObj[prop] = obj[prop];
          }
      }
      return newObj;
  }
  else {
      //函数、原始类型
      return obj; //递归的终止条件
  }
}

export const animateScroll = (start: number, end: number, callback: (num: number) => void, totalTime?: number, handleAnimateEnd?: () => void) => {
  let num = start;
  const tick = 16; // 每隔16毫秒完成一次变化
  const total = totalTime ? totalTime : 300;
  const times = Math.ceil(total / tick); // 变化的次数
  let curTimes = 0;
  const dis = (end - start) / times; // 总距离/次数，每次运动的距离
  const timer = setInterval(() => {
    curTimes += 1;
    num += dis;
    if (curTimes === times) {
      num = end;
      clearInterval(timer);
      if (handleAnimateEnd) handleAnimateEnd();
    }
    callback(num);
  }, tick);
  return timer;
}

/**
 * @description: 转换时间格式
 * @param {string} str 时间字符串
 * @return {*}
 */
export const formatDateOnlyYear = (str: string) => {
  const arr = str.split('T');
  return arr[0];
}