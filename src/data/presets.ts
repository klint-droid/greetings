import type { LetterData } from '../types/letter';

export const defaultLetter: LetterData = {
  recipientName: 'The Extraordinary Synchrony Team',
  senderName: 'Klint Ruales\nYES Participant 2026',
  date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
  salutation: 'Dear Synchrony Team,',
  paragraphs: [
    'I would like to express my sincere appreciation to the entire Synchrony team for the continuous support you have given to us and our organization. Your commitment to providing opportunities for learning, personal development, and meaningful experiences has made a positive difference in our journey.',
    'One of the things I value most is the YES sessions we have had. These sessions gave us the opportunity to learn new things, reflect on ourselves, and gain insights that we can apply not only in our studies or work but also in our everyday lives. They encouraged us to look at things from different perspectives, recognize areas where we can improve, and understand the importance of continuous growth. Beyond the lessons themselves, these sessions reminded us that learning is not limited to academic or professional knowledge. It also involves understanding ourselves, building better relationships, and developing the right mindset as we face different challenges in life.',
    'I also appreciate the events, outings, and other activities you organize for us. These experiences allow us to take a break from our usual routines, connect with other people, and create memories together. They give us something to look forward to while helping us build stronger relationships and enjoy experiences that contribute to our personal growth. It is meaningful to know that, alongside our responsibilities and goals, there are also opportunities for us to enjoy, learn, and grow as individuals.',
    'What makes these initiatives special is that they go beyond simply providing activities or programs. They show the importance of investing in people and creating an environment where everyone has the opportunity to develop their potential. Through your support, we are able to gain valuable experiences, discover new perspectives, and become more confident in facing future opportunities and challenges.',
    'As someone who is still learning and working toward my personal and professional goals, I find these experiences valuable because the lessons we gain can stay with us long after the sessions and activities have ended. They remind us to remain open to learning, appreciate the opportunities we receive, and use what we learn to become better versions of ourselves.',
    'I understand that organizing these programs and supporting our organization requires time, effort, and commitment. Knowing that you continue to make these opportunities available to us makes them even more meaningful. Your support helps create an environment where we feel encouraged to learn, improve, and make the most of the opportunities presented to us.',
    'Once again, thank you to the Synchrony team for being part of our journey and for contributing to our growth in ways that extend beyond the classroom or workplace. The lessons from our YES sessions, the experiences from our activities, and the support you provide are things we will continue to carry with us as we move forward.',
    'I hope you know that your efforts have a lasting impact on the people and communities you support. We look forward to continuing to learn, grow, and make the most of the opportunities ahead.'
  ],
  closing: 'With sincere appreciation,',
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
    },
    {
      id: 'photo-8',
      url: '/photos/551238618_1090162476611655_3896759315846613975_n.jpg',
      caption: 'Passerelles Numériques Class of 2026',
      rotation: 3
    }
  ]
};
