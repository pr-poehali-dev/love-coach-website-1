import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Refund = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="h-8 w-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Workstab.com</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Политика возврата средств
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="RotateCcw" className="mr-3 h-6 w-6 text-primary" />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Настоящая политика возврата средств регулирует порядок возврата денежных средств 
                за услуги психологического консультирования, предоставляемые ИП Иванов Иван Иванович.
              </p>
              <p className="text-gray-700">
                Мы стремимся обеспечить высокое качество услуг и готовы рассмотреть вопросы возврата 
                в соответствии с данной политикой.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="CheckCircle" className="mr-3 h-6 w-6 text-primary" />
                Условия возврата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Возврат возможен в следующих случаях:</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Отмена сессии специалистом менее чем за 24 часа до начала</li>
                  <li>• Технические проблемы на нашей стороне, препятствующие проведению онлайн-сессии</li>
                  <li>• Неоказание услуги по вине исполнителя</li>
                  <li>• Обоснованные претензии к качеству оказанной услуги</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Возврат НЕ производится в случаях:</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Отмена сессии клиентом менее чем за 24 часа до начала</li>
                  <li>• Неявка клиента на запланированную сессию без предварительного уведомления</li>
                  <li>• Технические проблемы на стороне клиента</li>
                  <li>• Субъективное несоответствие ожиданиям клиента при качественно оказанной услуге</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Clock" className="mr-3 h-6 w-6 text-primary" />
                Сроки и порядок возврата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Сроки подачи заявления:</h3>
                <p className="text-gray-700">
                  Заявление на возврат средств должно быть подано в течение 7 календарных дней 
                  с момента оказания услуги или с момента, когда услуга должна была быть оказана.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Порядок подачи заявления:</h3>
                <ol className="text-gray-700 space-y-2">
                  <li>1. Направить письменное заявление на email: info@workstab.com</li>
                  <li>2. Указать причину возврата и приложить документы (при необходимости)</li>
                  <li>3. Дождаться рассмотрения заявления в течение 3 рабочих дней</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Сроки возврата:</h3>
                <p className="text-gray-700">
                  При положительном решении возврат средств осуществляется в течение 10 рабочих дней 
                  на банковскую карту или счет, с которого была произведена оплата.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="CreditCard" className="mr-3 h-6 w-6 text-primary" />
                Способы возврата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Возврат денежных средств производится тем же способом, которым была произведена оплата:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• При оплате банковской картой - возврат на карту</li>
                <li>• При оплате через электронные кошельки - возврат на кошелек</li>
                <li>• При оплате через банковский перевод - возврат на указанный счет</li>
              </ul>
              <p className="text-gray-700 text-sm mt-4">
                Комиссия платежной системы за возврат может быть удержана в соответствии 
                с тарифами платежного провайдера.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Phone" className="mr-3 h-6 w-6 text-primary" />
                Контакты для вопросов по возврату
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-700">
                  <strong>Email:</strong> info@workstab.com<br />
                  <strong>Телефон:</strong> +7 (999) 123-45-67<br />
                  <strong>Время работы:</strong> Пн-Пт 9:00-21:00, Сб-Вс 10:00-18:00
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <Icon name="Info" className="inline mr-2 h-4 w-4" />
                  Мы рекомендуем обращаться к нам для решения спорных вопросов 
                  до подачи официального заявления на возврат.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="FileText" className="mr-3 h-6 w-6 text-primary" />
                Дополнительная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Данная политика возврата является частью публичной оферты и действует 
                для всех клиентов, пользующихся нашими услугами.
              </p>
              <p className="text-gray-700">
                Все спорные вопросы, не урегулированные данной политикой, решаются в соответствии 
                с действующим законодательством Российской Федерации.
              </p>
              <div className="pt-4">
                <p className="text-gray-600 text-sm">
                  Дата последнего обновления: 03.08.2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Refund;