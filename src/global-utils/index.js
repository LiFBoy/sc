/**
 * 本文件中注册全局的工具，统一提供给子应用使用，在子应用的 mount 生命周期的 props 参数中取用。
 * 每个工具的书写方式统一为：export default ctx => xxx
 *  - xxx 为具体的工具内容
 *  - ctx 为父容器的一些上下文内容，目前包括：corpid, agentid
 */

import initWxConfig from './init-wx-config';
export default {
  // 需要用到微信功能的页面，需要重新调用一遍 initWxConfig
  initWxConfig,
};
