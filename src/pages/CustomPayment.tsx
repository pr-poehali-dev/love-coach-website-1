import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type CreatePaymentResponse = {
  confirmation_url: string;
  payment_id: string;
};

type StatusResponse = {
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  paid: boolean;
  amount: string;
  description: string;
};

const CustomPayment = () => {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
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
  
  // Создание платежа
  const startPayment = async (email: string, amount: number) => {
    try {
      const response = await fetch('/api/create_payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), amount })
      });
      
      const data = await response.json() as CreatePaymentResponse;
      
      if (!response.ok || !data.confirmation_url || !data.payment_id) {
        throw new Error((data as any).error || 'Не удалось создать платёж');
      }
      
      sessionStorage.setItem('yk_pid', data.payment_id);
      window.location.href = data.confirmation_url;
      
    } catch (error) {
      throw error;
    }
  };
  
  // Обработка отправки формы
  const handlePayment = async () => {
    if (!isFormValid || loading) return;
    
    setLoading(true);
    try {
      await startPayment(email, parseFloat(amount));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка при создании платежа';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  
  // Проверка статуса платежа при загрузке страницы
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
          // Очистка после успешного показа (опционально через несколько секунд)
          setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
        } else if (status.status === 'canceled') {
          setPhase('fail');
          setTimeout(() => sessionStorage.removeItem('yk_pid'), 5000);
        } else {
          // pending / waiting_for_capture - проверяем снова через 2 секунды
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
                    <div className="font-semibold text-red-800">Оплата не прошла</div>
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
                        // Ограничение до 2 знаков после запятой
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
                      Создание платежа...
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
      </div>
    </>
  );
};

export default CustomPayment;