<script>
	import 'uno.css';
	import '@unocss/reset/tailwind.css';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
</script>

<div class="flex flex-col h-full px-2 mx-auto w-full max-w-7xl">
	<Header />
	<slot />
	<LightSwitch />
	<Footer />
</div>
