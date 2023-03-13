<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let textarea: HTMLTextAreaElement;
	let fixedCopy: string = '';

	function copyClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function formatMarkdown(mode: string) {
		const { selectionStart, selectionEnd } = textarea;
		const selectedText = textarea.value.substring(selectionStart, selectionEnd);
		let newText = '';

		if (mode === 'H1') {
			newText = `# ${selectedText}\n`;
		} else if (mode === 'H2') {
			newText = `## ${selectedText}\n`;
		} else if (mode === 'H3') {
			newText = `## ${selectedText}\n`;
		} else if (mode === 'Bold') {
			newText = `**${selectedText}**`;
		} else if (mode === 'Italic') {
			newText = `_${selectedText}_`;
		} else if (mode === 'Quote') {
			newText = `> ${selectedText}\n`;
		} else if (mode === 'Rule') {
			newText = `\n---\n`;
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
		} else if (mode === 'Normalize') {
			for (let i = 0; i < selectedText.length; i++) {
				if (i === 0) {
					newText += selectedText[i].toUpperCase();
				} else if (selectedText[i - 1] === '.') {
					newText += ' ' + selectedText[i].toUpperCase();
				} else {
					newText += selectedText[i].toLowerCase();
				}
			}
		}

		fixedCopy = textarea.value.substring(0, selectionStart) + newText + textarea.value.substring(selectionEnd);
	}

	function formatLinebraks() {
		fixedCopy = fixedCopy
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/(  )/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');

		copyClipboard(fixedCopy);
	}

	function handleHotkey(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === '1') {
			event.preventDefault();
			formatMarkdown('H1');
		}
		if (event.ctrlKey && event.key === '2') {
			event.preventDefault();
			formatMarkdown('H2');
		}
		if (event.ctrlKey && event.key === '3') {
			event.preventDefault();
			formatMarkdown('H3');
		}
		if (event.ctrlKey && (event.key === 'b' || event.key === 'и')) {
			event.preventDefault();
			formatMarkdown('Bold');
		}
		if (event.ctrlKey && (event.key === 'i' || event.key === 'ш')) {
			event.preventDefault();
			formatMarkdown('Italic');
		}
		if (event.ctrlKey && (event.key === 'q' || event.key === 'й')) {
			event.preventDefault();
			formatMarkdown('Quote');
		}
		if (event.ctrlKey && (event.key === 'l' || event.key === 'д')) {
			event.preventDefault();
			formatMarkdown('List');
		}
		if (event.ctrlKey && (event.key === 'n' || event.key === 'т')) {
			event.preventDefault();
			formatMarkdown('Numbers');
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleHotkey);
		return () => {
			window.removeEventListener('keydown', handleHotkey);
		};
	});

	$: markCopy = marked.parse(fixedCopy);
</script>

<div class="gap-2 mx-auto w-full grid grid-cols-2">
	<textarea
		id="fixedCopyArea"
		name="fixedCopyArea"
		class="dark:bg-slate-800 dark:text-white h-96 w-full rounded border border-slate-600 p-2"
		placeholder="Вставьте текст для исправления. Используйте инструменты ниже для форматирования и копирования."
		bind:value={fixedCopy}
		bind:this={textarea}
	/>

	<div
		class="max-h-96 h-96 overflow-y-scroll w-full max-w-none h-full prose prose-slate bg-slate-50 p-2 rounded dark:bg-slate-800 dark:prose-invert"
	>
		{@html markCopy}
	</div>
</div>

<div class="mt-4 grid grid-cols-7 gap-1 sm:gap-2">
	<button
		class="bg-blue-500"
		on:click={() => formatLinebraks()}
		title="Исправление разрывов слов и переносов"><span class="icon i-tabler-text-wrap" /></button
	>

	<button
		class="bg-emerald-500"
		on:click={() => copyClipboard(fixedCopy)}
		title="Копирование Markdown"><span class="icon i-tabler-markdown" /></button
	>

	<button
		class="bg-emerald-500"
		on:click={() => copyClipboard(markCopy)}
		title="Копирование HTML"><span class="icon i-tabler-code" /></button
	>

	<button
		on:click={() => formatMarkdown('Normalize')}
		title="Нормализация регистра"><span class="icon i-tabler-text-size" /></button
	>
	<button
		on:click={() => formatMarkdown('H1')}
		title="Заголовок 1"><span class="icon i-tabler-h-1" /></button
	>
	<button
		on:click={() => formatMarkdown('H2')}
		title="Заголовок 2"><span class="icon i-tabler-h-2" /></button
	>
	<button
		on:click={() => formatMarkdown('H3')}
		title="Заголовок 3"><span class="icon i-tabler-h-3" /></button
	>
	<button
		on:click={() => formatMarkdown('Bold')}
		title="Полужирный (Ctrl+B)"><span class="icon i-tabler-bold" /></button
	>
	<button
		on:click={() => formatMarkdown('Italic')}
		title="Курсив (Ctrl+I)"><span class="icon i-tabler-italic" /></button
	>
	<button
		on:click={() => formatMarkdown('Quote')}
		title="Цитата (Ctrl+Q)"><span class="icon i-tabler-quote" /></button
	>
	<button
		on:click={() => formatMarkdown('List')}
		title="Маркированный список (Ctrl+L)"><span class="icon i-tabler-list" /></button
	>
	<button
		on:click={() => formatMarkdown('Numbers')}
		title="Нумерованный список (Ctrl+N)"><span class="icon i-tabler-list-numbers" /></button
	>
	<button
		on:click={() => formatMarkdown('Rule')}
		title="Разделитель"><span class="icon i-tabler-line-dashed" /></button
	>
	<button
		class="bg-red-500"
		on:click={() => (fixedCopy = '')}
		title="Очистка текста"><span class="icon i-tabler-eraser" /></button
	>
</div>

<div class="prose prose-slate dark:prose-invert mx-auto mt-4 text-sm">
	<a
		href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
		target="_blank">Справка по Markdown</a
	>
</div>
