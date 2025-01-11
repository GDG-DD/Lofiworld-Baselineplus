<script lang="ts">
	import Button from '$components/Button.svelte';
	import FullScreenOverlay from '$components/Controls/FullScreenOverlay.svelte';
	import logo from '$images/logo.png';
    import logo2 from '$images/logo2.png';
	import { clickOutside } from '$lib/actions';

	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();
</script>

<FullScreenOverlay bind:open>
	<div class="about" use:clickOutside={() => (open = false)}>
		<div class="logo-container">
            <img src={logo} alt="Logo 1" class="logo" />
            <span class="logo-separator">X</span>
            <img src={logo2} alt="Logo 2" class="logo" />
        </div>

		<div class="divider"></div>

		<div class="flex flex-col items-center gap-8">
			<p>
				Take a break from the world and travel with Lofiworld!

				This app is dedicated to my son Raphael, whom I miss every moment of the day.
				I love you deeply and miss you every moment of life. Hope this app provides the means for you to have an escape once in a while :)
			</p>
		</div>
	</div>
</FullScreenOverlay>

<style lang="postcss">
	:global(body) {
		background-color: #3C3214;
		color: #C8B4C8;
		font-family: 'Bauhaus Nano', sans-serif;
	}

	.about {
		@apply max-w-xl text-center mx-auto h-full flex flex-col justify-center items-center p-8;

		kbd {
			@apply kbd-sm kbd;
		}
	}

    .logo-container {
        @apply grid grid-cols-3 justify-items-center items-center gap-4 mb-4; /* Grid layout */
    }

    .logo {
        @apply max-w-[100px] md:max-w-[150px] h-auto; /* Responsive logo size */
    }

    .logo-separator {
        @apply text-2xl md:text-4xl font-bold; /* Responsive separator size */
    }

	.divider {
		@apply w-full h-[1px] bg-[#C8B4C8] my-4;
	}
</style>
