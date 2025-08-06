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
  likes: number;
  dislikes: number;
  replies?: Comment[];
  parentId?: string;
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
    daysAго: 10
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [userReactions, setUserReactions] = useState<{[key: string]: 'like' | 'dislike'}>({});

  useEffect(() => {
    // Загружаем комментарии для поста
    const savedComments = localStorage.getItem(`comments-${postId}`);
    const savedUserName = localStorage.getItem('blog-user-name');
    const savedReactions = localStorage.getItem(`comment-reactions-${postId}`);
    
    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (savedReactions) {
      setUserReactions(JSON.parse(savedReactions));
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Инициализируем заготовленные комментарии
      const initialComments: Comment[] = MOCK_COMMENTS.slice(0, Math.floor(Math.random() * 3) + 2).map((comment, index) => {
        return {
          id: `mock-${postId}-${index}`,
          author: comment.author,
          content: comment.content,
          date: "",
          isUserComment: false,
          likes: Math.floor(Math.random() * 15) + 1,
          dislikes: Math.floor(Math.random() * 3),
          replies: []
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
      date: "",
      isUserComment: true,
      likes: 0,
      dislikes: 0,
      replies: []
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    
    // Сохраняем комментарии и имя пользователя
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    localStorage.setItem('blog-user-name', userName);
    
    setNewComment('');
    setShowCommentForm(false);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !userName.trim()) return;

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: userName,
      content: replyContent.trim(),
      date: "",
      isUserComment: true,
      likes: 0,
      dislikes: 0,
      parentId
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    localStorage.setItem('blog-user-name', userName);
    
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleReaction = (commentId: string, type: 'like' | 'dislike') => {
    const currentReaction = userReactions[commentId];
    const newReactions = { ...userReactions };
    
    // Обновляем реакции пользователя
    if (currentReaction === type) {
      delete newReactions[commentId];
    } else {
      newReactions[commentId] = type;
    }
    
    setUserReactions(newReactions);
    localStorage.setItem(`comment-reactions-${postId}`, JSON.stringify(newReactions));

    // Обновляем счетчики в комментариях
    const updatedComments = comments.map(comment => {
      const updateCommentReactions = (c: Comment): Comment => {
        if (c.id === commentId) {
          let newLikes = c.likes;
          let newDislikes = c.dislikes;

          // Убираем старую реакцию
          if (currentReaction === 'like') newLikes--;
          if (currentReaction === 'dislike') newDislikes--;

          // Добавляем новую реакцию
          if (newReactions[commentId] === 'like') newLikes++;
          if (newReactions[commentId] === 'dislike') newDislikes++;

          return { ...c, likes: Math.max(0, newLikes), dislikes: Math.max(0, newDislikes) };
        }
        
        if (c.replies) {
          return { ...c, replies: c.replies.map(updateCommentReactions) };
        }
        
        return c;
      };

      return updateCommentReactions(comment);
    });

    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const userReaction = userReactions[comment.id];
    
    return (
      <div 
        className={`bg-white p-4 sm:p-6 rounded-lg border ${
          comment.isUserComment ? 'border-primary/30 bg-primary/5' : 'border-gray-200'
        } ${isReply ? 'ml-8 sm:ml-12 border-l-4 border-l-primary/20' : ''}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
              comment.isUserComment ? 'bg-primary' : 'bg-gray-400'
            }`}>
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                {comment.author}
                {comment.isUserComment && (
                  <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                    Вы
                  </span>
                )}
              </h4>

            </div>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">{comment.content}</p>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(comment.id, 'like')}
              className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm ${
                userReaction === 'like' ? 'text-green-600 bg-green-50' : 'text-gray-500'
              }`}
            >
              <Icon name="ThumbsUp" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{comment.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(comment.id, 'dislike')}
              className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm ${
                userReaction === 'dislike' ? 'text-red-600 bg-red-50' : 'text-gray-500'
              }`}
            >
              <Icon name="ThumbsDown" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{comment.dislikes}</span>
            </Button>
          </div>
          
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-xs sm:text-sm text-primary hover:bg-primary/10"
            >
              <Icon name="Reply" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Ответить
            </Button>
          )}
        </div>

        {/* Форма ответа */}
        {replyingTo === comment.id && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="mb-3">
              <Input
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="mb-3">
              <Textarea
                placeholder="Ваш ответ..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full min-h-[80px] resize-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim() || !userName.trim()}
                size="sm"
                className="text-sm"
              >
                <Icon name="Send" className="w-3 h-3 mr-1" />
                Ответить
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent('');
                }}
                className="text-sm"
              >
                Отмена
              </Button>
            </div>
          </div>
        )}

        {/* Ответы на комментарий */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Комментарии ({comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)})
      </h3>

      {/* Форма добавления комментария */}
      {!showCommentForm ? (
        <Button
          onClick={() => setShowCommentForm(true)}
          variant="outline"
          className="mb-6 border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto"
        >
          <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
          Написать комментарий
        </Button>
      ) : (
        <form onSubmit={handleSubmitComment} className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
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
          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
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
              className="w-full sm:w-auto"
            >
              Отмена
            </Button>
          </div>
        </form>
      )}

      {/* Список комментариев */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
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