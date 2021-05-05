<script>
	export let meta = undefined
	export let title = undefined
	export let image = undefined
</script>

<svelte:head>
	<meta property="og:type" content="website" />
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
	{#if image.filename}
		<meta property="og:image" content={image.filename} />
	{/if}
</svelte:head>
