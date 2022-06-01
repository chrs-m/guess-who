const { resolve } = require('path');
const { defineConfig } = require('vite');

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
