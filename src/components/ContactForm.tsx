import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в течение 24 часов.",
      });
      
      setFormData({ name: '', email: '', message: '', agreeToTerms: false });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
      <div>
        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">Имя</label>
        <Input 
          placeholder="Ваше имя" 
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">Email</label>
        <Input 
          type="email" 
          placeholder="your@email.com" 
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">Сообщение</label>
        <Textarea 
          placeholder="Расскажите о вашей ситуации..." 
          rows={3}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          required
        />
      </div>
      <div className="flex items-start space-x-2 xs:space-x-3">
        <input 
          type="checkbox" 
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="mt-0.5 xs:mt-1 h-3 w-3 xs:h-4 xs:w-4 text-primary focus:ring-primary border-gray-300 rounded flex-shrink-0"
          required
        />
        <label htmlFor="agreeToTerms" className="text-xs xs:text-sm text-gray-600 leading-tight">
          Я согласен с{' '}
          <a href="/offer" target="_blank" className="text-primary hover:underline">
            публичной офертой
          </a>
          {' '}и{' '}
          <a href="/privacy" target="_blank" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
        </label>
      </div>
      <Button 
        type="submit" 
        size="lg" 
        className="w-full min-h-[48px] xs:min-h-[52px] py-3 xs:py-4 text-sm xs:text-base" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="mr-1 xs:mr-2 h-4 w-4 xs:h-5 xs:w-5 animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            <Icon name="Send" className="mr-1 xs:mr-2 h-4 w-4 xs:h-5 xs:w-5" />
            Отправить сообщение
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;