import type { Station } from '$lib/types';
import { objectify } from 'radashi';



import { lofi } from './lofi';


// Remove the import for classical, electronic, jazz,pop,rnb
// import { classical } from './classical';

export const genres = {
	lofi,

    // Remove classical,electronic,jazz,pop, rnb from the genres object
	// classical,
};

// Remove classical station from christmasStations
export const christmasStations = [
	//jazz.stations.christmas1,
	//jazz.stations.christmas2,
	//lofi.stations.christmas,
    // classical.stations.christmas,
];

export const halloweenStations = [
	//electronic.stations.halloween1,
	//electronic.stations.halloween2,
	//electronic.stations.halloween3
];

export interface StationWithGenre extends Station {
	genre: keyof typeof genres;
}

const stations: StationWithGenre[] = Object.entries(genres).flatMap(([genre, genreObject]) => {
    // Check if genreObject and genreObject.stations are defined before accessing them
    if (!genreObject || !genreObject.stations) return []; 
    return Object.values(genreObject.stations).map((station) => ({
        ...station,
        genre: genre as keyof typeof genres, // Explicitly cast genre
    }));
});


export const stationMap = objectify(stations, (station) => station.trackID);

export const stationList = stations.filter((s) => !s.hidden);