import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		appDir: 'app',
		adapter: adapter({
			fallback: 'index.html'
		}),
		prerender: {
			entries: []
		},
		paths: {
			base: process.argv.includes('dev') ? '' : '/democratic_land_valuation'
		}
	}
};

export default config;
