<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	let audio: HTMLAudioElement;
	let streamSelect: HTMLSelectElement;
	let isPlaying = $state(false);
	let streamState = $state('Paused');

	onMount(() => {
		audio = new Audio(streamSelect.value);
		audio.addEventListener('waiting', () => {
			streamState = 'Loading...';
		});
		audio.addEventListener('playing', () => {
			isPlaying = true;
			streamState = 'Playing';
		});
		audio.addEventListener('pause', () => {
			isPlaying = false;
			streamState = 'Paused';
		});
	});

	function togglePlay() {
		if (audio.paused) {
			audio.play().catch(() => {});
		} else {
			audio.pause();
		}
	}

	function handleStreamChange() {
		audio.src = streamSelect.value;
		if (isPlaying) {
			audio.play();
		}
	}
</script>

<div class="flex justify-between px-7 py-5">
	<div>
		<h1 class="text-4xl font-bold">FocusWave</h1>
		<span class="mt-3 flex items-center gap-1">
			<select id="stationSelect" bind:this={streamSelect} onchange={handleStreamChange}>
				<option value="https://stream.zeno.fm/v5reddyk8rhvv">MoE Lofi</option>
				<option value="http://streams.dez.ovh:8000/radio.mp3">Chillhop Radio</option>
				<option value="https://stream.zeno.fm/dhen0gaenzzuv">Lofi Synthwave</option>
			</select>
			<div>{streamState}</div>
			<button class="outer-ring" onclick={togglePlay}>
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
