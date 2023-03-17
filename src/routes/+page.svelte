<script lang="ts">
	import { copy } from '$lib/utils/copy';
	import { wordCount } from '$lib/utils/string';
	import { fetchStream } from '$lib/utils/stream';

	import TablerClipboardText from '~icons/tabler/clipboard-text';
	import TablerTextWrap from '~icons/tabler/text-wrap';
	import TablerEraser from '~icons/tabler/eraser';
	import TablerBrandOpenai from '~icons/tabler/brand-openai';

	let loading = false;
	let autoClipboard = false;

	let userPrompt = '';
	let errorMessage: string | undefined = '';

	function formatSimple() {
		userPrompt = userPrompt
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/( {2})/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');

		if (autoClipboard) {
			copy(userPrompt);
		}
	}

	async function formatAI() {
		if (loading) return;

		if (wordCount(userPrompt) < 10) {
			errorMessage = 'Text is too short.';
		} else if (wordCount(userPrompt) > 100) {
			errorMessage = 'Text length for AI formatting cannot exceed 100 words.';
		} else {
			errorMessage = '';
			loading = true;
			try {
				const response = await fetch('/api/gpt', {
					method: 'POST',
					body: JSON.stringify({ prompt: userPrompt }),
					headers: {
						'content-type': 'application/json'
					}
				});
				if (!response.ok) throw new Error('Response timeout. OpenAI GPT is too busy.');

				userPrompt = '';

				await fetchStream(response, (chunk) => {
					userPrompt += chunk;
				});

				if (autoClipboard) {
					copy(userPrompt);
				}
			} catch (err) {
				errorMessage = 'Something went wrong :(';
			}
			loading = false;
		}
	}
</script>

<div>
	<div class="mx-auto w-full gap-2">
		<textarea
			id="userPrompt"
			name="userPrompt"
			disabled={loading}
			placeholder="Paste your text here, then use the formatting tools below."
			class=" h-96 w-full rounded border border-black p-2 shadow-md disabled:cursor-not-allowed disabled:bg-gray-200"
			bind:value={userPrompt}
			autocomplete="off"
			required
		/>
	</div>

	<div class="mt-4 grid grid-cols-4 gap-1 sm:gap-2">
		<button
			type="button"
			class="bg-emerald-500 hover:bg-emerald-600"
			on:click={() => formatSimple()}><TablerTextWrap /> Quick Fix</button
		>

		<button
			type="button"
			on:click={() => formatAI()}
			class="bg-gray-900 hover:bg-black disabled:animate-pulse disabled:cursor-not-allowed"
			disabled={loading}><TablerBrandOpenai /> AI Fix</button
		>

		<button type="button" class="bg-blue-500 hover:bg-blue-600 " on:click={() => copy(userPrompt)}
			><TablerClipboardText /> Copy</button
		>

		<button type="button" class="bg-red-600 hover:bg-red-700" on:click={() => (userPrompt = '')}
			><TablerEraser /> Clear</button
		>
	</div>

	<div class="mt-4 text-center ">
		<p class="text-sm font-medium text-gray-600">{errorMessage}</p>
	</div>
</div>

<div class="mx-auto mt-4 text-sm text-gray-500">
	<p><strong>Quick Fix:</strong> instant, does not preserve paragraphs.</p>
	<p>
		<strong>AI Fix:</strong> slower, 100 words limit, preserves paragraphs.
	</p>
</div>

<div class="mx-auto mt-4 flex items-start">
	<div class="flex h-6 items-center">
		<input
			id="autoClipboard"
			name="autoClipboard"
			type="checkbox"
			class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
			bind:checked={autoClipboard}
		/>
	</div>
	<div class="ml-2 font-mono text-sm font-medium leading-6">
		<label for="autoClipboard">Copy to clipboard after fix</label>
	</div>
</div>
