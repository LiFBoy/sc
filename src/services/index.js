// rda service
// @author Pluto <huarse@gmail.com>
// @create 2018/08/09

import { Core } from '@irim/ds-core';
import { Net } from '@irim/ds-net';
import optionsFilling from './middlewares/option-filling';
import errorHandler from './middlewares/error-handler';

const ds = Core.singleton();

ds.register('net', Net, {
  abilities: [
    'ajax', // 封装的是 window.fetch 方法
    'jsonp', // 最基本的 jsonp 接口
    'upload', // 文件上传的能力
    'download' // 异步文件下载，可以让 ajax 接口返回的文件流触发下载
  ],
});

ds.net.use(errorHandler);
ds.net.use(optionsFilling);

export default ds.net;
