import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isUserComment: boolean;
}

interface BlogCommentsProps {
  postId: number;
}

// Заготовленные комментарии от "других пользователей"
const MOCK_COMMENTS = [
  {
    author: "Анна Сергеева",
    content: "Очень полезная статья! Попробую применить эти техники в своих отношениях. Спасибо автору за практические советы.",
    daysAgo: 3
  },
  {
    author: "Михаил Кузнецов", 
    content: "Читал с женой вместе, обсуждали каждый пункт. Многое узнали про себя. Особенно понравилась техника с 36 вопросами.",
    daysAgo: 5
  },
  {
    author: "Елена Петрова",
    content: "Как психолог могу сказать - все описано очень грамотно и доступно. Рекомендую всем парам.",
    daysAgo: 7
  },
  {
    author: "Дмитрий Волков",
    content: "Статья помогла нам с женой в трудный период. Особенно понравились упражнения для укрепления доверия.",
    daysAgo: 10
  },
  {
    author: "Мария Соколова",
    content: "Спасибо за такой подробный разбор! Буду перечитывать и применять на практике. Очень актуально для наших отношений.",
    daysAgo: 12
  }
];

const BlogComments = ({ postId }: BlogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    // Загружаем комментарии для поста
    const savedComments = localStorage.getItem(`comments-${postId}`);
    const savedUserName = localStorage.getItem('blog-user-name');
    
    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Инициализируем заготовленные комментарии
      const initialComments: Comment[] = MOCK_COMMENTS.slice(0, Math.floor(Math.random() * 3) + 2).map((comment, index) => {
        const date = new Date();
        date.setDate(date.getDate() - comment.daysAgo);
        
        return {
          id: `mock-${postId}-${index}`,
          author: comment.author,
          content: comment.content,
          date: date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
          }),
          isUserComment: false
        };
      });
      
      setComments(initialComments);
      localStorage.setItem(`comments-${postId}`, JSON.stringify(initialComments));
    }
  }, [postId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userName.trim()) return;

    const comment: Comment = {
      id: `user-${Date.now()}`,
      author: userName,
      content: newComment.trim(),
      date: new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isUserComment: true
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    
    // Сохраняем комментарии и имя пользователя
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    localStorage.setItem('blog-user-name', userName);
    
    setNewComment('');
    setShowCommentForm(false);
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Комментарии ({comments.length})
      </h3>

      {/* Форма добавления комментария */}
      {!showCommentForm ? (
        <Button
          onClick={() => setShowCommentForm(true)}
          variant="outline"
          className="mb-6 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
          Написать комментарий
        </Button>
      ) : (
        <form onSubmit={handleSubmitComment} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="mb-4">
            <Input
              placeholder="Ваше имя"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Напишите ваш комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full min-h-[100px] resize-none"
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Icon name="Send" className="w-4 h-4 mr-2" />
              Отправить
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setShowCommentForm(false);
                setNewComment('');
              }}
            >
              Отмена
            </Button>
          </div>
        </form>
      )}

      {/* Список комментариев */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className={`bg-white p-6 rounded-lg border ${
              comment.isUserComment ? 'border-primary/30 bg-primary/5' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                  comment.isUserComment ? 'bg-primary' : 'bg-gray-400'
                }`}>
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {comment.author}
                    {comment.isUserComment && (
                      <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Вы
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Icon name="MessageCircle" className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Пока нет комментариев. Будьте первым!</p>
        </div>
      )}
    </div>
  );
};

export default BlogComments;