<script>
	import Icon from '@iconify/svelte';

	let { handleSetTimeSubmit, tempMin = $bindable(), tempSec = $bindable() } = $props();
	let dialog;

	export function open() {
		if (!document.startViewTransition) {
			dialog.showModal();
			return;
		}

		document.startViewTransition(() => {
			dialog.showModal();
		});
	}

	export function close() {
		if (!document.startViewTransition) {
			dialog.close();
			return;
		}

		document.startViewTransition(() => {
			dialog.close();
		});
	}
</script>

<dialog bind:this={dialog} style="view-transition-name: dialog;">
	<div class="container">
		<div class="flex justify-between">
			<h2 class="flex-1 text-center text-4xl font-semibold">Set time</h2>
			<button class="hover:opacity-75" onclick={close}>
				<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
			</button>
		</div>
		<form onsubmit={handleSetTimeSubmit}>
			<div class="flex gap-3 *:flex-1">
				<div class="grid text-center text-2xl font-bold text-gray-400">
					<span>min</span>
					<input type="number" name="min" id="min" min="0" max="60" required bind:value={tempMin} />
				</div>
				<div class="text-center text-2xl font-bold text-gray-400">
					<span>sec</span>
					<input type="number" name="sec" id="sec" min="0" max="59" required bind:value={tempSec} />
				</div>
			</div>
			<div>
				<button
					type="submit"
					class="start-btn mt-4 rounded-full border border-slate-700 px-4 py-2 text-white">
					Save
				</button>
			</div>
		</form>
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 27rem;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 40px #18d9fb29;
		border: rgba(44, 44, 44, 0.8) solid 3px;
		background: radial-gradient(at 50% -10%, rgba(63, 63, 63, 1) 0%, rgb(17, 17, 17, 0.95) 100%);
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
		}
	}
</style>
