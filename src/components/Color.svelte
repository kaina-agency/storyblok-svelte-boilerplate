<script>
	export let colorName
	export let color

	function colorRange(hsl) {
		let original = hsl
		hsl = hsl.replace('hsl(', '').replace(')', '').replace(/,/g, '')
		hsl = hsl.split(' ')
		let intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
			percentages = [97, 93, 87, 78, 68, 60, 53, 48, 43, 40],
			vals = `--${colorName}: ${original};`
		for (let i = 0; i < 10; i++) {
			vals += `
				--${colorName}-${intensities[i]}: hsl(${hsl[0]},${hsl[1]},${percentages[i]}%);
			`
		}
		return `
			<style>
				:root{
					${vals}
				}
			</style>
		`
	}
</script>

{#if color}
	{@html colorRange(color)}
{/if}
