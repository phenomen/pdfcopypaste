<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/variable.css';
	import '@fontsource/fira-code/variable.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="mx-auto flex w-full max-w-4xl flex-col px-2">
	<Header />

	<div class="flex flex-1 flex-col">
		<slot />
	</div>

	<Footer />
</div>
