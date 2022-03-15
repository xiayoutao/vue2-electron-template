import { exec } from 'child_process';
import iconv from 'iconv-lite';

var encoding = 'cp936';
var binaryEncoding = 'binary';

const AUTO_RUN = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'; // 开机自启动注册表位置

// 获取系统自启动列表
export async  function getSystemAutoRun () {
  return new Promise((resolve, reject) => {
    exec(`REG QUERY ${AUTO_RUN}`, { encoding: binaryEncoding }, (err, stdout) => {
      if (!err) {
        const result = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

// 判断程序是否设置了自启动
export async function checkAppAutoRun (data) {
  return new Promise((resolve, reject) => {
    exec(`REG QUERY ${AUTO_RUN}`, { encoding: binaryEncoding }, (err, stdout) => {
      if (!err) {
        const result = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
        const flag = result.indexOf(data.name) >= 0 && result.indexOf(data.path) >= 0;
        resolve(flag);
      } else {
        reject(false);
      }
    });
  });
}

// 程序开启自启动设置
export async  function setAppAutoRun (data, flag) {
  return new Promise((resolve, reject) => {
    let cmd = '';
    if (flag) {
      cmd = `REG ADD ${AUTO_RUN} /v ${data.name} /t REG_SZ /d "${data.path}" /f`;
    } else {
      cmd = `REG DELETE ${AUTO_RUN} /v ${data.name} /f`
    }
    exec(cmd, { encoding: binaryEncoding }, (err, stdout) => {
      if (!err) {
        const result = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}