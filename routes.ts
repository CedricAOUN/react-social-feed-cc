import { Conversation } from './mockDb/conversations';

export type RouteParamList = {
  Tabs: undefined;
  Feed: undefined;
  Conversations: undefined;
  Add: undefined;
  Favorites: undefined;
  Profile: undefined;
  AddPost: undefined;
  Chat: { conversation: Conversation };
};
