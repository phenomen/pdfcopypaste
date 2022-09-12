<script>
	import { onMount } from 'svelte';

	$: theme = 'light';

	onMount(async () => {
		theme = localStorage.theme;

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	function themeToggle() {
		if (localStorage.theme != 'dark') {
			document.documentElement.classList.add('dark');
			theme = 'dark';
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
			theme = 'light';
		}
	}
</script>

<div class="my-10 w-6 mx-auto">
	<button class="icon  {theme === 'dark' ? 'i-tabler-sun' : 'i-tabler-moon text-slate-500'}" on:click={() => themeToggle()} />
</div>
