import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function POST({ request }) {
	const data = await request.json();

	const prompt: string = data.prompt as string;

	const dialog: ChatCompletionRequestMessage[] = [];

	dialog.push({
		role: 'system',
		content:
			'This text was copied from PDF. It has incorrect line and word breaks. Format it by joining strings and words where needed. Keep paragraphs. Do not add anything extra. Text:'
	});
	dialog.push({ role: 'user', content: prompt });

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY
	});

	const openai = new OpenAIApi(configuration);

	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: dialog,
			temperature: 0,
			n: 1,
			max_tokens: 1000
		});

		const message = response.data.choices[0].message as ChatCompletionRequestMessage;

		return json({
			message
		});
	} catch (error) {
		console.error(error);
		return json({
			error
		});
	}
}
