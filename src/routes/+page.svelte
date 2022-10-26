<script>
	let originalCopy = '';
	let fixedCopy = '';

	async function translate(text) {
		const response = await fetch('/api/deepl', { method: 'POST', body: JSON.stringify({ text: text }) })
			.then((response) => response.json())
			.then((data) => {
				fixedCopy = data.translation;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	function copyClipboard(text) {
		navigator.clipboard.writeText(text);
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r|	)/g, ' ')
		.replace(/(  )/g, ' ')
		.replace(//g, '')
		.replace(/‑/g, '-')
		.replace(/- /g, '');
</script>

<div class="flex w-full flex-col gap-2 sm:flex-row">
	<div class="flex-1">
		<textarea
			id="originalCopyArea"
			class=" dark:bg-slate-800 dark:text-white"
			placeholder="Ctrl+V — вставьте оригинальный текст"
			bind:value={originalCopy}
		/>
		<div class="mt-2 flex">
			<button
				on:click={() => (originalCopy = '')}
					>
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
			<button
				on:click={() => copyClipboard(fixedCopy)}
							><span class="icon i-tabler-book-download" /> Скопировать в буфер
			</button>
		</div>
	</div>
</div>
