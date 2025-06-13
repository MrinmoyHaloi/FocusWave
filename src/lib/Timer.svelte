<script>
	import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte';
	import Icon from '@iconify/svelte';

	import { onMount } from 'svelte';
	import { animate } from 'motion';

	let min = $state(1);
	let sec = $state(0);

	let timesUpDialog;
	let setTimeDialog;
	let arcAnimation;
	let totalTime = $derived(min * 60 + sec);

	let interval;
	let timerStatus = $state('paused');

	function openTimesUpDialog() {
		if (!document.startViewTransition) {
			timesUpDialog.showModal();
			return;
		}

		document.startViewTransition(() => {
			timesUpDialog.showModal();
		});
	}

	function closeTimesUpDialog() {
		if (!document.startViewTransition) {
			timesUpDialog.close();
			return;
		}

		document.startViewTransition(() => {
			timesUpDialog.close();
		});
	}

	function openSetTimeDialog() {
		if (!document.startViewTransition) {
			setTimeDialog.showModal();
			return;
		}

		document.startViewTransition(() => {
			setTimeDialog.showModal();
		});
	}

	function closeSetTimeDialog() {
		if (!document.startViewTransition) {
			setTimeDialog.close();
			return;
		}

		document.startViewTransition(() => {
			setTimeDialog.close();
		});
	}

	onMount(() => {
		arcAnimation = animate(
			'.arc path, .arcH path',
			{ pathLength: [0, 1] },
			{ duration: totalTime, ease: 'linear' }
		);
		arcAnimation.pause();
	});
	// toggle the timer
	const toggleTimer = () => {
		// console.log('Toggling timer. Current status:', timerStatus);
		if (timerStatus == 'done') {
			// if the timer is done, reset the timer
			// console.log('Resetting timer');
			min = 1;
			sec = 0;
			timerStatus = 'paused';

			// reverse the animation to show the arc go back
			arcAnimation = animate(
				'.arc path, .arcH path',
				{ pathLength: [1, 0] },
				{ duration: 0.5, ease: 'linear' }
			);
			arcAnimation.play();

			// reset animation to previous state  after reverse animation is done
			arcAnimation.then(() => {
				arcAnimation = animate(
					'.arc path, .arcH path',
					{ pathLength: [0, 1] },
					{ duration: totalTime, ease: 'linear' }
				);
				arcAnimation.pause();
			});
			return;
		}
		timerStatus = 'running';
		// if the interval is running, pause the animation and clear the interval
		if (interval) {
			// console.log('Pausing timer');
			clearInterval(interval);
			interval = null;
			timerStatus = 'paused';
			arcAnimation.pause();
		} else {
			// if the interval is not running, start the animation and the interval
			// console.log('Starting timer');
			arcAnimation.play();
			tick(); // Call once before setting up the interval to avoid initial delay
			interval = setInterval(tick, 1000);
		}
	};

	function tick() {
		if (sec == 0) {
			// if the seconds are 0, decrement the minutes
			if (min == 0) {
				// if the interval is done i.e. min is 0, clear the interval
				openTimesUpDialog();
				clearInterval(interval);
				interval = null;
				timerStatus = 'done';
			} else {
				// if the minutes are not 0, decrement the minutes and set the seconds to 59
				min--;
				sec = 59;
			}
		} else {
			// if the seconds are not 0, decrement the seconds
			sec--;
		}
	}
	// supa hot code
</script>

<dialog class="times-up" bind:this={timesUpDialog} style="view-transition-name: timesUpDialog;">
	<div class="container">
		<h2 class="text-4xl font-bold">Time's up!</h2>
		<p class="text-lg text-gray-300">
			You have completed your focus session. Take a break and relax for a while or start again.
		</p>
		<div>
			<button class="break-btn mt-4 rounded-full px-4 py-2 text-white" onclick={closeTimesUpDialog}>
				Take a Break
			</button>
			<button
				class="start-btn mt-4 rounded-full border border-slate-700 px-4 py-2 text-white"
				onclick={() => {
					toggleTimer();
					closeTimesUpDialog();
				}}>
				Start Again
			</button>
		</div>
	</div>
</dialog>
<dialog class="set-time" bind:this={setTimeDialog} style="view-transition-name: setTimeDialog;">
	<div class="container">
		<div class="flex justify-between">
			<h2 class="flex-1 text-center text-4xl font-semibold">Set time</h2>
			<button class="hover:opacity-75" onclick={closeSetTimeDialog}>
				<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
			</button>
		</div>
		<div class="flex gap-3 *:flex-1">
			<div class="text-center text-2xl font-bold text-gray-400">
				<span>min</span>
				<input type="number" name="min" id="min" min="0" max="60" bind:value={min} />
			</div>
			<div class="text-center text-2xl font-bold text-gray-400">
				<span>sec</span>
				<input type="number" name="sec" id="sec" min="0" max="59" bind:value={sec} />
			</div>
		</div>
		<div>
			<button
				class="start-btn mt-4 rounded-full border border-slate-700 px-4 py-2 text-white"
				onclick={() => {
					toggleTimer();
					closeSetTimeDialog();
				}}>
				Start Timer
			</button>
		</div>
	</div>
</dialog>
<div class="timer flex h-fit text-center text-6xl font-bold max-sm:flex-col">
	<NumberFlowGroup>
		<NumberFlow value={min} format={{ minimumIntegerDigits: 2 }} />
		<div
			class="controls bottom-0 left-1/2 flex justify-center px-4 text-5xl text-black max-sm:absolute max-sm:-translate-x-1/2 max-sm:translate-y-20 sm:flex-col">
			<button onclick={toggleTimer} class="play">
				{#if timerStatus == 'paused'}
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
						<path
							fill="currentColor"
							d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
					</svg>
				{:else if timerStatus == 'running'}
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
						<path
							fill="currentColor"
							d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12 4c2.1 0 4.1.8 5.6 2.3c3.1 3.1 3.1 8.2 0 11.3c-1.8 1.9-4.3 2.6-6.7 2.3l.5-2c1.7.2 3.5-.4 4.8-1.7c2.3-2.3 2.3-6.1 0-8.5C15.1 6.6 13.5 6 12 6v4.6l-5-5l5-5zM6.3 17.6C3.7 15 3.3 11 5.1 7.9l1.5 1.5c-1.1 2.2-.7 5 1.2 6.8q.75.75 1.8 1.2l-.6 2q-1.5-.6-2.7-1.8" />
					</svg>
				{/if}
			</button>
			<button class="edit" aria-label="Edit timer" onclick={openSetTimeDialog}>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
				</svg>
			</button>
		</div>
		<NumberFlow value={sec} format={{ minimumIntegerDigits: 2 }} />
	</NumberFlowGroup>
</div>

<style lang="scss" :global>
	main {
		--number-flow-mask-height: 0.1em;
		--number-flow-char-height: 0.8em;
	}
	.timer {
		// color: transparent;
		font-size: clamp(7rem, 20vw, 28rem);
		font-family: 'Azeret Mono', monospace;
		@media screen and (width < 640px) {
			font-size: 13rem;
		}
		@media screen and (width < 400px) {
			font-size: 10rem;
		}
	}

	.set-time {
		max-width: 27rem;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 40px #18d9fb29;
		border: rgba(44, 44, 44, 0.8) solid 3px;
		background: radial-gradient(at 50% -10%, rgba(63, 63, 63, 0.9) 0%, rgb(17, 17, 17, 0.95) 100%);
		.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}
		#min,
		#sec {
			padding: 0.2em 0.5em;
			border: 2px solid #2242d2a7;
			border-radius: 4rem;
			// width: min-content;
			// text-align: center;
		}
	}

	.times-up {
		max-width: 35rem;
		padding: 3rem;
		box-shadow: 0 0 40px #18d9fb29;
		text-align: center;
		border-radius: 10rem;
		border: rgba(44, 44, 44, 0.8) solid 3px;
		background: radial-gradient(at 50% -10%, rgba(63, 63, 63, 0.9) 0%, rgb(17, 17, 17, 0.95) 100%);
		.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}
		div {
			display: flex;
			justify-content: center;
			gap: 1rem;
			.break-btn {
				background: linear-gradient(to bottom, #00e0ff 0%, #0001ff 100%);
				box-shadow: 0 0 10px rgba(0, 224, 255, 0.5) inset;
				&:hover {
					background: linear-gradient(to bottom, #00e0ff 0%, #063cff 100%);
					box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
				}
			}
			.start-btn {
				background: transparent;
				border: 1px solid #ffffff33;
				&:hover {
					background: rgba(255, 255, 255, 0.1);
					box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
				}
			}
		}
	}

	.controls {
		gap: 2rem;
		z-index: 1;
		@media screen and (max-width: 768px) {
			gap: 0.5rem;
		}
		.edit {
			color: white;
			background: linear-gradient(to bottom, rgba(148, 148, 148, 1) 0%, rgba(70, 70, 70, 1) 100%);
		}
		button {
			background: white;
			border-radius: 50%;
			padding: 0.5rem;
			transition: 0.2s;
			box-shadow: 0 0 10px #0000005b;
			&:hover {
				transform: scale(1.1);
				box-shadow: 0 0 50px rgba(223, 223, 223, 0.45);
			}
			@media screen and (width < 768px) {
				// padding: 0.3rem;
				scale: 0.8;
			}
		}
	}
</style>
