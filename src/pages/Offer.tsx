import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Offer = () => {
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
                Договор публичной оферты
              </CardTitle>
              <p className="text-gray-600">
                О предоставлении немедицинских консультационных услуг
              </p>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
              {/* Общие положения */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    1.1. Настоящий договор является публичной офертой (предложением) Индивидуального предпринимателя 
                    (далее — «ИП», «Исполнитель») заключить договор на оказание немедицинских консультационных услуг 
                    с любым физическим лицом (далее — «Заказчик»).
                  </p>
                  <p>
                    1.2. Исполнитель: Индивидуальный предприниматель [ФИО], 
                    ОГРНИП: [номер ОГРНИП], ИНН: [номер ИНН], 
                    зарегистрированный в соответствии с законодательством Российской Федерации.
                  </p>
                  <p>
                    1.3. Акцептом настоящей оферты является оплата услуг Заказчиком любым из предложенных 
                    на сайте способов.
                  </p>
                </div>
              </section>

              {/* Предмет договора */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">2. Предмет договора</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    2.1. ИП обязуется предоставить Заказчику немедицинские консультационные услуги 
                    общего характера с целью улучшения эмоционального фона и межличностной коммуникации 
                    в рамках коучинговой деятельности.
                  </p>
                  <p>
                    2.2. Услуги включают в себя:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Индивидуальные консультации по вопросам межличностных отношений</li>
                    <li>Парные консультации для улучшения коммуникации</li>
                    <li>Поддержку в формате чата в течение оговоренного периода</li>
                    <li>Обучение навыкам эмоционального интеллекта и осознанности</li>
                  </ul>
                  <p>
                    2.3. <strong>ВАЖНО:</strong> Предоставляемые услуги НЕ ЯВЛЯЮТСЯ медицинскими, 
                    психологическими или психиатрическими. ИП не ставит диагнозы, не занимается лечением 
                    и не требует лицензии на осуществление коучинговой деятельности.
                  </p>
                </div>
              </section>

              {/* Стоимость и порядок оплаты */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">3. Стоимость и порядок оплаты</h2>
                <div className="text-gray-700 space-y-4">
                  <p>3.1. Стоимость услуг указана на сайте и составляет:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Индивидуальная сессия (60 минут) — 3 000 рублей</li>
                    <li>Сессия для пары (90 минут) — 5 000 рублей</li>
                    <li>Поддержка в чате (7 дней) — 4 000 рублей</li>
                  </ul>
                  <p>
                    3.2. Помимо указанных выше фиксированных тарифов, Исполнитель вправе оказывать услуги на условиях индивидуального согласования, оформляемых в рамках гибкого или расширенного формата работы. Стоимость таких услуг определяется индивидуально до начала оказания услуги и подтверждается Заказчиком при самостоятельном внесении согласованной суммы через форму оплаты на сайте.
                  </p>
                  <p>
                    3.3. Согласование условий и стоимости таких услуг может происходить посредством электронной переписки (email, мессенджеры, чат на сайте и иные средства связи). Согласованная сумма считается подтверждённой после её оплаты.
                  </p>
                  <p>
                    3.4. Оплата производится предварительно через платёжную систему ЮKassa с использованием банковских карт.
                    В соответствии с Федеральным законом №54-ФЗ Заказчику направляется электронный чек.
                  </p>
                  <p>
                    3.5. Услуга считается оказанной с момента проведения консультации или предоставления доступа к чату.
                    При невозможности связаться с Заказчиком в течение 7 дней услуга считается оказанной.
                  </p>
                </div>
              </section>

              {/* Права и обязанности сторон */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">4. Права и обязанности сторон</h2>
                <div className="text-gray-700 space-y-4">
                  <p><strong>4.1. Исполнитель обязуется:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Предоставить услуги в полном объёме и в согласованные сроки</li>
                    <li>Соблюдать конфиденциальность полученной информации</li>
                    <li>Связаться с Заказчиком в течение 24 часов после оплаты</li>
                  </ul>
                  <p><strong>4.2. Заказчик обязуется:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Предоставить достоверную контактную информацию</li>
                    <li>Своевременно являться на назначенные сессии</li>
                    <li>Понимать немедицинский характер предоставляемых услуг</li>
                  </ul>
                </div>
              </section>

              {/* Возврат средств */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">5. Возврат средств</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    5.1. Возврат денежных средств возможен в течение 14 дней с момента оплаты, 
                    если услуга ещё не была оказана.
                  </p>
                  <p>
                    5.2. Для возврата необходимо направить письменное заявление на адрес: hello@workstab.com
                  </p>
                  <p>
                    5.3. Возврат осуществляется в течение 10 рабочих дней на тот же способ оплаты.
                  </p>
                </div>
              </section>

              {/* Конфиденциальность */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">6. Конфиденциальность</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    6.1. Исполнитель гарантирует конфиденциальность всей информации, 
                    полученной в ходе оказания услуг.
                  </p>
                  <p>
                    6.2. Персональные данные обрабатываются в соответствии с Федеральным законом 
                    №152-ФЗ «О персональных данных».
                  </p>
                </div>
              </section>

              {/* Ответственность */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">7. Ответственность</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    7.1. Исполнитель не несёт ответственности за результаты применения полученных рекомендаций.
                  </p>
                  <p>
                    7.2. Заказчик понимает и соглашается с тем, что результат консультаций зависит 
                    от его личных усилий и готовности к изменениям.
                  </p>
                </div>
              </section>

              {/* Заключительные положения */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">8. Заключительные положения</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    8.1. Настоящий договор вступает в силу с момента акцепта оферты (оплаты).
                  </p>
                  <p>
                    8.2. Споры разрешаются путём переговоров, при недостижении согласия — 
                    в судебном порядке по месту регистрации Исполнителя.
                  </p>
                  <p>
                    8.3. Контактная информация ИП: email: hello@workstab.com, телефон: +7 (999) 123-45-67, 
                    адрес: [юридический адрес ИП]
                  </p>
                </div>
              </section>

              {/* Дата */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Дата публикации: 03 августа 2024 года
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Offer;