export const Cookie = {
  /**
   * 设置cookie的方法
   *
   * @param {*} key
   * @param {*} value
   * @param {*} t 设置cookie的有效期时间： 单位为秒，如小时应为: 60 * 60 * 1，该时间为GMT标准时间，显示上会比北京时间早8个小时，但不影响使用
   */
  setCookie(key, value, t) {
    document.cookie = `${key}=${value};max-age=${t}; path=/`;
  },
  removeCookie(name) {
    this.setCookie(name, '', -1);
  },
  getCookie(key) {
    const arr1 = document.cookie.split('; ');
    for (let i = 0; i < arr1.length; i += 1) {
      const arr2 = arr1[i].split('=');
      if (arr2[0] === key) {
        return decodeURI(arr2[1]);
      }
    }
    return '';
  },
};
