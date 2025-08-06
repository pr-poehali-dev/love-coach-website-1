import Icon from '@/components/ui/icon';

interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let currentIndex = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${currentIndex++}`} className="list-none space-y-3 mb-6 ml-6">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <Icon name="ArrowRight" className="w-4 h-4 mt-1 mr-3 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${currentIndex++}`} className="space-y-3 mb-6 ml-6">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ol>
          );
        }
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      // Заголовки
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-3xl sm:text-4xl font-bold text-gray-900 mt-12 mb-8 first:mt-0 leading-tight">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-6 flex items-center leading-tight">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-pink-500 mr-4 rounded-full"></div>
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        flushList();
        elements.push(
          <h4 key={index} className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 mb-5 flex items-center leading-tight">
            <Icon name="Sparkles" className="w-5 h-5 mr-2 text-primary" />
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Списки с жирным текстом
      else if (line.startsWith('- **') && line.includes('**')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        const match = line.match(/- \*\*(.*?)\*\*(.*)/);
        if (match) {
          listItems.push(
            `${match[1]}${match[2]}`
          );
        }
      }
      // Обычные списки
      else if (line.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(line.replace('- ', ''));
      }
      // Нумерованные списки
      else if (line.match(/^\d+\./)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(line.replace(/^\d+\.\s/, ''));
      }
      // Жирный текст как заголовок
      else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        flushList();
        elements.push(
          <div key={index} className="bg-gradient-to-r from-primary/10 to-pink-50 border-l-4 border-primary p-4 my-6 rounded-r-lg">
            <p className="font-semibold text-lg text-gray-800">
              {line.replace(/\*\*/g, '')}
            </p>
          </div>
        );
      }
      // Истории из практики
      else if (line.startsWith('**История из практики**')) {
        flushList();
        elements.push(
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 my-8 rounded-xl">
            <div className="flex items-center mb-4">
              <Icon name="Users" className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-lg font-semibold text-blue-800">История из практики</h4>
            </div>
          </div>
        );
      }
      // Пустые строки
      else if (line.trim() === '') {
        // Не добавляем пустые элементы в список
        if (listItems.length === 0) {
          elements.push(<div key={index} className="h-2"></div>);
        }
      }
      // Обычные параграфы
      else if (line.trim() !== '') {
        flushList();
        
        // Проверяем на важные блоки
        if (line.includes('Важно:') || line.includes('Внимание:') || line.includes('Правда в том:')) {
          elements.push(
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
              <div className="flex items-start">
                <Icon name="AlertTriangle" className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800 leading-relaxed">{formatText(line)}</p>
              </div>
            </div>
          );
        }
        // Примеры
        else if (line.includes('Пример') || line.includes('пример')) {
          elements.push(
            <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r-lg">
              <div className="flex items-start">
                <Icon name="Lightbulb" className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800 leading-relaxed">{formatText(line)}</p>
              </div>
            </div>
          );
        }
        // Обычный текст
        else {
          elements.push(
            <p key={index} className="mb-6 text-gray-800 leading-loose text-lg sm:text-xl font-light tracking-wide">{formatText(line)}</p>
          );
        }
      }
    });

    flushList(); // Завершаем последний список
    return elements;
  };

  const formatText = (text: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let remainingText = text;
    let keyCounter = 0;
    
    while (remainingText.length > 0) {
      // Поиск жирного текста **text**
      const boldMatch = remainingText.match(/^(.*?)\*\*(.*?)\*\*(.*)/);
      if (boldMatch) {
        if (boldMatch[1]) parts.push(<span key={keyCounter++}>{boldMatch[1]}</span>);
        parts.push(<strong key={keyCounter++} className="font-semibold text-gray-900">{boldMatch[2]}</strong>);
        remainingText = boldMatch[3];
        continue;
      }
      
      // Поиск курсива *text*
      const italicMatch = remainingText.match(/^(.*?)\*(.*?)\*(.*)/);
      if (italicMatch) {
        if (italicMatch[1]) parts.push(<span key={keyCounter++}>{italicMatch[1]}</span>);
        parts.push(<em key={keyCounter++} className="italic">{italicMatch[2]}</em>);
        remainingText = italicMatch[3];
        continue;
      }
      
      // Поиск кавычек "text"
      const quoteMatch = remainingText.match(/^(.*?)"([^"]+)"(.*)/);
      if (quoteMatch) {
        if (quoteMatch[1]) parts.push(<span key={keyCounter++}>{quoteMatch[1]}</span>);
        parts.push(<span key={keyCounter++} className="text-primary font-medium">"{quoteMatch[2]}"</span>);
        remainingText = quoteMatch[3];
        continue;
      }
      
      // Если не найдено совпадений, добавляем оставшийся текст
      parts.push(<span key={keyCounter++}>{remainingText}</span>);
      break;
    }
    
    return parts;
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="space-y-1">
        {renderContent(content)}
      </div>
    </div>
  );
};

export default BlogContent;