import { SetupEnumType } from "../setup";
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

/**
 * @description: 获取文件后缀名
 * @param {type}
 * @return {type}
 */
export function extname(filename) {
  if (!filename || typeof filename !== 'string') {
    return '未知类型';
  }
  const a = filename.split('').reverse().join('');
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b;
}

export const getFileDownLoad = (url: string, fileName?: string) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  const _arr = url.split('/');
  let _fileName = _arr[_arr.length - 1];
  if (fileName) {
    const _name = extname(_fileName);
    _fileName = fileName + '.' + _name;
  } else {
    const _t = _fileName.split(' ');
    if (_t.length === 2) _fileName = _t[1];
    else if (_t.length > 2) {
      const _t2 = _t.slice(1).join(' ');
      _fileName = _t2;
    }
  }
  link.setAttribute('download', _fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  link.onload = () => {
    window.URL.revokeObjectURL(url);
  };
}

export const changeRichContentImgUrl = (content: string) => {
  if (!content || typeof content !== 'string') return '';
  return content.replace('<img src="/', `<img src="${SetupEnumType.richContentImgSrc}/`);
}