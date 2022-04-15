/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const deeplKey = import.meta.env.VITE_DEEPL;
	const { text } = await request.json();

	const deeplApi = 'https://api-free.deepl.com/v2/translate?auth_key=' + deeplKey + '&text=' + text + '&target_lang=RU';

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
