export interface Review {
  id: string;
  name: string;
  text: string;
  date: string;
  rating: number;
  location?: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Priya Mehta',
    text: "An extraordinary dining haven. The fluted timber lounge and warm cove lighting create an atmosphere unlike anything else. Mira's signature pumpkin and burrata bowl was pure artistry.",
    date: 'September 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '2',
    name: 'Arjun Khanna',
    text: 'MIRAS has perfected the craft of European bakery and Italian stone-hearth pizza. Sitting by the book lounge with fresh espresso and sourdough was the highlight of our week.',
    date: 'August 2026',
    rating: 5,
    location: 'Mumbai',
  },
  {
    id: '3',
    name: 'Sanya Verma',
    text: 'From the moment you see the glowing champagne gold facade, you feel the thoughtfulness. The wood-fired Margherita had that perfect leopard-spotted char. We stayed for hours.',
    date: 'August 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '4',
    name: 'Rohan Desai',
    text: 'Having visited artisan bakeries across Copenhagen and Florence, MIRAS stands shoulder to shoulder with the finest. The Grand Mediterranean Mezze platter is simply unmatched.',
    date: 'July 2026',
    rating: 5,
    location: 'Bengaluru',
  },
  {
    id: '5',
    name: 'Aisha Sharma',
    text: 'The bakery breakfast with fluffy folded farm eggs and country sourdough is our weekend ritual. The hospitality is warm, genuine, and deeply attentive.',
    date: 'July 2026',
    rating: 5,
    location: 'Gurgaon',
  },
  {
    id: '6',
    name: 'Vikram Singh',
    text: 'The architectural design is magnificent — natural wood, bouclé seating, and the aroma of baking bread. The slow-braised barbacoa tacos were exceptional.',
    date: 'June 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '7',
    name: 'Meera Kapoor',
    text: 'We hosted an intimate dinner in the book lounge. Every plate was presented with grace and the wine pairings complemented the stone-oven dishes flawlessly.',
    date: 'June 2026',
    rating: 5,
    location: 'Noida',
  },
];
