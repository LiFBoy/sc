// error handler middleware
// @author Pluto <huarse@gmail.com>
// @create 2019/12/18 20:07

import { notification } from 'antd';
import { logger } from '@irim/ds-core';
import CustomError from '@/common/custom-error';

/**
 * 统一错误处理
 * @param {boolean|string} [ctx.showError=true] 显示错误信息
 * @param {boolean} ctx.ignoreError 忽略错误，并返回
 */
export default async function errorHandler(ctx) {
  try {
    await ctx.next();

    const response = ctx.response || {};
    // 未登录 & 已登录但用户信息不正确 直接跳转登录页面
    if (response.code === 10000 || response.code === 10080) {
      throw new CustomError(
        response.msg || response.result || response.r || response.rs
      );
    } else if (response.code === 302 || response.code === 11000) {
      // debugger
      // jumpToLogin();
      // return;
    } else if (response.code !== 0 && response.code !== 200) {
      throw new CustomError(response.msg || response.errMsg, '网络错误');
    }
  } catch (error) {
    if (error.code === 'NEED_LOGIN') {
      const current = (location.hash || '').replace(/^#/, '');
      location.hash = `#/login?redirect=${encodeURIComponent(current)}`;
      throw error;
    }

    if (ctx.showError !== false) {
      const defaultMessage =
        typeof ctx.showError === 'string'
          ? ctx.showError
          : '请求异常，请稍后再试。';
      // message.warning(error.message || defaultMessage);
      notification.error({
        message: '请求错误',
        description: error.message || defaultMessage,
      });

      logger.error(error.message || defaultMessage);
    }

    if (ctx.ignoreError) {
      logger.warning(`ERROR ignored: ${ctx.api}`, error);
      ctx.body = error || {};
    } else {
      throw error;
    }
  }
}
