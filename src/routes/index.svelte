<script>
	import { copy, paste, themetoggle } from 'svu/action';
	import { theme } from 'svu/client';

	let originalCopy = '';
	let fixedCopy = '';

	async function translate(text) {
		const response = await fetch('/api/deepl', { method: 'POST', body: JSON.stringify({ text: text }) })
			.then((response) => response.json())
			.then((data) => {
				fixedCopy = data.text;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r|	)/g, ' ')
		.replace(/(  )/g, ' ')
		.replace(/‑/g, '-')
		.replace(/- /g, '');
</script>

<div class="max-w-screen-x mx-auto min-h-screen">
	<div class="mx-5">
		<h1 class="pt-5 text-center text-4xl font-bold uppercase dark:text-white">
			<span class="text-blue-600">PDF</span>COPYPASTE
		</h1>
		<p class="mb-5 text-center text-sm text-slate-500 dark:text-slate-300">очистка текста от переносов строк и слов</p>

		<div class="flex w-full flex-row space-x-2">
			<div class="flex-1">
				<textarea
					id="originalCopyArea"
					class=" dark:bg-slate-700 dark:text-white"
					placeholder="Ctrl+V — вставьте оригинальный текст"
					bind:value={originalCopy}
				/>
				<div class="mt-2 flex flex-col gap-2 md:flex-row">
					<button use:paste={'#originalCopyArea'} class="bg-blue-600  hover:bg-blue-700"> Вставить из буфера </button>
					<button on:click={() => (originalCopy = '')} class="bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700">
						Очистить текст
					</button>
				</div>
			</div>

			<div class="flex-1">
				<textarea
					id="fixedCopyArea"
					name="fixedCopyArea"
					class="dark:bg-slate-700 dark:text-white"
					placeholder="Ctrl+C — скопируйте исправленный текст"
					bind:value={fixedCopy}
				/>
				<div class="mt-2 flex flex-col gap-2 md:flex-row">
					<button use:copy={'#fixedCopyArea'} class="bg-blue-600  hover:bg-blue-700"> Скопировать в буфер </button>
					<button on:click={() => translate(fixedCopy)} class="bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700">
						Перевести
					</button>
				</div>
			</div>
		</div>

		<div class="mt-10 text-center">
			<button
				use:themetoggle={['light', 'dark']}
				class="!w-20 bg-slate-300 p-4 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
			>
				{$theme === 'dark' ? '☀️' : '🌙'}
			</button>
		</div>

		<div class="mt-10 text-center text-sm text-slate-500 dark:text-slate-300">
			Приложение <span class="font-medium">PDFCOPYPASTE</span> создано
			<span class="font-medium">Phenomen#1337</span>. Исходный код доступен на
			<a class="text-indigo-500 underline" href="https://github.com/phenomen/pdfcopypaste" target="_blank"> GitHub </a>
		</div>
	</div>
</div>

<style>
	button {
		@apply w-full justify-center rounded-md border border-transparent py-3 text-sm font-medium text-white;
	}

	textarea {
		@apply h-96 w-full rounded border border-slate-600 p-2;
	}
</style>
