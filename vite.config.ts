import path from "path";
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Unocss from "unocss/vite";
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
        dts: "src/components.d.ts",
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()],
      }),
    ],
    server: {
      proxy: {
        // 反向代理解决跨域
        [env.VITE_APP_BASE_API]: {
          target: "http://vapi.youlai.tech/api/v1", // 线上接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""), // 替换 /dev-api 为 target 接口地址
        },
      },
    },
  };
});
