import React, { useState, useEffect, useCallback } from 'react';
import Toast from 'ss-mobile-toast';
import {
  defaultUserSwitchOptions,
  funVerifySystemKernel,
} from '@/common/container';
import UserSwitching from '@/components/user-switching';
// import MicroApp from '../MicroApp';
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import { parseParam } from '@/common/util';
import './index.less';

const MainContainer = ({
  loading,
  app,
  setGlobalState,
  authReady,
  corpid,
  hasSource,
  customName,
  showBackBtn,
  showCompChange,
  userFilterType,
}) => {
  const [userSwitchProps, _setUserSwitchProps] = useState(null);
  console.log(showBackBtn, 'showBackBtn111');
  const handleError = (err) => {
    console.error('用户切换组件报错', err);
  };

  const setUserSwitchProps = (nextUserSwitchProps) => {
    // 将 userSwitchProps 同步到全局状态
    console.log(nextUserSwitchProps.showBackBtn, 'showBackBtn');
    setGlobalState({ userSwitchProps: nextUserSwitchProps });
    _setUserSwitchProps(nextUserSwitchProps);
  };

  // 显示状态改变
  const handleShowCompChange = useCallback(
    (showComp) => {
      setGlobalState({
        showComp,
      });
    },
    [setGlobalState]
  );

  useEffect(() => {
    // 如果还没鉴权成功，则 authReady 会是 false
    // 子应用会在 beforeMount 生命周期中传入 props
    authReady &&
      app &&
      setUserSwitchProps({
        // 传入身份切换组件的默认配置，可以被子应用的 switchUserProps 覆盖。
        corpid,
        appId: app.appId,
        appName: app.appName,
        hasSource,
        customName,
        showBackBtn,
        showCompChange,
        userFilterType,
        ...defaultUserSwitchOptions,
        ...app.switchUserProps,
        getUserState: updateUserInfo,
        onOk: updateUserInfo,
        onError: handleError,
        setGlobalState: setGlobalState,
        onShowCompChange: handleShowCompChange,
      });
  }, [
    corpid,
    authReady,
    app?.appId,
    customName,
    showBackBtn,
    hasSource,
    userFilterType,
  ]);

  const updateUserInfo = ({ userInfo, ...others }) => {
    if (!userInfo) {
      Toast.info('当前用户没有身份');
      return;
    }

    const _userInfo = { ...userInfo, corpId: userInfo?.corpId ?? corpid };
    setGlobalState({ userInfo: _userInfo });
  };

  console.log(
    userSwitchProps,
    'userSwitchProps',
    app?.switchUserProps,
    showBackBtn
  );

  return (
    <div className="ss-main-container">
      <div className="select-role-wrap">
        {userSwitchProps && (
          <UserSwitching
            {...userSwitchProps}
            showBackBtn={userSwitchProps?.showBackBtn}
          />
        )}
      </div>
      {/* {
        loading && (
          <div className="ss-main-container-loading">
            <div className="img-box"><img src="https://img.alicdn.com/tps/i3/TB1VG6aHXXXXXXZXpXX2GPaIVXX-80-80.gif" alt="" /></div>
          </div>
        )
      } */}
      <div id="sub-app-viewport" className="sub-app-viewport"></div>
    </div>
  );
};

export default MainContainer;
