export const restaurants = [
  {
    id: 1,
    name: "阿英滷肉飯",
    type: "rice",
    price: "$",
    location: "gongguan",
    tags: ["滷肉飯", "台式", "排隊名店"],
    description: "傳說中的神級滷肉飯，肥而不膩。"
  },
  {
    id: 2,
    name: "藍家割包",
    type: "snack",
    price: "$",
    location: "gongguan",
    tags: ["割包", "四神湯", "老店"],
    description: "公館必吃美食，肥瘦可選。"
  },
  {
    id: 3,
    name: "師大生煎包",
    type: "snack",
    price: "$",
    location: "shida",
    tags: ["生煎包", "排隊", "小吃"],
    description: "皮薄餡多，湯汁鮮美。"
  },
  {
    id: 4,
    name: "好好味冰火菠蘿油",
    type: "snack",
    price: "$",
    location: "shida",
    tags: ["港式", "甜點", "麵包"],
    description: "外酥內軟，奶油香氣十足。"
  },
  {
    id: 5,
    name: "校園自助餐",
    type: "rice",
    price: "$",
    location: "school",
    tags: ["自助餐", "便宜", "多樣"],
    description: "學生最愛，經濟實惠。"
  },
  {
    id: 6,
    name: "貳樓餐廳",
    type: "western",
    price: "$$$",
    location: "gongguan",
    tags: ["早午餐", "義大利麵", "聚餐"],
    description: "適合聚餐的優質美式餐廳。"
  },
  {
    id: 7,
    name: "大盛豬排",
    type: "rice",
    price: "$$",
    location: "gongguan",
    tags: ["豬排", "日式", "定食"],
    description: "厚切豬排，口感紮實。"
  },
  {
    id: 8,
    name: "牛洞食堂",
    type: "rice",
    price: "$$",
    location: "gongguan",
    tags: ["牛丼", "日式", "丼飯"],
    description: "多種口味牛丼，加蛋更美味。"
  },
  {
    id: 9,
    name: "燈籠滷味",
    type: "snack",
    price: "$$",
    location: "shida",
    tags: ["滷味", "宵夜", "重口味"],
    description: "師大夜市招牌滷味。"
  },
  {
    id: 10,
    name: "甘泉魚麵",
    type: "noodle",
    price: "$$",
    location: "school",
    tags: ["魚麵", "湯麵", "連鎖"],
    description: "湯頭鮮甜，魚肉軟嫩。"
  },
  {
    id: 11,
    name: "銀咖哩",
    type: "rice",
    price: "$$",
    location: "gongguan",
    tags: ["咖哩", "日式", "大份量"],
    description: "富士山咖哩飯，挑戰你的胃。"
  },
  {
    id: 12,
    name: "泰國小館",
    type: "exotic",
    price: "$$$",
    location: "gongguan",
    tags: ["泰式", "合菜", "酸辣"],
    description: "老字號泰式料理，道地夠味。"
  }
];

export const locations = [
  { id: "school", name: "校本部" },
  { id: "gongguan", name: "公館" },
  { id: "shida", name: "師大夜市" }
];

export const prices = [
  { id: "$", name: "$ (約 80-120 元)" },
  { id: "$$", name: "$$ (120-160 元)" },
  { id: "$$$", name: "$$$ (160-200 元)" }
];

export const types = [
  { id: "rice", name: "飯食" },
  { id: "noodle", name: "麵食" },
  { id: "soup", name: "湯品" },
  { id: "snack", name: "小吃/炸物" },
  { id: "western", name: "西式" },
  { id: "exotic", name: "異國料理" }
];
