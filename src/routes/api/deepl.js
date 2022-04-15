import 'dotenv/config';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const deeplKey = process.env.DEEPL;
	const { text } = await request.json();

	const deeplApi = 'https://api-free.deepl.com/v2/translate?auth_key=' + deeplKey + '&text=' + text + '&target_lang=EN';

	const translation = await fetch(deeplApi).then((response) => response.json());

	if (translation) {
		return {
			body: translation,
		};
	}

	return {
		status: 404,
	};
}
