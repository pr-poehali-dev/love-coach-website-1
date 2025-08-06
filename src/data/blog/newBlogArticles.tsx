// Импорт всех новых статей
import { intimacyArticles2 } from './intimacyArticles2';
import { conflictArticles2 } from './conflictArticles2';
import { conflictArticles3 } from './conflictArticles3';
import { relationshipsArticles } from './relationshipsArticles';
import { crisisArticles } from './crisisArticles';
import { transitionCrisisArticles } from './transitionCrisisArticles';

// Объединение всех новых статей
export const newBlogArticles = [
  ...intimacyArticles2,
  ...conflictArticles2,
  ...conflictArticles3,
  ...relationshipsArticles,
  ...crisisArticles,
  ...transitionCrisisArticles
];