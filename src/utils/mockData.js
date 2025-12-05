import { processedRestaurants } from './processRestaurantData';

export const restaurants = processedRestaurants;

export const locations = [
  { id: "gongguan", name: "公館" },
  { id: "shida", name: "師大夜市" }
];

export const prices = [
  { id: "$", name: "$ (約 50-100 元)" },
  { id: "$$", name: "$$ (100-150 元)" },
  { id: "$$$", name: "$$$ (150-200 元)" }
];

export const types = [
  { id: "rice", name: "飯食" },
  { id: "noodle", name: "麵食" },
  { id: "snack", name: "小吃/炸物" },
  { id: "western", name: "西式" },
  { id: "exotic", name: "異國料理" },
  { id: "hotpot", name: "火鍋" },
  { id: "teppanyaki", name: "鐵板燒" }
];
