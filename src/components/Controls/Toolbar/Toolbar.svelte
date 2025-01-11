<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Fullscreen from './Fullscreen.svelte';
	import ToolbarButton from './ToolbarButton.svelte';

	const dispatch = createEventDispatcher();

	function handleOpenSettings() {
		dispatch('openSettings');
	}

	function handleOpenAbout() {
		dispatch('openAbout');
	}
</script>

<nav
	id="top-icons"
	class="
    absolute top-0 inset-x-0
    flex flex-row justify-end items-center
    px-4 py-2 pb-16
    z-50
    bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent
  "
>
	<!-- Removed CopyToClipboard and the white bar -->

	<img src="/logo.png" alt="Logo" class="h-16 mr-10" />

	<ToolbarButton icon="mdi:heart" action={handleOpenAbout} title="About" />
	<ToolbarButton icon="mdi:settings" action={handleOpenSettings} title="Settings" />

	<Fullscreen />
</nav>