import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { adminApi, APIError } from '@/utils/api';
import type { PaymentsSettings } from '@/types/admin';
import Icon from '@/components/ui/icon';
import AdminPaymentsHeader from '@/components/admin/payments/AdminPaymentsHeader';
import StatusMessages from '@/components/admin/payments/StatusMessages';
import YooKassaConfig from '@/components/admin/payments/YooKassaConfig';
import RobokassaConfig from '@/components/admin/payments/RobokassaConfig';
import CloudPaymentsConfig from '@/components/admin/payments/CloudPaymentsConfig';
import AlfaBankConfig from '@/components/admin/payments/AlfaBankConfig';
import PaymentsSummary from '@/components/admin/payments/PaymentsSummary';

const AdminPayments: React.FC = () => {
  const { logout } = useAdminAuth();
  const [settings, setSettings] = useState<PaymentsSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await adminApi.settings.getPayments();
      setSettings(data);
    } catch (error) {
      if (error instanceof APIError) {
        setError('Ошибка загрузки настроек');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await adminApi.settings.updatePayments(settings);
      setSuccess('Настройки сохранены');
    } catch (error) {
      if (error instanceof APIError) {
        setError('Ошибка сохранения');
      }
    } finally {
      setSaving(false);
    }
  };

  const testPayment = async (provider: PaymentsSettings['active_provider']) => {
    setTesting(provider);
    setError('');

    try {
      const result = await adminApi.testPayment(provider, 10, 'Тестовый платеж', window.location.origin);
      
      if (result.payment_debug_url) {
        window.open(result.payment_debug_url, '_blank');
      } else {
        setSuccess(`Тестовый платеж для ${provider} создан`);
      }
    } catch (error) {
      if (error instanceof APIError) {
        setError(`Ошибка тестирования ${provider}`);
      }
    } finally {
      setTesting(null);
    }
  };

  const updateProvider = (provider: keyof PaymentsSettings['providers'], field: string, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      providers: {
        ...settings.providers,
        [provider]: {
          ...settings.providers[provider],
          [field]: value,
        },
      },
    });
  };

  const setActiveProvider = (provider: PaymentsSettings['active_provider']) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      active_provider: provider,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!settings || !settings.providers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 mb-4">Не удалось загрузить настройки</p>
          <Button onClick={loadSettings}>Попробовать снова</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPaymentsHeader
        onSave={saveSettings}
        onLogout={logout}
        saving={saving}
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <StatusMessages error={error} success={success} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <YooKassaConfig
            settings={settings.providers.yookassa}
            isActive={settings.active_provider === 'yookassa'}
            testing={testing === 'yookassa'}
            onUpdate={(field, value) => updateProvider('yookassa', field, value)}
            onSetActive={() => setActiveProvider('yookassa')}
            onTest={() => testPayment('yookassa')}
          />

          <RobokassaConfig
            settings={settings.providers.robokassa}
            isActive={settings.active_provider === 'robokassa'}
            testing={testing === 'robokassa'}
            onUpdate={(field, value) => updateProvider('robokassa', field, value)}
            onSetActive={() => setActiveProvider('robokassa')}
            onTest={() => testPayment('robokassa')}
          />

          <CloudPaymentsConfig
            settings={settings.providers.cloudpayments}
            isActive={settings.active_provider === 'cloudpayments'}
            testing={testing === 'cloudpayments'}
            onUpdate={(field, value) => updateProvider('cloudpayments', field, value)}
            onSetActive={() => setActiveProvider('cloudpayments')}
            onTest={() => testPayment('cloudpayments')}
          />

          <AlfaBankConfig
            settings={settings.providers.alfabank}
            isActive={settings.active_provider === 'alfabank'}
            testing={testing === 'alfabank'}
            onUpdate={(field, value) => updateProvider('alfabank', field, value)}
            onSetActive={() => setActiveProvider('alfabank')}
            onTest={() => testPayment('alfabank')}
          />
        </div>

        <PaymentsSummary settings={settings} />
      </div>
    </div>
  );
};

export default AdminPayments;