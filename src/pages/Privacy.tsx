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
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    1.1. Настоящая Политика конфиденциальности (далее — «Политика») разработана в соответствии 
                    с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных» (далее — «152-ФЗ»).
                  </p>
                  <p>
                    1.2. Политика определяет порядок обработки и защиты персональных данных пользователей 
                    сайта workstab.com (далее — «Сайт»).
                  </p>
                  <p>
                    1.3. Оператор персональных данных — Индивидуальный предприниматель [ФИО], 
                    ОГРНИП [номер], ИНН [номер], самостоятельно организующий и (или) осуществляющий 
                    обработку персональных данных, а также определяющий цели обработки, состав 
                    персональных данных и совершаемые с ними действия.
                  </p>
                  <p>
                    1.4. Используя Сайт, пользователь подтверждает, что ознакомился с настоящей Политикой 
                    и дает согласие на обработку своих персональных данных на изложенных ниже условиях.
                  </p>
                </div>
              </section>

              {/* Категории данных */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">2. Категории обрабатываемых персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>2.1. Оператор обрабатывает следующие данные:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>фамилия, имя, отчество;</li>
                    <li>адрес электронной почты;</li>
                    <li>номер телефона;</li>
                    <li>информация о семейном положении и отношениях (предоставляется добровольно);</li>
                    <li>технические данные: IP-адрес, тип браузера, дата и время посещения, cookie-файлы.</li>
                  </ul>
                  <p>
                    2.2. Оператор не обрабатывает специальные категории данных (раса, национальность, 
                    политические взгляды, религия, здоровье и т. д.).
                  </p>
                </div>
              </section>

              {/* Цели обработки */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">3. Цели обработки данных</h2>
                <div className="text-gray-700 space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>предоставление консультационных услуг;</li>
                    <li>связь с пользователем для координации сессий;</li>
                    <li>обработка платежей;</li>
                    <li>ответы на обращения через форму обратной связи;</li>
                    <li>улучшение качества сервиса и аналитика работы Сайта;</li>
                    <li>выполнение требований законодательства РФ.</li>
                  </ul>
                </div>
              </section>

              {/* Правовые основания */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">4. Правовые основания</h2>
                <div className="text-gray-700 space-y-4">
                  <p>4.1. Обработка осуществляется на основании подп. 1, 5, 6, 7 ч. 1 ст. 6 152-ФЗ, а именно:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>согласия субъекта персональных данных;</li>
                    <li>необходимости исполнения договора оказания услуг;</li>
                    <li>необходимости выполнения обязанностей Оператора, установленных законом;</li>
                    <li>осуществления предпринимательской деятельности.</li>
                  </ul>
                </div>
              </section>

              {/* Способы и сроки */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">5. Способы и сроки обработки</h2>
                <div className="text-gray-700 space-y-4">
                  <p>5.1. Обработка ведётся с использованием средств автоматизации и/или без них.</p>
                  <p>5.2. Данные хранятся до:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>окончания действия договора;</li>
                    <li>истечения 3 лет после завершения договорных отношений (для отчётности);</li>
                    <li>получения Оператором отзыва согласия, если дальнейшее хранение не требуется по закону.</li>
                  </ul>
                </div>
              </section>

              {/* Передача третьим лицам */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">6. Передача данных третьим лицам</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    6.1. Персональные данные не передаются третьим лицам, кроме случаев, 
                    предусмотренных законодательством РФ.
                  </p>
                  <p>6.2. Исключения (передача только в объёме, необходимом для выполнения функций):</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>платёжная система ЮKassa — обработка платежей;</li>
                    <li>хостинг-провайдер — техническое обслуживание Сайта;</li>
                    <li>уполномоченные государственные органы — при законном запросе.</li>
                  </ul>
                </div>
              </section>

              {/* Защита данных */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">7. Защита персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>Оператор применяет меры, соответствующие ст. 19 152-ФЗ и Постановлению Правительства РФ № 1119:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>шифрование соединений (SSL);</li>
                    <li>разграничение прав доступа;</li>
                    <li>регулярные обновления систем безопасности;</li>
                    <li>контроль действий сотрудников;</li>
                    <li>ведение журналов доступа.</li>
                  </ul>
                </div>
              </section>

              {/* Права субъектов */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">8. Права субъектов персональных данных</h2>
                <div className="text-gray-700 space-y-4">
                  <p>8.1. Пользователь вправе:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>получать информацию об обработке своих данных;</li>
                    <li>требовать уточнения, блокирования или уничтожения данных;</li>
                    <li>отзывать согласие на обработку;</li>
                    <li>обращаться в Роскомнадзор по защите прав субъектов ПД;</li>
                    <li>получать ответ Оператора в течение 30 календарных дней с даты поступления запроса.</li>
                  </ul>
                  <p>8.2. Для реализации прав направьте запрос на hello@workstab.com.</p>
                </div>
              </section>

              {/* Cookie */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">9. Файлы cookie</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    9.1. Сайт использует cookie, в том числе для аналитики (Яндекс Метрика, Google Analytics) 
                    и улучшения UX.
                  </p>
                  <p>
                    9.2. Пользователь может отключить cookie в браузере, но это может снизить 
                    функциональность Сайта.
                  </p>
                </div>
              </section>

              {/* Изменения */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">10. Изменения Политики</h2>
                <div className="text-gray-700 space-y-4">
                  <p>10.1. Оператор вправе изменять Политику.</p>
                  <p>10.2. Обновлённая версия публикуется на Сайте по адресу https://workstab.com/privacy.</p>
                </div>
              </section>

              {/* Контакты */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">11. Контакты</h2>
                <div className="text-gray-700 space-y-4">
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
                  Дата вступления в силу: 03 августа 2025 года
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Последнее обновление: 03 августа 2025 года
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