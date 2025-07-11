import { Post } from '../types';
import { Conversation } from './conversations';

const PORT = ':3000';
// CHANGE THIS TO YOUR LOCAL IPV4
const API_URL = 'http://192.168.1.126' + PORT;
const CONVERSATION_ROUTE = '/conversations';
const POST_ROUTE = '/posts';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}${POST_ROUTE}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const reorderedData = data.sort((a: Post, b: Post) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return reorderedData;
  } catch (error) {
    console.error('Network error fetching posts:', error);
    throw error;
  }
};

export const fetchConversations = async () => {
  const response = await fetch(`${API_URL}${CONVERSATION_ROUTE}`);
  return response.json();
};

export const fetchPostById = async (id: string) => {
  const response = await fetch(`${API_URL}${POST_ROUTE}/${id}`);
  if (!response.ok) {
    throw new Error(`Post with id ${id} not found`);
  }
  return response.json();
};

export const fetchConversationById = async (id: string) => {
  const response = await fetch(`${API_URL}${CONVERSATION_ROUTE}/${id}`);
  if (!response.ok) {
    throw new Error(`Conversation with id ${id} not found`);
  }
  return response.json();
};

export const createPost = async (post: Post) => {
  const response = await fetch(`${API_URL}${POST_ROUTE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  console.log('Updating post with id:', id, 'and data:', post);
  const response = await fetch(`${API_URL}${POST_ROUTE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const updateConversation = async (
  id: string,
  conversation: Partial<Conversation>
) => {
  const response = await fetch(`${API_URL}${CONVERSATION_ROUTE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(conversation),
  });
  return response.json();
};
