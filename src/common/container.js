export const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'dev' }
).content;

export function funVerifySystemKernel() {
  return /wxwork/i.test(navigator.userAgent);
}

export const defaultUserSwitchOptions = {
  setDefaultUser: true,
  userFilterType: funVerifySystemKernel() ? 1 : 3,
  isMultiOrg: 1,
  APIEnv: ENV,
  showBackBtn: true,
  hasBackToWorkbench: true,
  // workbenchUrl: '/containers/micro/app/microWorkbenchPortal/application',
};
