const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const packageJson = require('./package.json');

module.exports = {
  runtimeCompiler: true,
  devServer: {
    open: !process.argv.includes('electron:serve'),
    port: 5000,
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/styles/variables.scss";'
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    entry: './src/renderer/main.js',
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        '@cps': resolve('src/renderer/components'),
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  // 第三方插件配置
  pluginOptions: {
    // vue-cli-plugin-electron-builder配置
    electronBuilder: {
      appId: packageJson.appId,
      nodeIntegration: true,
      nodeModulesPath: ['./node_modules'],
      mainProcessFile: 'src/main/main.js',
      mainProcessWatch: ['src/main'],
      builderOptions: {
        productName: packageJson.productName,
        copyright: packageJson.copyright,
        asar: true,
        compression: 'maximum',
        files: [
          '**/*'
        ],
        win: {
          icon: 'build/electron-icon/icon.ico',
          requestedExecutionLevel: 'highestAvailable',
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          target: [{
            // 打包成一个独立的 exe 安装程序
            target: 'nsis',
            // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
            arch: [
              'x64',
              'ia32'
            ]
          }],
        },
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          perMachine: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: false,
          runAfterFinish: true,
          // 安装图标
          installerIcon: 'build/electron-icon/icon.ico',
          // 卸载图标
          uninstallerIcon: 'build/electron-icon/uninst.ico',
          // 安装时头部图标
          installerHeaderIcon: 'build/electron-icon/icon.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true,
          deleteAppDataOnUninstall: true,
          include: 'build/installer.nsh',
        }
      }
    }
  },
}