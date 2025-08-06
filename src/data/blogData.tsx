import { blogPosts1 } from './blogData1';
import { blogPosts2 } from './blogData2';
import { blogPosts3, categories } from './blogData3';
import { blogPosts4 } from './blogData4';
import { newBlogArticles } from './blog/newBlogArticles';

export const blogPosts = [
  ...blogPosts1,
  ...blogPosts2,
  ...blogPosts3,
  ...blogPosts4,
  ...newBlogArticles
];

export { categories };