import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomPayment = () => {
  const [amount, setAmount] = useState<number>(0);

  const handlePayment = () => {
    if (amount < 100) {
      alert("Минимальная сумма: 100 ₽");
      return;
    }
    alert("Платёж пока недоступен. Мы свяжемся с вами после консультации.");
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
              className="w-full text-sm xs:text-base sm:text-lg py-3 xs:py-4 sm:py-6 font-semibold"
              size="lg"
            >
              Оплатить {amount > 0 && `${amount} ₽`}
            </Button>
            
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