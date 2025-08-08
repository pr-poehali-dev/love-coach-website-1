import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useYookassaCredentials } from '@/hooks/useYookassa';
import { YookassaCredentials } from '@/lib/secure-storage';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

export const YookassaSettings = () => {
  const { credentials, saveCredentials, removeCredentials, loading } = useYookassaCredentials();
  const [formData, setFormData] = useState<YookassaCredentials>({
    shopId: credentials?.shopId || '',
    secretKey: credentials?.secretKey || '',
    isTest: credentials?.isTest ?? true
  });
  const [showSecretKey, setShowSecretKey] = useState(false);

  const handleSave = () => {
    if (!formData.shopId || !formData.secretKey) {
      toast.error('Заполните все поля');
      return;
    }

    if (!/^\d+$/.test(formData.shopId)) {
      toast.error('Shop ID должен содержать только цифры');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(formData.secretKey)) {
      toast.error('Неверный формат Secret Key');
      return;
    }

    const success = saveCredentials(formData);
    if (success) {
      toast.success('Настройки ЮКассы сохранены');
    } else {
      toast.error('Ошибка сохранения настроек');
    }
  };

  const handleRemove = () => {
    const success = removeCredentials();
    if (success) {
      setFormData({
        shopId: '',
        secretKey: '',
        isTest: true
      });
      toast.success('Настройки ЮКассы удалены');
    } else {
      toast.error('Ошибка удаления настроек');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Icon name="Loader2" className="animate-spin mr-2" />
            Загрузка настроек...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="CreditCard" size={20} />
          Настройки ЮКассы
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shopId">Shop ID</Label>
          <Input
            id="shopId"
            type="text"
            placeholder="Например: 123456"
            value={formData.shopId}
            onChange={(e) => setFormData(prev => ({ ...prev, shopId: e.target.value }))}
          />
          <p className="text-xs text-gray-500">
            Идентификатор магазина из личного кабинета ЮКассы
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secretKey">Secret Key</Label>
          <div className="relative">
            <Input
              id="secretKey"
              type={showSecretKey ? "text" : "password"}
              placeholder="Секретный ключ"
              value={formData.secretKey}
              onChange={(e) => setFormData(prev => ({ ...prev, secretKey: e.target.value }))}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowSecretKey(!showSecretKey)}
            >
              <Icon name={showSecretKey ? "EyeOff" : "Eye"} size={16} />
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Секретный ключ из личного кабинета ЮКассы
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isTest"
            checked={formData.isTest}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isTest: checked }))}
          />
          <Label htmlFor="isTest">Тестовый режим</Label>
        </div>
        
        <p className="text-xs text-gray-500">
          В тестовом режиме платежи не будут реально списываться
        </p>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
          
          {credentials && (
            <Button variant="destructive" onClick={handleRemove}>
              <Icon name="Trash2" size={16} className="mr-2" />
              Удалить
            </Button>
          )}
        </div>

        {credentials && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 flex items-center">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              ЮКасса настроена и готова к работе
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};