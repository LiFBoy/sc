/* eslint-disable no-sparse-arrays */
/* eslint-disable no-useless-escape */
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState,
} from 'qiankun';
import microAppConfig from '@/common/micro-app.config';
import { parseParam, global, replaceScript } from '@/common/util';

import { funVerifySystemKernel } from '@/common/container';
import globalUtils from './global-utils';

/**
 * 主应用
 */
import render from './app';
const { corpid, agentid, suiteid, appId } = parseParam();

// 上下文，用于注入全局工具
const ctx = {
  corpid,
  agentid,
  suiteid,
  hasSource: false,
  userFilterType: funVerifySystemKernel() ? 1 : 3,
  customName: null,
  showBackBtn: false,
  showCompChange: true,
};
// 给所有子应用传入的属性
const commonProps = {
  corpid,
  agentid,
  suiteid,
  hasSource: false,
  userFilterType: funVerifySystemKernel() ? 1 : 3,
  customName: null,
  showBackBtn: false,
  showCompChange: true,
  // 调用全局工具，注入 ctx
  ...Object.keys(globalUtils).reduce(
    (result, key) => ({ ...result, [key]: globalUtils[key](ctx) }),
    {}
  ),
};

function bootstrap() {
  render({ loading: true });
  window.authcenter.ready(() => {
    console.log('上下文，用于注入全局工具');
    // 上下文，用于注入全局工具
    const ctx = {
      corpid,
      agentid,
      suiteid,
      hasSource: false,
      userFilterType: funVerifySystemKernel() ? 1 : 3,
      customName: null,
      showBackBtn: false,
      showCompChange: true,
    };
    const _globalUtils = Object.keys(globalUtils).reduce(
      (result, key) => ({ ...result, [key]: globalUtils[key](ctx) }),
      {}
    );
    const { onGlobalStateChange, setGlobalState } = initState({
      userInfo: null,
      corpid,
      agentid,
      suiteid,
      hasSource: false,
      userFilterType: funVerifySystemKernel() ? 1 : 3,
      customName: null,
      showBackBtn: false,
      showCompChange: true,
      // 注册全局工具
      ..._globalUtils,
    });

    const loader = (loading) =>
      render({
        loading,
        authReady: true,
        setGlobalState,
        corpid,
        onGlobalStateChange,
      });
    initAppRegistration(loader, setGlobalState);
    start();
  });
}

function initState(initialState) {
  const { onGlobalStateChange, setGlobalState } = initGlobalState(initialState);

  onGlobalStateChange((value, prev) => {
    console.log(value.showBackBtn, prev.showBackBtn, 'xxxx');
    if (
      value.app?.appId !== prev.app?.appId ||
      value.loading !== prev.loading ||
      value?.customName !== prev?.customName ||
      value?.showBackBtn !== prev?.showBackBtn ||
      value?.userFilterType !== prev?.userFilterType ||
      value?.showCompChange !== prev?.showCompChange ||
      value?.userInfo?.userName !== prev?.userInfo?.userName
    ) {
      render({
        loading: value.loading,
        authReady: true,
        hasSource: value.hasSource,
        userFilterType: value.userFilterType,
        customName: value.customName,
        showBackBtn: value.showBackBtn,
        showCompChange: value.showCompChange,
        setGlobalState,
        corpid,
        app: value.app,
      });
    }
  });
  return { onGlobalStateChange, setGlobalState };
}

function initAppRegistration(loader, setGlobalState) {
  registerMicroApps(
    microAppConfig.map((conf) => ({
      container: '#sub-app-viewport',
      ...conf,
      loader,
      props: {
        ...(conf.props || {}),
        ...commonProps,
      },
    })),
    {
      beforeLoad: [
        (app) => {
          // setGlobalState({ loading: true, app: app.props });
          console.log(
            '[LifeCycle] before load %c%s',
            'color: green;beforeMount',
            app.name
          );
        },
      ],
      beforeMount: [
        (app) => {
          setGlobalState({ loading: true, app: app.props });
          console.log(
            '[LifeCycle] before mount %c%s',
            'color: green;beforeMount',
            app.name
          );
        },
      ],
      afterMount: [
        (app) => {
          setGlobalState({ loading: false, app: app.props });
          console.log(
            '[LifeCycle] after mount %c%s',
            'color: green;afterMount',
            app.name
          );
        },
      ],
      afterUnmount: [
        (app) => {
          console.log(
            '[LifeCycle] after unmount %c%s',
            'color: green;afterUnmount',
            app.name
          );
        },
      ],
    }
  );
}

bootstrap();
// replaceScript();
global();

// setDefaultMountApp(
//   '/containers/micro/app/microWorkbenchPortal/application' + location.search
// );

runAfterFirstMounted(() => {
  // const dom = document.getElementById('_root');
  // dom.style.display = 'none';
  // document.getElementsByClassName('select-role-wrap')[0].style.display = 'none';
});
