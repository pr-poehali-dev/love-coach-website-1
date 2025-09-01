import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { publicApi } from '@/utils/api';
import type { PublicActivePaymentResponse } from '@/types/admin';


declare global {
  interface Window {
    YooMoneyCheckoutWidget: any;
  }
}

export type CreatePaymentEmbeddedResponse = {
  payment_id: string;
  confirmation_token: string;
};

export type StatusResponse = {
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  paid: boolean;
  amount: string;
  description: string;
};

export const useMultiPaymentLogic = () => {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [phase, setPhase] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle');
  const [info, setInfo] = useState<{amount?: string}>({});
  const [activeProvider, setActiveProvider] = useState<PublicActivePaymentResponse | null>(null);
  const [providerLoading, setProviderLoading] = useState(true);

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

  // Загрузка активного провайдера
  useEffect(() => {
    const loadActiveProvider = async () => {
      try {
        const provider = await publicApi.getActivePayment();
        setActiveProvider(provider);
      } catch (error) {
        console.error('Ошибка загрузки провайдера:', error);
        toast.error('Ошибка загрузки настроек платежей');
      } finally {
        setProviderLoading(false);
      }
    };

    loadActiveProvider();
  }, []);

  // Короткий опрос статуса платежа (универсальный)
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
        setTimeout(() => sessionStorage.removeItem('payment_pid'), 5000);
      } else if (status.status === 'canceled') {
        setPhase('fail');
        setLoading(false);
      } else {
        setTimeout(() => checkPaymentStatus(paymentId, attempts - 1), 1000);
      }
    } catch (error) {
      console.error('Ошибка проверки статуса:', error);
      setTimeout(() => checkPaymentStatus(paymentId, attempts - 1), 1000);
    }
  };

  // YooKassa виджет
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
          toast.error('Этот способ оплаты недоступен');
        } else {
          toast.error('Ошибка виджета оплаты');
        }
        setLoading(false);
      },
    });

    checkout
      .on('success', () => {
        checkPaymentStatus(paymentId, 2);
      })
      .on('fail', () => {
        setPhase('fail');
        setLoading(false);
      })
      .on('modal_close', () => {
        setPhase('fail');
        setLoading(false);
      })
      .on('complete', () => {
        checkPaymentStatus(paymentId, 2);
      });

    checkout.render('embedded');
  };

  // Альфа-банк виджет
  const initAlfaBankWidget = (settings: NonNullable<PublicActivePaymentResponse['alfabank']>) => {
    const amountInFormat = settings.amount_format === 'kopeyki' 
      ? Math.round(parseFloat(amount) * 100)
      : parseFloat(amount);

    const scriptSrc = settings.gateway === 'test' 
      ? 'https://testpay.alfabank.ru/assets/alfa-payment.js'
      : 'https://pay2.alfabank.ru/assets/alfa-payment.js';

    // Удаляем старый скрипт если есть
    const oldScript = document.getElementById('alfa-payment-script');
    if (oldScript) {
      oldScript.remove();
    }

    // Удаляем старую кнопку если есть
    const oldButton = document.getElementById('alfa-payment-button');
    if (oldButton) {
      oldButton.remove();
    }

    // Загружаем скрипт Альфы
    const script = document.createElement('script');
    script.id = 'alfa-payment-script';
    script.src = scriptSrc;
    script.async = true;

    script.onload = () => {
      // Создаем контейнер для кнопки
      const container = document.getElementById('embedded');
      if (!container) return;

      const button = document.createElement('div');
      button.id = 'alfa-payment-button';
      button.setAttribute('data-token', settings.token);
      button.setAttribute('data-gateway', settings.gateway);
      button.setAttribute('data-stages', settings.stages.toString());
      button.setAttribute('data-language', settings.language);
      button.setAttribute('data-return-url', settings.return_url);
      button.setAttribute('data-fail-url', settings.fail_url);
      button.setAttribute('data-amount', amountInFormat.toString());
      button.setAttribute('data-amount-format', settings.amount_format);
      button.setAttribute('data-button-text', 'Оплатить картой');

      container.appendChild(button);
      setLoading(false);
    };

    script.onerror = () => {
      toast.error('Ошибка загрузки виджета Альфа-банка');
      setLoading(false);
    };

    document.head.appendChild(script);
  };

  // YooKassa платеж
  const startYooKassaPayment = async () => {
    try {
      const response = await fetch('/api/create_payment_embedded.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), amount: parseFloat(amount) })
      });

      const data = await response.json() as CreatePaymentEmbeddedResponse;

      if (!response.ok || !data.confirmation_token || !data.payment_id) {
        throw new Error((data as any).error || 'Не удалось создать платёж');
      }

      sessionStorage.setItem('payment_pid', data.payment_id);
      initYooKassaWidget(data.confirmation_token, data.payment_id);

    } catch (error) {
      throw error;
    }
  };

  // Обработка отправки формы
  const handlePayment = async () => {
    if (!isFormValid || loading || !activeProvider) return;

    setLoading(true);
    
    try {
      switch (activeProvider.provider) {
        case 'yookassa':
          await startYooKassaPayment();
          break;
          
        case 'alfabank':
          if (activeProvider.alfabank) {
            initAlfaBankWidget(activeProvider.alfabank);
          } else {
            throw new Error('Настройки Альфа-банка не найдены');
          }
          break;
          
        case 'robokassa':
          toast.error('Robokassa пока не поддерживается');
          setLoading(false);
          break;
          
        case 'cloudpayments':
          toast.error('CloudPayments пока не поддерживается');
          setLoading(false);
          break;
          
        default:
          throw new Error('Неизвестный провайдер платежей');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка при создании платежа';
      toast.error(message);
      setLoading(false);
    }
  };

  // Проверка статуса платежа при загрузке страницы
  useEffect(() => {
    const pid = sessionStorage.getItem('payment_pid');
    if (!pid) return;

    setPhase('checking');

    const checkStatus = async () => {
      try {
        const response = await fetch('/api/status.php?payment_id=' + encodeURIComponent(pid));
        const status = await response.json() as StatusResponse;

        if (status.paid || status.status === 'succeeded') {
          setPhase('ok');
          setInfo({ amount: status.amount });
          setTimeout(() => sessionStorage.removeItem('payment_pid'), 5000);
        } else if (status.status === 'canceled') {
          setPhase('fail');
          setTimeout(() => sessionStorage.removeItem('payment_pid'), 5000);
        } else {
          setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error('Ошибка проверки статуса:', error);
        setPhase('fail');
        setTimeout(() => sessionStorage.removeItem('payment_pid'), 5000);
      }
    };

    checkStatus();
  }, []);

  // Загрузка скрипта YooKassa
  useEffect(() => {
    if (!activeProvider || activeProvider.provider !== 'yookassa') return;

    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [activeProvider]);

  return {
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
  };
};