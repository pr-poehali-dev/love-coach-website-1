import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { PaymentsSettings } from '@/types/admin';

interface RobokassaConfigProps {
  settings: PaymentsSettings['providers']['robokassa'];
  isActive: boolean;
  testing: boolean;
  onUpdate: (field: string, value: any) => void;
  onSetActive: () => void;
  onTest: () => void;
}

const RobokassaConfig: React.FC<RobokassaConfigProps> = ({
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
              <span className="text-xs font-bold text-red-600">RK</span>
            </div>
            Robokassa
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
            <Label htmlFor="robokassa-login">Merchant Login</Label>
            <Input
              id="robokassa-login"
              value={settings.merchant_login}
              onChange={(e) => onUpdate('merchant_login', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="robokassa-culture">Язык</Label>
            <select
              id="robokassa-culture"
              value={settings.culture}
              onChange={(e) => onUpdate('culture', e.target.value)}
              disabled={!settings.enabled}
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
              value={settings.password1}
              onChange={(e) => onUpdate('password1', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="robokassa-password2">Password 2</Label>
            <Input
              id="robokassa-password2"
              type="password"
              value={settings.password2}
              onChange={(e) => onUpdate('password2', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="robokassa-success">Success URL</Label>
            <Input
              id="robokassa-success"
              value={settings.success_url}
              onChange={(e) => onUpdate('success_url', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="robokassa-fail">Fail URL</Label>
            <Input
              id="robokassa-fail"
              value={settings.fail_url}
              onChange={(e) => onUpdate('fail_url', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="robokassa-test"
              checked={settings.test_mode}
              onCheckedChange={(checked) => onUpdate('test_mode', checked)}
              disabled={!settings.enabled}
            />
            <Label htmlFor="robokassa-test">Тестовый режим</Label>
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

export default RobokassaConfig;