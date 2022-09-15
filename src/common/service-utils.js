export const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'dev' }
).content;

export function GetQueryString(name) {
  const regArr = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(regArr);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
