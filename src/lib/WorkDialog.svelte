<script>
	import Icon from '@iconify/svelte';

	let { work = $bindable(), note = $bindable(), changeWork } = $props();
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
			<h1 class="text-xl font-semibold">Change Focus</h1>
			<button class="hover:opacity-75" onclick={close}>
				<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
			</button>
		</div>
		<p class="text-sm text-gray-400">Change your focus here and add notes</p>
		<div class="grid gap-3 *:items-center">
			<div class="grid gap-2">
				<label for="work" class="font-medium">Focusing on</label>
				<input
					id="work"
					name="current work"
					type="text"
					class="col-span-3 h-10 rounded px-3 outline-none ring-1 focus:ring-2"
					autofocus
					bind:value={work} />
			</div>
			<div class="grid gap-2">
				<label for="note" class="font-medium">Note</label>
				<textarea
					id="note"
					class="col-span-3 resize-none rounded px-3 py-2 outline-none ring-1 focus:ring-2"
					bind:value={note}>
				</textarea>
			</div>
		</div>
		<div class="flex-cols flex sm:flex-row sm:justify-end sm:space-x-2">
			<button
				onclick={changeWork}
				class="inline-flex grow justify-center rounded bg-[#003ae5] px-3 py-2 font-medium text-white hover:opacity-85 sm:grow-0">
				Change
			</button>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
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
	}
</style>
