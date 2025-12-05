import { restaurants } from './mockData';
import { storage } from './storage';

export const getRecommendation = (criteria) => {
    const { types, prices, locations } = criteria;
    const blocklist = storage.getBlocklist();

    // Filter restaurants
    const candidates = restaurants.filter(r => {
        // 1. Check Blocklist
        if (blocklist.includes(r.id)) return false;

        // 2. Check Location (now supports multiple)
        if (!locations.includes(r.location)) return false;

        // 3. Check Price (now supports multiple)
        if (!prices.includes(r.price)) return false;

        // 4. Check Type (at least one match)
        return types.includes(r.type);
    });

    if (candidates.length === 0) {
        return null;
    }

    // Random selection
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
};
