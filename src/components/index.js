import NotFound from './404.svelte'

import Accordion from './Accordion.svelte'
import Button from './Button.svelte'
import Calendar from './Calendar.svelte'
import Card from './Card.svelte'
import Code from './Code.svelte'
import Container from './Container.svelte'
import Font from './Font.svelte'
import Grid from './Grid.svelte'
import Header from './Header.svelte'
import Image from './Image.svelte'
import Map from './Map.svelte'
import Masonry from './Masonry.svelte'
import Page from './Page.svelte'
import Sidebar from './Sidebar.svelte'
import Spacer from './Spacer.svelte'
import Text from './Text.svelte'
import Typer from './Typer.svelte'
import Video from './Video.svelte'

const Components = {
	Accordion: Accordion,
	Button: Button,
	Calendar: Calendar,
	Card: Card,
	Code: Code,
	Container: Container,
	Font: Font,
	Grid: Grid,
	Header: Header,
	Image: Image,
	Map: Map,
	Masonry: Masonry,
	Page: Page,
	Sidebar: Sidebar,
	Spacer: Spacer,
	Text: Text,
	Typer: Typer,
	Video: Video,
}

export default (component) => {
	// component does exist
	if (typeof Components[component] !== 'undefined') {
		return Components[component]
	}

	return NotFound
}
