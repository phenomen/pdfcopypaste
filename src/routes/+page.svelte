<script>
	let originalCopy = '';
	let fixedCopy = '';

	function copyClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	function toSentenceCase() {
		let textarea = document.getElementById('fixedCopyArea');

		let start = textarea.selectionStart;
		let end = textarea.selectionEnd;
		let selectedText = textarea.value.substring(start, end);

		let newText = '';
		for (let i = 0; i < selectedText.length; i++) {
			if (i === 0) {
				newText += selectedText[i].toUpperCase();
			} else if (selectedText[i - 1] === '.') {
				newText += ' ' + selectedText[i].toUpperCase();
			} else {
				newText += selectedText[i].toLowerCase();
			}
		}
		textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r|	)/g, ' ')
		.replace(/(  )/g, ' ')
		.replace(//g, '')
		.replace(/‑/g, '-')
		.replace(/- /g, '');
</script>

<div class="flex flex-col gap-2 sm:flex-row mx-auto w-full">
	<div class="flex-1">
		<textarea
			id="originalCopyArea"
			class=" dark:bg-slate-800 dark:text-white"
			placeholder="Ctrl+V — вставьте оригинальный текст"
			bind:value={originalCopy}
		/>
		<div class="mt-2 flex">
			<button on:click={() => (originalCopy = '')}>
				<span class="icon i-tabler-eraser" /> Очистить
			</button>
		</div>
	</div>

	<div class="flex-1">
		<textarea
			id="fixedCopyArea"
			name="fixedCopyArea"
			class="dark:bg-slate-800 dark:text-white"
			placeholder="Ctrl+C — скопируйте исправленный текст"
			bind:value={fixedCopy}
		/>
		<div class="mt-2 flex gap-1 sm:gap-2">
			<button on:click={() => copyClipboard(fixedCopy)}><span class="icon i-tabler-book-download" /> Скопировать в буфер </button>

			<button on:click={() => toSentenceCase()}><span class="icon i-tabler-letter-case" /> Исправить регистр </button>
		</div>
	</div>
</div>
