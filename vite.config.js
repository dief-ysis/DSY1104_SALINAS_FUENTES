import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Generar sourcemaps facilita la depuración de errores en producción (opcional)
    sourcemap: false,
    // Asegurar que la salida sea estándar
    outDir: 'dist',
  },
  // En Vercel, generalmente no necesitas definir 'base' a menos que sea un subdirectorio
  // base: '/' es el default y está bien.
});