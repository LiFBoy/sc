import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import store from 'store2';
import { HomeOutlined } from '@ant-design/icons';
import UserSwitching from 'user-switch';
import classNames from 'classnames';
import { parse } from 'qs';
// import { pushHistory, GetQueryString, setTitle } from '@/common/util';
import './index.less';

/**
 *
 * - hasBackToWorkbench 是否允许回退到工作台
 * - workbenchUrl 工作台地址
 */
export default function UserSwitchingWithMainBackBtn({
  setGlobalState,
  hasBackToWorkbench,
  workbenchUrl,
  hasSource,
  showBackBtn,
  ...props
}) {
  // console.log(showBackBtn, hasSource, 'hasSource');
  // 回退到工作台的按钮，
  // console.log(workbenchUrl, 'workbenchUrl');
  let $backToWorkbenchBtn = null;
  // const [url, setUrl] = useState();
  // useEffect(() => {
  //   // const search = ~workbenchUrl?.indexOf('?') ? '&' : '?' + location.search.substr(1);
  //   // setUrl(workbenchUrl);
  //   setUrl(workbenchUrl + `${store.session('search')}`);
  // }, [workbenchUrl]);

  const goBackToWorkbench = () => {
    window.pushHistory(store.session('search'));
  };

  const onBack = () => {
    const { from } = parse(window.location.search.slice(1));
    const flag = ['/classes', '/mobile/lexiang-sync/login/callback'].some(
      (item) => window.location.pathname.indexOf(item) > -1
    );
    if (flag || from === 'articleDetail') {
      history.go(-2);
    } else {
      history.back();
    }
  };

  if (hasBackToWorkbench) {
    try {
      // if (!store.session('search')) {
      //   throw new Error('workbenchUrl 属性为空，不展示返回工作台按钮');
      // }
      $backToWorkbenchBtn = (
        <Button
          className={classNames('backToWorkbenchBtn', {
            // 如果有后退按钮，则加一点缩进，收敛到 user-switching 组件时可以去掉这部分
            ['hasGoBack']: showBackBtn,
          })}
          type="text"
          ghost
          onClick={goBackToWorkbench}
          icon={<HomeOutlined />}
        />
      );
    } catch (error) {
      console.error('[身份切换组件]: ' + error.message);
    }
  }
  const user = (
    <div
      className="user"
      onClick={() => {
        window.pushHistory(
          window.location.origin + '/sub-app/activity/PersonalPage'
        );
      }}
    >
      <img
        src="https://oss.suosi.atuniversity.cn/file/mobile/user.svg"
        alt=""
      />
    </div>
  );
  console.log(showBackBtn, 'showBackBtn');
  return (
    <div className="wrapper-user-switching">
      {$backToWorkbenchBtn}
      <UserSwitching onBack={onBack} showBackBtn={showBackBtn} {...props} />
      {user}
    </div>
  );
}
