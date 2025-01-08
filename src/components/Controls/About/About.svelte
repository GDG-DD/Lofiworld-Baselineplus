<script lang="ts">
	import Button from '$components/Button.svelte';
	import FullScreenOverlay from '$components/Controls/FullScreenOverlay.svelte';
	import logo from '$images/logo.png';
    import logo2 from '$images/logo2.png'; // Import the second logo
	import { clickOutside } from '$lib/actions';

	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();
</script>

<FullScreenOverlay bind:open>
	<div class="about" use:clickOutside={() => (open = false)}>
		<div class="logo-container">  <!-- Container for logos and X -->
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
		background-color: #3C3214; /* Set the background color */
		color: #C8B4C8; /* Set the text color */
		font-family: 'Bauhaus Nano', sans-serif; /* Set the font */
	}

	.about {
		@apply max-w-xl text-center mx-auto h-full flex flex-col justify-center items-center p-8;

		kbd {
			@apply kbd-sm kbd;
		}
	}

    /* Logo container styling */
    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem; /* Space between logos and the "X" */
        margin-bottom: 1rem; /* Add spacing below the logo container */
    }

    /* Logo styling */
    .logo {
        width: 216px; /* Adjust the size of the logos as needed */
    }

    /* Separator styling */
    .logo-separator {
        font-size: 4.5rem; /* Adjust the size of the "X" */
        color: #C8B4C8; /* Match the text color */
        font-weight: bold;
    }


	/* Additional styles for the divider */
	.divider {
		width: 100%;
		height: 1px;
		background-color: #C8B4C8; /* Match the text color */
		margin: 1rem 0;
	}
</style>