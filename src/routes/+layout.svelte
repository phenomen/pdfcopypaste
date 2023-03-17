<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/variable.css';
	import '@fontsource/fira-code/variable.css';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />
<slot />
<Footer />
