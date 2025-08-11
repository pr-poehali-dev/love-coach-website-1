import React from 'react';
import { Input } from "@/components/ui/input";

interface PaymentFormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  loading: boolean;
  isValidEmail: (email: string) => boolean;
  isValidAmount: (amount: string) => boolean;
}

const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({
  email,
  setEmail,
  amount,
  setAmount,
  loading,
  isValidEmail,
  isValidAmount
}) => {
  return (
    <div className="space-y-4">
      {/* Email поле */}
      <div className="space-y-1">
        <Input
          id="email"
          type="email"
          inputMode="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={`text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4 ${
            email && !isValidEmail(email) ? 'border-red-300' : ''
          }`}
        />
        {email && !isValidEmail(email) && (
          <p className="text-xs text-red-600 px-1">
            Введите корректный email
          </p>
        )}
      </div>
      
      {/* Сумма поле */}
      <div className="space-y-1">
        <Input
          id="amount"
          type="number"
          min="100"
          step="0.01"
          placeholder="Сумма в рублях"
          required
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
              setAmount(value);
            }
          }}
          disabled={loading}
          className={`text-base xs:text-lg py-2 xs:py-3 px-3 xs:px-4 ${
            amount && !isValidAmount(amount) ? 'border-red-300' : ''
          }`}
        />
        {amount && !isValidAmount(amount) && (
          <p className="text-xs text-red-600 px-1">
            Минимальная сумма 100 ₽
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentFormFields;