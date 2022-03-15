import { defaultDownloadFolder } from '@/common/config';

export default {
  state: {
    skins: [
      { type: 'image', name: 'default', actionColor: '#fff', headerLabelColor: '#fff', bg: 'linear-gradient(135deg,#4f92de 0%,#206abf 40%,#4f92de 70%,#206abf 100%)', mainBg: '#fff' },
      { type: 'image', name: 'a', actionColor: '#000', headerLabelColor: '#000', bg: `url(/skins/1.jpg)` },
      { type: 'image', name: 'b', actionColor: '#000', headerLabelColor: '#000', bg: 'url(/skins/2.jpg)' },
      { type: 'image', name: 'c', actionColor: '#000', headerLabelColor: '#000', bg: 'url(/skins/3.png)' },
    ],
    useSkin: 'default',
    downloadFolder: defaultDownloadFolder,
  },
  getters: {
    skinInfo: state => {
      const dataList = state.skins.filter(item => item.name === state.useSkin);
      if (dataList.length > 0) {
        return dataList[0];
      }
      return state.skins[0];
    },
  },
  mutations: {
    setSkin (state, skin) {
      state.useSkin = skin;
    },
    setDownloadFolder (state, folder) {
      state.downloadFolder = folder;
    }
  },
}
