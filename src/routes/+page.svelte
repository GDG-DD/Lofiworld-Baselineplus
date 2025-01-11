<script lang="ts">
	import { page } from '$app/stores';
	import UI from '$components/UI.svelte';
	import {
		DEFAULT_VIDEO_END_OFFSET,
		DEFAULT_VIDEO_START_OFFSET,
		IS_CHRISTMAS,
		IS_HALLOWEEN
	} from '$lib/constants';
	import { setupHeartbeat } from '$lib/heartbeat';
	import { setupHotkeys } from '$lib/hotkeys';
	import { nowPlaying, uiState } from '$lib/stores.svelte';
	import { decodeSharableURL, getSpooky, getXmas, goToRandomSceneWithMusic } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	import logo from '$images/logo.png'; // Import your first logo
	import logo2 from '$images/logo2.png'; // Import your second logo
    import headphonesIcon from '$images/headphones.png'; // Import headphones icon

	onMount(() => {
		const cleanupHeartbeat = setupHeartbeat();
		const cleanupHotkeys = setupHotkeys();

		const decodedURL = decodeSharableURL($page.url);

		if (decodedURL) {
			nowPlaying.scene = decodedURL.scene;
			nowPlaying.station = decodedURL.track;
		} else if (IS_HALLOWEEN) {
			getSpooky();
		} else if (IS_CHRISTMAS) {
			getXmas();
		} else {
			goToRandomSceneWithMusic(true);
		}

		return () => {
			//cleanupHeartbeat();
			cleanupHotkeys();
		};
	});
</script>

{#if !uiState.isPlaying}
	<div
		out:fade={{ duration: 2000 }}
		class="flex justify-center items-center w-full h-full fixed inset-0 z-50 bg-custom"
	>
		{#key uiState.hasStarted}
			<div
				out:scale|local={{ start: 0.95, duration: 800 }}
				in:fly|local={{ y: 10, duration: 800, delay: 100 }}
				class="absolute text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
			>
				<!-- Logos with X -->
				<div class="logo-container">
					<img src={logo} alt="Logo 1" class="logo" />
					<span class="logo-separator">X</span>
					<img src={logo2} alt="Logo 2" class="logo" />
				</div>

				<!-- Text -->
				{#if uiState.hasStarted}
					{#if IS_HALLOWEEN}
						<p>Happy Halloween...</p>
					{:else if IS_CHRISTMAS}
						<p>Merry Christmas!</p>
					{:else}
						<p>Let's go...</p>
					{/if}

					<div class="loader"></div>
				{:else}
					<p>Tap to begin your journey!</p>
				{/if}

				<div class="headphone-suggestion">
                    <img src={headphonesIcon} alt="Headphones recommended" class="headphone-icon" />
                    <p class="text-xs">Use headphones for the best experience</p>
                </div>

                <p class="orientation-suggestion">Enjoy in portrait or landscape mode!</p>

			</div>
		{/key}
	</div>
{/if}

{#if uiState.hasStarted && nowPlaying.scene && nowPlaying.station}
	<UI
		bind:playing={uiState.isPlaying}
		videoID={nowPlaying.scene.videoID}
		videoLength={nowPlaying.scene.length}
		liveAudio={nowPlaying.station.live}
		audioID={nowPlaying.station.trackID}
		videoOffset={{
			start: nowPlaying.scene.offset?.start ?? DEFAULT_VIDEO_START_OFFSET,
			end: nowPlaying.scene.offset?.end ?? DEFAULT_VIDEO_END_OFFSET
		}}
	/>
{/if}

<style lang="postcss">
	/* Set the background color */
	.bg-custom {
		background-color: #3C3214;
	}

	/* Set the text color and font */
	:global(body) {
		color: #C8B4C8;
		font-family: 'Bauhaus Nano', sans-serif;
	}

	/* Logo container styling */
	.logo-container {
		@apply grid grid-cols-3 justify-items-center items-center gap-4 mb-4;
	}

	/* Logo styling */
	.logo {
		@apply max-w-[100px] md:max-w-[150px] h-auto;
	}

	/* Separator styling */
	.logo-separator {
		@apply text-2xl md:text-4xl font-bold;
	}

	.headphone-suggestion {
		@apply flex items-center justify-center mt-4 text-sm;
	}

	.headphone-icon {
		@apply w-4 h-4 mr-2;
	}

	.orientation-suggestion {
		@apply text-xs mt-2 text-center; /* Center the text */
	}

	/* Loader animation */
	@keyframes load {
		0% {
			width: 0%;
			left: 0;
		}

		100% {
			width: 100%;
		}
	}

	.loader {
		@apply w-32 mt-4 h-[2px] relative;

		&:before {
			@apply h-full bg-white absolute left-0 top-0;

			animation: load 5s ease-out;
			animation-delay: 100ms;
			animation-fill-mode: both;
			content: '';
		}
	}

	@media (min-width: 768px) { /* Adjust breakpoint as needed */
    p {
        font-size: 1.2rem; /* Increase base font size */
    }

    .logo-separator {
        font-size: 3rem; /* Increase separator size */
    }

    .headphone-suggestion p {
        font-size: 1rem; /* Increase headphone suggestion text size */
    }

    .orientation-suggestion {
        font-size: 0.9rem; /* Increase orientation suggestion text size */
    }
}

</style>