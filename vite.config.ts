import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
    return {
        resolve: {
            alias: {
                '@components': '/src/components',
                '@config': '/src/config',
                '@context': '/src/context',
                '@layouts': '/src/layouts',
                '@pages': '/src/pages',
                '@routes': '/src/routes',
                '@services': '/src/services',
            }
        },
        plugins: [react()],
        server: { port: parseInt(process.env.VITE_APP_PORT || '3000', 10) }
    }
})
