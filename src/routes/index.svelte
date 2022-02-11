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

<div class="mx-auto min-h-screen max-w-screen-sm md:max-w-screen-md">
	<div class="mx-5">
		<h1 class="pt-5 text-center text-4xl font-bold uppercase">
			<span class="text-blue-600">PDF</span>COPYPASTE
		</h1>
		<p class="mb-5 text-center text-sm text-gray-500">Очистка текста от переносов строк и слов.</p>
		<div class="form-control">
			<textarea
				class="textarea-bordered textarea h-32 md:h-64"
				placeholder="Ctrl+V — вставьте оригинальный текст"
				bind:value={originalCopy}
			/>
		</div>

		<div class="form-control my-5">
			<textarea
				class="textarea-bordered textarea-success textarea h-32 md:h-64"
				placeholder="Ctrl+C — скопируйте исправленный текст"
				bind:value={fixedCopy}
			/>

			<div class="my-5">
				<button
					on:click={() => copyClipboard(fixedCopy)}
					on:click={() => toast.push('Текст скопирован в буфер')}
					class="btn btn-block"
				>
					Скопировать в буфер обмена
				</button>
			</div>
		</div>
		<p class="mty-10 text-center text-sm text-gray-500">
			Приложение PDFCOPYPASTE создано @Phenomen. Исходный код доступен на
			<a class="link-primary link" href="https://github.com/Phenomen/pdfcopypaste" target="_blank"
				>GitHub
			</a>
		</p>
	</div>
</div>
