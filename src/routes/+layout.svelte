<script>
	import '../app.scss';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	let player;
	let videoId = 'jfKfPfyJRdk'
	let isPlaying = $state(false);

	function handlePlayPause() {
		togglePlay();
		isPlaying = !isPlaying;
	}
	onMount(() => {
		// Load YouTube IFrame API
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = () => {
			player = new YT.Player('youtube-player', {
				height: '0',
				width: '0',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					controls: 0,
					mute: 0
				},
				events: {
					onReady: (event) => {
						event.target.playVideo();
					}
				}
			});
			console.log(player)
		};
	});

	function togglePlay() {
		if (player) {
			const state = player.getPlayerState();
			if (state === 1) {
				// playing
				player.pauseVideo();
			} else {
				player.playVideo();
			}
		}
	}
</script>

<div class="flex justify-between px-7 py-5">
	<div>
		<h1 class="text-4xl font-bold">FocusWave</h1>
		<span class="mt-3 flex items-center gap-1 text-gray-400">
			Lofi hip hop radio
			<div id="youtube-player"></div>
			<button onclick={handlePlayPause} class="outer-ring">
				<Icon icon={isPlaying ? "mdi:pause" : "mdi:play"} class="music-icon animate" />
			  </button>
		</span>
	</div>
	<button class="profile-btn">
		<img
			src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jasper"
			alt="user profile"
			class="size-14 rounded-full border-2 bg-slate-700"
		/>
	</button>
</div>
{@render children?.()}

<style lang="scss">
	h1 {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
	}
	:global(.music-icon) {
		padding: 2px;
	}
	.outer-ring {
		padding: 3px;
		border: 2px dotted #2242d2;
		border-radius: 11px;
		// animation: rotate 3s infinite forwards linear;
	}
	@keyframes rotate {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.profile-btn {
		img {
			transition: 0.3s;
		}
		&:hover img {
			box-shadow: 0 0 30px rgba(223, 223, 223, 0.7);
			box-shadow: 0 0 50px rgba(223, 223, 223, 0.936);
		}
	}
</style>
