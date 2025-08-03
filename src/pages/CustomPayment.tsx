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
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Оплата индивидуальной консультации
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Введите сумму, предварительно согласованную с консультантом. 
              Услуга носит информационно-консультационный характер и не является 
              медицинской или психологической помощью.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма к оплате</Label>
              <Input
                id="amount"
                type="number"
                min="100"
                placeholder="Введите сумму в ₽"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-lg"
              />
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full text-lg py-6"
              size="lg"
            >
              Оплатить {amount > 0 && `${amount} ₽`}
            </Button>
            
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p>
                Услуги оказывает самозанятый Иванов И.И., ИНН 123456789012.<br />
                Оплачивая услугу, вы соглашаетесь с{" "}
                <a href="/offer" target="_blank" className="underline hover:text-foreground">
                  публичной офертой
                </a>{" "}
                и{" "}
                <a href="/privacy" target="_blank" className="underline hover:text-foreground">
                  политикой конфиденциальности
                </a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomPayment;