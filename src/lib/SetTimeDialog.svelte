<script>
	import Icon from '@iconify/svelte';
	let { handleSetTimeSubmit, tempMin = $bindable(), tempSec = $bindable() } = $props();
	let dialog;

	export function open() {
		min = tempMin;
		sec = tempSec;
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

	$effect(() => {
		dialog.addEventListener('click', (e) => {
			const dialogDimensions = dialog.getBoundingClientRect();
			if (
				e.clientX < dialogDimensions.left ||
				e.clientX > dialogDimensions.right ||
				e.clientY < dialogDimensions.top ||
				e.clientY > dialogDimensions.bottom
			) {
				if (!document.startViewTransition) {
					dialog.close();
					return;
				}

				document.startViewTransition(() => {
					dialog.close();
				});
			}
		});
	});
	let min = $state(tempMin);
	let sec = $state(tempSec);

	$effect(() => {
		tempMin = min;
		tempSec = sec;
	});
</script>

<dialog bind:this={dialog} style="view-transition-name: dialog;">
	<div class="container">
		<div class="flex justify-between">
			<h2
				class="flex-1 text-center text-2xl font-medium"
				style="text-box: trim-both cap alphabetic;">
				Set time
			</h2>
			<button class="hover:opacity-75" onclick={close}>
				<Icon icon="mdi:close" width="1.25rem" height="1.25rem" />
			</button>
		</div>
		<div class="-mx-6 mb-5 mt-6 h-[3px]" style="background-color: rgba(44, 44, 44, 0.8);"></div>
		<form onsubmit={handleSetTimeSubmit}>
			<div class="mb-2 flex text-2xl text-[#969696] *:flex-1">
				<span>mm</span>
				<span>ss</span>
			</div>

			<div
				class="flex text-2xl *:flex *:flex-1 *:justify-center *:*:rounded-lg *:*:bg-[#383839] *:*:text-[#b6b6b6]">
				<div>
					<button
						onclick={(e) => {
							e.preventDefault();
							min = Math.min((parseInt(min) || 0) + 1, 60);
						}}>
						<Icon icon="lucide:chevron-up" width="2rem" height="2rem" />
					</button>
				</div>
				<div>
					<button
						onclick={(e) => {
							e.preventDefault();
							sec = Math.min((parseInt(sec) || 0) + 1, 59);
						}}>
						<Icon icon="lucide:chevron-up" width="2rem" height="2rem" />
					</button>
				</div>
			</div>

			<div
				class="my-5 flex overflow-hidden rounded-[50px]"
				style="border: #484848FF solid 3px;gap:3px;background-color:#484848FF;">
				<input
					type="text"
					inputmode="numeric"
					class="w-full text-center text-8xl font-medium"
					name="min"
					id="min"
					min="0"
					max="60"
					pattern="[0-9]*"
					title="Numeric values"
					required
					bind:value={min} />

				<input
					type="text"
					inputmode="numeric"
					class="w-full text-center text-8xl font-medium"
					name="sec"
					id="sec"
					min="0"
					max="59"
					pattern="[0-9]*"
					title="Numeric values"
					required
					bind:value={sec} />
			</div>
			<div
				class="flex text-2xl *:flex *:flex-1 *:justify-center *:*:rounded-lg *:*:bg-[#383839] *:*:text-[#B6b6b6]">
				<div>
					<button
						onclick={(e) => {
							e.preventDefault();
							min = Math.max((parseInt(min) || 0) - 1, 0);
						}}>
						<Icon icon="lucide:chevron-down" width="2rem" height="2rem" />
					</button>
				</div>
				<div>
					<button
						onclick={(e) => {
							e.preventDefault();
							sec = Math.max((parseInt(sec) || 0) - 1, 0);
						}}>
						<Icon icon="lucide:chevron-down" width="2rem" height="2rem" />
					</button>
				</div>
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="start-btn mt-4 rounded-full border border-slate-700 px-4 py-2 text-white hover:opacity-85">
					Save
				</button>
			</div>
		</form>
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 30rem;
		padding: 1.5rem;
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
