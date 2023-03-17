<script lang="ts">
	import TablerClipboardText from '~icons/tabler/clipboard-text';
	import TablerTextWrap from '~icons/tabler/text-wrap';
	import TablerEraser from '~icons/tabler/eraser';
	import TablerBrandGithub from '~icons/tabler/brand-github';
	import TablerBrandOpenai from '~icons/tabler/brand-openai';
	import TablerBrandVercel from '~icons/tabler/brand-vercel';

	let loading = false;

	let userPrompt = '';
	let errorMessage: string | undefined = '';

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
	}

	async function formatAI() {
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
	}
</script>

<div class="my-6 text-center ">
	<h1 class="text-4xl font-bold uppercase">
		<span class="text-blue-500">PDF</span>COPYPASTE
	</h1>
	<span class="font-mono text-gray-400">automatic correction of line and word breaks</span>
</div>

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

<div class="mx-auto mt-6 text-sm text-gray-500">
	<p><strong>Quick Fix:</strong> instant, does not preserve paragraphs.</p>
	<p>
		<strong>AI Fix:</strong> slower, has a character limit, preserves paragraphs.
	</p>
</div>

<div class="mx-auto mt-20 flex gap-6 text-sm text-gray-500">
	<a
		href="https://github.com/phenomen/pdfcopypaste"
		class="flex gap-1 hover:text-gray-900"
		target="_blank"
	>
		<TablerBrandGithub />
		@phenomen</a
	>
	<a href="https://vercel.com/" class="flex gap-1 hover:text-gray-900" target="_blank">
		<TablerBrandVercel />
		Vercel</a
	>

	<a href="https://openai.com/" class="flex gap-1 hover:text-gray-900" target="_blank">
		<TablerBrandOpenai />
		OpenAI</a
	>
</div>
