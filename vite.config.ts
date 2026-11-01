import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// `base: './'` : chemins relatifs, le site marche aussi bien sur
// tonyoloti.github.io/anto-labs/ que sur le domaine final anto-labs.com.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
