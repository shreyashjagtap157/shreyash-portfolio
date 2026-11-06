import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
// Preview build only: inlines everything into one HTML file. Production uses vite.config.ts.
export default defineConfig({ base: './', plugins: [react(), viteSingleFile()], build: { outDir: 'dist-single', target: 'es2022', assetsInlineLimit: 100000000 } })
