import StoryblokClient from 'storyblok-js-client'

const client = new StoryblokClient({
	// accessToken: '0rSqEsI9IEpvyMG9hrk3BAtt', // replace with your accessToken
	accessToken: '5mSSgqsR2BIwtcRQU2xbVwtt', // replace with your accessToken
})

export const defaultRequestConfig = {
	version: 'draft',
}

export default client
