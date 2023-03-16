<script lang="ts">
	import TablerClipboardText from '~icons/tabler/clipboard-text';
	import TablerTextWrap from '~icons/tabler/text-wrap';
	import TablerEraser from '~icons/tabler/eraser';
	import TablerBrandGithub from '~icons/tabler/brand-github';
	import TablerBrandOpenai from '~icons/tabler/brand-openai';
	import TablerBrandVercel from '~icons/tabler/brand-vercel';

	let loading = false;

	let textCopy: string = '';
	let errorMessage: string | undefined = '';

	function copyClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function formatSimple() {
		textCopy = textCopy
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/(  )/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');
	}

	async function formatAI() {
		loading = true;
		errorMessage = '';

		if (textCopy.length < 20) {
			errorMessage = 'Text is too short.';
		} else if (textCopy.length > 1500) {
			errorMessage = 'The text length for AI formatting cannot exceed 1500 characters.';
		} else {
			const data = { textCopy };

			const res = await fetch('/gpt', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const response = await res.json();

			if (response.message.content !== undefined || response.message.content !== null) {
				textCopy = response.message.content;
			} else {
				console.log(response);
				errorMessage = 'Something went wrong :(';
			}
		}

		loading = false;
	}
</script>

<div class="my-6 text-center ">
	<h1 class="text-4xl font-bold uppercase">
		<span class="text-blue-500">PDF</span>COPYPASTE
	</h1>
	<span class="text-gray-400">Automatic correction of line and word breaks</span>
</div>

<div>
	<div class="gap-2 mx-auto w-full">
		<textarea
			id="textCopy"
			name="textCopy"
			disabled={loading}
			placeholder="Paste the text here. Use the formatting tools below."
			class=" h-96 w-full rounded border border-gray-600 p-2 disabled:cursor-not-allowed disabled:bg-gray-300"
			bind:value={textCopy}
			autocomplete="off"
			required
		/>
	</div>

	<div class="mt-4 grid grid-cols-4 gap-1 sm:gap-2">
		<button
			type="button"
			class="bg-blue-500 hover:bg-blue-600"
			on:click={() => formatSimple()}
			title="Быстрое исправление"><TablerTextWrap /> Quick Fix</button
		>

		<button
			type="button"
			on:click={() => formatAI()}
			class="bg-gray-900 hover:bg-black disabled:animate-pulse disabled:cursor-not-allowed"
			disabled={loading}
			title="AI исправление"><TablerBrandOpenai /> AI Fix</button
		>

		<button
			type="button"
			class="bg-emerald-500 hover:bg-emerald-600"
			on:click={() => copyClipboard(textCopy)}
			title="Копирование в буфер"><TablerClipboardText /> Copy</button
		>

		<button
			type="button"
			class="bg-red-500 hover:bg-red-600"
			on:click={() => (textCopy = '')}
			title="Очистка текста"><TablerEraser /> Clear</button
		>
	</div>

	<div class="mt-4 text-center text-gray-500">
		{errorMessage}
	</div>
</div>

<div class="mx-auto mt-6 text-sm text-gray-500">
	<p><strong>Quick Fix</strong> works instantly, but does not preserve paragraphs.</p>
	<p><strong>AI Fix</strong> works slower, has a character limit, but preserves paragraphs.</p>
</div>

<div class="mx-auto mt-20 text-sm text-gray-500 flex gap-6">
	<a
		href="https://github.com/phenomen/pdfcopypaste"
		class="hover:text-gray-900 flex gap-1"
		target="_blank"
	>
		<TablerBrandGithub />
		@phenomen</a
	>
	<a
		href="https://vercel.com/"
		class="hover:text-gray-900 flex gap-1"
		target="_blank"
	>
		<TablerBrandVercel />
		Vercel</a
	>

	<a
		href="https://openai.com/"
		class="hover:text-gray-900 flex gap-1"
		target="_blank"
	>
		<TablerBrandOpenai />
		OpenAI</a
	>
</div>

<style lang="postcss">
	button {
		@apply flex w-full items-center justify-center gap-1 rounded-md py-2 text-xs font-medium text-white md:text-sm;
	}
</style>
