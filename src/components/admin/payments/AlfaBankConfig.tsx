import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { PaymentsSettings } from '@/types/admin';

interface AlfaBankConfigProps {
  settings: PaymentsSettings['providers']['alfabank'];
  isActive: boolean;
  testing: boolean;
  onUpdate: (field: string, value: any) => void;
  onSetActive: () => void;
  onTest: () => void;
}

const AlfaBankConfig: React.FC<AlfaBankConfigProps> = ({
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
            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">АБ</span>
            </div>
            Альфа-банк
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="alfabank-token">Token</Label>
            <Input
              id="alfabank-token"
              type="password"
              value={settings.token}
              onChange={(e) => onUpdate('token', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alfabank-gateway">Gateway</Label>
            <select
              id="alfabank-gateway"
              value={settings.gateway}
              onChange={(e) => onUpdate('gateway', e.target.value)}
              disabled={!settings.enabled}
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
              value={settings.stages}
              onChange={(e) => onUpdate('stages', Number(e.target.value))}
              disabled={!settings.enabled}
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
              value={settings.language}
              onChange={(e) => onUpdate('language', e.target.value)}
              placeholder="ru"
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alfabank-amount-format">Формат суммы</Label>
            <select
              id="alfabank-amount-format"
              value={settings.amount_format}
              onChange={(e) => onUpdate('amount_format', e.target.value)}
              disabled={!settings.enabled}
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
              value={settings.return_url}
              onChange={(e) => onUpdate('return_url', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alfabank-fail">Fail URL</Label>
            <Input
              id="alfabank-fail"
              value={settings.fail_url}
              onChange={(e) => onUpdate('fail_url', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
        </div>

        {settings.enabled && (
          <div className="flex justify-end gap-2 pt-2">
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
      </CardContent>
    </Card>
  );
};

export default AlfaBankConfig;