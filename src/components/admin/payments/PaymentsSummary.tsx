import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PaymentsSettings } from '@/types/admin';

interface PaymentsSummaryProps {
  settings: PaymentsSettings;
}

const PaymentsSummary: React.FC<PaymentsSummaryProps> = ({ settings }) => {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Текущие настройки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Активный провайдер:</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                {settings.active_provider.toUpperCase()}
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Включенные провайдеры:</p>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(settings.providers)
                  .filter(([, config]) => config.enabled)
                  .map(([name]) => (
                    <span key={name} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {name.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsSummary;