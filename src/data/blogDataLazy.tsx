// Ленивая загрузка данных блога для оптимизации производительности
import { lazy } from 'react';
import { blogPosts1 } from './blogData1';
import { categories, categoryIcons } from './blogData3';

// Базовые посты для превью (загружаются сразу)
const previewPosts = blogPosts1.slice(0, 3);

// Ленивая загрузка остальных постов
const loadAllBlogData = async () => {
  const [
    { blogPosts2 },
    { blogPosts3 }, 
    { blogPosts4 },
    { newBlogArticles },
    { additionalBlogContent },
    { extendedBlogContent }
  ] = await Promise.all([
    import('./blogData2'),
    import('./blogData3'),
    import('./blogData4'),
    import('./blog/newBlogArticles'),
    import('./blog/additionalBlogContent'),
    import('./blog/extendedBlogContent')
  ]);

  return [
    ...blogPosts1,
    ...blogPosts2,
    ...blogPosts3,
    ...blogPosts4,
    ...newBlogArticles,
    ...additionalBlogContent,
    ...extendedBlogContent
  ];
};

// Экспорт для главной страницы (только превью)
export const blogPreviewPosts = previewPosts;

// Экспорт для страницы блога (все посты ленивой загрузкой)
export const getBlogPosts = loadAllBlogData;

export { categories, categoryIcons };