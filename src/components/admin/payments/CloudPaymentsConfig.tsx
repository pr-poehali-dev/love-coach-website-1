import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { PaymentsSettings } from '@/types/admin';

interface CloudPaymentsConfigProps {
  settings: PaymentsSettings['providers']['cloudpayments'];
  isActive: boolean;
  testing: boolean;
  onUpdate: (field: string, value: any) => void;
  onSetActive: () => void;
  onTest: () => void;
}

const CloudPaymentsConfig: React.FC<CloudPaymentsConfigProps> = ({
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
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">CP</span>
            </div>
            CloudPayments
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
          <Label htmlFor="cloudpayments-public-id">Public ID</Label>
          <Input
            id="cloudpayments-public-id"
            value={settings.public_id}
            onChange={(e) => onUpdate('public_id', e.target.value)}
            disabled={!settings.enabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cloudpayments-secret">API Secret</Label>
          <Input
            id="cloudpayments-secret"
            type="password"
            value={settings.api_secret}
            onChange={(e) => onUpdate('api_secret', e.target.value)}
            disabled={!settings.enabled}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cloudpayments-success">Success URL</Label>
            <Input
              id="cloudpayments-success"
              value={settings.success_url}
              onChange={(e) => onUpdate('success_url', e.target.value)}
              disabled={!settings.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cloudpayments-fail">Fail URL</Label>
            <Input
              id="cloudpayments-fail"
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

export default CloudPaymentsConfig;