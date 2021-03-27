// link: generate link attributes for buttons
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

// colors: generate styles based on props
export function colors(b) {
	let css = ''
	function safeColor(color, intensity) {
		let noIntensity = ['white', 'black', 'transparent']
		if (color) {
			if (noIntensity.includes(color)) {
				return `${color}`
			} else if (intensity) {
				return `var(--${color}${intensity})`
			} else return `var(--${color})`
		}
	}
	;['color', 'text_color', 'border_color'].forEach((opt) => {
		let val = safeColor(b[opt], b[opt + '_intensity'])
		if (val) css += `--${opt}: ${safeColor(b[opt], b[opt + '_intensity'])};`
		opt = 'hover_' + opt
		val = safeColor(b[opt], b[opt + '_intensity'])
		if (val) css += `--${opt}: ${safeColor(b[opt], b[opt + '_intensity'])};`
	})
	return css
}

// padding
export function padding(b, wider) {
	if (b.padding > 0 && wider === true) {
		return `padding: ${b.padding * 0.25}rem ${b.padding * 0.5}rem;`
	} else if (b.padding > 0) {
		return `padding: ${b.padding * 0.25}rem;`
	}
}

// responsive: set styles reponsively from Storyblok plugin
export function responsive(selector, rule, b) {
	return `
		<style>
			${selector} {
				${rule.replace('@', b.xsmall || 1)};
			}
			@media (min-width: 640px) {
				${selector} {
				${rule.replace('@', b.small)};
				}
			}
			@media (min-width: 768px) {
				${selector} {
				${rule.replace('@', b.medium)};
				}
			}
			@media (min-width: 1024px) {
				${selector} {
				${rule.replace('@', b.large)};
				}
			}
			@media (min-width: 1280px) {
				${selector} {
				${rule.replace('@', b.xlarge)};
				}
			}
		</style>
	`
}

// rounded
export function rounded(b) {
	let opts = {
		'-none': 0,
		'-sm': '0.125rem',
		'': '.25rem',
		'-md': '.375rem',
		'-lg': '.5rem',
		'-xl': '.75rem',
		'-2xl': '1rem',
		'-3xl': '1.5rem',
		'-full': '9999px',
	}
	return `border-radius: ${opts[b.rounded]};`
}

// shadow
export function shadow(b) {
	let opts = {
		'-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		'': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		'-md':
			'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		'-lg':
			'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		'-xl':
			'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		'-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		'-3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		none: 'none',
	}
	return `box-shadow: ${opts[b.shadow]};`
}

// whenAvailable: use 3rd party frameworks once loaded, not before
export function whenAvailable(name, callback) {
	window.setTimeout(function () {
		if (window[name]) {
			callback(window[name])
		} else {
			whenAvailable(name, callback)
		}
	}, 100)
}

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
