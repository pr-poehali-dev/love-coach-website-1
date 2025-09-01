import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { adminApi, ApiError } from '@/utils/api';
import type { PaymentsSettings } from '@/types/admin';
import Icon from '@/components/ui/icon';

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
      if (error instanceof ApiError) {
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
      if (error instanceof ApiError) {
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
      if (error instanceof ApiError) {
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

  if (!settings) {
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
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="mr-4">
                <Icon name="ArrowLeft" size={20} className="text-gray-600" />
              </Link>
              <Icon name="CreditCard" size={24} className="text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Настройки платежей
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={saveSettings}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Сохранение...
                  </div>
                ) : (
                  'Сохранить'
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Status messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <Icon name="AlertCircle" size={20} className="text-red-400 mr-3 mt-0.5" />
              <div className="text-red-700">{error}</div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <Icon name="CheckCircle" size={20} className="text-green-400 mr-3 mt-0.5" />
              <div className="text-green-700">{success}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* YooKassa */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-600">YK</span>
                  </div>
                  YooKassa
                </CardTitle>
                <div className="flex items-center gap-2">
                  {settings.active_provider === 'yookassa' && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Активный
                    </div>
                  )}
                  <Switch
                    checked={settings.providers.yookassa.enabled}
                    onCheckedChange={(checked) => updateProvider('yookassa', 'enabled', checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yookassa-shop-id">Shop ID</Label>
                <Input
                  id="yookassa-shop-id"
                  value={settings.providers.yookassa.shop_id}
                  onChange={(e) => updateProvider('yookassa', 'shop_id', e.target.value)}
                  placeholder="123456"
                  disabled={!settings.providers.yookassa.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yookassa-secret">Secret Key</Label>
                <Input
                  id="yookassa-secret"
                  type="password"
                  value={settings.providers.yookassa.secret_key}
                  onChange={(e) => updateProvider('yookassa', 'secret_key', e.target.value)}
                  placeholder="••••••••"
                  disabled={!settings.providers.yookassa.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yookassa-return-url">Return URL</Label>
                <Input
                  id="yookassa-return-url"
                  value={settings.providers.yookassa.base_return_url}
                  onChange={(e) => updateProvider('yookassa', 'base_return_url', e.target.value)}
                  placeholder="https://example.com/payment/success"
                  disabled={!settings.providers.yookassa.enabled}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="yookassa-capture"
                    checked={settings.providers.yookassa.capture}
                    onCheckedChange={(checked) => updateProvider('yookassa', 'capture', checked)}
                    disabled={!settings.providers.yookassa.enabled}
                  />
                  <Label htmlFor="yookassa-capture">Автоматическое списание</Label>
                </div>
                
                {settings.providers.yookassa.enabled && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveProvider('yookassa')}
                      disabled={settings.active_provider === 'yookassa'}
                    >
                      {settings.active_provider === 'yookassa' ? 'Активен' : 'Сделать активным'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testPayment('yookassa')}
                      disabled={testing === 'yookassa'}
                    >
                      {testing === 'yookassa' ? 'Тест...' : 'Тест'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Robokassa */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">RK</span>
                  </div>
                  Robokassa
                </CardTitle>
                <div className="flex items-center gap-2">
                  {settings.active_provider === 'robokassa' && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Активный
                    </div>
                  )}
                  <Switch
                    checked={settings.providers.robokassa.enabled}
                    onCheckedChange={(checked) => updateProvider('robokassa', 'enabled', checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="robokassa-login">Merchant Login</Label>
                  <Input
                    id="robokassa-login"
                    value={settings.providers.robokassa.merchant_login}
                    onChange={(e) => updateProvider('robokassa', 'merchant_login', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robokassa-culture">Язык</Label>
                  <select
                    id="robokassa-culture"
                    value={settings.providers.robokassa.culture}
                    onChange={(e) => updateProvider('robokassa', 'culture', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="robokassa-password1">Password 1</Label>
                  <Input
                    id="robokassa-password1"
                    type="password"
                    value={settings.providers.robokassa.password1}
                    onChange={(e) => updateProvider('robokassa', 'password1', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robokassa-password2">Password 2</Label>
                  <Input
                    id="robokassa-password2"
                    type="password"
                    value={settings.providers.robokassa.password2}
                    onChange={(e) => updateProvider('robokassa', 'password2', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="robokassa-success">Success URL</Label>
                  <Input
                    id="robokassa-success"
                    value={settings.providers.robokassa.success_url}
                    onChange={(e) => updateProvider('robokassa', 'success_url', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robokassa-fail">Fail URL</Label>
                  <Input
                    id="robokassa-fail"
                    value={settings.providers.robokassa.fail_url}
                    onChange={(e) => updateProvider('robokassa', 'fail_url', e.target.value)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="robokassa-test"
                    checked={settings.providers.robokassa.test_mode}
                    onCheckedChange={(checked) => updateProvider('robokassa', 'test_mode', checked)}
                    disabled={!settings.providers.robokassa.enabled}
                  />
                  <Label htmlFor="robokassa-test">Тестовый режим</Label>
                </div>
                
                {settings.providers.robokassa.enabled && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveProvider('robokassa')}
                      disabled={settings.active_provider === 'robokassa'}
                    >
                      {settings.active_provider === 'robokassa' ? 'Активен' : 'Сделать активным'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testPayment('robokassa')}
                      disabled={testing === 'robokassa'}
                    >
                      {testing === 'robokassa' ? 'Тест...' : 'Тест'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CloudPayments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">CP</span>
                  </div>
                  CloudPayments
                </CardTitle>
                <div className="flex items-center gap-2">
                  {settings.active_provider === 'cloudpayments' && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Активный
                    </div>
                  )}
                  <Switch
                    checked={settings.providers.cloudpayments.enabled}
                    onCheckedChange={(checked) => updateProvider('cloudpayments', 'enabled', checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cloudpayments-public-id">Public ID</Label>
                <Input
                  id="cloudpayments-public-id"
                  value={settings.providers.cloudpayments.public_id}
                  onChange={(e) => updateProvider('cloudpayments', 'public_id', e.target.value)}
                  disabled={!settings.providers.cloudpayments.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cloudpayments-secret">API Secret</Label>
                <Input
                  id="cloudpayments-secret"
                  type="password"
                  value={settings.providers.cloudpayments.api_secret}
                  onChange={(e) => updateProvider('cloudpayments', 'api_secret', e.target.value)}
                  disabled={!settings.providers.cloudpayments.enabled}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cloudpayments-success">Success URL</Label>
                  <Input
                    id="cloudpayments-success"
                    value={settings.providers.cloudpayments.success_url}
                    onChange={(e) => updateProvider('cloudpayments', 'success_url', e.target.value)}
                    disabled={!settings.providers.cloudpayments.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cloudpayments-fail">Fail URL</Label>
                  <Input
                    id="cloudpayments-fail"
                    value={settings.providers.cloudpayments.fail_url}
                    onChange={(e) => updateProvider('cloudpayments', 'fail_url', e.target.value)}
                    disabled={!settings.providers.cloudpayments.enabled}
                  />
                </div>
              </div>

              {settings.providers.cloudpayments.enabled && (
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveProvider('cloudpayments')}
                    disabled={settings.active_provider === 'cloudpayments'}
                  >
                    {settings.active_provider === 'cloudpayments' ? 'Активен' : 'Сделать активным'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testPayment('cloudpayments')}
                    disabled={testing === 'cloudpayments'}
                  >
                    {testing === 'cloudpayments' ? 'Тест...' : 'Тест'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Альфа-банк */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">АБ</span>
                  </div>
                  Альфа-банк
                </CardTitle>
                <div className="flex items-center gap-2">
                  {settings.active_provider === 'alfabank' && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Активный
                    </div>
                  )}
                  <Switch
                    checked={settings.providers.alfabank.enabled}
                    onCheckedChange={(checked) => updateProvider('alfabank', 'enabled', checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alfabank-token">Token</Label>
                  <Input
                    id="alfabank-token"
                    type="password"
                    value={settings.providers.alfabank.token}
                    onChange={(e) => updateProvider('alfabank', 'token', e.target.value)}
                    disabled={!settings.providers.alfabank.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alfabank-gateway">Gateway</Label>
                  <select
                    id="alfabank-gateway"
                    value={settings.providers.alfabank.gateway}
                    onChange={(e) => updateProvider('alfabank', 'gateway', e.target.value)}
                    disabled={!settings.providers.alfabank.enabled}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="test">Тест</option>
                    <option value="payment">Продакшен</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alfabank-stages">Этапы</Label>
                  <select
                    id="alfabank-stages"
                    value={settings.providers.alfabank.stages}
                    onChange={(e) => updateProvider('alfabank', 'stages', Number(e.target.value))}
                    disabled={!settings.providers.alfabank.enabled}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="1">1-этапная</option>
                    <option value="2">2-этапная</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alfabank-language">Язык</Label>
                  <Input
                    id="alfabank-language"
                    value={settings.providers.alfabank.language}
                    onChange={(e) => updateProvider('alfabank', 'language', e.target.value)}
                    placeholder="ru"
                    disabled={!settings.providers.alfabank.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alfabank-amount-format">Формат суммы</Label>
                  <select
                    id="alfabank-amount-format"
                    value={settings.providers.alfabank.amount_format}
                    onChange={(e) => updateProvider('alfabank', 'amount_format', e.target.value)}
                    disabled={!settings.providers.alfabank.enabled}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="rubli">Рубли</option>
                    <option value="kopeyki">Копейки</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alfabank-return">Return URL</Label>
                  <Input
                    id="alfabank-return"
                    value={settings.providers.alfabank.return_url}
                    onChange={(e) => updateProvider('alfabank', 'return_url', e.target.value)}
                    disabled={!settings.providers.alfabank.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alfabank-fail">Fail URL</Label>
                  <Input
                    id="alfabank-fail"
                    value={settings.providers.alfabank.fail_url}
                    onChange={(e) => updateProvider('alfabank', 'fail_url', e.target.value)}
                    disabled={!settings.providers.alfabank.enabled}
                  />
                </div>
              </div>

              {settings.providers.alfabank.enabled && (
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveProvider('alfabank')}
                    disabled={settings.active_provider === 'alfabank'}
                  >
                    {settings.active_provider === 'alfabank' ? 'Активен' : 'Сделать активным'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testPayment('alfabank')}
                    disabled={testing === 'alfabank'}
                  >
                    {testing === 'alfabank' ? 'Тест...' : 'Тест'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Summary */}
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

      </div>
    </div>
  );
};

export default AdminPayments;