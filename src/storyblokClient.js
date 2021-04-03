import StoryblokClient from 'storyblok-js-client'

const client = new StoryblokClient({
	accessToken: process.env.SAPPER_APP_SB, // replace with your accessToken
})

export const defaultRequestConfig = {
	version: 'draft',
}

export default client
