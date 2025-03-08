<script>
	import Icon from '@iconify/svelte';
	import Timer from '$lib/Timer.svelte';
	import Arc from '$lib/Arc.svelte';
	import ArcHorizontal from '$lib/Arc-horizontal.svelte';
	import { onMount } from 'svelte';

	let currentWork = $state({
		work: 'Creating FocusWave design',
		note: ''
	});

	let work = $state('Creating FocusWave design');

	let dialog;

	function openDialog() {
		if (!document.startViewTransition) {
			dialog.showModal();
			return;
		}

		document.startViewTransition(() => {
			dialog.showModal();
		});
	}

	function closeDialog() {
		if (!document.startViewTransition) {
			dialog.close();
			return;
		}

		document.startViewTransition(() => {
			dialog.close();
		});
	}

	function changeWork() {
		work = currentWork.work;
		closeDialog();
	}

	// animate dialog when escape is pressed
	onMount(() => {
		dialog.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeDialog();
			}
		});
	});
</script>

<dialog class="work-dialog" bind:this={dialog} style="view-transition-name: dialog;">
	<div class="container">
		<div class="flex justify-between">
			<h1 class="text-xl font-semibold">Change Focus</h1>
			<button class="hover:opacity-75" onclick={closeDialog}>
				<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
			</button>
		</div>
		<p class="text-sm text-slate-400">Change your focus here and add notes</p>
		<div class="grid gap-3 *:items-center">
			<div class="grid gap-2">
				<label for="work" class="font-medium">Focusing on</label>
				<input
					id="work"
					name="current work"
					type="text"
					class="col-span-3 h-10 rounded px-3 outline-none ring-1 focus:ring-2"
					autofocus
					bind:value={currentWork.work}
				/>
			</div>
			<div class="grid gap-2">
				<label for="note" class="font-medium">Note</label>
				<textarea
					id="note"
					class="col-span-3 resize-none rounded px-3 py-2 outline-none ring-1 focus:ring-2"
					bind:value={currentWork.note}
				></textarea>
			</div>
		</div>
		<div class="flex-cols flex sm:flex-row sm:justify-end sm:space-x-2">
			<button
				onclick={changeWork}
				class="inline-flex grow justify-center rounded bg-[#003ae5] px-3 py-2 font-medium text-white hover:opacity-85 sm:grow-0"
			>
				Change
			</button>
		</div>
	</div>
</dialog>

<main class="relative flex flex-col justify-end px-7 pb-5 max-sm:flex-col-reverse sm:h-full">
	<div class="z-10 max-sm:mt-6 max-sm:text-center">
		<span class="text-gray-400">I'm Focusing on</span>
		<span class="flex items-center gap-1 text-lg font-semibold max-sm:justify-center">
			<span class="max-w-72 truncate">{work}</span>
			<button onclick={openDialog}>
				<Icon icon="mdi:square-edit-outline" />
			</button>
		</span>
	</div>
	<Timer />
</main>

<Arc />
<ArcHorizontal />

<style lang="scss">
	.work-dialog {
		max-width: 27rem;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 40px #18d9fb29;
		.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fade-out {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.8);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		::view-transition-old(dialog) {
			animation: 150ms fade-out ease-in-out forwards;
		}

		::view-transition-new(dialog) {
			animation: 150ms fade-in ease-in-out forwards;
		}
	}
</style>
