import { restaurants } from './mockData';
import { storage } from './storage';

export const getRecommendation = (criteria) => {
    const { types, price, location } = criteria;
    const blocklist = storage.getBlocklist();

    // Filter restaurants
    const candidates = restaurants.filter(r => {
        // 1. Check Blocklist
        if (blocklist.includes(r.id)) return false;

        // 2. Check Location
        if (r.location !== location) return false;

        // 3. Check Price
        if (r.price !== price) return false;

        // 4. Check Type (at least one match)
        // If types is empty, maybe allow all? But UI enforces selection.
        // We check if the restaurant's type is in the selected types list.
        // Note: Mock data has single 'type', but criteria has 'types' array.
        // Wait, mock data 'type' is a string ID.
        return types.includes(r.type);
    });

    if (candidates.length === 0) {
        return null;
    }

    // Random selection
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
};
