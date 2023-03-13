<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';

	let textarea: HTMLTextAreaElement;
	let originalCopy: string = '';

	function copyClipboard() {
		navigator.clipboard.writeText(fixedCopy);
	}

	function formatMarkdown(mode: string) {
		const { selectionStart, selectionEnd } = textarea;
		const selectedText = textarea.value.substring(selectionStart, selectionEnd);
		let newText = '';

		if (mode === 'H1') {
			newText = `# ${selectedText}`;
		} else if (mode === 'H2') {
			newText = `## ${selectedText}`;
		} else if (mode === 'H3') {
			newText = `## ${selectedText}`;
		} else if (mode === 'Bold') {
			newText = `**${selectedText}**`;
		} else if (mode === 'Italic') {
			newText = `_${selectedText}_`;
		} else if (mode === 'Quote') {
			newText = `> ${selectedText}`;
		} else if (mode === 'Rule') {
			newText = `---`;
		} else if (mode === 'List') {
			newText = selectedText
				.split('\n')
				.map((line) => `- ${line}`)
				.join('\n');
		} else if (mode === 'Numbers') {
			newText = selectedText
				.split('\n')
				.map((line) => `1. ${line}`)
				.join('\n');
		}

		fixedCopy = textarea.value.substring(0, selectionStart) + newText + textarea.value.substring(selectionEnd);
	}

	$: fixedCopy = originalCopy
		.replace(/(\r\n|\n|\r|	)/g, ' ')
		.replace(/(  )/g, ' ')
		.replace(//g, '')
		.replace(/‑/g, '-')
		.replace(/- /g, '');
</script>

<div class="grid grid-cols-3 gap-2 mx-auto w-full">
	<div class="col-span-1">
		<textarea
			id="originalCopyArea"
			class=" dark:bg-slate-800 dark:text-white"
			placeholder="Вставьте оригинальный текст"
			bind:value={originalCopy}
		/>
	</div>

	<div class="col-span-2">
		<textarea
			id="fixedCopyArea"
			name="fixedCopyArea"
			class="dark:bg-slate-800 dark:text-white"
			placeholder="Исправленный текст и форматирование"
			bind:value={fixedCopy}
			bind:this={textarea}
		/>
	</div>
</div>

<div class="mt-2 flex gap-1 sm:gap-2">
	<button on:click={() => formatMarkdown('H1')}><span class="icon i-tabler-h-1" /></button>
	<button on:click={() => formatMarkdown('H2')}><span class="icon i-tabler-h-2" /></button>
	<button on:click={() => formatMarkdown('H3')}><span class="icon i-tabler-h-3" /></button>
	<button on:click={() => formatMarkdown('Bold')}><span class="icon i-tabler-bold" /></button>
	<button on:click={() => formatMarkdown('Italic')}><span class="icon i-tabler-italic" /></button>
	<button on:click={() => formatMarkdown('Quote')}><span class="icon i-tabler-quote" /></button>
	<button on:click={() => formatMarkdown('List')}><span class="icon i-tabler-list" /></button>
	<button on:click={() => formatMarkdown('Numbers')}><span class="icon i-tabler-list-numbers" /></button>
	<button on:click={() => formatMarkdown('Rule')}><span class="icon i-tabler-line-dashed" /></button>
	<button on:click={() => (originalCopy = '')}><span class="icon i-tabler-eraser" /></button>
	<button on:click={copyClipboard}><span class="icon i-tabler-clipboard-text" /></button>
</div>

<details
	open
	class="mt-8 w-full max-w-7xl mx-auto prose prose-slate p-2 bg-slate-50 rounded dark:bg-slate-800 dark:prose-invert"
>
	<summary
		>Предпросмотр и копирование с форматированием (<a
			href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
			target="_blank">справка по Markdown</a
		>)</summary
	>
	<Markdown source={fixedCopy} />
</details>
