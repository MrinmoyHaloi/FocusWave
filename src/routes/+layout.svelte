<script lang="ts">
	import '../app.scss';
	import { Howl } from 'howler';
	import { onMount } from 'svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	let player: any;
	let isPlaying = $state(false);
	let firstTime = true;
	let playerState = $state('Paused');
	let loader: HTMLSpanElement;

	function handlePlayPause() {
		togglePlay();
		isPlaying = !isPlaying;
	}
	onMount(() => {
		player = new Howl({
			src: ['https://stream.zeno.fm/v5reddyk8rhvv'],
			html5: true,
			onplay: () => {
				playerState = 'Playing';
				loader.classList.add('playing');
			},
			onpause: () => {
				playerState = 'Paused';
				loader.classList.remove('playing');
			},
			onplayerror: () => {
				playerState = 'Error';
			}
		});
	});

	function togglePlay() {
		if (firstTime) {
			playerState = 'Loading...';
			player.play();
			console.log('Playing...');
			firstTime = false;
		} else {
			if (player.playing()) {
				player.pause();
				console.log('Pausing...');
			} else {
				player.play();
				console.log('Playing...');
			}
		}
	}
</script>

<div class="flex justify-between px-7 py-5">
	<div>
		<h1 class="text-4xl font-bold">FocusWave</h1>
		<span class="mt-3 flex items-center gap-1 text-gray-400">
			Lofi hip hop radio - <span class="loader" bind:this={loader}>{playerState}</span>
			<div id="youtube-player"></div>
			<button onclick={handlePlayPause} class="outer-ring">
				{#if isPlaying}
					<svg
						class="music-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z" />
					</svg>
				{:else}
					<svg
						class="music-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<path fill="currentColor" d="M8 5.14v14l11-7z" />
					</svg>
				{/if}
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

<style lang="scss" global>
	h1 {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
	}
	.loader {
		position: relative;
		&::after {
			content: '';
			display: inline-block;
			width: 50%;
			background: linear-gradient(to left, #fff 0%, rgb(143, 144, 157) 100%);
			height: 3px;
			position: absolute;
			bottom: -2px;
			left: 50%;
			transform: translateX(-50%);
			// animation: animateGradient 1s alternate infinite;

			@keyframes animateGradient {
				0% {
					opacity: 30%;
				}
				100% {
					opacity: 100%;
				}
			}
		}
		&.playing {
			&::after {
				animation: animateGradient 1s alternate infinite;
			}
		}
	}
	:global(.music-icon) {
		padding: 2px;
	}
	.outer-ring {
		padding: 3px;
		border: 2px solid #2242d2;
		border-radius: 50px;
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
