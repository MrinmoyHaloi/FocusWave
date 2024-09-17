<script>
	import '../app.scss';
	import Icon from '@iconify/svelte';


</script>

<div class="flex justify-between px-7 py-5">
	<div>
		<h1 class="text-4xl font-bold">FocusWave</h1>
		<span class="mt-3 flex items-center gap-1 text-gray-400">
			Lofi hip hop radio - Lofi Girl <Icon icon="mdi:music" />
		</span>
	</div>
	<img
		src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jasper"
		alt="user profile"
		class="size-14 rounded-full border-2 bg-slate-700"
	/>
</div>
<slot></slot>

<style lang="scss">
	h1 {
		color: transparent;
		background: linear-gradient(to bottom, #fff 0%, rgb(143, 144, 157) 100%);
		background-clip: text;
	}
</style>
