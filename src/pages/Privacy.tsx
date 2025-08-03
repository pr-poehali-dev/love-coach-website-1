import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="h-8 w-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Workstab.com</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Политика конфиденциальности
              </CardTitle>
              <p className="text-gray-600">
                Обработка и защита персональных данных
              </p>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
              {/* Общие положения */}
              <section>
                <h2 className="text-xl md:text-xl md:text-2xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    1.1. Настоящая Политика конфиденциальности (далее — «Политика») разработана 
                    в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».
                  </p>
                  <p>
                    1.2. Политика определяет порядок обработки персональных данных пользователей 
                    сайта workstab.com (далее — «Сайт»).
                  </p>
                  <p>
                    1.3. Оператор персональных данных: Индивидуальный предприниматель [ФИО], 
                    ОГРНИП: [номер ОГРНИП], ИНН: [номер ИНН].
                  </p>
                  <p>
                    1.4. Использование Сайта означает согласие пользователя с настоящей Политикой 
                    и условиями обработки его персональных данных.
                  </p>
                </div>
              </section>

              {/* Виды обрабатываемых данных */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">2. Виды обрабатываемых персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>2.1. Мы обрабатываем следующие категории персональных данных:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Фамилия, имя, отчество</li>
                    <li>Адрес электронной почты</li>
                    <li>Номер телефона</li>
                    <li>Информация о семейном положении и отношениях (предоставляется добровольно)</li>
                    <li>Техническая информация: IP-адрес, данные браузера, время посещения</li>
                  </ul>
                  <p>
                    2.2. Мы НЕ собираем и НЕ обрабатываем специальные категории персональных данных, 
                    касающиеся расовой, национальной принадлежности, политических взглядов, 
                    религиозных убеждений, состояния здоровья.
                  </p>
                </div>
              </section>

              {/* Цели обработки */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">3. Цели обработки персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>3.1. Персональные данные обрабатываются в следующих целях:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Предоставление консультационных услуг</li>
                    <li>Связь с пользователем для координации сессий</li>
                    <li>Обработка платежей</li>
                    <li>Ответы на обращения через форму обратной связи</li>
                    <li>Улучшение качества предоставляемых услуг</li>
                    <li>Соблюдение требований законодательства РФ</li>
                  </ul>
                </div>
              </section>

              {/* Правовые основания */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">4. Правовые основания обработки</h2>
                <div className="text-gray-700 space-y-4">
                  <p>4.1. Обработка персональных данных ИП осуществляется на основании:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Согласия субъекта персональных данных (ст. 6 ФЗ-152)</li>
                    <li>Необходимости исполнения договора на оказание услуг (ст. 6 ФЗ-152)</li>
                    <li>Необходимости соблюдения правовых обязательств ИП</li>
                    <li>Осуществления предпринимательской деятельности</li>
                  </ul>
                </div>
              </section>

              {/* Способы обработки */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">5. Способы и сроки обработки</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    5.1. Обработка персональных данных осуществляется с использованием 
                    средств автоматизации и без использования таких средств.
                  </p>
                  <p>5.2. Персональные данные хранятся в течение:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Срока действия договора на оказание услуг</li>
                    <li>3 лет после окончания договорных отношений (для целей ведения отчётности)</li>
                    <li>До получения запроса на удаление от субъекта персональных данных</li>
                  </ul>
                </div>
              </section>

              {/* Передача третьим лицам */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">6. Передача персональных данных третьим лицам</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    6.1. Персональные данные НЕ передаются третьим лицам, за исключением случаев, 
                    предусмотренных законодательством РФ.
                  </p>
                  <p>6.2. Исключения составляют:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Платёжная система ЮKassa (для обработки платежей)</li>
                    <li>Хостинг-провайдер (для технического обеспечения работы сайта)</li>
                    <li>Государственные органы (при наличии законного требования)</li>
                  </ul>
                </div>
              </section>

              {/* Защита данных */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">7. Защита персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>7.1. Мы применяем следующие меры защиты:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Шифрование данных при передаче (SSL-сертификат)</li>
                    <li>Ограничение доступа к персональным данным</li>
                    <li>Регулярное обновление систем безопасности</li>
                    <li>Контроль за действиями сотрудников</li>
                  </ul>
                </div>
              </section>

              {/* Права субъектов */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">8. Права субъектов персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>8.1. Вы имеете право:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Получать информацию об обработке ваших персональных данных</li>
                    <li>Требовать уточнения, блокирования или уничтожения данных</li>
                    <li>Отзывать согласие на обработку персональных данных</li>
                    <li>Обращаться в уполномоченный орган по защите прав субъектов персональных данных</li>
                  </ul>
                  <p>
                    8.2. Для реализации своих прав обращайтесь по адресу: hello@workstab.com
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">9. Использование файлов cookie</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    9.1. Сайт использует файлы cookie для улучшения пользовательского опыта.
                  </p>
                  <p>
                    9.2. Вы можете настроить браузер для блокировки cookie, однако это может 
                    ограничить функциональность сайта.
                  </p>
                </div>
              </section>

              {/* Изменения политики */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">10. Изменения в Политике</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    10.1. Мы оставляем за собой право вносить изменения в настоящую Политику.
                  </p>
                  <p>
                    10.2. Об изменениях будет сообщено путём размещения новой версии на сайте.
                  </p>
                </div>
              </section>

              {/* Контакты */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">11. Контактная информация</h2>
                <div className="text-gray-700 space-y-4">
                  <p>11.1. По вопросам обработки персональных данных обращайтесь:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: hello@workstab.com</li>
                    <li>Телефон: +7 (999) 123-45-67</li>
                    <li>Telegram: @workstab_support</li>
                  </ul>
                </div>
              </section>

              {/* Дата */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Дата вступления в силу: 03 августа 2024 года
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Последнее обновление: 03 августа 2024 года
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;