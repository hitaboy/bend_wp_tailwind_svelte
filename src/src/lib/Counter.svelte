<script>
	import { sharedCount } from './stores.js';
	let { initialCount = 0, opening_times = [] } = $props();

	$effect(() => {
		console.log('Opening times:', opening_times);
	});

	$effect(() => {
		sharedCount.set(initialCount);
	});

	function increment() {
		sharedCount.update(n => n + 1);
	}

	function decrement() {
		sharedCount.update(n => n - 1);
	}
</script>

<div class="flex items-center gap-4 p-4 bg-blue-500">
	<button class="px-4 py-2 bg-red-500 text-white rounded" onclick={decrement}>-</button>
	<span class="text-2xl font-bold">{$sharedCount}</span>
	<button class="px-4 py-2 bg-green-500 text-white rounded" onclick={increment}>+</button>
</div>
