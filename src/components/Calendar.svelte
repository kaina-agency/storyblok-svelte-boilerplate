<script>
	import { editable } from '../directives'
	import { whenAvailable } from './utils'

	export let blok
	let eventSources = [],
		mq = matchMedia('(min-width: 1024px)'),
		initialView = mq.matches ? 'dayGridMonth' : blok.list_view

	blok.calendars.split('\n').forEach((cal) => {
		eventSources.push({ googleCalendarId: cal })
	})

	let loadCal = () => {
		let calendarEl = document.getElementById('blok-' + blok._uid)
		var calendar = new FullCalendar.Calendar(calendarEl, {
			headerToolbar: {
				left: 'title',
				center: '',
				right: 'prev,next',
			},
			initialView: initialView,
			height: 'auto',
			displayEventTime: false,
			googleCalendarApiKey: blok.api_key,
			eventSources: eventSources,
			eventClick: function (info) {
				info.jsEvent.preventDefault()
				window.open(info.event.url, '_blank')
			},
		})
		calendar.render()
		mq.addEventListener('change', () => {
			mq.matches
				? calendar.changeView('dayGridMonth')
				: calendar.changeView(blok.list_view)
		})
	}

	whenAvailable('FullCalendar', loadCal)
</script>

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.js"></script>
	<link
		href="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.css"
		type="text/css"
		rel="stylesheet"
	/>
</svelte:head>

<div id="blok-{blok._uid}" use:editable={blok} />
