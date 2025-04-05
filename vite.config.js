import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['36bf-2401-4900-7dcb-2750-40db-b375-7f3a-cd66.ngrok-free.app'],
  },
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     allowedHosts: ['36bf-2401-4900-7dcb-2750-40db-b375-7f3a-cd66.ngrok-free.app'],
//     proxy: {
//       "/api": {
//         target: "https://spade.tools",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// })