/** @type {import('tailwindcss').'selector', // or 'media' or 'class'fig} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
            colors: {
                'primary': '#000344',
            },
        }
	},
	
	plugins: []
};
