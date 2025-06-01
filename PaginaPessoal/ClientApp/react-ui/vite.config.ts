import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Encontrando o diretório atual usando ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Você pode usar o svg como componente React nativamente com Vite
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})