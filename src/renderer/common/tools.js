/* eslint-disable no-undef */
import { isObject } from 'lodash';
// const previewIcon = '/img/logo.png';
export const isProd = process.env.NODE_ENV === 'development';
const previewIcon = isProd ? '/img/tray.ico' : `${__static}/img/tray.ico`;

export function getSkinBg (skinInfo) {
  if (skinInfo.type === 'color') {
    return { 'background-color': skinInfo.bg }
  } else if (skinInfo.type === 'image') {
    return { 'background-image': skinInfo.bg }
  }
}

/**
 * 显示通知
 * @param {*} data  String|Object
 * @return 通知实例
 */
export function showNotify (data) {
  if (!window.Notification) {
    console.log('不支持Notification');
    return;
  }
  let title = '';
  if (typeof data === 'string') {
    title = data;
  } else if (isObject(data)) {
    title = data.title;
  }
  if (!title) return;
  const options = Object.assign({
    icon: previewIcon,
    body: '',
    tag: '',
    renotify: false,
    requireInteraction: true,
  }, {
    body: data.body,
    tag: data.tag,
  });
  return new Promise((resolve, reject) => {
    let myNotify;
    if (Notification.permission === 'granted') { // 检查用户曾经是否同意接受通知
      const myNotify = new Notification(title, options); // 显示通知
      resolve(myNotify);
    } else if (Notification.permission === 'default') { // 用户还未选择，可以询问用户是否同意发送通知
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const myNotify = new Notification(title, options); // 显示通知
          resolve(myNotify);
        } else if (permission === 'default') { // 用户关闭授权 未刷新页面之前 可以再次请求授权
          reject('用户关闭授权');
        } else {
          reject('用户拒绝授权');
        }
      });
    } else {
      reject('用户曾经拒绝授权');
    }
    myNotify.onclick= () => {
      resolve();
    }
  });
}