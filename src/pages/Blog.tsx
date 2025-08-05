import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import BlogReactions from '@/components/BlogReactions';
import BlogComments from '@/components/BlogComments';
import BlogCTA from '@/components/BlogCTA';
import BlogContent from '@/components/BlogContent';
import { blogPosts, categories } from '@/data/blogData';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  useEffect(() => {
    if (id) {
      const post = blogPosts.find(p => p.id === parseInt(id));
      if (post) {
        setSelectedPost(post);
        window.scrollTo(0, 0);
      } else {
        navigate('/blog');
      }
    } else {
      setSelectedPost(null);
    }
  }, [id, navigate]);

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
              onClick={() => navigate('/blog')}
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
                
                <BlogContent content={selectedPost.content} />
                
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
                
                <BlogCTA />
                
                <div className="mt-8">
                  <BlogReactions postId={selectedPost.id} />
                </div>
                
                <div className="mt-8">
                  <BlogComments postId={selectedPost.id} />
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
                onClick={() => navigate(`/blog/${post.id}`)}
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
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Icon name="User" className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                      Читать далее
                      <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                  
                  <BlogReactions postId={post.id} compact={true} />
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