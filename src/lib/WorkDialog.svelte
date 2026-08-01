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
	<div class="flex justify-between">
		<h2 class="text-2xl font-medium">Change Focus</h2>
		<button class="hover:opacity-75" onclick={close}>
			<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
		</button>
	</div>
	<div class="-mx-6 mb-5 mt-6 h-[3px]" style="background-color: rgba(44, 44, 44, 0.8);"></div>

	<p class="text-sm text-gray-400">Change your focus here and add notes</p>
	<div class="mt-2 grid gap-3 *:items-center">
		<div class="grid gap-2">
			<label for="work" class="font-medium">Focusing on</label>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				id="work"
				name="current work"
				type="text"
				class="h-10 rounded px-3 outline-none ring-[#484848FF] ring-2"
				autofocus
				bind:value={work} />
		</div>
		<div class="grid gap-2">
			<label for="note" class="font-medium">Note</label>
			<textarea
				id="note"
				class="resize-none rounded px-3 py-2 outline-none ring-[#484848FF] ring-2"
				bind:value={note}>
			</textarea>
		</div>
	</div>
	<div class="flex-cols mt-4 flex sm:flex-row sm:justify-end sm:space-x-2">
		<button
			onclick={changeWork}
			class="inline-flex grow justify-center rounded-full border border-slate-700 px-4 py-2 text-white hover:opacity-85 sm:grow-0">
			Change
		</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 30rem;
		padding: 1.5rem ;
		border-radius: 1rem;
		box-shadow: 0 0 40px #18d9fb29;
		border: rgba(44, 44, 44, 0.8) solid 3px;
		background: rgb(27, 27, 27);
		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(10px);
		}
	}
</style>
