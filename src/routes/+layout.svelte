<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/fira-code';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col px-2">
	<Header />

	<div class="flex flex-1 flex-col">
		<slot />
	</div>

	<Footer />
</div>
