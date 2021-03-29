<script>
	import { onMount } from 'svelte'
	import Resource from './Resource.svelte'
	import { editable } from './utils'
	export let blok

	function loadCal() {
		let eventSources = [],
			mq = matchMedia('(min-width: 1024px)'),
			initialView = mq.matches ? 'dayGridMonth' : blok.list_view,
			calendarEl = document.getElementById('blok-' + blok._uid)

		blok.calendars.split('\n').forEach((cal) => {
			eventSources.push({ googleCalendarId: cal })
		})

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

	onMount(() => {
		function whenAvailable(name, callback) {
			window.setTimeout(function () {
				if (window[name]) {
					callback(window[name])
				} else {
					whenAvailable(name, callback)
				}
			}, 100)
		}
		whenAvailable('FullCalendar', loadCal)
	})
</script>

<Resource
	js="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.js"
	css="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.1/main.min.css"
/>

<div id="blok-{blok._uid}" use:editable={blok} />
