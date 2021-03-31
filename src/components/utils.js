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

// link: generate link attributes for buttons
export function link(action) {
	if (action) {
		if (action.linktype === 'story' && action.cached_url) {
			let url = action.cached_url === 'home' ? '' : action.cached_url
			let anchor = action.anchor ? '#' + action.anchor : ''
			return {
				href: url + '/' + anchor,
				aria: 'Go to page: ' + action.cached_url,
				prefetch: true,
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

// padding
export function padding(b, wider) {
	if (b.padding >= 0 && wider === true) {
		return `padding: ${b.padding * 0.25}rem ${b.padding * 0.5}rem;`
	} else if (b.padding >= 0) {
		return `padding: ${b.padding * 0.25}rem;`
	} else {
		return ''
	}
}

export function ratio(r) {
	if (/[0-9]+\/+[0-9]/gm.test(r))
		return (r.split('/')[1] / r.split('/')[0]) * 100 + '%'
}

// responsive: set styles reponsively from Storyblok plugin
export function responsive(selector, rule, b) {
	return `
		<style>
			${selector} {
				${rule.replace(/@/g, b.xsmall || 1)}
			}
			@media (min-width: 640px) {
				${selector} {
				${rule.replace(/@/g, b.small)}
				}
			}
			@media (min-width: 768px) {
				${selector} {
				${rule.replace(/@/g, b.medium)}
				}
			}
			@media (min-width: 1024px) {
				${selector} {
				${rule.replace(/@/g, b.large)}
				}
			}
			@media (min-width: 1280px) {
				${selector} {
				${rule.replace(/@/g, b.xlarge)}
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

// tw
export function tw(b) {
	let selector = '#b-' + b._uid
	let classes = b.class.replace(/\n/g, ' ').split(' ')
	let output = []

	classes.forEach((i) => {
		{
			let p
			let v

			let bp = i.match(/[a-z]+:/)
			let neg = i.includes('-m') ? '-' : ''
			let n = i.match(/[0-9]+/)

			let margin = i.match(/ml|mr|mb|mt|m-/)
			let padding = i.match(/pl|pr|pb|pt|p-/)

			if (margin && margin[0]) {
				p = margin[0]
					.replace('ml', 'margin-left:')
					.replace('mr', 'margin-right:')
					.replace('mb', 'margin-bottom:')
					.replace('mt', 'margin-top:')
					.replace('m-', 'margin:')
			}

			if (padding && padding[0]) {
				p = padding[0]
					.replace('pl', 'padding-left:')
					.replace('pr', 'padding-right:')
					.replace('pb', 'padding-bottom:')
					.replace('pt', 'padding-top:')
					.replace('p-', 'padding:')
			}

			if (n && n[0]) {
				v = n[0] * 0.25 + 'rem;'
			}

			let mq = '*'
			let rule = `${selector} {${p + neg + v}}`

			if (bp) {
				if (bp[0] === 'sm:') {
					mq = '@media (min-width: 640px) {*}'
				} else if (bp[0] === 'md:') {
					mq = '@media (min-width: 768px) {*}'
				} else if (bp[0] === 'lg:') {
					mq = '@media (min-width: 1024px) {*}'
				} else if (bp[0] === 'xl:') {
					mq = '@media (min-width: 1280px) {*}'
				}
			}

			let computed = mq.replace('*', rule)

			if (!computed.includes('undefined')) {
				output.push(computed)
			}
		}
	})

	return `<style>${output.join(' ')}</style>`
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
