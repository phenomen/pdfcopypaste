<script>
	let originalCopy = '';
	let fixedCopy = '';

	function copyClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r)/g, ' ')
		.replaceAll('‑ ', '')
		.replaceAll('  ', ' ')
		.replaceAll('‑', '-')
		.replaceAll('- ', '');
</script>

<div class="max-w-screen-sm md:max-w-screen-md mx-auto min-h-screen">
	<div class="mx-5">
		<h1 class="pt-5 text-4xl uppercase font-bold text-center">PDFCOPYPASTE</h1>
		<p class="mb-5 text-gray-500 text-sm text-center">Очистка текста от переносов строк и слов.</p>
		<div class="form-control">
			<textarea
				class="textarea md:h-64 h-32 textarea-bordered"
				placeholder="Ctrl+V — вставьте оригинальный текст"
				bind:value={originalCopy}
			/>
		</div>

		<div class="form-control my-5">
			<textarea
				class="textarea md:h-64 h-32 textarea-success textarea-bordered"
				placeholder="Ctrl+C — скопируйте исправленный текст"
				bind:value={fixedCopy}
			/>

			<div class="my-5">
				<button on:click={() => copyClipboard(fixedCopy)} class="btn btn-block">
					Скопировать в буфер обмена
				</button>
			</div>
		</div>
		<p class="mty-10 text-sm text-gray-500 text-center">
			Приложение PDFCOPYPASTE создано @Phenomen. Исходный код доступен на
			<a class="link link-primary" href="https://github.com/Phenomen/pdfcopypaste" target="_blank"
				>GitHub
			</a>
		</p>
	</div>
</div>
