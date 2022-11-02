import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [
        VantResolve()
      ],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name)=> {
            return `../es/${name}/style`;
          },
        }
      ]
    }),
    Components({ 
      resolvers: [
        AntDesignVueResolver()
      ]
     }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})