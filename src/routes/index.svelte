<script>
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let originalCopy = '';
	let fixedCopy = '';

	function copyClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	async function translate(text) {
		const response = await fetch('/api/deepl', { method: 'POST', body: JSON.stringify({ text: text }) })
			.then((response) => response.json())
			.then((data) => {
				fixedCopy = data.translations[0].text;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r)/g, ' ')
		.replace(/	/g, ' ')
		.replace(/  /g, ' ')
		.replace(/- /g, '')
		.replace(/‑ /g, '')
		.replace(/‑/g, '-');
</script>

<svelte:head>
	<title>PDFCOPYPASTE</title>
	<meta name="description" content="Исправление текста при копировании из PDF" />
</svelte:head>

<SvelteToast />

<div class="mx-auto min-h-screen max-w-screen-lg">
	<div class="mx-5">
		<h1 class="pt-5 text-center text-4xl font-bold uppercase">
			<span class="text-indigo-600">PDF</span>COPYPASTE
		</h1>
		<p class="mb-5 text-center text-sm text-gray-500">Очистка текста от переносов строк и слов</p>

		<div class="flex w-full flex-row space-x-2">
			<div class="flex-1">
				<textarea
					class="form-textarea h-96 w-full rounded border border-indigo-600 p-2"
					placeholder="Ctrl+V — вставьте оригинальный текст"
					bind:value={originalCopy}
				/>
				<button
					on:click={() => (originalCopy = '')}
					class="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700"
				>
					Очистить текст
				</button>
			</div>

			<div class="flex-1">
				<textarea
					class="form-textarea h-96 w-full rounded border border-emerald-400 p-2"
					placeholder="Ctrl+C — скопируйте исправленный текст"
					bind:value={fixedCopy}
				/>
				<button
					on:click={() => copyClipboard(fixedCopy)}
					on:click={() => toast.push('Текст скопирован в буфер')}
					class="w-full justify-center rounded-md border border-transparent bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700"
				>
					Скопировать в буфер
				</button>
				<button
					on:click={() => translate(fixedCopy)}
					class="mt-2 w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
				>
					Перевести
				</button>
			</div>
		</div>

		<p class="mt-10 text-center text-sm text-gray-400 md:mt-20">
			Приложение <span class="font-medium">PDFCOPYPASTE</span> создано
			<span class="font-medium">Phenomen#1337</span>. Исходный код доступен на
			<a class="text-indigo-500 underline" href="https://github.com/phenomen/pdfcopypaste" target="_blank"> GitHub </a>
		</p>
	</div>
</div>
