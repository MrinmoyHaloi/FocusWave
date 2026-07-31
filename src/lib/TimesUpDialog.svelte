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
</script>

<dialog bind:this={dialog} style="view-transition-name: dialog;">
	<div class="flex flex-col">
		<h2 class="text-2xl font-medium">Time's up!</h2>
		<div class="-mx-6 mb-5 mt-6 h-[3px]" style="background-color: rgba(44, 44, 44, 0.8);"></div>
		<div class="flex flex-col">
			<p class="text-lg text-gray-300">
				You have completed your focus session. Take a break and relax for a while or start again.
			</p>
			<div class="flex gap-4 btns mt-2">
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
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 25rem;
		padding: 1.5rem;
		box-shadow: 0 0 40px #18d9fb29;
		text-align: center;
		border-radius: 1rem;
		border: rgba(44, 44, 44, 0.8) solid 3px;
		background: rgb(27, 27, 27);

		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(10px);
		}
		div {
			display: flex;
			justify-content: center;
			.btns {

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
	}
</style>
