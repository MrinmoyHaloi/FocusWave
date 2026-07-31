import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: { '@styles': path.resolve('src') }
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@styles/variables.scss" as *;'
			}
		}
	}
});
