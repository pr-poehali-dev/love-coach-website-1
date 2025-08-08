import { Helmet } from 'react-helmet';
import { YookassaSettings } from '@/components/YookassaSettings';

const YookassaAdmin = () => {
  return (
    <>
      <Helmet>
        <title>Настройки ЮКассы</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Настройки ЮКассы</h1>
            <p className="text-gray-600">
              Введите данные из личного кабинета ЮКассы для приема платежей
            </p>
          </div>
          
          <YookassaSettings />
          
          <div className="mt-8 space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Важно о безопасности:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ключи хранятся зашифрованно в браузере</li>
                <li>• Для продакшена нужен сервер-прокси</li>
                <li>• Не делитесь секретными ключами</li>
                <li>• Используйте тестовый режим для проверки</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Где взять ключи ЮКассы:</h3>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Зайдите в личный кабинет ЮКассы</li>
                <li>2. Перейдите в раздел "Интеграция" → "API"</li>
                <li>3. Найдите Shop ID (идентификатор магазина)</li>
                <li>4. Скопируйте Secret Key (секретный ключ)</li>
                <li>5. Вставьте их в форму выше</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YookassaAdmin;