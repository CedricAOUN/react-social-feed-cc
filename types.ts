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

export type ScreenProps = {
  posts: Post[];
  favorites: Post[];
  onUpdatePost: (post: Post) => void;
};
