import type { LetterData } from '../types/letter';

export const defaultLetter: LetterData = {
  recipientName: 'The Extraordinary Synchrony Team',
  senderName: 'Klint Ruales\nYES Participant 2026',
  date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
  salutation: 'Dear Synchrony Team,',
  paragraphs: [
    'Gusto ko lang po sanang iparating ang taos-puso kong pasasalamat sa buong Synchrony team for the unwavering support, kindness, and generosity that you have continuously shown to us and to our organization.',
    'More than just the support that you provide, we truly appreciate the time, effort, and genuine care that you give to help us grow and become better versions of ourselves. Hindi lang po namin nararamdaman ang support ninyo bilang isang organization, kundi pati na rin sa bawat isa sa amin as individuals. Malaking bagay po na may mga taong tulad ninyo na handang magbigay ng opportunities, guidance, and encouragement para mas ma-develop namin ang aming skills, confidence, and potential.',
    'I am also very grateful for the different programs and activities that you offer. These opportunities allow us to learn new things, discover more about ourselves, and gain experiences that we can carry with us as we continue our journey. Through the events, workshops, outings, and other activities, we get to step outside our usual routines, meet new people, build meaningful connections, and create memories that we will always look back on with appreciation.',
    'Ang saya rin po sa pakiramdam na hindi lang puro learning and responsibilities ang binibigyang-pansin, but also our well-being, personal growth, and the importance of building relationships with one another. These experiences remind us that growth is not only about the knowledge and skills that we gain, but also about the people we meet, the lessons we learn, and the memories we create along the way.',
    'Thank you for making us feel that we are supported, valued, and included. Your efforts may sometimes seem like simple gestures, but for us, they mean so much. Every program, every event, every opportunity, and every act of support contributes to making our journey more meaningful and memorable. We may not always be able to express how grateful we are, but please know that we truly appreciate everything that you do for us.',
    'As someone who continues to learn, grow, and work toward personal and professional goals, I am thankful to be part of an organization that receives support from people and teams who genuinely want to make a positive difference. The opportunities you provide inspire us to keep improving, to become more confident in ourselves, and to make the most out of every experience given to us.',
    'Sana po ay patuloy ninyong makita kung gaano kalaki ang impact ng inyong support sa amin. You are not only helping our organization move forward, but you are also helping individuals like us become more capable, confident, and prepared for the future. The things we learn and experience through your programs are something that we can bring with us even beyond our current journey.',
    'Once again, from the bottom of my heart, maraming-maraming salamat po sa buong Synchrony team. Thank you for your unwavering support, for believing in our organization, for providing meaningful opportunities, and for giving us experiences that help us grow not only professionally but also personally.',
    'We are truly grateful to have your support, and we hope that the positive impact you continue to create will reach even more individuals and communities. May you continue to inspire, empower, and make a difference in the lives of the people you support.',
    'Thank you for being part of our journey and for helping make it more meaningful. Your kindness and generosity will always be appreciated.'
  ],
  closing: 'With heartfelt gratitude,',
  sealColor: 'gold',
  sealIcon: 'star',
  stampStyle: 'airmail-gold',
  polaroids: [
    {
      id: 'photo-1',
      url: '/photos/640310196_1206696914958210_2468885474677831162_n.jpg',
      caption: 'Celebrating our journey with Synchrony',
      rotation: -3
    },
    {
      id: 'photo-2',
      url: '/photos/665935849_1242640061363895_4963051223610160994_n.jpg',
      caption: 'Moments of growth & connection',
      rotation: 3
    },
    {
      id: 'photo-3',
      url: '/photos/712469525_1286585833635984_2922290261154538671_n.jpg',
      caption: 'Meaningful experiences together',
      rotation: -2
    },
    {
      id: 'photo-4',
      url: '/photos/713585909_1286585896969311_4903932948296942915_n.jpg',
      caption: 'Learning and building confidence',
      rotation: 4
    },
    {
      id: 'photo-5',
      url: '/photos/738625467_1717519369391383_5783676482624685919_n.jpg',
      caption: 'Memories we will always treasure',
      rotation: -4
    },
    {
      id: 'photo-6',
      url: '/photos/739609754_1012583914887155_5955440938017351912_n.jpg',
      caption: 'Thank you for believing in us',
      rotation: 2
    },
    {
      id: 'photo-7',
      url: '/photos/742266665_1627420782143490_4928970210394524192_n.jpg',
      caption: 'With gratitude from the YES Family',
      rotation: -3
    }
  ]
};
