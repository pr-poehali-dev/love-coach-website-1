import React from 'react';

interface PaymentStatusBannerProps {
  phase: 'idle' | 'checking' | 'ok' | 'fail';
  info: { amount?: string };
}

const PaymentStatusBanner: React.FC<PaymentStatusBannerProps> = ({ phase, info }) => {
  if (phase === 'idle') return null;

  if (phase === 'checking') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
          <div>
            <div className="font-semibold text-yellow-800">Проверяем оплату...</div>
            <div className="text-sm text-yellow-700">Пожалуйста, подождите</div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'ok') {
    return (
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
    );
  }

  if (phase === 'fail') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <span className="text-red-600 text-xl">❌</span>
          <div>
            <div className="font-semibold text-red-800">Оплата не завершена</div>
            <div className="text-sm text-red-700">Попробуйте ещё раз</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentStatusBanner;