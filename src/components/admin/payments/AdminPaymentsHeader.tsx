import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminPaymentsHeaderProps {
  onSave: () => void;
  onLogout: () => void;
  saving: boolean;
}

const AdminPaymentsHeader: React.FC<AdminPaymentsHeaderProps> = ({
  onSave,
  onLogout,
  saving,
}) => {
  return (
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
              onClick={onSave}
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
            <Button variant="outline" size="sm" onClick={onLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentsHeader;