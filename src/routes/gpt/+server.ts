import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function POST({ request }) {
	const data = await request.json();

	const question = data.textCopy as string;

	let dialog: ChatCompletionRequestMessage[] = [];

	dialog.push({
		role: 'system',
		content:
			'This text was copied from PDF and has incorrect line and word breaks. Format it by joining strings and words as needed. Preserve paragraphs. Do not add anything extra. Text:',
	});
	dialog.push({ role: 'user', content: question });

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: dialog,
		temperature: 0,
		max_tokens: 1000,
	});

	const message = response.data.choices[0].message as ChatCompletionRequestMessage;

	return json({
		message,
	});
}
