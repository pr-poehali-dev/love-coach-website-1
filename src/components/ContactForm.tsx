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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
        <Input 
          placeholder="Ваше имя" 
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <Input 
          type="email" 
          placeholder="your@email.com" 
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
        <Textarea 
          placeholder="Расскажите о вашей ситуации..." 
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          required
        />
      </div>
      <div className="flex items-start space-x-2">
        <input 
          type="checkbox" 
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          required
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
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
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            <Icon name="Send" className="mr-2 h-5 w-5" />
            Отправить сообщение
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;