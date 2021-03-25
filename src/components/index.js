import NotFound from './404.svelte'

import Calendar from './Calendar.svelte'
import Feature from './Feature.svelte'
import Grid from './Grid.svelte'
import Map from './Map.svelte'
import Page from './Page.svelte'
import Teaser from './Teaser.svelte'
import Video from './Video.svelte'

const Components = {
	Calendar: Calendar,
	Feature: Feature,
	Grid: Grid,
	Map: Map,
	Page: Page,
	Teaser: Teaser,
	Video: Video,
}

export default (component) => {
	// component does exist
	if (typeof Components[component] !== 'undefined') {
		return Components[component]
	}

	return NotFound
}
