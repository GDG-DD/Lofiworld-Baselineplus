<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import CopyToClipboard from './CopyToClipboard.svelte';
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
	<!-- Removed VisitorCount and SupportText -->

	<div class="h-8 border-white/10 mr-5 border w-px"></div>

	<CopyToClipboard />

	<ToolbarButton icon="mdi:heart" action={handleOpenAbout} title="About" />
	<ToolbarButton icon="mdi:settings" action={handleOpenSettings} title="Settings" />

	<Fullscreen />
</nav>