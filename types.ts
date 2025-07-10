export type Post = {
  id: string;
  title?: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
};
