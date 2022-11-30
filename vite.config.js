import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { presetIcons, presetUno, extractorSvelte, transformerDirectives } from 'unocss';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Unocss({
			extractors: [extractorSvelte],
			transformers: [transformerDirectives()],
			presets: [presetUno(), presetIcons()],
		}),
		sveltekit(),
	],
};

export default config;
