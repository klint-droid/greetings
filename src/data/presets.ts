import type { LetterData } from '../types/letter';

export const defaultLetter: LetterData = {
  recipientName: 'The Extraordinary Synchrony Team',
  senderName: 'Klint Ruales\nYES participant 2026',
  date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
  salutation: 'Dear Synchrony Team,',
  paragraphs: [
    'I would like to express my sincere gratitude to the entire Synchrony team for the continuous support you have given us and our organization. Thank you for always being there to support us, for providing opportunities that help us grow, and for making us feel that we are valued and supported throughout our journey.',
    'I truly appreciate all the efforts you put into creating programs and activities that help us become better individuals. Your support goes beyond helping our organization. You also give us opportunities to learn, explore new things, develop our skills, and gain experiences that we can carry with us as we move forward in life.',
    'One of the things I am especially thankful for is the YES sessions we had. These sessions gave us opportunities to learn new things, reflect on ourselves, and gain lessons that we can apply not only in our studies or work but also in our everyday lives. Through these sessions, we were able to learn from different experiences and perspectives, understand ourselves better, and appreciate the importance of continuous learning and personal growth.',
    'What I appreciate most about these sessions is that they give us time to pause, reflect, and think about how we can improve ourselves. Sometimes, we get so focused on our responsibilities and the things we need to accomplish that we forget to look at our own growth. The YES sessions remind us that becoming a better person is also an important part of our journey. The lessons we gain from them may seem simple at times, but they can make a meaningful difference in how we think, how we approach challenges, and how we interact with the people around us.',
    'I am also thankful for the events, outings, and other activities that you provide. These experiences give us a chance to take a break from our usual routines, connect with other people, and create memories together. They allow us to enjoy ourselves while learning and growing at the same time. More than just the activities themselves, I appreciate the thought and effort behind them because they show that you also care about our well-being, happiness, and overall development as individuals.',
    'Thank you for giving us opportunities to experience things that we might not always have the chance to experience on our own. Every program, session, and activity becomes a valuable part of our journey. Through these experiences, we gain not only knowledge but also confidence, meaningful connections, and lessons that we can bring with us as we face new challenges and opportunities in the future.',
    'I know that providing these programs and supporting our organization requires time, effort, and commitment, and I want you to know that all of these are truly appreciated. Your support may not always be easy to put into words, but it has a real impact on us. It makes us feel encouraged to keep learning, to keep improving, and to make the most of the opportunities given to us.',
    'Personally, I am grateful to be part of a community where people and organizations are willing to invest in our growth. Your support reminds me that we are not alone in working toward our goals and that there are people who genuinely want to see us succeed. It inspires me to do my best, appreciate the opportunities I receive, and use the lessons I learn to become a better version of myself.',
    'Once again, thank you so much to the entire Synchrony team for your unwavering support, generosity, and commitment to our organization and to each of us. Thank you for the YES sessions, the meaningful lessons, the fun experiences, the outings, and all the opportunities you continue to provide. We may not always express our appreciation enough, but please know that everything you do means a lot to us.',
    'I hope you know how much of a difference your support makes in our lives. Thank you for being part of our journey, for helping us grow, and for giving us experiences and lessons that we will continue to value even as we move forward to the next chapter of our lives.',
    'We are truly grateful for everything you do, and I hope you continue to inspire and support more individuals and communities in the years to come.'
  ],
  closing: 'With sincere gratitude,',
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
