import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomPayment = () => {
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const amountParam = urlParams.get('amount');
    
    if (status === 'success' || status === 'failed') {
      setPaymentStatus(status);
      if (amountParam) {
        setPaymentAmount(Number(amountParam));
      }
    }
  }, []);

  const handlePayment = () => {
    if (amount < 100) {
      alert("Минимальная сумма: 100 ₽");
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Введите корректный email");
      return;
    }
    // Имитация редиректа на оплату
    const paymentId = Math.random() > 0.5 ? 'success' : 'failed';
    window.location.href = `/custom-payment?status=${paymentId}&amount=${amount}&email=${encodeURIComponent(email)}`;
    
    // В реальном приложении здесь будет редирект на платежную систему
    // alert("Платёж пока недоступен. Мы свяжемся с вами после консультации.");
  };

  return (
    <>
      <Helmet>
        <title>Оплата консультации</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-3 xs:p-4 sm:p-6">
        <Card className="w-full max-w-xs xs:max-w-sm sm:max-w-md shadow-lg">
          <CardHeader className="text-center px-4 xs:px-6 py-4 xs:py-6">
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight">
              {paymentStatus === 'success' ? '✅ Оплачено' : 
               paymentStatus === 'failed' ? '❌ Ошибка оплаты' : 'Оплата'}
            </CardTitle>
            <p className="text-xs xs:text-sm text-muted-foreground mt-2 leading-relaxed">
              {paymentStatus === 'success' ? `Платеж на сумму ${paymentAmount}₽ успешно выполнен` :
               paymentStatus === 'failed' ? `Платеж на сумму ${paymentAmount}₽ не прошел` :
               'Введите сумму в рублях'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4 xs:space-y-6 px-4 xs:px-6 pb-4 xs:pb-6">
            {paymentStatus ? (
              // Показываем результат оплаты
              <div className="text-center space-y-4">
                <div className={`p-4 rounded-lg ${
                  paymentStatus === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    paymentStatus === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {paymentStatus === 'success' 
                      ? `Спасибо! Платеж на сумму ${paymentAmount}₽ успешно выполнен.`
                      : `Платеж на сумму ${paymentAmount}₽ не удался. Попробуйте снова.`
                    }
                  </p>
                </div>
                
                <Button 
                  onClick={() => {
                    setPaymentStatus(null);
                    window.history.pushState({}, '', '/custom-payment');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  {paymentStatus === 'success' ? 'Новый платеж' : 'Попробовать снова'}
                </Button>
              </div>
            ) : (
              // Форма оплаты
              <>
                <div className="space-y-4">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4"
                  />
                  
                  <Input
                    id="amount"
                    type="number"
                    min="100"
                    placeholder="Сумма"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4"
                  />
                </div>
                
                <Button 
                  onClick={handlePayment}
                  className="w-full text-sm xs:text-base sm:text-lg py-3 xs:py-4 sm:py-6 font-semibold"
                  size="lg"
                >
                  Оплатить {amount > 0 && `${amount} ₽`}
                </Button>
              </>
            )}
            
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