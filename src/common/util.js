/* eslint-disable no-useless-escape */
/* eslint-disable no-sparse-arrays */
// 常用工具方法集合
// @author Pluto <huarse@gmail.com>
// @create 2017/03/07
const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'dev' }
).content;

export function pushHistory(targetUrl, title) {
  history.pushState(null, title || targetUrl, targetUrl);
}

export function global() {
  // 替换路径名
  window.replacePathName = (url, name, value) => {
    const re = new RegExp(name, 'gi');
    return url.replace(re, value);
  };

  // 跳转
  window.pushHistory = (url, title = '', setPath = false) => {
    const obj = window.parseURL(url);
    const path = setPath ? { path: obj.path } : null;
    window.history.pushState(
      { source: obj.source, title, ...path },
      obj.source,
      obj.relative
    );
    window.history.replaceState(
      { source: obj.source, title, ...path },
      obj.source,
      document.URL
    );
    window.addEventListener('popstate', function () {}, false);
  };

  // 格式化url
  window.parseURL = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      [name]: () => {
        try {
          const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
          const r = url.split('?')[1].match(reg);
          if (r !== null) {
            return decodeURIComponent(r[2]);
          }
          return ''; // 如果此处只写return;则返回的是undefined
        } catch (e) {
          return ''; // 如果此处只写return;则返回的是undefined
        }
      },
      params: (function () {
        const ret = {};
        const seg = window.location.search.replace(/^\?/, '').split('&');
        let s;
        seg.forEach(function (item, index) {
          if (!item) {
            return;
          }
          s = seg[index].split('=');
          ret[s[0]] = s[1];
        });
        return ret;
      })(),

      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/'),
    };
  };
}

export function replaceScript() {
  // 这里在界面上增加一个div标签用于插入script标签，因为其他标签已经都被qiankun代理了
  const el = document.getElementById('ext');
  const qiankunHeadAppendChild = document.head.appendChild;
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.language = 'javascript';
  script.src =
    'https://api.map.baidu.com/api?v=3.0&ak=0Yj40MNZnG4RirbZievxgZZLqbthh4b4';

  script.onload = function () {
    document.head.appendChild = qiankunHeadAppendChild;
  };
  // 保留并替换head标签的appendChild，因为第三方里还有可能会往这里append
  document.head.appendChild = window.rawHeadAppendChild;
  el.appendChild = document.appendChild;
  el.appendChild(script);
}

export function GetQueryString(name) {
  const regArr = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(regArr);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
export function setTitle(title) {
  document.title = title || '';

  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  const isIos = /i(Phone|pad)/i.test(navigator.userAgent);

  // fix ios微信内修改页面title无效
  if (isWechat && isIos) {
    const i = document.createElement('iframe');
    i.style.display = 'none';
    i.src = '';

    i.onload = function () {
      setTimeout(() => {
        i.remove();
      }, 0);
    };

    document.body.appendChild(i);
  }
}

/**
 * 解析URL search
 * @param  {string}  [str]      要解析的字符串
 * @param  {Boolean} [isDecode=true] 是否decode
 * @return {object}
 * @example
 * parseParam('aaa=1&bbb=2&ccc=3'); // { aaa: '1', bbb: '2', ccc: '3' }
 */
export function parseParam(str = location.search, isDecode = true) {
  const ary = str.split(/[?&]/),
    result = {};
  for (let i = 0, j = ary.length; i < j; i++) {
    const n = ary[i];
    if (!n) continue;
    const tmp = n.split('=');
    result[tmp[0]] = isDecode && !!tmp[1] ? decodeURIComponent(tmp[1]) : tmp[1];
  }
  return result;
}

/**
 * 解析cookie
 * @return {object}
 */
export function parseCookie() {
  const cookieStr = window.document ? document.cookie : '';
  const cookieAry = cookieStr.split(/\s?;\s?/);
  const cookieMap = {};
  cookieAry.forEach(function (x) {
    const i = x.indexOf('=');
    if (i >= 0) {
      cookieMap[x.substring(0, i)] = x.substring(i + 1);
    }
  });
  return cookieMap;
}

/**
 * 从对象中解析出想要的值
 * @param {object} obj object
 * @param {string} key keys
 * @example
 * parseValue({ a: [{ b: 100 }] }, 'a.0.b'); // 100
 */
export function parseValue(obj, key) {
  if (!obj) return undefined;

  const keys = key.split('.');
  return keys.reduce((prev, curr) => {
    return (prev && prev[curr]) || undefined;
  }, obj);
}

let SEED = Math.round(Date.now() * Math.random());

/** 返回一个唯一的key */
export function uniqueKey() {
  return 'CC' + (SEED++).toString(36).toUpperCase();
}

/**
 * 保留几位小数点
 * @param {number} num
 * @param {number} [unit=2]
 */
export function toFixed(num, fix = 2) {
  const unit = Math.pow(10, fix);
  return Math.round(num * unit) / unit;
}

// 复制文本到剪贴板
export function copy2Clipboard(text) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    document.body.appendChild(input);
    input.select();

    document.execCommand('copy') ? resolve(true) : reject(false);
    document.body.removeChild(input);
  }).catch((e) => {
    console.log('ERROR_INFO:', e);
  });
}

/** 字符串排序 */
export function compare4ASCII(a, b) {
  if (!a && !b) return 0;
  // if (!isNaN(a) && !isNaN(b)) return a - b;
  if (typeof a === 'number' && typeof b === 'number') return a - b;

  // 没有内容应该放最后
  if (!a) return -1;
  if (!b) return 1;
  if (a === b) return 0;

  const aIsEN = /^[\w\s]+$/.test(a);
  const bIsEN = /^[\w\s]+$/.test(b);

  if (aIsEN && bIsEN) return a > b ? 1 : -1;
  if (aIsEN && !bIsEN) return -1;
  if (!aIsEN && bIsEN) return 1;

  if (String.prototype.localeCompare) {
    return String.prototype.localeCompare.call(a, b, 'zh');
  }

  return a > b ? 1 : -1;
}
