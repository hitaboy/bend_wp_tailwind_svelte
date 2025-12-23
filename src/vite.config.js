import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Plugin to watch parent PHP files and trigger rebuild
function watchExternalFiles(patterns) {
	return {
		name: 'watch-external',
		async buildStart() {
			if (this.meta.watchMode) {
				const files = await glob(patterns, { cwd: resolve(__dirname, '..'), absolute: true });
				files.forEach(file => {
					this.addWatchFile(file);
				});
			}
		}
	};
}

export default defineConfig(({ mode }) => {
	// Library build mode
	if (mode === 'lib') {
		return {
			plugins: [
				svelte(),
				watchExternalFiles(['*.php', 'inc/**/*.php', 'templates/**/*.php'])
			],
			build: {
				lib: {
					entry: resolve(__dirname, 'src/lib/index.js'),
					name: 'MyLibrary', // Global variable name when loaded via script tag
					formats: ['iife', 'es', 'umd'],
					fileName: (format) => `bundle.${format}.js`
				},
				rollupOptions: {
					// Externalize dependencies you don't want bundled
					external: [],
					output: {
						// For IIFE format, provide global variable names for external dependencies
						globals: {},
						entryFileNames: 'js/bundle.[format].js',
						assetFileNames: 'css/bundle.css'
					}
				},
				outDir: '../assets',
				emptyOutDir: false
			}
		};
	}

	// Default SvelteKit dev/build mode
	return {
		plugins: [sveltekit()]
	};
});
