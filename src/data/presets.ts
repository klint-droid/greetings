import type { LetterData } from '../types/letter';

export const defaultLetter: LetterData = {
  recipientName: 'My Dear Friend',
  senderName: 'Yours Always',
  date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
  salutation: 'Dearest Friend,',
  paragraphs: [
    'I took a quiet moment today to pause and reflect, and my thoughts naturally wandered to you. In a world that often rushes by without a second glance, your presence has been a steady, gentle light that I am endlessly grateful for.',
    'Thank you for your warmth, for listening when words were hard to find, and for sharing laughter that turns ordinary days into treasured memories. You give without asking, care without conditions, and bring an honesty that makes everything feel safe and true.',
    'Please remember how deeply valued and appreciated you are. Having you in my life is a gift I do not take for granted, and I wanted this small letter to remind you of just how much you mean to me.'
  ],
  closing: 'With deepest gratitude and fondest thoughts,',
  sealColor: 'crimson',
  sealIcon: 'heart',
  stampStyle: 'vintage-paris',
  polaroids: [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
      caption: 'Warm sunshine & quiet gratitude',
      rotation: -3
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
      caption: 'For every shared smile',
      rotation: 4
    }
  ]
};

export interface PresetTemplate {
  id: string;
  title: string;
  description: string;
  recipientDefault: string;
  salutationDefault: string;
  paragraphs: string[];
  closingDefault: string;
  sealColor: LetterData['sealColor'];
  sealIcon: LetterData['sealIcon'];
}

export const gratitudePresets: PresetTemplate[] = [
  {
    id: 'friend-anchor',
    title: 'An Anchor in the Storm',
    description: 'For a dear friend who always stands by you through everything.',
    recipientDefault: 'My Dearest Friend',
    salutationDefault: 'To My Steadfast Friend,',
    paragraphs: [
      'There are moments when we realize how rare it is to find someone whose loyalty, kindness, and understanding never falter. You have been that constant presence for me, through stormy seasons and sunny horizons alike.',
      'Thank you for always picking up the call, for believing in me even when self-doubt lingered, and for turning every quiet challenge into something manageable with your humor and grace.',
      'I am endlessly thankful for our shared chapters and look forward to the many unwritten pages ahead. Thank you for simply being you.'
    ],
    closingDefault: 'Forever your friend,',
    sealColor: 'crimson',
    sealIcon: 'heart'
  },
  {
    id: 'mentor-guidance',
    title: 'A Guiding Light & Mentor',
    description: 'For a mentor, teacher, or guide who inspired and believed in you.',
    recipientDefault: 'Respected Mentor',
    salutationDefault: 'Dear Mentor & Guide,',
    paragraphs: [
      'Few things in life are as transformative as having someone who sees your potential before you even recognize it in yourself. Your wisdom, patience, and unwavering guidance have shaped my journey in ways words can scarcely capture.',
      'Thank you for generously sharing your time, for challenging me to grow beyond my comfort zone, and for leading not just by instruction, but by noble example.',
      'I carry the lessons you have imparted with immense gratitude and pride, and I hope to one day pass forward the same light you have so graciously shared with me.'
    ],
    closingDefault: 'With boundless respect and appreciation,',
    sealColor: 'gold',
    sealIcon: 'branch'
  },
  {
    id: 'unconditional-warmth',
    title: 'Unconditional Warmth',
    description: 'For a partner, family member, or soulmate who fills your days with love.',
    recipientDefault: 'My Beloved',
    salutationDefault: 'My Dearest Heart,',
    paragraphs: [
      'If I could gather every quiet smile, every comforting embrace, and every unspoken understanding we have shared, it would still not measure up to the depth of my gratitude for having you in my life.',
      'You make the heavy days lighter, the quiet days full of wonder, and the world feel like home wherever you are. Thank you for loving me so gently and faithfully.',
      'May this letter serve as a keepsake of my enduring devotion and a reminder that you are cherished beyond all measure.'
    ],
    closingDefault: 'With all my heart and soul,',
    sealColor: 'rose',
    sealIcon: 'rose'
  },
  {
    id: 'simple-kindness',
    title: 'A Note of Gentle Thanks',
    description: 'A genuine, lovely thank-you for someone who extended unexpected kindness.',
    recipientDefault: 'Kind Soul',
    salutationDefault: 'Dear Friend,',
    paragraphs: [
      'I wanted to write you this small note to express my heartfelt appreciation for your thoughtful gesture and generous spirit.',
      'Your kindness touched me in a way you may not even realize. In a busy world, people like you make everyday life softer, kinder, and full of optimism.',
      'Thank you for bringing your warmth into my path. I hope the universe returns to you every bit of good energy you give so freely to others.'
    ],
    closingDefault: 'Warmly and with sincere thanks,',
    sealColor: 'emerald',
    sealIcon: 'quill'
  }
];
