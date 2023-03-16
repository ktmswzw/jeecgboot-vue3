import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';

// update-begin--author:sunjianlei---date:20220408---for: 【VUEN-656】配置外部网址打不开，原因是带了#号，需要替换一下
export const URL_HASH_TAB = `__AGWE4H__HASH__TAG__PWHRG__`;
// update-end--author:sunjianlei---date:20220408---for: 【VUEN-656】配置外部网址打不开，原因是带了#号，需要替换一下

export const noop = () => {};
import CryptoJS from 'crypto-js';

export function aesEncrypt(word, keyWord = 'XwKsGlMcdPMEhR1B') {
  const key = CryptoJS.enc.Utf8.parse(keyWord);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

/**
 * 获取表单字段值数据类型
 * @param props
 * @param field
 * @updateBy:zyf
 */
export function getValueType(props, field) {
  const formSchema = unref(unref(props)?.schemas);
  let valueType = 'string';
  if (formSchema) {
    const schema = formSchema.filter((item) => item.field === field)[0];
    valueType = schema.componentProps && schema.componentProps.valueType ? schema.componentProps.valueType : valueType;
  }
  return valueType;
}
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 * 获取url地址参数
 * @param paraName
 */
export function getUrlParam(paraName) {
  const url = document.location.toString();
  const arrObj = url.split('?');

  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;

    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}

/**
 * 休眠（setTimeout的promise版）
 * @param ms 要休眠的时间，单位：毫秒
 * @param fn callback，可空
 * @return Promise
 */
export function sleep(ms: number, fn?: Fn) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      fn && fn();
      resolve();
    }, ms)
  );
}

/**
 * 不用正则的方式替换所有值
 * @param text 被替换的字符串
 * @param checker  替换前的内容
 * @param replacer 替换后的内容
 * @returns {String} 替换后的字符串
 */
export function replaceAll(text, checker, replacer) {
  const lastText = text;
  text = text.replace(checker, replacer);
  if (lastText !== text) {
    return replaceAll(text, checker, replacer);
  }
  return text;
}

/**
 * 获取URL上参数
 * @param url
 */
export function getQueryVariable(url) {
  if (!url) return;

  let t,
    n,
    r,
    i = url.split('?')[1],
    s = {};
  (t = i.split('&')), (r = null), (n = null);
  for (const o in t) {
    const u = t[o].indexOf('=');
    u !== -1 && ((r = t[o].substr(0, u)), (n = t[o].substr(u + 1)), (s[r] = n));
  }
  return s;
}
/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus) {
  if (bpmStatus != '1' && bpmStatus != '3' && bpmStatus != '4') {
    return true;
  }
  return false;
}
/**
 * 数字转大写
 * @param value
 * @returns {*}
 */
export function numToUpper(value) {
  if (value != '') {
    const unit = ['仟', '佰', '拾', '', '仟', '佰', '拾', '', '角', '分'];
    const toDx = (n) => {
      switch (n) {
        case '0':
          return '零';
        case '1':
          return '壹';
        case '2':
          return '贰';
        case '3':
          return '叁';
        case '4':
          return '肆';
        case '5':
          return '伍';
        case '6':
          return '陆';
        case '7':
          return '柒';
        case '8':
          return '捌';
        case '9':
          return '玖';
      }
    };
    const lth = value.toString().length;
    value *= 100;
    value += '';
    const length = value.length;
    if (lth <= 8) {
      let result = '';
      for (let i = 0; i < length; i++) {
        if (i == 2) {
          result = '元' + result;
        } else if (i == 6) {
          result = '万' + result;
        }
        if (value.charAt(length - i - 1) == 0) {
          if (i != 0 && i != 1) {
            if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
              result = '零' + result;
            }
          }
          continue;
        }
        result = toDx(value.charAt(length - i - 1)) + unit[unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? '整' : '';
      return result;
    } else {
      return null;
    }
  }
  return null;
}

//update-begin-author:taoyan date:2022-6-8 for:解决老的vue2动态导入文件语法 vite不支持的问题
const allModules = import.meta.glob('../views/**/*.vue');
export function importViewsFile(path): Promise<any> {
  if (path.startsWith('/')) {
    path = path.substring(1);
  }
  let page = '';
  if (path.endsWith('.vue')) {
    page = `../views/${path}`;
  } else {
    page = `../views/${path}.vue`;
  }
  return new Promise((resolve, reject) => {
    let flag = true;
    for (const path in allModules) {
      if (path == page) {
        flag = false;
        allModules[path]().then((mod) => {
          console.log(path, mod);
          resolve(mod);
        });
      }
    }
    if (flag) {
      reject('该文件不存在:' + page);
    }
  });
}
//update-end-author:taoyan date:2022-6-8 for:解决老的vue2动态导入文件语法 vite不支持的问题

/**
 * 跳转至积木报表的 预览页面
 * @param url
 * @param id
 * @param token
 */
export function goJmReportViewPage(url, id, token) {
  // URL支持{{ window.xxx }}占位符变量
  url = url.replace(/{{([^}]+)?}}/g, (_s1, s2) => eval(s2));
  if (url.includes('?')) {
    url += '&';
  } else {
    url += '?';
  }
  url += `id=${id}`;
  url += `&token=${token}`;
  window.open(url);
}

export function resetSize(vm) {
  let img_width, img_height, bar_width, bar_height; //图片的宽度、高度，移动条的宽度、高度

  const parentWidth = vm.$el.parentNode.offsetWidth;
  const parentHeight = vm.$el.parentNode.offsetHeight;
  if (vm.imgSize.width.indexOf('%') != -1) {
    img_width = (parseInt(vm.imgSize.width) / 100) * parentWidth + 'px';
  } else {
    img_width = vm.imgSize.width;
  }

  if (vm.imgSize.height.indexOf('%') != -1) {
    img_height = (parseInt(vm.imgSize.height) / 100) * parentHeight + 'px';
  } else {
    img_height = vm.imgSize.height;
  }

  if (vm.barSize.width.indexOf('%') != -1) {
    bar_width = (parseInt(vm.barSize.width) / 100) * parentWidth + 'px';
  } else {
    bar_width = vm.barSize.width;
  }

  if (vm.barSize.height.indexOf('%') != -1) {
    bar_height = (parseInt(vm.barSize.height) / 100) * parentHeight + 'px';
  } else {
    bar_height = vm.barSize.height;
  }

  return { imgWidth: img_width, imgHeight: img_height, barWidth: bar_width, barHeight: bar_height };
}

export const _code_chars = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
export const _code_color1 = ['#fffff0', '#f0ffff', '#f0fff0', '#fff0f0'];
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC'];

export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // @ts-ignore
    byteArrays.push(byteArray);
  }

  console.log(byteArrays);

  return new File(byteArrays, 'pot', { type: contentType });
}

export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(','),
    bStr = atob(arr[1]),
    mime = arr[0].match(/:(.*?);/)[1];
  let n = bStr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

//定义一些常量
const x_PI = 52.35987755982988;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
export function bd09toGCJ02(bd_lon, bd_lat) {
  const x = bd_lon - 0.0065;
  const y = bd_lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
  const gg_lng = z * Math.cos(theta);
  const gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}
