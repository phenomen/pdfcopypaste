<script lang="ts">
	import { copy } from '$lib/utils/copy';
	import { wordCount } from '$lib/utils/string';
	import { fetchStream } from '$lib/utils/stream';
	import { autoClipboard } from '$lib/stores/autoClipboard';

	import { Button } from '$components/ui/button';
	import { Textarea } from '$components/ui/textarea';
	import { Checkbox } from '$components/ui/checkbox';
	import { Label } from '$components/ui/label';

	import { AtomIcon, ClipboardTypeIcon, Undo2Icon, EraserIcon, WrapTextIcon } from 'lucide-svelte';

	let loading = false;

	let userPrompt = '';
	let userPromptBackup = '';
	let errorMessage = '';

	function formatSimple() {
		userPromptBackup = userPrompt;

		userPrompt = userPrompt
			.replace(/(\r\n|\n|\r|	)/g, ' ')
			.replace(/( {2})/g, ' ')
			.replace(//g, '')
			.replace(/‑/g, '-')
			.replace(/- /g, '');

		if ($autoClipboard === true) {
			copy(userPrompt);
		}
	}

	async function formatAI() {
		if (loading) return;

		if (wordCount(userPrompt) < 10) {
			errorMessage = 'Text is too short.';
			return;
		}
		if (wordCount(userPrompt) > 300) {
			errorMessage = `Text length for AI formatting cannot exceed 300 words. You have used ${wordCount(
				userPrompt
			)} words.`;
			return;
		}

		userPromptBackup = userPrompt;
		errorMessage = '';
		loading = true;

		try {
			const response = await fetch('/api/gpt', {
				method: 'POST',
				body: JSON.stringify({ prompt: userPrompt }),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (!response.ok) throw new Error('Response timeout. OpenAI GPT is too busy.');

			userPrompt = '';

			await fetchStream(response, (chunk) => {
				userPrompt += chunk;
			});

			if ($autoClipboard === true) {
				copy(userPrompt);
			}
		} catch (err) {
			errorMessage = 'Something went wrong :(';
		}

		loading = false;
	}
</script>

<div>
	<Textarea
		disabled={loading}
		id="userPrompt"
		name="userPrompt"
		placeholder="Paste your text here, then use the formatting tools below."
		autocomplete="off"
		class="h-40 md:h-60"
		required
		bind:value={userPrompt}
	/>

	<div class="mt-4 grid grid-cols-5 gap-1 sm:gap-2">
		<Button on:click={() => formatSimple()} disabled={loading}>
			<WrapTextIcon class="mr-2 h-4 w-4" />
			Quick Fix
		</Button>

		<Button on:click={() => formatAI()} disabled={loading}>
			<AtomIcon class="mr-2 h-4 w-4" />
			AI Fix
		</Button>

		<Button variant="outline" on:click={() => copy(userPrompt)} disabled={loading}>
			<ClipboardTypeIcon class="mr-2 h-4 w-4" />
			Copy
		</Button>

		<Button variant="outline" on:click={() => (userPrompt = userPromptBackup)} disabled={loading}>
			<Undo2Icon class="mr-2 h-4 w-4" />
			Undo
		</Button>

		<Button variant="outline" on:click={() => (userPrompt = '')} disabled={loading}>
			<EraserIcon class="mr-2 h-4 w-4" />
			Clear
		</Button>

		<div class="mt-4 text-center text-sm font-medium text-gray-600">
			<p>&nbsp;{errorMessage}&nbsp;</p>
		</div>
	</div>
</div>

<div class="mx-auto mt-4">
	<div class="flex items-center space-x-2">
		<Checkbox id="autoClipboard" name="autoClipboard" bind:checked={$autoClipboard} />
		<Label for="autoClipboard">Copy to clipboard after fix</Label>
	</div>
</div>

<div class="mx-auto mt-6 text-sm text-gray-500">
	<p><strong>Quick Fix:</strong> instant, does not preserve paragraphs.</p>
	<p>
		<strong>AI Fix:</strong> slower, 300 words limit, preserves paragraphs.
	</p>
</div>
