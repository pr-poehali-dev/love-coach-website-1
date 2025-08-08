import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useYookassaPayment } from "@/hooks/useYookassa";
import { YookassaService } from "@/lib/yookassa";
import { toast } from "sonner";

const CustomPayment = () => {
  const [amount, setAmount] = useState<number>(0);
  const { createPayment, loading, error } = useYookassaPayment();

  const handlePayment = async () => {
    if (amount < 100) {
      toast.error("Минимальная сумма: 100 ₽");
      return;
    }

    try {
      const paymentData = {
        amount: YookassaService.formatAmount(amount),
        description: `Оплата услуг на сумму ${amount} ₽`,
        confirmation: {
          type: 'redirect' as const,
          return_url: window.location.origin + '/payment-success'
        },
        capture: true,
        metadata: {
          order_id: Date.now().toString()
        }
      };

      const payment = await createPayment(paymentData);
      
      if (payment.confirmation?.confirmation_url) {
        window.location.href = payment.confirmation.confirmation_url;
      } else {
        toast.error("Ошибка получения ссылки на оплату");
      }
    } catch (err) {
      console.error('Ошибка создания платежа:', err);
      toast.error("Ошибка создания платежа. Попробуйте позже.");
    }
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
          <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md space-y-4">
            {/* Уведомление о тестовом режиме */}
            {import.meta.env.VITE_YOOKASSA_TEST_MODE === 'true' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">🧪</span>
                  <div className="text-sm">
                    <div className="font-semibold text-yellow-800">Тестовый режим</div>
                    <div className="text-yellow-700">Платежи эмулируются, деньги не списываются</div>
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
              Введите сумму в рублях
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4 xs:space-y-6 px-4 xs:px-6 pb-4 xs:pb-6">
            <div className="space-y-2">
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
              disabled={loading || amount < 100}
              className="w-full text-sm xs:text-base sm:text-lg py-3 xs:py-4 sm:py-6 font-semibold disabled:bg-gray-300"
              size="lg"
            >
              {loading ? 'Создание платежа...' : `Оплатить ${amount > 0 ? `${amount} ₽` : ''}`}
            </Button>
            
            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
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