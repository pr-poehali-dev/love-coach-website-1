import React from 'react';
import { Button } from "@/components/ui/button";

interface PaymentButtonProps {
  loading: boolean;
  isFormValid: boolean;
  amount: string;
  isValidAmount: (amount: string) => boolean;
  onSubmit: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  loading,
  isFormValid,
  amount,
  isValidAmount,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      {/* Кнопка оплаты */}
      <Button 
        onClick={onSubmit}
        disabled={!isFormValid || loading}
        className="w-full text-sm xs:text-base sm:text-lg py-3 xs:py-4 sm:py-6 font-semibold disabled:bg-gray-300"
        size="lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Открываем виджет оплаты...
          </div>
        ) : (
          `Оплатить${amount && isValidAmount(amount) ? ` ${Number(amount).toFixed(2)} ₽` : ''}`
        )}
      </Button>
      
      {/* Соглашение */}
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
    </div>
  );
};

export default PaymentButton;