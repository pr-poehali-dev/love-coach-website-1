import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { PaymentsSettings } from '@/types/admin';

interface YooKassaConfigProps {
  settings: PaymentsSettings['providers']['yookassa'];
  isActive: boolean;
  testing: boolean;
  onUpdate: (field: string, value: any) => void;
  onSetActive: () => void;
  onTest: () => void;
}

const YooKassaConfig: React.FC<YooKassaConfigProps> = ({
  settings,
  isActive,
  testing,
  onUpdate,
  onSetActive,
  onTest,
}) => {
  return (
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
            {isActive && (
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Активный
              </div>
            )}
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => onUpdate('enabled', checked)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="yookassa-shop-id">Shop ID</Label>
          <Input
            id="yookassa-shop-id"
            value={settings.shop_id}
            onChange={(e) => onUpdate('shop_id', e.target.value)}
            placeholder="123456"
            disabled={!settings.enabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yookassa-secret">Secret Key</Label>
          <Input
            id="yookassa-secret"
            type="password"
            value={settings.secret_key}
            onChange={(e) => onUpdate('secret_key', e.target.value)}
            placeholder="••••••••"
            disabled={!settings.enabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yookassa-return-url">Return URL</Label>
          <Input
            id="yookassa-return-url"
            value={settings.base_return_url}
            onChange={(e) => onUpdate('base_return_url', e.target.value)}
            placeholder="https://example.com/payment/success"
            disabled={!settings.enabled}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="yookassa-capture"
              checked={settings.capture}
              onCheckedChange={(checked) => onUpdate('capture', checked)}
              disabled={!settings.enabled}
            />
            <Label htmlFor="yookassa-capture">Автоматическое списание</Label>
          </div>
          
          {settings.enabled && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSetActive}
                disabled={isActive}
              >
                {isActive ? 'Активен' : 'Сделать активным'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onTest}
                disabled={testing}
              >
                {testing ? 'Тест...' : 'Тест'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YooKassaConfig;