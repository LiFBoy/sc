/* eslint-disable eqeqeq */
// 需要用到微信功能的页面，需要重新调用一遍 initWxConfig
export function funVerifySysKernel() {
  const ua = navigator.userAgent.toLowerCase().toLocaleLowerCase();
  const wxMS = ua.match(/micromessenger/i);
  const wxWork = ua.match(/wxwork/i);
  const iPhone = ua.match(/iPhone/i);
  const android = ua.match(/android/i);
  const win = ua.match(/windows/i);
  const mac = ua.match(/mac/i);
  // 企业微信（pc、mobile）
  if (
    (wxMS && wxMS[0] === 'micromessenger') ||
    (wxWork && wxWork[0] === 'wxwork')
  ) {
    if (android && android[0] === 'android') {
      // console.log('企微和微信-android-mobile');
      return 'android';
    }
    if (iPhone && iPhone[0] === 'iPhone') {
      // console.log('企微和微信-iphone-mobile');
      return 'iphone';
    } else if (mac && mac[0] === 'mac') {
      // console.log('企微和微信-Mac-pc');
      return 'mac';
    }
    if (win && win[0] === 'windows') {
      // console.log('企微和微信-windows-pc');
      return 'windows';
    }
  }
  return 'pc';
}
export default (ctx) => async () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
  // const { corpid } = ctx;
  // return new Promise((resolve, reject) => {
  //   try {
  //     const { wx } = window;
  //     if (!wx) {
  //       throw new Error('当前不是微信环境。');
  //     }
  //     const ins = window.authcenter;
  //     console.log(ins, 'ins');
  //     const debug = ins.isDebug ? 1 : 0;
  //     let init_url = '';
  //     // const ua = window.navigator.userAgent.toLowerCase();
  //     const ua = window.navigator.userAgent.toLowerCase();
  //     if (
  //       ua.match(/MicroMessenger/i) == 'micromessenger' &&
  //       ua.match(/wxwork/i) == 'wxwork'
  //     ) {
  //       init_url =
  //         ins.baseUrl + 'getWxSignature?corpid=' + corpid + '&debug=' + 0;
  //       // console.log('企业微信客户端12');
  //     } else if (ua.match(/micromessenger/i) == 'micromessenger') {
  //       // console.log('微信客户端5');
  //       if (funVerifySysKernel() === 'android') {
  //         init_url =
  //           ins.baseUrl + 'getWxSignature?corpid=' + corpid + '&debug=' + 0;
  //       } else {
  //         resolve();
  //       }
  //     } else {
  //       init_url =
  //         ins.baseUrl + 'getWxSignature?corpid=' + corpid + '&debug=' + 0;
  //     }
  //     ins.xmlhttp.onreadystatechange = function () {
  //       if (ins.xmlhttp.readyState === 4 && ins.xmlhttp.status !== 200) {
  //         throw new Error('请求失败。');
  //       }
  //     };
  //     ins.doGet(init_url, function (result) {
  //       wx.config(result);
  //       try {
  //         wx.ready(function (...args) {
  //           resolve(...args);
  //         });
  //       } catch (e) {
  //         reject(e);
  //       }
  //     });
  //     wx.error(function (res) {
  //       // ins.funUnusuallySave({ url: init_url }, 'initWxConfig_ERROR');
  //       throw new Error(JSON.stringify(res));
  //     });
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
};
