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

	function formatLinebraks() {
		textCopy = textCopy
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/(  )/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');
	}

	async function formatAI() {
		loading = true;

		if (textCopy.length < 1500) {
			const data = { textCopy };

			const res = await fetch('/gpt', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const response = await res.json();

			loading = false;

			if (response.message.content) {
				textCopy = response.message.content;
				errorMessage = '';
			} else {
				errorMessage = 'Что-то пошло не так';
			}
		} else {
			errorMessage = 'Длинна текста для AI форматирования не может превышать 1500 символов.';
		}

		loading = false;
	}
</script>

<div class="my-6 text-center ">
	<h1 class="text-4xl font-bold uppercase">
		<span class="text-blue-500">PDF</span>COPYPASTE
	</h1>
	<span class="text-slate-400">Автоматическое исправление разрывов строк и слов</span>
</div>

<div>
	<div class="gap-2 mx-auto w-full">
		<textarea
			id="textCopy"
			name="textCopy"
			disabled={loading}
			placeholder="Вставьте сюда текст для исправления. Используйте инструменты форматирования ниже."
			class=" h-96 w-full rounded border border-gray-600 p-2 disabled:cursor-not-allowed disabled:bg-gray-100"
			bind:value={textCopy}
			autocomplete="off"
			required
		/>
	</div>

	<div class="mt-4 grid grid-cols-4 gap-1 sm:gap-2">
		<button
			type="button"
			class="!bg-blue-500"
			on:click={() => formatLinebraks()}
			title="Быстрое исправление"><TablerTextWrap /> Быстрое исправление</button
		>

		<button
			type="button"
			on:click={() => formatAI()}
			class="!bg-black disabled:animate-pulse disabled:cursor-not-allowed "
			disabled={loading}
			title="AI исправление"><TablerBrandOpenai /> AI исправление</button
		>

		<button
			type="button"
			class="!bg-emerald-500"
			on:click={() => copyClipboard(textCopy)}
			title="Копирование в буфер"><TablerClipboardText /> Копирование</button
		>

		<button
			type="button"
			class="!bg-red-500"
			on:click={() => (textCopy = '')}
			title="Очистка текста"><TablerEraser /> Очистка</button
		>
	</div>

	<div class="mt-4 text-center text-gray-500">
		{errorMessage}
	</div>
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
