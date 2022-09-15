import { ENV, GetQueryString } from '@/common/service-utils';
import store from 'store2';
// TODO: 后续可以考虑把这里的配置放到后端，以接口的形式动态配置。
/**
 * 微前端配置
 */

// 跳转到新版工作台的白名单

const PATH_STRING = '/containers/micro/app';
const _PATH_STRING = '/sub-app';
// const _PATH_STRING_ = '/test';

// export const FLOW = [
//   '/containers/micro/app/microWorkFlow',
//   '/containers/micro/app/group',
// ];

const ENTRY_MAP = {
  dev: {
    // workFlow: '//localhost:8083',
    // group: '//localhost:8084',
    // workbench: '//localhost:8085',
    activity: '//localhost:8087',
  },
  sit: {
    workFlow: '//fe-workflow.community-sit.easyj.top',
    workbench: '//fe-workbench.community-sit.easyj.top',
    microsite: '//fe-microsite.community-sit.easyj.top',
    group: '//fe-group.community-sit.easyj.top',
    activity: '//fe-activity.community-sit.easyj.top',
  },
  // TODO: 生产环境配置
  production: {
    workFlow: '//m-workflow.suosihulian.com',
    group: '//m-group.suosihulian.com',
    activity: '//m-activity.suosihulian.com',
    workbench: '//10.66.55.231',
    microsite: '//m-microsite.suosihulian.com',
  },
};

const entry = ENTRY_MAP[ENV];
// TODO：本地调试单个应用
export default [
  {
    name: '工作流', // 子应用名称
    entry: entry.workFlow, // 获取上面 ENTRY_MAP 中对应的 url
    // 如果 url 符合以下条件，则加载督学笔记应用
    activeRule: (location) => {
      return location.pathname.startsWith(`${PATH_STRING}/microWorkFlow`);
      // return FLOW.some((path) => location.pathname.startsWith(path));
    },
    // 属性中配置应用的 appId 和 appName，之前是写死在应用中的，现在统一放在容器层配置
    props: {
      // 必填
      appId: 81,
      // 必填
      appName: '工作流',
      // 选填，如果子应用跟容器默认的用户切换组件配置不一致，则可以提供 switchUserProps 覆盖默认配置
      switchUserProps: {
        isMultiOrg: 0,
        showBackBtn: true,
        hasBackToWorkbench: false,
        showCompChange: false,
      },
    },
  },
  {
    name: '群管理', // 子应用名称
    entry: entry.group, // 获取上面 ENTRY_MAP 中对应的 url
    // 如果 url 符合以下条件，则加载督学笔记应用
    activeRule: (location) => {
      return location.pathname.startsWith(`${PATH_STRING}/group`);
    },
    // 属性中配置应用的 appId 和 appName，之前是写死在应用中的，现在统一放在容器层配置
    props: {
      // 必填
      appId: 81,
      // 必填
      appName: '群管理',
      // 选填，如果子应用跟容器默认的用户切换组件配置不一致，则可以提供 switchUserProps 覆盖默认配置
      switchUserProps: {
        isMultiOrg: 0,
        showBackBtn: false,
        hasBackToWorkbench: false,
        showCompChange: true,
        // showCompChange: false,
      },
    },
  },

  {
    name: '工作台', // 子应用名称
    entry: entry.workbench, // 获取上面 ENTRY_MAP 中对应的 url
    // 如果 url 符合以下条件，则加载督学笔记应用
    activeRule: (location) => {
      // let arr = location.pathname.split('/');
      // let path = `/${arr[arr.length - 3]}`;
      // console.log(path, 'location.pathname');
      // return path.startsWith(`${_PATH_STRING}/workbench`);
      console.log(location.hash);
      return location.hash.includes('/sub-app/workbench');
    },
    // 属性中配置应用的 appId 和 appName，之前是写死在应用中的，现在统一放在容器层配置
    props: {
      // 必填
      appId: 81,
      // 必填
      appName: '工作台',
      // 选填，如果子应用跟容器默认的用户切换组件配置不一致，则可以提供 switchUserProps 覆盖默认配置
      switchUserProps: {
        isMultiOrg: 0,
        showBackBtn: false,
        hasBackToWorkbench: false,
        showCompChange: false,
        // showCompChange: false,
      },
    },
  },
  {
    name: '内容模型', // 子应用名称
    entry: entry.microsite, // 获取上面 ENTRY_MAP 中对应的 url
    // 如果 url 符合以下条件，则加载督学笔记应用
    activeRule: (location) => {
      return location.pathname.startsWith(`${_PATH_STRING}/microsite`);
    },
    // 属性中配置应用的 appId 和 appName，之前是写死在应用中的，现在统一放在容器层配置
    props: {
      // 必填
      appId: 81,
      // 必填
      appName: '工作台',
      // 选填，如果子应用跟容器默认的用户切换组件配置不一致，则可以提供 switchUserProps 覆盖默认配置
      switchUserProps: {
        isMultiOrg: 0,
        showBackBtn: true,
        hasBackToWorkbench: false,
        showCompChange: false,
        // showCompChange: false,
      },
    },
  },
  {
    name: '活动', // 子应用名称
    entry: entry.activity, // 获取上面 ENTRY_MAP 中对应的 url
    // 如果 url 符合以下条件，则加载督学笔记应用
    activeRule: (location) => {
      return location.pathname.startsWith(`${_PATH_STRING}/activity`);
    },
    // 属性中配置应用的 appId 和 appName，之前是写死在应用中的，现在统一放在容器层配置
    props: {
      // 必填
      appId: 81,
      // 必填
      appName: '活动',
      // 选填，如果子应用跟容器默认的用户切换组件配置不一致，则可以提供 switchUserProps 覆盖默认配置
      switchUserProps: {
        isMultiOrg: 0,
        showBackBtn: true,
        hasBackToWorkbench: false,
        showCompChange: false,
        // showCompChange: false,
      },
    },
  },
];
