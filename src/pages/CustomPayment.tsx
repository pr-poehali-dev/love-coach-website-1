import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Icon from '@/components/ui/icon';

// Объявляем глобальный объект YooMoneyCheckoutWidget
declare global {
  interface Window {
    YooMoneyCheckoutWidget: any;
  }
}

type CreatePaymentEmbeddedResponse = {
  payment_id: string;
  confirmation_token: string;
};

type StatusResponse = {
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  paid: boolean;
  amount: string;
  description: string;
};

type PaymentMethod = 'auto' | 'sbp' | 'bank_card' | 'sberbank' | 'tinkoff_bank';

const CustomPayment = () => {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [payMethod, setPayMethod] = useState<PaymentMethod>('auto');
  const [loading, setLoading] = useState<boolean>(false);
  const [phase, setPhase] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle');
  const [info, setInfo] = useState<{amount?: string}>({});
  
  // Валидация email
  const isValidEmail = (email: string): boolean => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed);
  };
  
  // Валидация суммы
  const isValidAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num >= 100 && /^\d+(\.\d{1,2})?$/.test(amount);
  };
  
  // Проверка валидности формы
  const isFormValid = isValidEmail(email) && isValidAmount(amount);
  
  // Кастомные SVG иконки
  const CustomSVGIcon = ({ type, className }: { type: string; className?: string }) => {
    const svgProps = {
      className: className || '',
      style: { width: '16px', height: '16px' }
    };

    switch (type) {
      case 'sbp':
        return (
          <svg {...svgProps} viewBox="0 0 16 16" fill="none">
            <g>
              <path d="M7.04799 0L6.99512 7.2584L9.05709 8.47696V3.49675L7.04799 0Z" fill="#FAB719"></path>
              <path d="M7.04688 9.00586V15.9994L9.05598 12.3966V10.2774L7.04688 9.00586Z" fill="#61B42C"></path>
              <path d="M14.3442 11.3392L1.65527 3.49805L3.55861 6.88883L10.749 11.3392H14.3442Z" fill="#208BC9"></path>
              <path d="M7.04688 0L14.343 4.45041H10.7478L9.05595 3.49675L7.04688 0Z" fill="#F77C1C"></path>
              <path d="M9.05762 5.59556L10.7495 4.45117H14.3447L9.05762 7.94792V5.59556Z" fill="#D60B4C"></path>
              <path d="M9.05595 12.3956L10.7478 11.3359H14.343L7.04688 15.9983L9.05595 12.3956Z" fill="#097F2D"></path>
              <path d="M1.65527 3.49805V12.3989L3.45286 9.11404L3.5586 6.88883L1.65527 3.49805Z" fill="#5B59A1"></path>
              <path d="M5.27162 7.94922L3.45287 9.1148L1.65527 12.3996L7.04808 9.00884L5.27162 7.94922Z" fill="#9F4393"></path>
            </g>
          </svg>
        );
      case 'sberbank':
        return (
          <svg {...svgProps} viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_20356_7892)">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.88897 0.666016C1.21396 0.666016 0.666748 1.21322 0.666748 1.88824V14.1105C0.666748 14.7855 1.21396 15.3327 1.88897 15.3327H14.1112C14.7862 15.3327 15.3334 14.7855 15.3334 14.1105V1.88824C15.3334 1.21322 14.7862 0.666016 14.1112 0.666016H1.88897Z" fill="#21A038"></path>
              <path d="M11.2888 7.99737V7.90872L12.209 7.23262C12.2548 7.48567 12.2778 7.7423 12.2779 7.99951C12.2779 8.96979 11.948 9.91119 11.3424 10.6693C10.7368 11.4274 9.8915 11.9571 8.94517 12.1715C7.99891 12.3858 7.0078 12.2721 6.13467 11.849C5.26149 11.4259 4.55814 10.7185 4.13995 9.84291C3.72182 8.96736 3.61373 7.97567 3.8335 7.03056C4.05321 6.08551 4.58771 5.24323 5.34927 4.64195C6.11077 4.04068 7.05409 3.71617 8.02437 3.72167C8.99465 3.72716 9.9342 4.06238 10.6889 4.67221L9.85417 5.28466C9.24688 4.86965 8.51807 4.67002 7.78405 4.71764C7.05004 4.7652 6.35311 5.05725 5.80449 5.54719C5.25582 6.03707 4.8871 6.69662 4.75702 7.42063C4.627 8.14458 4.74319 8.89121 5.08708 9.54144C5.43092 10.1917 5.98266 10.7079 6.65424 11.008C7.32582 11.3081 8.07853 11.3745 8.79229 11.1968C9.50606 11.0191 10.1397 10.6075 10.5922 10.0276C11.0447 9.44769 11.2899 8.73295 11.2888 7.99737Z" fill="white"></path>
              <path d="M6.37377 6.858V8.08602L8.00145 9.10646L11.8984 6.23931C11.7609 5.93685 11.5886 5.65152 11.385 5.38893L8.00145 7.8784L6.37377 6.858Z" fill="white"></path>
            </g>
            <defs>
              <clipPath id="clip0_20356_7892">
                <rect width="16" height="16" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        );
      case 'tinkoff':
        return (
          <svg {...svgProps} viewBox="0 0 16 16" fill="none">
            <g>
              <path d="M0.666748 0.666016H15.3334V8.04335C15.3334 9.93535 14.3251 11.6807 12.6861 12.6267L8.00008 15.3327L3.31408 12.6267C1.67508 11.6807 0.666748 9.93168 0.666748 8.04335V0.666016Z" fill="#FFDD2D"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M4.69263 4.55054V6.84587C5.00796 6.49021 5.57629 6.25187 6.22896 6.25187H6.93663V8.91754C6.93663 9.62887 6.74229 10.2485 6.45629 10.5895H9.53996C9.25396 10.2485 9.06329 9.62887 9.06329 8.91754V6.24821H9.77096C10.4236 6.24821 10.992 6.48654 11.3073 6.84221V4.54688H4.69263V4.55054Z" fill="#333333"></path>
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  // Конфигурация способов оплаты
  const paymentMethods = [
    {
      id: 'auto' as PaymentMethod,
      label: 'Автовыбор в виджете',
      hint: 'Показать все доступные',
      icon: 'Settings',
      customIcon: null
    },
    {
      id: 'sbp' as PaymentMethod,
      label: 'СБП',
      hint: 'Оплата по QR/в приложении',
      icon: 'QrCode',
      customIcon: 'sbp'
    },
    {
      id: 'bank_card' as PaymentMethod,
      label: 'Банковская карта',
      hint: 'Visa/MIR/Mastercard',
      icon: 'CreditCard',
      customIcon: null
    },
    {
      id: 'sberbank' as PaymentMethod,
      label: 'SberPay',
      hint: 'Приложение СберБанк Онлайн',
      icon: 'Smartphone',
      customIcon: 'sberbank'
    },
    {
      id: 'tinkoff_bank' as PaymentMethod,
      label: 'T-Pay',
      hint: 'Приложение Tinkoff',
      icon: 'Wallet',
      customIcon: 'tinkoff'
    }
  ];
  
  // Создание embedded платежа
  const startPaymentEmbedded = async (email: string, amount: number) => {
    try {
      const response = await fetch('/api/create_payment_embedded.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), amount })
      });
      
      const data = await response.json() as CreatePaymentEmbeddedResponse;
      
      if (!response.ok || !data.confirmation_token || !data.payment_id) {
        throw new Error((data as any).error || 'Не удалось создать платёж');
      }
      
      // Сохраняем payment_id для последующей проверки статуса
      sessionStorage.setItem('yk_pid', data.payment_id);
      
      // Инициализируем виджет ЮKassa
      initYooKassaWidget(data.confirmation_token, data.payment_id);
      
    } catch (error) {
      throw error;
    }
  };
  
  // Инициализация виджета ЮKassa
  const initYooKassaWidget = (confirmationToken: string, paymentId: string) => {
    if (!window.YooMoneyCheckoutWidget) {
      toast.error('Виджет ЮKassa не загружен');
      return;
    }
    
    const Widget = window.YooMoneyCheckoutWidget;
    const methods = payMethod === 'auto' ? undefined : [payMethod];
    
    const checkout = new Widget({
      confirmation_token: confirmationToken,
      customization: {
        modal: true,
        ...(methods ? { payment_methods: methods } : {}),
      },
      error_callback(error: any) {
        console.error('YooWidget error:', error);
        if (error?.code === 'no_payment_methods_to_display') {
          toast.error('Этот способ оплаты недоступен для вашего магазина в ЮKassa');
        } else if (error?.code === 'invalid_combination_of_payment_methods') {
          toast.error('Нельзя отображать выбранную комбинацию способов');
        } else {
          toast.error('Ошибка виджета ЮKassa');
        }
        setLoading(false);
      },
    });
    
    // Подписки на события виджета
    checkout
      .on('success', () => {
        console.log('Payment success');
        checkPaymentStatus(paymentId, 2); // 2 попытки проверки
      })
      .on('fail', () => {
        console.log('Payment failed');
        setPhase('fail');
        setLoading(false);
      })
      .on('modal_close', () => {
        console.log('Modal closed');
        setPhase('fail');
        setLoading(false);
      })
      .on('complete', () => {
        console.log('Payment completed');
        checkPaymentStatus(paymentId, 2); // На всякий случай проверяем
      });
    
    // Открываем виджет
    checkout.render('embedded');
  };
  
  // Короткий опрос статуса платежа (для embedded виджета)
  const checkPaymentStatus = async (paymentId: string, attempts: number) => {
    if (attempts <= 0) {
      setPhase('fail');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/status.php?payment_id=' + encodeURIComponent(paymentId));
      const status = await response.json() as StatusResponse;
      
      if (status.paid || status.status === 'succeeded') {
        setPhase('ok');
        setInfo({ amount: status.amount });
        setLoading(false);
        setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
      } else if (status.status === 'canceled') {
        setPhase('fail');
        setLoading(false);
      } else {
        // Повторяем через 1 секунду
        setTimeout(() => checkPaymentStatus(paymentId, attempts - 1), 1000);
      }
    } catch (error) {
      console.error('Ошибка проверки статуса:', error);
      setTimeout(() => checkPaymentStatus(paymentId, attempts - 1), 1000);
    }
  };
  
  // Обработка отправки формы
  const handlePayment = async () => {
    if (!isFormValid || loading) return;
    
    setLoading(true);
    try {
      await startPaymentEmbedded(email, parseFloat(amount));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка при создании платежа';
      toast.error(message);
      setLoading(false);
    }
  };
  
  // Проверка статуса платежа при загрузке страницы (для обычных платежей)
  useEffect(() => {
    const pid = sessionStorage.getItem('yk_pid');
    if (!pid) return;
    
    setPhase('checking');
    
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/status.php?payment_id=' + encodeURIComponent(pid));
        const status = await response.json() as StatusResponse;
        
        if (status.paid || status.status === 'succeeded') {
          setPhase('ok');
          setInfo({ amount: status.amount });
          setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
        } else if (status.status === 'canceled') {
          setPhase('fail');
          setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
        } else {
          setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error('Ошибка проверки статуса:', error);
        setPhase('fail');
        setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
      }
    };
    
    checkStatus();
  }, []);
  
  // Загрузка скрипта ЮKassa
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Оплата консультации</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-3 xs:p-4 sm:p-6">
          <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md space-y-4">
            
            {/* Статусы проверки оплаты */}
            {phase === 'checking' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                  <div>
                    <div className="font-semibold text-yellow-800">Проверяем оплату...</div>
                    <div className="text-sm text-yellow-700">Пожалуйста, подождите</div>
                  </div>
                </div>
              </div>
            )}
            
            {phase === 'ok' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <div>
                    <div className="font-semibold text-green-800">Оплата прошла успешно!</div>
                    <div className="text-sm text-green-700">
                      Сумма: {info.amount} ₽
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {phase === 'fail' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 text-xl">❌</span>
                  <div>
                    <div className="font-semibold text-red-800">Оплата не завершена</div>
                    <div className="text-sm text-red-700">Попробуйте ещё раз</div>
                  </div>
                </div>
              </div>
            )}
            
            <Card className="w-full shadow-lg">
              <CardHeader className="text-center px-4 xs:px-6 py-4 xs:py-6">
                <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
                  Оплата
                </CardTitle>
                <p className="text-xs xs:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Введите данные для оплаты
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4 xs:space-y-6 px-4 xs:px-6 pb-4 xs:pb-6">
                <div className="space-y-4">
                  {/* Email поле */}
                  <div className="space-y-1">
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className={`text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4 ${
                        email && !isValidEmail(email) ? 'border-red-300' : ''
                      }`}
                    />
                    {email && !isValidEmail(email) && (
                      <p className="text-xs text-red-600 px-1">
                        Введите корректный email
                      </p>
                    )}
                  </div>
                  
                  {/* Сумма поле */}
                  <div className="space-y-1">
                    <Input
                      id="amount"
                      type="number"
                      min="100"
                      step="0.01"
                      placeholder="Сумма в рублях"
                      required
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
                          setAmount(value);
                        }
                      }}
                      disabled={loading}
                      className={`text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4 ${
                        amount && !isValidAmount(amount) ? 'border-red-300' : ''
                      }`}
                    />
                    {amount && !isValidAmount(amount) && (
                      <p className="text-xs text-red-600 px-1">
                        Минимальная сумма 100 ₽
                      </p>
                    )}
                  </div>
                  
                  {/* Способы оплаты */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-gray-700">Способ оплаты</h3>
                    <div 
                      role="radiogroup" 
                      aria-label="Способ оплаты" 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          role="radio"
                          aria-checked={payMethod === method.id}
                          onClick={() => setPayMethod(method.id)}
                          disabled={loading}
                          className={`rounded-xl border-2 p-3 text-left transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                            payMethod === method.id
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {method.customIcon ? (
                              <div className="mt-0.5">
                                <CustomSVGIcon type={method.customIcon} />
                              </div>
                            ) : (
                              <Icon 
                                name={method.icon} 
                                size={20} 
                                className={`mt-0.5 ${
                                  payMethod === method.id ? 'text-primary' : 'text-gray-400'
                                }`} 
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className={`font-semibold text-sm ${
                                payMethod === method.id ? 'text-primary' : 'text-gray-900'
                              }`}>
                                {method.label}
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                                {method.hint}
                              </div>
                            </div>
                            {payMethod === method.id && (
                              <div className="text-primary mt-0.5">
                                <Icon name="Check" size={16} />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Кнопка оплаты */}
                <Button 
                  onClick={handlePayment}
                  disabled={!isFormValid || loading}
                  className="w-full text-sm xs:text-base sm:text-lg py-3 xs:py-4 sm:py-6 font-semibold disabled:bg-gray-300"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Открываем виджет оплаты...
                    </div>
                  ) : (
                    `Оплатить${amount && isValidAmount(amount) ? ` ${Number(amount).toFixed(2)} ₽` : ''}`
                  )}
                </Button>
                
                {/* Соглашение */}
                <div className="text-[10px] xs:text-[11px] text-gray-400 opacity-50 border-t pt-3 xs:pt-4 text-center leading-tight">
                  <p>
                    Оплачивая услугу, вы соглашаетесь с{" "}
                    <a href="/offer" target="_blank" className="underline hover:text-gray-600 transition-colors">
                      публичной офертой
                    </a>{" "}
                    и{" "}
                    <a href="/privacy" target="_blank" className="underline hover:text-gray-600 transition-colors">
                      политикой конфиденциальности
                    </a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Реквизиты в самом низу сайта */}
        <div className="py-8 px-3">
          <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-gray-400 opacity-60 leading-tight text-center">
            Услуги оказывает ИП Симонов Сергей Сергеевич, ОГРНИП 325650000019110, ИНН 650703217742
          </p>
        </div>
        
        {/* Контейнер для embedded виджета */}
        <div id="embedded" className="hidden"></div>
      </div>
    </>
  );
};

export default CustomPayment;