import { Notification } from 'electron';
import { previewIcon } from '../config';

export function showNotify (title, body) {
  try {
    if (!title || !body) return;
    const options = Object.assign({
      icon: previewIcon,
      title: '',
      body: '',
    }, {
      title,
      body,
    });
    new Notification(options).show();
  } catch (error) {
    console.warn(error);
  }
}