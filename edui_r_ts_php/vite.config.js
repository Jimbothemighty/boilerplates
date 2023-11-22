// @ts-nocheck
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from "rollup-plugin-visualizer"
//import liveReload from 'vite-plugin-live-reload'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.ttf'],
  css: {
    modules: {
      // https://github.com/webpack/loader-utils#interpolatename
      generateScopedName: `[folder]__[local]`,
      // @ts-ignore
      root: `.`,
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, `src`),
    },
  },
  plugins: [
    react(),
    svgr(),
    visualizer({
      emitFile: true,
    }),
    // liveReload([
    //   // update of php source will trigger browser reload
    //   __dirname + '/**/*.php',
    // ]),
  ],
  build: {
    outDir: "dist", // output dir for production build
    emptyOutDir: true,
    manifest: true, // emit manifest so PHP can find the hashed files
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.tsx"), // our entry
      }
    }
  },
	server: {
		// we need a strict port to match on PHP side
		// change freely, but update on PHP to match the same port
		// tip: choose a different port per project to run them at the same time
		strictPort: true,
		port: 5133
	},
})
