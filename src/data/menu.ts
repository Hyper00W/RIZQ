export interface DishItem {
  number: string;
  id: string;
  name: string;
  category: string;
  ingredients: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  layout?: 'image-left' | 'image-right';
}

// 01 — Featured Hero Dish (cinematic zoom showcase)
export const featuredDish: DishItem = {
  number: '01',
  id: 'sakura-maki',
  name: 'Sakura Maki Platter',
  category: 'RAW BAR · SIGNATURE SELECTION',
  ingredients: 'Scottish Salmon · Bluefin Akami · Tobiko · Aged Tamari',
  description: 'Artisanal sushi rolls wrapped in crisp roasted nori, filled with pristine seasonal seafood flown in weekly, served upon a traditional woven bamboo platter with house-grated wasabi.',
  price: '₹1,650',
  image: '/assets/hero/hero_1 (4).png',
  imageAlt: 'Sakura Maki sushi rolls served on woven bamboo tray',
};

// 02, 03, 04 — Normal Dishes (sequential editorial spreads, no duplication)
export const normalDishes: DishItem[] = [
  {
    number: '02',
    id: 'woodfired-margherita',
    name: 'Woodfired Truffle Margherita',
    category: 'STONE OVEN · HAND-STRETCHED',
    ingredients: 'San Marzano · Fior di Latte · Black Truffle · Fresh Basil',
    description: 'Charred blistered edges from our 450°C stone oven. Crushed San Marzano tomatoes, velvety fior di latte, and cold-pressed Italian black truffle essence.',
    price: '₹1,250',
    image: '/assets/hero/hero_1.png',
    imageAlt: 'Woodfired Truffle Margherita pizza slice with dripping melted cheese',
    layout: 'image-left',
  },
  {
    number: '03',
    id: 'causa-limena',
    name: 'Causa Limeña Contemporánea',
    category: 'COLD KITCHEN · PERUVIAN INSPIRATION',
    ingredients: 'Yellowfin Tuna · Whipped Ají Amarillo · Quail Egg · Chive Infusion',
    description: 'A delicate layered sculpture of whipped golden Peruvian potato infused with cold-pressed olive oil, sashimi-grade yellowfin tuna, and soft-poached quail egg.',
    price: '₹1,450',
    image: '/assets/menu/menu_food_3.webp',
    imageAlt: 'Layered Causa Limeña tower with yellowfin tuna and quail egg',
    layout: 'image-right',
  },
  {
    number: '04',
    id: 'roasted-garlic-sourdough',
    name: 'Roasted Garlic Sourdough',
    category: 'FROM THE BAKERY · SMALL PLATES',
    ingredients: '36-Hour Levain · Confit Garlic · Fresh Thyme · Fleur de Sel',
    description: 'Slow-fermented artisan sourdough baked until deeply blistered and golden, generously brushed with slow-confit garlic butter, garden thyme, and French sea salt.',
    price: '₹550',
    image: '/assets/hero/hero_1 (2).png',
    imageAlt: 'Two slices of roasted garlic sourdough bread with fresh herb crust',
    layout: 'image-left',
  },
];
