import { useState } from 'react';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { blogPosts, categories } from '@/data/blogData';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = selectedCategory === 'Все' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <SimpleHeader />
        <main className="pt-20">
          <article className="container mx-auto px-4 py-8 max-w-4xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center text-primary hover:text-primary/80 mb-6"
            >
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Назад к блогу
            </button>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center">
                    <Icon name="Calendar" className="w-4 h-4 mr-1" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="w-4 h-4 mr-1" />
                    {selectedPost.readTime}
                  </div>
                  <div className="flex items-center">
                    <Icon name="User" className="w-4 h-4 mr-1" />
                    {selectedPost.author}
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('- **') && paragraph.includes('**')) {
                      const match = paragraph.match(/- \*\*(.*?)\*\*(.*)/);
                      if (match) {
                        return (
                          <li key={index} className="mb-2">
                            <strong className="text-gray-900">{match[1]}</strong>
                            <span className="text-gray-700">{match[2]}</span>
                          </li>
                        );
                      }
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="mb-1 text-gray-700">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      return (
                        <li key={index} className="mb-2 text-gray-700">
                          {paragraph.replace(/^\d+\.\s/, '')}
                        </li>
                      );
                    }
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <p key={index} className="mb-4 font-semibold text-gray-800">
                          {paragraph.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    if (paragraph.trim() === '') {
                      return <br key={index} />;
                    }
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                  {selectedPost.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <SimpleHeader />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Блог о отношениях и близости
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Практические советы семейного психолога для укрепления отношений, развития близости и преодоления кризисов
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Icon name="Calendar" className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Clock" className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Icon name="User" className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                      Читать далее
                      <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;