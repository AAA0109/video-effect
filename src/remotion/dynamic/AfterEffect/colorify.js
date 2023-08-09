
// import cloneDeep from 'lodash.clonedeep';


export const flatten = (targetColor, lottieObj, immutable = true) => {
  const genTargetLottieColor = convertColorToLottieColor(targetColor);
  if (!genTargetLottieColor) {
    throw new Error('Proper colors must be used for target');
  }
  function doFlatten(targetLottieColor, obj) {
    if (!obj) return;
    if (obj.s && Array.isArray(obj.s) && obj.s.length === 4) {
      obj.s = [...targetLottieColor, 1];
    } else if (obj.c && obj.c.k) {
      if (Array.isArray(obj.c.k) && typeof obj.c.k[0] !== 'number') {
        doFlatten(targetLottieColor, obj.c.k);
      } else {
        obj.c.k = targetLottieColor;
      }
    } else {
      for (const key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length >= 3 && obj[key].length <= 4 && obj[key].every((item) => item >= 0 && item <= 1)) {
          obj[key] = targetLottieColor;
        }
        else if (typeof obj[key] === 'object') {
          doFlatten(targetLottieColor, obj[key]);
        }
      }
    }

    return obj;
  }
  return doFlatten(genTargetLottieColor, lottieObj);
  // return doFlatten(genTargetLottieColor, immutable ? cloneDeep(lottieObj) : lottieObj);
};






export const convertColorToLottieColor = (color) => {
  if (typeof color === 'string' && color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!result) {
      throw new Error('Color can be only hex or rgb array (ex. [10,20,30])');
    }
    return [
      Math.round((parseInt(result[1], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[2], 16) / 255) * 1000) / 1000,
      Math.round((parseInt(result[3], 16) / 255) * 1000) / 1000,
    ];
  } else if (typeof color === 'object' && color.length === 3 && color.every((item) => item >= 0 && item <= 255)) {
    return [
      Math.round((color[0] / 255) * 1000) / 1000,
      Math.round((color[1] / 255) * 1000) / 1000,
      Math.round((color[2] / 255) * 1000) / 1000,
    ];
  } else if (!color) {
    return undefined;
  } else {
    throw new Error('Color can be only hex or rgb array (ex. [10,20,30])');
  }
};
