/* eslint-disable no-undef */
import axios from 'axios';
import { stringify } from 'qs';
import { Message } from 'element-ui';

const baseUrl = '/guns';

const http = axios.create({
  timeout: 1000 * 60 * 5, // 5分钟超时，考虑到有导出功能，数据量大
  withCredentials: true,
});

// 请求拦截
http.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(response => {
  if (response && response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject();
}, error => {
  console.log(error);
  return Promise.reject();
});

/**
 * 接口地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  if (/^http(s?):\/\//.test(actionName)) {
    return actionName;
  }
  // 非生产环境 && 开启代理, 接口前缀统一使用[/adminApi/]前缀做代理拦截!
  return baseUrl + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 */
http.adornParams = (params = {}) => {
  return params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 */
http.adornData = (data = {}, contentType = '') => {
  if (contentType === 'json' || contentType === 'upload') {
    return data;
  }
  return stringify(data);
};

http.handleData = options => {
  options = Object.assign({
    processing: true, // 是否处理响应结果（如不同状态的提示）
    successCode: 200, // 成功返回回调状态
    code: 200, // 接口返回状态
    entity: true, // 请求接口回调数据
    message: '',
  }, options);
  if (options.code !== options.successCode) {
    if (options.processing) {
      Message.error({
        type: 'warning',
        message: options.message,
      });
    }
  }
  return options.entity;
};

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    http({
      url: http.adornUrl(url),
      method: 'get',
      params: http.adornParams(params),
    }).then(({ data }) => {
      if (data.code !== 200) {
        reject(data.message);
      } else {
        resolve(http.handleData(data));
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export async function post (url, data, contentType = '') {
  let headersContentType = 'application/x-www-form-urlencoded;charset=UTF-8'; // 默认
  if (contentType === 'json') { // json
    headersContentType = 'application/json; charset=utf-8';
  } else if (contentType === 'form') { // 表单
    headersContentType = 'multipart/form-data'; // 目前后端没有写这种类型的接口
  }
  return new Promise((resolve, reject) => {
    http({
      url: http.adornUrl(url),
      method: 'post',
      data: http.adornData(data, contentType),
      headers: {
        'Content-Type': headersContentType,
      },
    }).then(({ data }) => {
      resolve(http.handleData(data));
    }).catch(err => {
      reject(err);
    });
  });
}

// 上传文件
export function upload (url, data) {
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      processData: false,
      withCredentials: false,
    }).then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
}

export default http;