import type { LetterData } from '../types/letter';

export const defaultLetter: LetterData = {
  recipientName: 'The Extraordinary Employees of Synchrony',
  senderName: 'With Warmest Gratitude & Pride',
  date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
  salutation: 'To Our Dedicated Synchrony Team,',
  paragraphs: [
    'As we pause to reflect on our journey and the milestones we celebrate together, one truth shines brightest: the true strength, soul, and spirit of Synchrony lives within each of you. Your dedication, creativity, and tireless commitment turn challenges into breakthroughs and every vision into shared success.',
    'Thank you for showing up every day with empathy, integrity, and passion. Whether collaborating across teams, innovating for the future, or going the extra mile for our customers and communities, your impact is felt far and wide. You lift one another up and make excellence look effortless.',
    'Please know that your hard work, resilience, and unique contributions are deeply seen and profoundly appreciated. Thank you for your devotion, your optimism, and for being the heart of everything we achieve at Synchrony. We are truly honored and proud to work alongside you.'
  ],
  closing: 'With immense pride, heartfelt appreciation, and deepest gratitude,',
  sealColor: 'gold',
  sealIcon: 'star',
  stampStyle: 'airmail-gold',
  polaroids: [
    {
      id: 'photo-1',
      url: '/photos/640310196_1206696914958210_2468885474677831162_n.jpg',
      caption: 'Celebrating our team spirit',
      rotation: -3
    },
    {
      id: 'photo-2',
      url: '/photos/665935849_1242640061363895_4963051223610160994_n.jpg',
      caption: 'Moments of joy & connection',
      rotation: 3
    },
    {
      id: 'photo-3',
      url: '/photos/712469525_1286585833635984_2922290261154538671_n.jpg',
      caption: 'Together, making a difference',
      rotation: -2
    },
    {
      id: 'photo-4',
      url: '/photos/713585909_1286585896969311_4903932948296942915_n.jpg',
      caption: 'Excellence in all we do',
      rotation: 4
    },
    {
      id: 'photo-5',
      url: '/photos/738625467_1717519369391383_5783676482624685919_n.jpg',
      caption: 'Proud to share this journey',
      rotation: -4
    },
    {
      id: 'photo-6',
      url: '/photos/739609754_1012583914887155_5955440938017351912_n.jpg',
      caption: 'Smiles that inspire us daily',
      rotation: 2
    },
    {
      id: 'photo-7',
      url: '/photos/742266665_1627420782143490_4928970210394524192_n.jpg',
      caption: 'Our remarkable Synchrony family',
      rotation: -3
    }
  ]
};
