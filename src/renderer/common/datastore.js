import { remote } from 'electron';
import NeDB from 'nedb';
import path from 'path';

const dataPath = remote.app.getPath('userData');
const resolve = dir => path.join(dataPath, dir);

const config = {
  autoload: true,
  timestampData: true
};

export default {
  prod: new NeDB({
    ...config,
    filename: resolve('/prod.db'),
  }),
  test: new NeDB({
    ...config,
    filename: resolve('/test.db'),
  }),
};
