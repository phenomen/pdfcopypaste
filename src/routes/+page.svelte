<script>
	import { copy, paste } from 'svu/action';

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
		<div class="mt-2 flex gap-1 sm:gap-2">
			<button use:paste={'#originalCopyArea'} class="bg-blue-600  hover:bg-blue-700"
				><span class="icon i-tabler-book-upload" /> Вставить из буфера
			</button>
			<button on:click={() => (originalCopy = '')} class="bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700">
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
			<button use:copy={'#fixedCopyArea'} class="bg-blue-600  hover:bg-blue-700"
				><span class="icon i-tabler-book-download" /> Скопировать в буфер
			</button>
			<button on:click={() => translate(fixedCopy)} class="bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700">
				<span class="icon i-tabler-language" /> Перевести
			</button>
		</div>
	</div>
</div>
