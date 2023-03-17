<script lang="ts">
	import TablerClipboardText from '~icons/tabler/clipboard-text';
	import TablerTextWrap from '~icons/tabler/text-wrap';
	import TablerEraser from '~icons/tabler/eraser';
	import TablerBrandOpenai from '~icons/tabler/brand-openai';

	let loading = false;
	let endStream = false;
	let userPrompt = '';
	let errorMessage: string | undefined = '';
	let autoClipboard = false;

	function copyClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function formatSimple() {
		userPrompt = userPrompt
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/( {2})/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');

		if (autoClipboard) {
			copyClipboard(userPrompt);
		}
	}

	async function formatAI() {
		if (loading) return;

		loading = true;
		endStream = false;
		errorMessage = '';

		if (userPrompt.length < 20) {
			errorMessage = 'Text is too short.';
		} else if (userPrompt.length > 1500) {
			errorMessage = 'The text length for AI cannot exceed 1500 characters.';
		} else {
			const response = await fetch('/api/gpt', {
				method: 'POST',
				body: JSON.stringify({ prompt: userPrompt }),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (response.ok) {
				try {
					const data = response.body;
					if (!data) {
						return;
					}
					const reader = data.getReader();
					const decoder = new TextDecoder();
					while (true) {
						const { value, done } = await reader.read();
						const chunkValue = decoder.decode(value);
						userPrompt += chunkValue;
						if (done) {
							endStream = true;
							break;
						}
					}
				} catch (err) {
					errorMessage = 'Looks like OpenAI timed out :(';
				}
			} else {
				errorMessage = await response.text();
			}
		}
		loading = false;
	}

	/* 	async function formatAI() {
		try {
			loading = true;
			errorMessage = '';

			if (userPrompt.length < 20) {
				errorMessage = 'Text is too short.';
			} else if (userPrompt.length > 1500) {
				errorMessage = 'The text length for AI formatting cannot exceed 1500 characters.';
			} else {
				const data = { prompt: userPrompt };

				const res = await fetch('/gpt', {
					method: 'POST',
					body: JSON.stringify(data)
				});

				const response = await res.json();

				if (response.message && response.message.content) {
					userPrompt = response.message.content;
					if (autoClipboard) {
						copyClipboard(userPrompt);
					}
				} else {
					errorMessage = 'Something went wrong :(';
				}
			}
		} catch (error) {
			console.error(error);
			errorMessage = 'Something went wrong :(';
		} finally {
			loading = false;
		}
	} */
</script>

<div>
	<div class="mx-auto w-full gap-2">
		<textarea
			id="userPrompt"
			name="userPrompt"
			disabled={loading}
			placeholder="Paste your text here, then use the formatting tools below."
			class=" h-96 w-full rounded border border-black p-2 shadow-md disabled:animate-pulse disabled:cursor-not-allowed"
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

		<button
			type="button"
			class="bg-blue-500 hover:bg-blue-600 "
			on:click={() => copyClipboard(userPrompt)}><TablerClipboardText /> Copy</button
		>

		<button type="button" class="bg-red-600 hover:bg-red-700" on:click={() => (userPrompt = '')}
			><TablerEraser /> Clear</button
		>
	</div>

	<div class="mt-4 text-center text-gray-500">
		{errorMessage}
	</div>
</div>

<div class="mx-auto mt-4 text-sm text-gray-500">
	<p><strong>Quick Fix:</strong> instant, does not preserve paragraphs.</p>
	<p>
		<strong>AI Fix:</strong> slower, has a character limit, preserves paragraphs.
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
	<div class="ml-2 text-sm font-medium leading-6">
		<label for="autoClipboard">Copy to clipboard after fix</label>
	</div>
</div>
