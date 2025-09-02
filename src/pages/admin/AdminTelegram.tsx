import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { adminApi, APIError } from '@/utils/api';
import type { TelegramSettings } from '@/types/admin';
import Icon from '@/components/ui/icon';

const AdminTelegram: React.FC = () => {
  const { logout } = useAdminAuth();
  const [settings, setSettings] = useState<TelegramSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await adminApi.settings.getTelegram();
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
      await adminApi.settings.updateTelegram(settings);
      setSuccess('Настройки Telegram сохранены');
    } catch (error) {
      if (error instanceof APIError) {
        setError('Ошибка сохранения настроек');
      }
    } finally {
      setSaving(false);
    }
  };

  const testTelegram = async () => {
    setError('');
    setSuccess('');
    setTesting(true);

    try {
      await adminApi.testTelegram();
      setSuccess('Тестовое сообщение отправлено в Telegram');
    } catch (error) {
      if (error instanceof APIError) {
        setError('Ошибка отправки сообщения в Telegram');
      }
    } finally {
      setTesting(false);
    }
  };

  const updateSetting = (field: keyof TelegramSettings, value: any) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [field]: value,
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
              <Icon name="MessageCircle" size={24} className="text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Настройки Telegram
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
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
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

        {/* Main Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Интеграция с Telegram</h2>
                <p className="text-sm text-gray-600 font-normal">
                  Настройте бота для уведомлений о платежах и контактных формах
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Enable Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="telegram-enabled" className="text-base font-medium">
                  Включить Telegram интеграцию
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Активирует отправку уведомлений в Telegram
                </p>
              </div>
              <Switch
                id="telegram-enabled"
                checked={settings.enabled}
                onCheckedChange={(checked) => updateSetting('enabled', checked)}
              />
            </div>

            {/* Bot Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-token">Токен бота</Label>
                <div className="flex gap-2">
                  <Input
                    id="bot-token"
                    type={showToken ? 'text' : 'password'}
                    value={settings.bot_token}
                    onChange={(e) => updateSetting('bot_token', e.target.value)}
                    placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                    disabled={!settings.enabled}
                    className="font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowToken(!showToken)}
                    disabled={!settings.enabled}
                  >
                    {showToken ? (
                      <Icon name="EyeOff" size={16} />
                    ) : (
                      <Icon name="Eye" size={16} />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Получите токен у @BotFather в Telegram
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chat-id">Chat ID</Label>
                <Input
                  id="chat-id"
                  value={settings.chat_id}
                  onChange={(e) => updateSetting('chat_id', e.target.value)}
                  placeholder="-1001234567890 или @channel_name"
                  disabled={!settings.enabled}
                />
                <p className="text-xs text-gray-500">
                  ID чата или канала для отправки уведомлений. Может быть числом или @username
                </p>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Уведомления</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label htmlFor="notify-payment" className="font-medium">
                      Уведомления о платежах
                    </Label>
                    <p className="text-sm text-gray-600">
                      Отправлять сообщение при успешной оплате
                    </p>
                  </div>
                  <Switch
                    id="notify-payment"
                    checked={settings.notify_on_payment}
                    onCheckedChange={(checked) => updateSetting('notify_on_payment', checked)}
                    disabled={!settings.enabled}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label htmlFor="notify-contact" className="font-medium">
                      Уведомления с контактной формы
                    </Label>
                    <p className="text-sm text-gray-600">
                      Отправлять сообщение при заполнении формы обратной связи
                    </p>
                  </div>
                  <Switch
                    id="notify-contact"
                    checked={settings.notify_on_contact}
                    onCheckedChange={(checked) => updateSetting('notify_on_contact', checked)}
                    disabled={!settings.enabled}
                  />
                </div>
              </div>
            </div>

            {/* Test Button */}
            {settings.enabled && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Тестирование</h4>
                    <p className="text-sm text-gray-600">
                      Отправить тестовое сообщение для проверки настроек
                    </p>
                  </div>
                  <Button
                    onClick={testTelegram}
                    disabled={testing || !settings.bot_token || !settings.chat_id}
                    variant="outline"
                  >
                    {testing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        Отправляем...
                      </div>
                    ) : (
                      <>
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить тест
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" size={20} />
              Как настроить Telegram бота
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-2">
              <p className="font-medium">1. Создание бота:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Напишите @BotFather в Telegram</li>
                <li>Отправьте команду /newbot</li>
                <li>Следуйте инструкциям для создания бота</li>
                <li>Скопируйте токен и вставьте в поле выше</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">2. Получение Chat ID:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Для личных сообщений: напишите @userinfobot команду /start</li>
                <li>Для группы: добавьте @userinfobot в группу и отправьте /start</li>
                <li>Для канала: сделайте бота администратором канала</li>
                <li>Chat ID начинается с - для групп и каналов</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Текущее состояние</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${settings.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Интеграция: {settings.enabled ? 'Включена' : 'Выключена'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${settings.bot_token ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>Токен бота: {settings.bot_token ? 'Настроен' : 'Не задан'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${settings.chat_id ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>Chat ID: {settings.chat_id ? 'Настроен' : 'Не задан'}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Активные уведомления:</h4>
              <div className="flex gap-4 text-sm">
                <span className={settings.notify_on_payment ? 'text-green-600' : 'text-gray-400'}>
                  {settings.notify_on_payment ? '✓' : '✗'} О платежах
                </span>
                <span className={settings.notify_on_contact ? 'text-green-600' : 'text-gray-400'}>
                  {settings.notify_on_contact ? '✓' : '✗'} С контактной формы
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminTelegram;