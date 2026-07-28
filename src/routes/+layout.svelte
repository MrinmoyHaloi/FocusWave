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

<div class="glow"></div>
<div class="relative flex justify-between px-7 py-5">
	<div>
		<h1 class="text-4xl font-bold">FocusWave</h1>
		<span
			class="left-1/2 top-1/2 flex flex-wrap items-center gap-x-1 gap-y-2 max-md:mt-3 md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:flex-col">
			<select class="station-select me-2" bind:this={streamSelect} onchange={handleStreamChange}>
				<option value="https://radio.loficafe.net/listen/working/radio.mp3">Lofi Cafe - Working</option>
				<option value="https://radio.loficafe.net/listen/studying/radio.mp3">Lofi Cafe - Studying</option>
				<option value="https://radio.loficafe.net/listen/chilling/radio.mp3">Lofi Cafe - Chilling</option>
				<option value="https://lissen.to/stream/nightride.mp3">Nightride - Synthwave</option>
			</select>
			<div class="flex gap-1">
				<div>{streamState}</div>
				<button class="outer-ring" onclick={togglePlay}>
					{#if isPlaying}
						<svg
							class="music-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24">
							<path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z" />
						</svg>
					{:else}
						<svg
							class="music-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24">
							<path fill="currentColor" d="M8 5.14v14l11-7z" />
						</svg>
					{/if}
				</button>
			</div>
		</span>
	</div>
	<button class="profile-btn">
		<img
			src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jasper"
			alt="user profile"
			class="size-14 rounded-full border-2 bg-slate-700" />
	</button>
</div>
{@render children?.()}

<style lang="scss">
	.glow {
		position: absolute;
		background-color: rgba(18, 23, 179, 0.7);
		width: 80%;
		height: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		filter: blur(200px);
		@media (width < 768px) {
			width: 100%;
			height: 70%;
		}
	}
	h1 {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
	}
	.station-select {
		padding: 0.3rem 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #2242d2;
		background: #ffffff4a;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 9l6 6l6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right center;
		width: 11.8rem;
		option {
			background-color: #424242;
		}
	}
	:global(.music-icon) {
		padding: 2px;
	}
	.outer-ring {
		padding: 3px;
		border: 2px solid #2242d2;
		border-radius: 50px;
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
			transition: 0.2s;
		}
		&:hover img {
			box-shadow: 0 0 30px rgba(223, 223, 223, 0.7);
			box-shadow: 0 0 50px rgba(223, 223, 223, 0.936);
		}
	}
</style>
