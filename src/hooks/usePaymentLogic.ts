import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PaymentMethod } from '@/components/payment/PaymentMethodSelector';

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

export const usePaymentLogic = () => {
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

  // Короткий опрос статуса платежа (для embedded виджета)
  const checkPaymentStatus = async (paymentId: string, attempts: number) => {
    if (attempts <= 0) {
      setPhase('fail');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/payments/status.php?payment_id=' + encodeURIComponent(paymentId));
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

  // Создание embedded платежа
  const startPaymentEmbedded = async (email: string, amount: number) => {
    try {
      const response = await fetch('/api/payments/create-embedded.php', {
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
        const response = await fetch('/api/payments/status.php?payment_id=' + encodeURIComponent(pid));
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

  return {
    email,
    setEmail,
    amount,
    setAmount,
    payMethod,
    setPayMethod,
    loading,
    phase,
    info,
    isValidEmail,
    isValidAmount,
    isFormValid,
    handlePayment
  };
};