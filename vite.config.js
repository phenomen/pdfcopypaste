import { sveltekit } from '@sveltejs/kit/vite';
import UnoCss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import { extractorSvelte } from '@unocss/core';
import presetIcons from '@unocss/preset-icons';
import transformerDirective from '@unocss/transformer-directives';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		UnoCss({
			extractors: [extractorSvelte],
			presets: [presetUno(), presetIcons()],
			transformers: [transformerDirective()],
		}),
	],
	optimizeDeps: {
		exclude: ['svu', 'svu/*'],
	},
	ssr: {
		noExternal: ['devalue', 'svu', 'svu/*'],
	},
};

export default config;
