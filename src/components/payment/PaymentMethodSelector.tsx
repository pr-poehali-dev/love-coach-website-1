import React from 'react';
import Icon from '@/components/ui/icon';
import CustomSVGIcon from './PaymentIcons';

export type PaymentMethod = 'auto' | 'sbp' | 'bank_card' | 'sberbank' | 'tinkoff_bank';

interface PaymentMethodSelectorProps {
  payMethod: PaymentMethod;
  setPayMethod: (method: PaymentMethod) => void;
  loading: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  payMethod,
  setPayMethod,
  loading
}) => {
  const paymentMethods = [
    {
      id: 'auto' as PaymentMethod,
      label: 'Автовыбор в виджете',
      hint: 'Показать все доступные',
      icon: 'Settings',
      customIcon: null
    },
    {
      id: 'sbp' as PaymentMethod,
      label: 'СБП',
      hint: 'Оплата по QR/в приложении',
      icon: 'QrCode',
      customIcon: 'sbp'
    },
    {
      id: 'bank_card' as PaymentMethod,
      label: 'Банковская карта',
      hint: 'Visa/MIR/Mastercard',
      icon: 'CreditCard',
      customIcon: null
    },
    {
      id: 'sberbank' as PaymentMethod,
      label: 'SberPay',
      hint: 'Приложение СберБанк Онлайн',
      icon: 'Smartphone',
      customIcon: 'sberbank'
    },
    {
      id: 'tinkoff_bank' as PaymentMethod,
      label: 'T-Pay',
      hint: 'Приложение Tinkoff',
      icon: 'Wallet',
      customIcon: 'tinkoff'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-700">Способ оплаты</h3>
      <div 
        role="radiogroup" 
        aria-label="Способ оплаты" 
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={payMethod === method.id}
            onClick={() => setPayMethod(method.id)}
            disabled={loading}
            className={`rounded-xl border-2 p-3 text-left transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              payMethod === method.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {method.customIcon ? (
                <div className="mt-0.5">
                  <CustomSVGIcon type={method.customIcon} />
                </div>
              ) : (
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={`mt-0.5 ${
                    payMethod === method.id ? 'text-primary' : 'text-gray-400'
                  }`} 
                />
              )}
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm ${
                  payMethod === method.id ? 'text-primary' : 'text-gray-900'
                }`}>
                  {method.label}
                </div>
                <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  {method.hint}
                </div>
              </div>
              {payMethod === method.id && (
                <div className="text-primary mt-0.5">
                  <Icon name="Check" size={16} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;