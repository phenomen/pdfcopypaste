import { createParser } from 'eventsource-parser';
import { OPENAI_API_KEY } from '$env/static/private';

const key = OPENAI_API_KEY;

async function OpenAIStream(payload: any) {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	let counter = 0;

	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${key}`
		},
		method: 'POST',
		body: JSON.stringify(payload)
	});

	const stream = new ReadableStream({
		async start(controller) {
			function onParse(event: any) {
				if (event.type === 'event') {
					const data = event.data;
					// https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
					if (data === '[DONE]') {
						controller.close();
						return;
					}
					try {
						const json = JSON.parse(data);
						const text = json.choices[0].message.content;

						if (counter < 2 && (text.match(/\n/) || []).length) {
							// this is a prefix character (i.e., "\n\n"), do nothing
							return;
						}

						const queue = encoder.encode(text);
						controller.enqueue(queue);
						counter++;
					} catch (e) {
						controller.error(e);
					}
				}
			}

			// stream response (SSE) from OpenAI may be fragmented into multiple chunks
			// this ensures we properly read chunks and invoke an event for each SSE event stream
			const parser = createParser(onParse);
			// https://web.dev/streams/#asynchronous-iteration
			for await (const chunk of res.body as any) {
				parser.feed(decoder.decode(chunk));
			}
		}
	});
	return stream;
}

export async function POST({ request }: { request: any }) {
	const { prompt } = await request.json();

	const messages = [];

	messages.push({
		role: 'system',
		content:
			'This text was copied from PDF. It has incorrect line and word breaks. Format it by joining strings and words where needed. Keep paragraphs. Do not add anything extra. Text:'
	});
	messages.push({ role: 'user', content: prompt });

	const payload = {
		model: 'gpt-3.5-turbo',
		messages: messages,
		temperature: 0,
		max_tokens: 500,
		stream: true
	};

	console.log(payload);

	const stream = await OpenAIStream(payload);

	console.log(stream);
	return new Response(stream);
}
