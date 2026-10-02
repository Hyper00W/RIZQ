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
    text: 'An extraordinary dining experience. The ambiance is unlike anything in Delhi — intimate, luxurious, and deeply personal. The Causa Limeña alone is worth the visit.',
    date: 'September 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '2',
    name: 'Arjun Khanna',
    text: 'RIZQ has redefined what a restaurant can be. Every dish tells a story, every corner feels intentional. The terrace at golden hour is pure magic.',
    date: 'August 2026',
    rating: 5,
    location: 'Mumbai',
  },
  {
    id: '3',
    name: 'Sanya Verma',
    text: 'From the moment you walk through the red carpet entrance, you know this is different. The spring rolls are addictive. The cocktails are art. We stayed until closing.',
    date: 'August 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '4',
    name: 'Rohan Desai',
    text: 'I have been to restaurants across Europe and Southeast Asia. RIZQ stands shoulder to shoulder with the best of them. The global kitchen concept truly delivers.',
    date: 'July 2026',
    rating: 5,
    location: 'Bengaluru',
  },
  {
    id: '5',
    name: 'Aisha Sharma',
    text: 'The truffle margherita is perfection — simple, honest, and unforgettable. The staff remembers your name. That is the kind of hospitality that brings you back.',
    date: 'July 2026',
    rating: 5,
    location: 'Gurgaon',
  },
  {
    id: '6',
    name: 'Vikram Singh',
    text: 'A rare find in Defence Colony. The interiors feel like a members-only club, but the warmth is genuinely welcoming. The sushi is the freshest I have had in Delhi.',
    date: 'June 2026',
    rating: 5,
    location: 'New Delhi',
  },
  {
    id: '7',
    name: 'Meera Kapoor',
    text: 'We celebrated our anniversary here and it was flawless. The attention to detail, the pacing of courses, the lighting — everything was choreographed beautifully.',
    date: 'June 2026',
    rating: 5,
    location: 'Noida',
  },
];
