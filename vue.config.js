const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    exclude: [/_redirects/],

    // ...other Workbox options...
  },
});
