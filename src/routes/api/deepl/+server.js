import { json, error } from '@sveltejs/kit';

import * as deepl from 'deepl-node';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	const deeplKey = import.meta.env.VITE_DEEPL_KEY || import.meta.env.DEEPL_KEY;
	const translator = new deepl.Translator(deeplKey);
	const { text } = await request.json();

	let result = await translator.translateText(text, 'en', 'ru').catch((error) => {
		throw error(400, 'something wrong');
	});

	let translation = result.text;

	return json({
		translation,
	});
}
