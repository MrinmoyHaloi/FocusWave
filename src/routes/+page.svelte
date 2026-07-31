<script>
	import Icon from '@iconify/svelte';
	import Timer from '$lib/Timer.svelte';
	import WorkDialog from '$lib/WorkDialog.svelte';
	import { onMount } from 'svelte';

	/**
	 * span element to display the work
	 * @type {string}
	 */
	let workElement;
	let work = $state('');
	let note = $state('');

	let min = $state(0);
	let sec = $state(0);

	let ready = $state(false);

	let workDialog;

	function changeWork() {
		// save the work and note to localStorage and set the workElement textContent to the work
		localStorage.setItem('work', work ?? '');
		localStorage.setItem('note', note ?? '');
		workElement.textContent = work;
		workDialog.close();
	}

	onMount(() => {
		// get the work and note from localStorage and set the workElement textContent to the work
		work = localStorage.getItem('work') || 'Creating FocusWave design';
		note = localStorage.getItem('note');
		min = parseInt(localStorage.getItem('lastMin')) || 15;
		sec = parseInt(localStorage.getItem('lastSec')) || 30;
		ready = true;
		workElement.textContent = work;
	});
</script>

<WorkDialog bind:this={workDialog} {changeWork} bind:work bind:note />

<main class="relative flex flex-col sm:m-auto px-7 max-sm:flex-col-reverse text-center">
	<div class="z-10 max-sm:mt-6">
		<span class="text-gray-400">I'm Focusing on</span>
		<span class="flex gap-1 text-lg font-semibold justify-center">
			<span class="max-w-72 truncate" bind:this={workElement}></span>
			<button onclick={workDialog.open} class="hover:opacity-75">
				<Icon icon="mdi:square-edit-outline" />
			</button>
		</span>
	</div>
	<Timer {min} {sec} {ready}/>
</main>
<div class="mb-auto"></div>
