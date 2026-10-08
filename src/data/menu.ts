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
  id: 'miras-pumpkin-burrata-bowl',
  name: "Mira's Velveteen Pumpkin Bowl",
  category: 'SIGNATURE ATELIER · BESPOKE CREATION',
  ingredients: 'Slow-Roasted Pumpkin Purée · Stracciatella · Hass Avocado · Sun-Dried Figs · Toasted Pepitas',
  description: "Presented in our bespoke Mira's ceramic bowl. A silk-velvet roasted kabocha purée folded with delicate burrata cream, creamy Hass avocado, sun-ripened sweet figs, roasted pepitas, and cold-pressed botanical oils garnished with fresh edible orchids.",
  price: '₹890',
  image: '/assets/menu/dish_pumpkin_bowl.webp',
  imageAlt: "Mira's Signature Velveteen Pumpkin Purée Bowl with edible flowers in branded ceramic bowl",
};

// 02, 03, 04, 05 — Normal Dishes (sequential editorial spreads)
export const normalDishes: DishItem[] = [
  {
    number: '02',
    id: 'charred-margherita-dop',
    name: 'Artisan Charred Margherita D.O.P.',
    category: 'WOOD-FIRED STONE OVEN · 72-HR FERMENT',
    ingredients: 'San Marzano D.O.P. · Fior di Latte · Sweet Basil · Extra Virgin Olive Oil · Sea Salt',
    description: 'Direct from our 480°C stone hearth oven. Hand-stretched 72-hour slow-fermented crust blistered to leopard-spotted perfection, sweet crushed Italian San Marzano tomatoes, velvety melted fior di latte, and fragrant garden basil leaves.',
    price: '₹950',
    image: '/assets/menu/dish_margherita_pizza.webp',
    imageAlt: 'Artisan Charred Margherita pizza on white ceramic plate',
    layout: 'image-left',
  },
  {
    number: '03',
    id: 'mediterranean-mezze-platter',
    name: 'Grand Mediterranean Mezze Feast',
    category: 'SHARED PLATES · LEVANTINE ROOTS',
    ingredients: 'Crisp Sesame Falafel · Silk Hummus · Smoked Moutabal · Whipped Labneh · Hearth-Baked Pita',
    description: 'An abundant artisan platter celebrating Mediterranean warmth. Freshly fried golden sesame falafel, velvety whipped hummus drizzled with olive oil and paprika, smoky chargrilled aubergine moutabal with pomegranate seeds, za\'atar crackers, and warm stone-baked pocket pita.',
    price: '₹1,150',
    image: '/assets/menu/dish_mezze_platter.webp',
    imageAlt: 'Grand Mediterranean Mezze Platter with falafel, dips, and warm pita',
    layout: 'image-right',
  },
  {
    number: '04',
    id: 'bakery-house-breakfast',
    name: 'The Artisan Bakery Breakfast',
    category: 'MORNING ATELIER · BAKERY COMFORTS',
    ingredients: 'Creamed Farm Eggs · 36-Hr Sourdough · Breakfast Sausages · Potato Rösti · Wild Mushrooms',
    description: 'Velvety soft-folded farm eggs piled high over freshly toasted country sourdough from our morning bake, served with savory herbed sausages, crisp golden potato rösti, slow-braised borlotti beans, and garden greens.',
    price: '₹820',
    image: '/assets/menu/dish_brunch_plate.webp',
    imageAlt: 'Hearty brunch breakfast plate with scrambled eggs on toast, sausages, and hash browns',
    layout: 'image-left',
  },
  {
    number: '05',
    id: 'slow-braised-barbacoa-tacos',
    name: 'Slow-Braised Barbacoa Tacos',
    category: 'STREET GOURMET · HEIRLOOM CORN',
    ingredients: '12-Hr Braised Shred · Heirloom Corn Tortillas · Pickled Jalapeño · Lime Crema · Micro Cilantro',
    description: 'Trio of hand-pressed warm heirloom corn tortillas loaded with deeply spiced 12-hour braised tender shred, tart house-pickled jalapeño rounds, lime crema, and fresh micro herbs dusted with ancho chili.',
    price: '₹860',
    image: '/assets/menu/dish_tacos.webp',
    imageAlt: 'Trio of gourmet tacos topped with pickled jalapeños and lime crema',
    layout: 'image-right',
  },
];
