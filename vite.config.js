import { sveltekit } from '@sveltejs/kit/vite';
import UnoCss from 'unocss/vite';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		UnoCss({
			extractors: [extractorSvelte],
			presets: [presetUno(), presetIcons()],
			transformers: [transformerDirective()],
		}),
		sveltekit(),
	],
};

export default config;
