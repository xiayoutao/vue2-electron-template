const defaultTitle = 'Electron Vue3 Demo';

export default {
  state: {
    defaultWindow: {
      actions: ['close'], // 菜单栏右侧按钮
      exclude: '', // 菜单栏右侧按钮排除项
      height: 360,
      headerHeight: 30, // 菜单栏高度
      title: defaultTitle,
      background: '#fff',
    },
    mainWindow: {
      actions: '*',
      exclude: 'max',
      height: 500,
      headerHeight: 110, // 菜单栏高度
      title: defaultTitle,
      background: '#fff',
    },
    skinsWindow: {
      height: 360,
      headerHeight: 30, // 菜单栏高度
      title: '皮肤中心',
    },
    settingWindow: {
      headerHeight: 30, // 菜单栏高度
      title: '设置',
    }
  },
  getters: {
    getWinOpts: state => name => {
      const data = state[name] || {};
      return {
        ...state.defaultWindow,
        ...data,
      }
    },
  },
}