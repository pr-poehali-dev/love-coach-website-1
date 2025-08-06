// Импорт всех компонентов статей по близости
import { emotionalIntimacyArticles } from './emotionalIntimacyArticles';
import { trustVulnerabilityArticles } from './trustVulnerabilityArticles';
import { passionBoundariesArticles } from './passionBoundariesArticles';

// Объединение всех статей о близости
export const intimacyArticles2 = [
  ...emotionalIntimacyArticles,
  ...trustVulnerabilityArticles,
  ...passionBoundariesArticles
];