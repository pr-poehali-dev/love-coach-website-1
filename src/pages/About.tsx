import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const About = () => {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            О компании
          </h1>

          {/* Основная информация */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Building" className="mr-3 h-6 w-6 text-primary" />
                Информация о компании
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Наименование:</h3>
                <p className="text-gray-700">ИП Иванов Иван Иванович</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">ОГРНИП:</h3>
                <p className="text-gray-700">123456789012345</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">ИНН:</h3>
                <p className="text-gray-700">123456789012</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Адрес:</h3>
                <p className="text-gray-700">г. Москва, ул. Примерная, д. 1, кв. 1</p>
              </div>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Phone" className="mr-3 h-6 w-6 text-primary" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Телефон:</h3>
                <p className="text-gray-700">+7 (999) 123-45-67</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email:</h3>
                <p className="text-gray-700">info@workstab.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Время работы:</h3>
                <p className="text-gray-700">Понедельник - Пятница: 9:00 - 21:00<br />
                Суббота - Воскресенье: 10:00 - 18:00</p>
              </div>
            </CardContent>
          </Card>

          {/* О деятельности */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Users" className="mr-3 h-6 w-6 text-primary" />
                О нашей деятельности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Вид деятельности:</h3>
                <p className="text-gray-700">Психологическое консультирование и коучинг</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Специализация:</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Индивидуальное психологическое консультирование</li>
                  <li>• Семейная и парная терапия</li>
                  <li>• Кризисная психологическая помощь</li>
                  <li>• Онлайн консультации</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Опыт работы:</h3>
                <p className="text-gray-700">Более 5 лет в сфере психологического консультирования</p>
              </div>
            </CardContent>
          </Card>

          {/* Образование и квалификация */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="GraduationCap" className="mr-3 h-6 w-6 text-primary" />
                Образование и квалификация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Образование:</h3>
                <p className="text-gray-700">Высшее психологическое образование<br />
                МГУ им. М.В. Ломоносова, факультет психологии</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Дополнительное образование:</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Сертифицированный семейный психолог</li>
                  <li>• Практикующий коуч по работе с парами</li>
                  <li>• Специалист по кризисной психологии</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Документы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="FileText" className="mr-3 h-6 w-6 text-primary" />
                Документы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/offer')}
                  className="flex items-center"
                >
                  <Icon name="FileText" className="mr-2 h-4 w-4" />
                  Публичная оферта
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/privacy')}
                  className="flex items-center"
                >
                  <Icon name="Shield" className="mr-2 h-4 w-4" />
                  Политика конфиденциальности
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/refund')}
                  className="flex items-center"
                >
                  <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
                  Политика возврата
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;