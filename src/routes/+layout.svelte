<script>
	import 'uno.css';
	import '@unocss/reset/antfu.css';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
</script>

<div class="mx-auto max-w-7xl px-2 font-sans">
	<Header />
	<slot />
	<LightSwitch />
	<Footer />
</div>
