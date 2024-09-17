<script>
// @ts-nocheck

	import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
	import anime from 'animejs/lib/anime.es.js';

    let min = 5;
    let sec = 0;

    $: formattedMin = min < 10 ? `0${min}` : min;
    $: formattedSec = sec < 10 ? `0${sec}` : sec;   

    let arcAnimation;
    $: totalTime = min * 60000 + sec * 1000;

	onMount(() => {
        arcAnimation = anime({
            targets: '.arc path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: totalTime,
            direction: 'alternate',
            loop: true,
            autoplay: false
        });
    });

	let interval;
	
    // toggle the timer
	const toggleTimer = () => {
        // if the interval is running, pause the animation and clear the interval
        if (interval) {
            clearInterval(interval);
			interval = null;
            arcAnimation.pause();
		} else {
            // if the interval is not running, start the animation and the interval
            arcAnimation.play();
            interval = setInterval(() => {
                if (sec == 0) {
                    // if the seconds are 0, decrement the minutes
					if (min == 0) {
                        // if the interval is done i.e. min is 0, clear the interval
						clearInterval(interval);
						interval = null;
					} else {
                        // if the minutes are not 0, decrement the minutes and set the seconds to 59
						min--;
						sec = 59;
					}
				} else {
                    // if the seconds are not 0, decrement the seconds
					sec--;
				}
			}, 1000);
		}
	};
    // supa hot code
</script>

<main class="flex h-full flex-col justify-end px-7 pb-5">
	<div class="z-10">
		<span class="text-gray-400">I'm Focusing on</span>
		<span class="flex items-center gap-1 text-lg font-semibold">
			Creating FocusWave design <button on:click={() => {alert('Why you wanna change the topic?')}}>
				<Icon icon="mdi:square-edit-outline" />
			</button>
		</span>
	</div>
	<div class="timer flex font-bold">
		<span class="min">{formattedMin}</span>
		<div class="controls flex flex-col justify-center px-4 text-5xl text-black">
			<button on:click={toggleTimer} class="cursor-pointer"><Icon icon="bi:play-fill" /></button>
			<button on:click={toggleTimer}><Icon icon="bi:plus" /></button>
		</div>
		<span class="second">{formattedSec}</span>
	</div>
</main>


<svg
	class="arc"
	width="400"
	height="1122.52"
	viewBox="0 0 105.833 297"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<linearGradient id="a">
			<stop style="stop-color:#063CFF;stop-opacity:1" offset="0" />
			<stop style="stop-color:#FF3F3F;stop-opacity:1" offset="1" />
		</linearGradient>
		<linearGradient
			xlink:href="#a"
			id="b"
			x1="26.888"
			y1="-66.707"
			x2="369.711"
			y2="-119.294"
			gradientUnits="userSpaceOnUse"
			gradientTransform="matrix(1.23057 0 0 1.17514 -68.153 104.363)"
		/>
	</defs>
	<path
		style="fill:none;stroke:url(#b);stroke-width:10.5834;stroke-linecap:round;stroke-dasharray:330;stroke-dashoffset:330px"
		d="M-4.542-16.385A292.212 279.048 0 0 1 307.483-53.1"
		transform="matrix(.06173 .9981 -.9977 .06772 0 0)"
	/>
</svg>
<svg
	class="arc2"
	width="400"
	height="1122.52"
	viewBox="0 0 105.833 297"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<linearGradient id="c">
			<stop style="stop-color:#00e0ff;stop-opacity:1" offset="0" />
			<stop style="stop-color:#0001ff;stop-opacity:1" offset="1" />
		</linearGradient>
		<linearGradient
			xlink:href="#c"
			id="d"
			x1="26.888"
			y1="-66.707"
			x2="369.711"
			y2="-119.294"
			gradientUnits="userSpaceOnUse"
			gradientTransform="matrix(1.23057 0 0 1.17514 -68.153 104.363)"
		/>
	</defs>
	<path
		style="fill:none;stroke:url(#d);stroke-width:10.5834;stroke-linecap:square;stroke-dasharray:330"
		d="M-4.542-16.385A292.212 279.048 0 0 1 307.483-53.1"
		transform="matrix(.06173 .9981 -.9977 .06772 0 0)"
	/>
</svg>


<style lang="scss">
	.timer {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
		line-height: clamp(7rem, 20vw, 24rem);
		font-size: clamp(7rem, 24vw, 28rem);
	}

	.controls {
		* {
			background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
			border-radius: 50%;
			padding: 0.5rem;
			cursor: pointer;
		}
		gap: 2rem;
	}
    .arc {
		position: absolute;
		top: 0;
		z-index: -10;
		height: 100vh;
		right: 5rem;
	}
	.arc2 {
		position: absolute;
		top: 0;
		z-index: -11;
		height: 100vh;
		right: 5rem;
	}
</style>
