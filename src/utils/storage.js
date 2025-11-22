const STORAGE_KEYS = {
    FAVORITES: 'lunch_picker_favorites',
    BLOCKLIST: 'lunch_picker_blocklist',
    HISTORY: 'lunch_picker_history',
    PREFERENCES: 'lunch_picker_preferences'
};

export const getStorage = (key, defaultValue = []) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return defaultValue;
    }
};

export const setStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing ${key} to localStorage`, error);
    }
};

export const storage = {
    getFavorites: () => getStorage(STORAGE_KEYS.FAVORITES),
    setFavorites: (favorites) => setStorage(STORAGE_KEYS.FAVORITES, favorites),

    getBlocklist: () => getStorage(STORAGE_KEYS.BLOCKLIST),
    setBlocklist: (blocklist) => setStorage(STORAGE_KEYS.BLOCKLIST, blocklist),

    getHistory: () => getStorage(STORAGE_KEYS.HISTORY),
    setHistory: (history) => setStorage(STORAGE_KEYS.HISTORY, history),

    getPreferences: () => getStorage(STORAGE_KEYS.PREFERENCES, null),
    setPreferences: (prefs) => setStorage(STORAGE_KEYS.PREFERENCES, prefs),
};
