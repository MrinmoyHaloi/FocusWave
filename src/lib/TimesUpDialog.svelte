<script>
	let { toggleTimer } = $props();
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

	function close() {
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
		<h2 class="text-4xl font-bold">Time's up!</h2>
		<p class="text-lg text-gray-300">
			You have completed your focus session. Take a break and relax for a while or start again.
		</p>
		<div>
			<button class="break-btn mt-4 rounded-full px-4 py-2 text-white" onclick={close}>
				Take a Break
			</button>
			<button
				class="start-btn mt-4 rounded-full border border-slate-700 px-4 py-2 text-white"
				onclick={() => {
					toggleTimer();
					close();
				}}>
				Start Again
			</button>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
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
</style>
