import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { presetUno, extractorSvelte, transformerDirectives } from 'unocss';
import Icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Unocss({
			extractors: [extractorSvelte],
			transformers: [transformerDirectives()],
			presets: [presetUno()],
		}),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			scale: 1.5,
		}),
	],
};

export default config;
