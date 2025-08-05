import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { blogPosts } from "@/data/blogData";

// Берем первые 3 статьи для превью
const previewPosts = blogPosts.slice(0, 3);

const BlogPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Блог о отношениях и близости
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Практические советы семейного психолога для укрепления отношений и развития близости
          </p>
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Icon name="BookOpen" className="mr-2 h-4 w-4" />
            Читать все статьи
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {previewPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => navigate('/blog')}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex items-center">
                      <Icon name="Calendar" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">{post.date}</span>
                      <span className="sm:hidden">{post.date.split(' ')[0]} {post.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Icon name="User" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-primary font-medium text-xs sm:text-sm group-hover:underline">
                    Читать
                    <Icon name="ArrowRight" className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;