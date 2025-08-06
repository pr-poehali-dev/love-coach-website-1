import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BlogShareProps {
  title: string;
  url?: string;
}

const BlogShare = ({ title, url = window.location.href }: BlogShareProps) => {
  const shareData = {
    title,
    url,
    text: `Прочитайте эту полезную статью о семейных отношениях: "${title}"`
  };

  const handleShare = async (platform?: string) => {
    if (platform) {
      let shareUrl = '';
      const encodedTitle = encodeURIComponent(shareData.title);
      const encodedUrl = encodeURIComponent(shareData.url);
      const encodedText = encodeURIComponent(shareData.text);
      
      switch (platform) {
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
          break;
        case 'vk':
          shareUrl = `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`;
          break;
        default:
          return;
      }
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        toast.textContent = 'Ссылка скопирована!';
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Share2" className="w-5 h-5 mr-2 text-primary" />
          <span className="font-medium text-gray-900">Поделиться статьей</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => handleShare('telegram')}
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Icon name="MessageCircle" className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => handleShare('whatsapp')}
            variant="outline"
            size="sm"
            className="hover:bg-green-50 hover:border-green-300"
          >
            <Icon name="MessageSquare" className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => handleShare('vk')}
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Icon name="Users" className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => handleShare()}
            variant="outline"
            size="sm"
            className="hover:bg-primary hover:text-white"
          >
            <Icon name="Copy" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogShare;