import { Post } from '../types';

const POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'Alice Dupont',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    image: 'https://picsum.photos/id/1011/400/300',
  },
  {
    id: '2',
    user: {
      name: 'Bob Martin',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    image: 'https://picsum.photos/id/1015/400/300',
  },
  {
    id: '3',
    user: {
      name: 'Clara Morel',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    image: 'https://picsum.photos/id/1016/400/300',
  },
];

export default POSTS;
