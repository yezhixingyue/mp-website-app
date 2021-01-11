export const isInClietn = (eldom) => {
  // 获取元素具体视窗的距离
  let { top, right, bottom, left } = eldom.getBoundingClientRect();
  // 浏览器窗口
  let clientHeight = window.innerHeight;
  let clientWidth = window.innerWidth;
  return !(top > clientHeight || bottom < 0 || left > clientWidth || right < 0);
};

export const checkAllImags = () => {
  console.log('checkAllImags');
  const imgs = document.querySelectorAll('img');
  let index = 0;
  Array.from(imgs).map((item, inx) => {
    if (isInClietn(item) && inx > index) {
      const _src = item.getAttribute('data-src');
      if (_src) item.src = _src;
      index = inx + 1;
    }
  });
};