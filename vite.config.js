import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite'
import { presetIcons, presetUno, extractorSvelte } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'


/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Unocss({
			extractors: [extractorSvelte],
			presets: [presetUno(), presetIcons()],
			transformers: [transformerDirective()],
		}),
		sveltekit(),
	],
};

export default config;
