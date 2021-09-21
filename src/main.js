import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// CHANGE THESE VARIABLES
		name: 'Connor',
		location: 'Sydney, AU',
		apiKey: 'your-key-here',
		doubleSpacedList: true,
		columns: [
			[{
					"name": "gmail",
					"url": "https://mail.google.com"
				},
				{
					"name": "calendar",
					"url": "https://calendar.google.com"
				},
				{
					"name": "drive",
					"url": "https://drive.google.com"
				},
				{
					"name": "photos",
					"url": "https://photos.google.com"
				}
			],
			[
				{
					"name": "abc",
					"url": "https://www.abc.net.au/news/"
				},
				{
					"name": "new york times",
					"url": "https://www.nytimes.com/"
				},
				{
					"name": "financial review",
					"url": "https://www.afr.com/"
				},
				{
					"name": "the economist",
					"url": "https://www.economist.com/"
				}
			],
			[
				{
					"name": "twitter",
					"url": "https://twitter.com/"
				},
				{
					"name": "reddit",
					"url": "https://www.nytimes.com/"
				},
				{
					"name": "facebook",
					"url": "https://www.afr.com/"
				}
			],
			[{
					"name": "github",
					"url": "https://github.com/"
				},
				{
					"name": "azure",
					"url": "https://portal.azure.com/#home"
				},
				{
					"name": "devops",
					"url": "https://dev.azure.com/"
				}
			]
		]
	}
});

export default app;