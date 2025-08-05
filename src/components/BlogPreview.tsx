import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const blogPosts = [
  {
    id: 1,
    title: 'Удаленная работа в 2024: Полное руководство по эффективности',
    excerpt: 'Все секреты успешной удаленной работы: от организации рабочего места до управления временем.',
    author: 'Анна Петрова',
    date: '15 февраля 2024',
    category: 'Продуктивность',
    readTime: '8 мин',
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    title: 'Как найти работу мечты: Пошаговый план действий',
    excerpt: 'Практическое руководство по поиску работы: от составления резюме до успешного прохождения собеседований.',
    author: 'Михаил Соколов',
    date: '10 февраля 2024',
    category: 'Карьера',
    readTime: '10 мин',
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    title: 'Топ-10 профессий будущего: Куда двигаться в 2024 году',
    excerpt: 'Анализ самых перспективных профессий ближайших лет и советы по их освоению.',
    author: 'Елена Кузнецова',
    date: '5 февраля 2024',
    category: 'Тренды',
    readTime: '12 мин',
    image: '/api/placeholder/400/300'
  }
];

const BlogPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Блог о карьере и работе
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Практические советы, тренды рынка труда и истории успеха для вашего профессионального роста
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => navigate('/blog')}
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

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

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
    </section>
  );
};

export default BlogPreview;