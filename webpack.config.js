import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    background: './src/background.js',
    popup: './src/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
};
