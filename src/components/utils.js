// editable: make components clickable in StoryBlok
export const editable = (el, content) => {
	if (typeof content._editable === 'undefined') {
		return
	}

	var options = JSON.parse(
		content._editable.replace('<!--#storyblok#', '').replace('-->', '')
	)

	el.setAttribute('data-blok-c', JSON.stringify(options))
	el.setAttribute('data-blok-uid', options.id + '-' + options.uid)

	let className = 'storyblok__outline'
	if (el.classList) {
		el.classList.add(className)
	} else if (!new RegExp('\\b' + className + '\\b').test(el.className)) {
		el.className += ' ' + className
	}
}

export function link(action) {
	if (action) {
		if (action.linktype === 'story' && action.cached_url) {
			let url = action.cached_url === 'home' ? '' : action.cached_url
			let anchor = action.anchor ? '#' + action.anchor : ''
			return {
				href: url + '/' + anchor,
				aria: 'Go to page: ' + action.cached_url,
			}
		} else if (action.linktype === 'url' && action.url) {
			return {
				href: action.url,
				aria: 'Go to external site: ' + action.url,
			}
		} else if (action.linktype === 'email' && action.email) {
			return {
				href: 'mailto:' + action.email,
				aria: 'Compose an email to ' + action.email,
			}
		} else if (action.linktype === 'asset' && action.url) {
			return {
				href: action.url,
				aria: 'Download file: ' + action.url,
			}
		} else {
			return {
				is: 'div',
			}
		}
	} else {
		return {
			is: 'div',
		}
	}
}

// whenAvailable: use 3rd party frameworks once loaded, not before
export function whenAvailable(name, callback) {
	window.setTimeout(function () {
		if (window[name]) {
			callback(window[name])
		} else {
			whenAvailable(name, callback)
		}
	}, 10)
}
