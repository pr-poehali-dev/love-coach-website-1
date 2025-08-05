import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface BlogReactionsProps {
  postId: number;
  compact?: boolean;
}

const REACTIONS = [
  { emoji: '❤️', label: 'Нравится' },
  { emoji: '👏', label: 'Браво' },
  { emoji: '🤔', label: 'Интересно' },
  { emoji: '💡', label: 'Полезно' },
  { emoji: '🙏', label: 'Благодарю' }
];

const BlogReactions = ({ postId, compact = false }: BlogReactionsProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Загружаем сохраненные реакции для этого поста
    const savedReactions = localStorage.getItem(`reactions-${postId}`);
    const savedUserReactions = localStorage.getItem(`user-reactions-${postId}`);
    
    if (savedReactions) {
      const parsed = JSON.parse(savedReactions);
      setReactions(parsed);
    } else {
      // Инициализируем с случайными начальными значениями
      const initialReactions = REACTIONS.map(r => ({
        ...r,
        count: Math.floor(Math.random() * 50) + 5 // 5-55 реакций
      }));
      setReactions(initialReactions);
      localStorage.setItem(`reactions-${postId}`, JSON.stringify(initialReactions));
    }

    if (savedUserReactions) {
      setUserReactions(new Set(JSON.parse(savedUserReactions)));
    }
  }, [postId]);

  const handleReactionClick = (emoji: string) => {
    const newUserReactions = new Set(userReactions);
    const newReactions = reactions.map(reaction => {
      if (reaction.emoji === emoji) {
        if (userReactions.has(emoji)) {
          // Убираем реакцию
          newUserReactions.delete(emoji);
          return { ...reaction, count: Math.max(0, reaction.count - 1) };
        } else {
          // Добавляем реакцию
          newUserReactions.add(emoji);
          return { ...reaction, count: reaction.count + 1 };
        }
      }
      return reaction;
    });

    setReactions(newReactions);
    setUserReactions(newUserReactions);
    
    // Сохраняем в localStorage
    localStorage.setItem(`reactions-${postId}`, JSON.stringify(newReactions));
    localStorage.setItem(`user-reactions-${postId}`, JSON.stringify([...newUserReactions]));
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {reactions.slice(0, 3).map((reaction) => {
          const isActive = userReactions.has(reaction.emoji);
          return (
            <Button
              key={reaction.emoji}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick(reaction.emoji);
              }}
              className={`px-2 py-1 h-auto text-xs hover:bg-primary/10 ${
                isActive ? 'bg-primary/20 text-primary' : 'text-gray-600'
              }`}
            >
              <span className="mr-1">{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Ваши реакции</h4>
      <div className="flex flex-wrap gap-3">
        {reactions.map((reaction) => {
          const isActive = userReactions.has(reaction.emoji);
          return (
            <Button
              key={reaction.emoji}
              variant="outline"
              onClick={() => handleReactionClick(reaction.emoji)}
              className={`flex items-center space-x-2 transition-all ${
                isActive 
                  ? 'bg-primary text-white border-primary hover:bg-primary/90' 
                  : 'hover:bg-primary/10 hover:border-primary'
              }`}
            >
              <span className="text-lg">{reaction.emoji}</span>
              <span className="font-medium">{reaction.count}</span>
              <span className="text-sm">{reaction.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogReactions;