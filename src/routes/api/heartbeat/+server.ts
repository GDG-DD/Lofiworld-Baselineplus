// import { PUBLIC_PH_TOKEN } from '$env/static/public'; // Remove this import
import type { Scene, Station } from '$lib/types';
// import { PostHog } from 'posthog-node'; // Remove this import

import type { RequestHandler } from './$types';

interface HeartbeatBody {
	distinctID: string;
	nowPlaying: Scene;
	currentStation: Station;
}

export const POST: RequestHandler = async ({ getClientAddress, request }) => {
	// Remove all PostHog related code
	// const ph = new PostHog(PUBLIC_PH_TOKEN, { ... }); // Remove
	const body: HeartbeatBody = await request.json();


	// ph.capture({ ... }); // Remove
	// await ph.shutdown(); // Remove

	return new Response(JSON.stringify({ success: true })); // Keep this or modify as needed
};