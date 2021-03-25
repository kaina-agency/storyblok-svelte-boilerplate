export function whenAvailable(name, callback) {
	window.setTimeout(function () {
		if (window[name]) {
			callback(window[name])
		} else {
			whenAvailable(name, callback)
		}
	}, 10)
}
