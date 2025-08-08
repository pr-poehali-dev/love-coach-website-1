import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useYookassaPayment } from '@/hooks/useYookassa';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const { getPayment } = useYookassaPayment();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const paymentId = searchParams.get('payment_id');
      
      if (!paymentId) {
        setPaymentStatus('failed');
        return;
      }

      try {
        const payment = await getPayment(paymentId);
        
        if (payment.status === 'succeeded') {
          setPaymentStatus('success');
          setPaymentAmount(payment.amount.value);
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Ошибка проверки платежа:', error);
        setPaymentStatus('failed');
      }
    };

    checkPaymentStatus();
  }, [searchParams, getPayment]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (paymentStatus === 'loading') {
    return (
      <>
        <Helmet>
          <title>Проверка платежа</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="text-center py-8">
              <div className="animate-spin mx-auto w-8 h-8 mb-4">
                <Icon name="Loader2" size={32} className="text-blue-600" />
              </div>
              <p className="text-lg font-medium">Проверяем статус платежа...</p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <>
        <Helmet>
          <title>Платеж успешен</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-green-700">
                Платеж успешен!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Ваш платеж на сумму <span className="font-semibold">{paymentAmount} ₽</span> успешно обработан.
              </p>
              
              <p className="text-sm text-gray-500">
                Мы свяжемся с вами в ближайшее время для консультации.
              </p>
              
              <Button 
                onClick={handleGoHome}
                className="w-full mt-6"
              >
                Вернуться на главную
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Ошибка платежа</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="XCircle" size={32} className="text-red-600" />
            </div>
            <CardTitle className="text-xl font-bold text-red-700">
              Платеж не прошел
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              К сожалению, не удалось обработать ваш платеж.
            </p>
            
            <p className="text-sm text-gray-500">
              Попробуйте еще раз или свяжитесь с поддержкой.
            </p>
            
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.href = '/payment'}
                className="w-full"
              >
                Попробовать снова
              </Button>
              
              <Button 
                onClick={handleGoHome}
                variant="outline"
                className="w-full"
              >
                Вернуться на главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentSuccess;