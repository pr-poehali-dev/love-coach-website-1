// Импорт всех дополнительных статей
import { intimacyArticlesAdvanced } from './intimacyArticlesAdvanced';
import { intimateCommunicationArticles } from './intimateCommunicationArticles';
import { emotionalAbuseArticles } from './emotionalAbuseArticles';
import { longDistanceArticles } from './longDistanceArticles';

// Объединение всех дополнительных статей
export const additionalBlogContent = [
  ...intimacyArticlesAdvanced,
  ...intimateCommunicationArticles,
  ...emotionalAbuseArticles,
  ...longDistanceArticles
];