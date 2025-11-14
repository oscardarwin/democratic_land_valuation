import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html' // 👈 REQUIRED for SPA mode
		}),
		prerender: {
			entries: [] // 👈 don't prerender anything
		}
	}
};

export default config;
