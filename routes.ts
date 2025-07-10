import { Conversation } from './mockDb/conversations';
import { Post } from './types';

export type RouteParamList = {
  Tabs: { posts: Post[] };
  Feed: undefined;
  Conversations: undefined;
  Add: undefined;
  Favorites: undefined;
  Profile: undefined;
  AddPost: { posts: Post[]; onAddPost: (post: Post) => void };
  Chat: { conversation: Conversation };
};
