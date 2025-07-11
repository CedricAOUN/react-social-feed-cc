export type Post = {
  id: string;
  title?: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  createdAt: string;
  userHasLiked?: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  image: string;
  read: boolean;
  messages: {
    msg: string;
    sent: boolean;
  }[];
};

export type ScreenProps = {
  posts: Post[];
  favorites: Post[];
  onUpdatePost: (post: Post) => void;
};
