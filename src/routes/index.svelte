<script>
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let originalCopy = '';
	let fixedCopy = '';

	function copyClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r)/g, ' ')
		.replace(/  /g, ' ')
		.replace(/- /g, '')
		.replace(/‑/g, '-');
</script>

<SvelteToast />

<div class="mx-auto min-h-screen max-w-screen-lg">
	<div class="mx-5">
		<h1 class="pt-5 text-center text-4xl font-bold uppercase">
			<span class="text-indigo-600">PDF</span>COPYPASTE
		</h1>
		<p class="mb-5 text-center text-sm text-gray-500">Очистка текста от переносов строк и слов</p>

		<div class="flex w-full flex-row space-x-2">
			<div class="form-control flex-1">
				<textarea
					class="textarea h-96 w-full rounded border border-gray-400 p-2"
					placeholder="Ctrl+V — вставьте оригинальный текст"
					bind:value={originalCopy}
				/>
			</div>

			<div class="form-control flex-1">
				<textarea
					class="textarea h-96 w-full rounded border border-emerald-400 p-2"
					placeholder="Ctrl+C — скопируйте исправленный текст"
					bind:value={fixedCopy}
				/>
			</div>
		</div>

		<div class="my-5">
			<button
				on:click={() => copyClipboard(fixedCopy)}
				on:click={() => toast.push('Текст скопирован в буфер')}
				class="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700"
			>
				Скопировать в буфер обмена
			</button>
		</div>
		<p class="mty-10 text-center text-sm text-gray-500">
			Приложение PDFCOPYPASTE создано <span class="font-medium">Phenomen#1337</span>. Исходный код
			доступен на
			<a
				class="text-indigo-600 underline"
				href="https://github.com/Phenomen/pdfcopypaste"
				target="_blank"
				>GitHub
			</a>
		</p>
	</div>
</div>
