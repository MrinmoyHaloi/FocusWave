<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import anime from 'animejs';

	let min = 5;
	let sec = 0;

	$: formattedMin = min < 10 ? `0${min}` : min;
	$: formattedSec = sec < 10 ? `0${sec}` : sec;

	let arcAnimation;
	$: totalTime = min * 60000 + sec * 1000;

	let interval;
	let timerStatus = 'paused';

	onMount(() => {
		arcAnimation = anime({
			targets: '.arc path',
			strokeDashoffset: [anime.setDashoffset, 0],
			easing: 'linear',
			duration: totalTime ? totalTime : 1000,
			autoplay: false
		});
	});

	// toggle the timer
	const toggleTimer = () => {
		console.log('Toggling timer. Current status:', timerStatus);
		if (timerStatus == 'done') {
			// if the timer is done, reset the timer
			console.log('Resetting timer');
			min = 1;
			sec = 0;
			timerStatus = 'paused';
			arcAnimation.seek(0);
			arcAnimation.pause();
			return;
		}
		timerStatus = 'running';
		// if the interval is running, pause the animation and clear the interval
		if (interval) {
			console.log('Pausing timer');
			clearInterval(interval);
			interval = null;
			timerStatus = 'paused';
			arcAnimation.pause();
		} else {
			// if the interval is not running, start the animation and the interval
			console.log('Starting timer');
			arcAnimation.play();
			interval = setInterval(() => {
				if (sec == 0) {
					// if the seconds are 0, decrement the minutes
					if (min == 0) {
						// if the interval is done i.e. min is 0, clear the interval
						console.log('Timer done');
						clearInterval(interval);
						interval = null;
						timerStatus = 'done';
					} else {
						// if the minutes are not 0, decrement the minutes and set the seconds to 59
						min--;
						sec = 59;
						console.log('Decrementing minutes. New time:', min, 'minutes', sec, 'seconds');
					}
				} else {
					// if the seconds are not 0, decrement the seconds
					sec--;
					console.log('Decrementing seconds. New time:', min, 'minutes', sec, 'seconds');
				}
			}, 1000);
		}
	};
	// supa hot code
</script>

<div class="timer flex font-bold">
	<span class="min">{formattedMin}</span>
	<div class="controls flex flex-col justify-center px-4 text-5xl text-black">
		<button on:click={toggleTimer} class="play">
			{#if timerStatus == 'paused'}
				<Icon icon={'bi:play-fill'} />
			{:else if timerStatus == 'running'}
				<Icon icon={'bi:pause-fill'} />
			{:else}
				<Icon icon={'mdi:restart'} />
			{/if}
		</button>
		<button class="add"><Icon icon="bi:plus" /></button>
	</div>
	<span class="second">{formattedSec}</span>
</div>

<style lang="scss">
	.timer {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
		line-height: clamp(7rem, 20vw, 24rem);
		font-size: clamp(7rem, 24vw, 28rem);
	}

	.controls {
		gap: 2rem;
		.add {
			color: white;
			background: linear-gradient(to bottom, rgba(148, 148, 148, 1) 0%, rgba(70, 70, 70, 1) 100%);
		}
		* {
			background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
			border-radius: 50%;
			padding: 0.5rem;
			transition: 0.3s;
			box-shadow: 0 0 10px #0000005b;
			&:hover {
				transform: scale(1.1);
				box-shadow: 0 0 50px rgba(223, 223, 223, 0.45);
			}
		}
	}
</style>
