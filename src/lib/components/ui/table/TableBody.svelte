<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tbody class={cn('[&_tr:last-child]:border-0', className)} {...$$restProps}>
	<slot />
</tbody>
