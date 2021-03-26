import NotFound from './404.svelte'

import Button from './Button.svelte'
import Calendar from './Calendar.svelte'
import Card from './Card.svelte'
import Code from './Code.svelte'
import Map from './Map.svelte'
import Page from './Page.svelte'
import Text from './Text.svelte'
import Video from './Video.svelte'

const Components = {
	Button: Button,
	Calendar: Calendar,
	Card: Card,
	Code: Code,
	Map: Map,
	Page: Page,
	Text: Text,
	Video: Video,
}

export default (component) => {
	// component does exist
	if (typeof Components[component] !== 'undefined') {
		return Components[component]
	}

	return NotFound
}
