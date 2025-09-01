import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import Icon from '@/components/ui/icon';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Icon name="Settings" size={24} className="text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Админ-панель
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.username}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Платежи */}
          <Link to="/admin/payments">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Платежные системы
                </CardTitle>
                <Icon name="CreditCard" size={24} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  YooKassa, Robokassa, CloudPayments, Альфа-банк
                </p>
                <div className="mt-2 text-sm text-green-600">
                  ● Активный провайдер настроен
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Telegram */}
          <Link to="/admin/integrations/telegram">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Telegram интеграция
                </CardTitle>
                <Icon name="MessageCircle" size={24} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">TG</div>
                <p className="text-xs text-muted-foreground">
                  Уведомления и контактные формы
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  ● Настройка уведомлений
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Статистика */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Система
              </CardTitle>
              <Icon name="Activity" size={24} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">OK</div>
              <p className="text-xs text-muted-foreground">
                Все системы работают нормально
              </p>
              <div className="mt-2 text-sm text-gray-500">
                ● API подключен
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Быстрые действия */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link to="/admin/payments">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Settings" size={16} className="mr-2" />
                Настроить платежи
              </Button>
            </Link>

            <Link to="/admin/integrations/telegram">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Bell" size={16} className="mr-2" />
                Настроить уведомления
              </Button>
            </Link>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.open('/custom-payment', '_blank')}
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Тест оплаты
            </Button>

            <Button variant="outline" className="w-full justify-start" disabled>
              <Icon name="BarChart" size={16} className="mr-2" />
              Аналитика
              <span className="ml-auto text-xs text-gray-400">Скоро</span>
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;