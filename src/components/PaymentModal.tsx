import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [selectedTariff, setSelectedTariff] = useState('individual');
  const [customAmount, setCustomAmount] = useState('');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const tariffs = [
    {
      id: 'individual',
      title: 'Индивидуальная сессия',
      price: '3,000₽',
      duration: '60 минут',
      description: 'Персональная работа 1 на 1',
      icon: 'User',
      popular: false
    },
    {
      id: 'couple',
      title: 'Сессия для пары',
      price: '5,000₽',
      duration: '90 минут',
      description: 'Совместная работа над отношениями',
      icon: 'Users',
      popular: true
    },
    {
      id: 'support',
      title: 'Поддержка в чате',
      price: '4,000₽',
      duration: '7 дней',
      description: 'Круглосуточная поддержка',
      icon: 'MessageCircle',
      popular: false
    },
    {
      id: 'custom',
      title: 'Расширенный план',
      price: 'По согласованию',
      duration: 'Индивидуально',
      description: 'Введите сумму согласованную заранее',
      icon: 'Settings',
      popular: false
    }
  ];

  const selectedTariffData = tariffs.find(t => t.id === selectedTariff);

  const handlePayment = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Заполните все поля",
        description: "Все поля обязательны для заполнения",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Переход к оплате",
      description: "Вы будете перенаправлены на страницу оплаты",
    });
    
    // Здесь будет интеграция с платёжной системой
    console.log('Payment data:', { ...formData, tariff: selectedTariff });
  };

  const handleClose = () => {
    setFormData({ fullName: '', email: '', phone: '' });
    setSelectedTariff('individual');
    setCustomAmount('');
    setIsAmountFocused(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Оплата услуг
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            Выберите тариф и заполните данные для оплаты
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Выбор тарифа */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Выберите тариф</h3>
            <div className="grid gap-3">
              {tariffs.map((tariff) => (
                <div 
                  key={tariff.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTariff === tariff.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTariff(tariff.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedTariff === tariff.id ? 'bg-primary/20' : 'bg-gray-100'
                      }`}>
                        <Icon 
                          name={tariff.icon as any} 
                          className={`h-5 w-5 ${
                            selectedTariff === tariff.id ? 'text-primary' : 'text-gray-600'
                          }`} 
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{tariff.title}</h4>
                        <p className="text-sm text-gray-600">{tariff.description}</p>
                        <p className="text-xs text-gray-500">{tariff.duration}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      {tariff.id === 'custom' && selectedTariff === 'custom' ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Сумма"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => setIsAmountFocused(false)}
                            className="w-24 h-8 text-sm"
                            onClick={(e) => e.stopPropagation()}
                            min="100"
                            autoFocus={false}
                          />
                          <span className="text-sm text-gray-600">₽</span>
                        </div>
                      ) : (
                        <div className="text-xl font-bold text-gray-900">{tariff.price}</div>
                      )}
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedTariff === tariff.id 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedTariff === tariff.id && (
                          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма данных */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Контактные данные</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО *
                </label>
                <Input
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Итого */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedTariffData?.title}</h4>
                <p className="text-sm text-gray-600">{selectedTariffData?.duration}</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {selectedTariff === 'custom' && customAmount 
                  ? `${customAmount}₽` 
                  : selectedTariffData?.price}
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
            >
              <Icon name="CreditCard" className="mr-2 h-5 w-5" />
              Перейти к оплате
            </Button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <button onClick={() => window.open('/offer', '_blank')} className="text-primary hover:underline">
                офертой
              </button>
              {' '}и{' '}
              <button onClick={() => window.open('/privacy', '_blank')} className="text-primary hover:underline">
                политикой конфиденциальности
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;