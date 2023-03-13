<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	let originalCopy: string = '';
	let fixedCopy: string = '';

	function copyClipboard(text: string) {
		navigator.clipboard.writeText(text);
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
		</div>
	</div>
</div>

<details class="mt-8 w-full max-w-5xl mx-auto prose prose-slate p-2 bg-slate-50 rounded dark:bg-slate-800 dark:prose-invert">
	<summary
		>Предпросмотр Markdown (<a
			href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
			target="_blank">cheatsheet</a
		>)</summary
	>
	<Markdown source={fixedCopy} />
</details>
