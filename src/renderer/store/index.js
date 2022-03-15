import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import persistStatePlugin from './plugins/keep-state';

let files = require.context('./modules', false, /\.js$/);
let modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

const myPlugin = persistStatePlugin([
  'global',
  'settings',
]);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [
    myPlugin,
  ],
});
