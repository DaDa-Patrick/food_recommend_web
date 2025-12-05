// This script processes restaurant.json and converts it to mockData format
import restaurantData from '../../restaurant.json' with { type: 'json' };

// Mapping functions
const mapPriceToTier = (priceRange) => {
    if (priceRange === '50-100') return '$';
    if (priceRange === '100-150') return '$$';
    if (priceRange === '150-200') return '$$$';
    return '$$'; // default
};

const mapLocationToId = (locationName) => {
    const mapping = {
        '師大': 'shida',
        '公館': 'gongguan',
        '校本部': 'school'
    };
    return mapping[locationName] || 'gongguan';
};

// Determine primary type based on food tags
const determineType = (foodTags) => {
    const tagSet = new Set(foodTags.map(t => t.toLowerCase()));

    // Priority order matters - check more specific types first
    if (tagSet.has('火鍋') || tagSet.has('麻辣')) return 'hotpot';
    if (tagSet.has('鐵板燒')) return 'teppanyaki';
    if (tagSet.has('漢堡') || tagSet.has('鬆餅') || tagSet.has('輕食') || tagSet.has('焗烤')) return 'western';
    if (tagSet.has('麵食') || tagSet.has('牛肉麵') || tagSet.has('義大利麵')) return 'noodle';
    if (tagSet.has('便當') || tagSet.has('丼飯') || tagSet.has('飯類') || tagSet.has('炒飯') || tagSet.has('健康餐')) return 'rice';
    if (tagSet.has('咖哩') || tagSet.has('港式餐廳')) return 'exotic';
    if (tagSet.has('炸雞') || tagSet.has('炸豬排') || tagSet.has('鹹酥雞') || tagSet.has('鍋貼包子') || tagSet.has('小吃')) return 'snack';

    // Default fallback
    return 'rice';
};

// Generate description based on tags and rating
const generateDescription = (name, foodTags, rating) => {
    const descriptions = {
        'high': ['必吃美食', '人氣名店', '強力推薦', '超高評價', '排隊名店'],
        'medium': ['不錯的選擇', '值得一試', '好吃實在', 'CP值高', '學生最愛'],
        'low': ['平價選擇', '方便快速', '簡單美味']
    };

    const ratingNum = parseFloat(rating);
    let tier = 'medium';
    if (ratingNum >= 4.5) tier = 'high';
    else if (ratingNum < 4.0) tier = 'low';

    const descPool = descriptions[tier];
    const randomDesc = descPool[Math.floor(Math.random() * descPool.length)];

    // Add some specific flavor based on tags
    const mainTag = foodTags[0] || '美食';
    return `${randomDesc},${mainTag}愛好者必訪。`;
};

// Main processing function
export const processRestaurants = () => {
    const processed = [];
    let currentId = 1;

    Object.keys(restaurantData).forEach((key) => {
        const restaurants = restaurantData[key];

        restaurants.forEach((restaurant) => {
            const { name, 'food tag': foodTags, rating, price, location } = restaurant;

            // Handle multiple locations
            const locations = Array.isArray(location) ? location : [location];

            locations.forEach((loc) => {
                processed.push({
                    id: currentId++,
                    name: name,
                    type: determineType(foodTags),
                    price: mapPriceToTier(price),
                    location: mapLocationToId(loc),
                    tags: foodTags,
                    description: generateDescription(name, foodTags, rating),
                    rating: rating
                });
            });
        });
    });

    return processed;
};

// Export processed data
export const processedRestaurants = processRestaurants();
