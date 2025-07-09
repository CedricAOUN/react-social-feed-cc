export type Conversation = {
  id: string;
  name: string;
  image: string;
  messages: Array<{ msg: string; sent: boolean }>;
};

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    messages: [
      { msg: 'Hey, how are you?', sent: true },
      { msg: 'I am good, thanks! How about you?', sent: false },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    messages: [
      { msg: 'Let’s catch up soon!', sent: true },
      { msg: 'Absolutely! What time works for you?', sent: false },
    ],
  },
  {
    id: '3',
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    messages: [
      { msg: 'Did you finish the report?', sent: true },
      { msg: 'Not yet, I will do it by EOD.', sent: false },
    ],
  },
  {
    id: '4',
    name: 'Mike Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    messages: [
      { msg: 'The meeting has been moved to 3 PM', sent: false },
      { msg: 'Thanks for letting me know!', sent: true },
      { msg: 'Should I prepare anything specific?', sent: true },
    ],
  },
  {
    id: '5',
    name: 'Sarah Williams',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    messages: [
      { msg: 'Happy birthday! 🎉', sent: true },
      { msg: 'Thank you so much! ❤️', sent: false },
      { msg: 'Are we still on for dinner tonight?', sent: false },
      { msg: 'Absolutely! See you at 7', sent: true },
    ],
  },
  {
    id: '6',
    name: 'David Miller',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    messages: [
      { msg: 'Check out this article I found', sent: false },
      { msg: "Looks interesting, I'll read it later", sent: true },
    ],
  },
  {
    id: '7',
    name: 'Emma Davis',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    messages: [
      { msg: 'Can you help me with the project?', sent: false },
      { msg: 'Of course! What do you need help with?', sent: true },
      { msg: "I'm stuck on the design part", sent: false },
      { msg: "Let's schedule a call tomorrow", sent: true },
    ],
  },
  {
    id: '8',
    name: 'Tom Anderson',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    messages: [
      { msg: 'The weather is amazing today!', sent: true },
      { msg: 'Perfect for a walk in the park', sent: false },
      { msg: 'Want to join me?', sent: false },
    ],
  },
  {
    id: '9',
    name: 'Lisa Garcia',
    image: 'https://randomuser.me/api/portraits/women/38.jpg',
    messages: [
      { msg: 'Did you watch the new episode?', sent: false },
      { msg: 'Not yet! No spoilers please 😅', sent: true },
      { msg: 'My lips are sealed 🤐', sent: false },
    ],
  },
  {
    id: '10',
    name: 'Chris Taylor',
    image: 'https://randomuser.me/api/portraits/men/89.jpg',
    messages: [
      { msg: 'Great job on the presentation!', sent: false },
      { msg: 'Thanks! I was really nervous', sent: true },
      { msg: "You couldn't tell at all", sent: false },
      { msg: 'That means a lot, thank you', sent: true },
    ],
  },
];

export default conversations;
