import type { SceneTypes } from '$data/scene-types';
import type { Tags } from '$data/tags';

export interface Genre {
	name: string;
	emoji: string;
	stations: Record<string, Station>;
}

export interface Station {
	name: string;
	displayName?: string;
	trackID: string;
	live: boolean;
	hidden?: boolean;
}

export interface Offset {
	start?: number;
	end?: number;
}

export interface Continent {
	name: string;
	hidden?: boolean;
	emoji: string;
	image: string; // Add the 'image' property for the image URL
	countries: Country[];
}

export type Country = SceneGroup & {
	emoji: 'flag';
};

export interface SceneGroup {
	name: string;
	previewID?: string;
	scenes: (Scene | SceneGroup)[];
}

export interface Scene {
	name: string;
	type: SceneTypes;
	videoID: string;
	tags?: Tags[];
	hidden?: boolean;
	suggestedTrack?: Station;
	offset?: Offset;
	// Used to better determine a good starting point
	// Not required
	length?: number;
}
