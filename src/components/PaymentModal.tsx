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
      price: '3 000₽',
      duration: '60 минут',
      description: 'Персональная работа 1 на 1',
      icon: 'User',
      popular: false
    },
    {
      id: 'couple',
      title: 'Сессия для пары',
      price: '5 000₽',
      duration: '90 минут',
      description: 'Совместная работа над отношениями',
      icon: 'Users',
      popular: true
    },
    {
      id: 'support',
      title: 'Поддержка в чате',
      price: '4 000₽',
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
      description: 'Введите сумму\nсогласованную заранее',
      icon: 'Settings',
      popular: false
    }
  ];

  const selectedTariffData = tariffs.find(t => t.id === selectedTariff);

  const formatAmount = (amount: string) => {
    if (!amount) return '';
    const number = parseInt(amount.replace(/\s/g, ''));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

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
      <DialogContent className="w-screen sm:w-[90vw] max-w-md sm:max-w-lg h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 mx-0 sm:mx-auto sm:rounded-lg rounded-none">
        <DialogHeader>
          <DialogTitle className="text-base xs:text-lg sm:text-2xl font-bold text-gray-900">
            Оплата услуг
          </DialogTitle>
          <DialogDescription className="text-xs xs:text-sm sm:text-base text-gray-600">
            Выберите тариф и заполните данные для оплаты
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
          {/* Выбор тарифа */}
          <div>
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-2 xs:mb-3 sm:mb-4">Выберите тариф</h3>
            <div className="grid gap-2 sm:gap-3">
              {tariffs.map((tariff) => (
                <div 
                  key={tariff.id}
                  className={`relative border-2 rounded-lg p-2 sm:p-4 cursor-pointer transition-all ${
                    selectedTariff === tariff.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTariff(tariff.id)}
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedTariff === tariff.id ? 'bg-primary/20' : 'bg-gray-100'
                      }`}>
                        <Icon 
                          name={tariff.icon as any} 
                          className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                            selectedTariff === tariff.id ? 'text-primary' : 'text-gray-600'
                          }`} 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-base truncate">{tariff.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">{tariff.description}</p>
                        <p className="text-xs text-gray-500">{tariff.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                      {tariff.id === 'custom' ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Сумма"
                            value={customAmount}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, '');
                              setCustomAmount(value);
                            }}
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => setIsAmountFocused(false)}
                            className="w-20 sm:w-28 h-7 sm:h-8 text-xs sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTariff('custom');
                            }}
                            min="100"
                            autoFocus={false}
                            tabIndex={-1}
                          />
                          <span className="text-xs sm:text-sm text-gray-600">₽</span>
                        </div>
                      ) : (
                        <div className="text-sm sm:text-xl font-bold text-gray-900 whitespace-nowrap">{tariff.price}</div>
                      )}
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
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
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-2 xs:mb-3 sm:mb-4">Контактные данные</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  ФИО *
                </label>
                <Input
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                  autoFocus={false}
                  tabIndex={0}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
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
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
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
          <div className="border-t pt-3 sm:pt-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedTariffData?.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{selectedTariffData?.duration}</p>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-primary">
                {selectedTariff === 'custom' && customAmount 
                  ? `${formatAmount(customAmount)} ₽` 
                  : selectedTariffData?.price}
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
            >
              <Icon name="CreditCard" className="mr-1 xs:mr-2 h-4 w-4 xs:h-5 xs:w-5" />
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