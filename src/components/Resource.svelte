<script>
	export let js = undefined
	export let css = undefined
</script>

<svelte:head>
	{#if js}
		<script src={js}></script>
	{/if}
	{#if css}
		<link href={css} rel="stylesheet" />
	{/if}
</svelte:head>
