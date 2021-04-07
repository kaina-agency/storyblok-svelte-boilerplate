<script>
	export let meta
	export let title
</script>

<svelte:head>
	{#if meta}
		{#if meta.title}
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<meta property="og:title" content={meta.title} />
			<meta property="twitter:title" content={meta.title} />
		{/if}
		{#if meta.description}
			<meta name="description" content={meta.description} />
			<meta property="og:description" content={meta.description} />
			<meta property="twitter:description" content={meta.description} />
		{/if}
	{:else if title}
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta property="og:title" content={title} />
		<meta property="twitter:title" content={title} />
	{/if}
	<meta property="og:type" content="website" />
</svelte:head>
