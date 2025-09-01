import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentStatusBanner from "@/components/payment/PaymentStatusBanner";
import PaymentFormFields from "@/components/payment/PaymentFormFields";
import PaymentButton from "@/components/payment/PaymentButton";
import { useMultiPaymentLogic } from "@/hooks/useMultiPaymentLogic";

const CustomPayment = () => {
  const {
    email,
    setEmail,
    amount,
    setAmount,
    loading,
    phase,
    info,
    activeProvider,
    providerLoading,
    isValidEmail,
    isValidAmount,
    isFormValid,
    handlePayment
  } = useMultiPaymentLogic();

  // Показываем лоадер пока загружается провайдер
  if (providerLoading) {
    return (
      <>
        <Helmet>
          <title>Оплата консультации</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="referrer" content="no-referrer" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем настройки оплаты...</p>
          </div>
        </div>
      </>
    );
  }

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
            <PaymentStatusBanner phase={phase} info={info} />
            
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
                  {/* Поля формы */}
                  <PaymentFormFields
                    email={email}
                    setEmail={setEmail}
                    amount={amount}
                    setAmount={setAmount}
                    loading={loading}
                    isValidEmail={isValidEmail}
                    isValidAmount={isValidAmount}
                  />
                  

                </div>
                
                {/* Кнопка и соглашение */}
                <PaymentButton
                  loading={loading}
                  isFormValid={isFormValid}
                  amount={amount}
                  isValidAmount={isValidAmount}
                  onSubmit={handlePayment}
                />
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