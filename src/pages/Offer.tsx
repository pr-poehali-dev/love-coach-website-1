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
              <Icon name="Heart" className="h-7 w-7 text-primary" style={{ strokeWidth: 2.7 }} />
              <div className="relative">
                <span className="text-2xl font-bold text-gray-900">workstab</span>
                <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
              </div>
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
                    1.1. Настоящий договор является публичной офертой Индивидуального предпринимателя 
                    (далее — «ИП», «Исполнитель») заключить договор на оказание немедицинских 
                    консультационных услуг с любым физическим лицом (далее — «Заказчик») на условиях, 
                    изложенных ниже.
                  </p>
                  <p>
                    1.2. Исполнитель: Индивидуальный предприниматель Симонов Сергей Сергеевич, ОГРНИП 325650000019110, ИНН 650703217742, 
                    зарегистрированный в соответствии с законодательством Российской Федерации.
                  </p>
                  <p>
                    1.3. Акцепт оферты — оплата услуг Заказчиком любым из предложенных на Сайте способов. 
                    С момента оплаты Заказчик считается заключившим договор с Исполнителем на условиях 
                    настоящей оферты.
                  </p>
                </div>
              </section>

              {/* Предмет договора */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">2. Предмет договора</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    2.1. Исполнитель предоставляет Заказчику немедицинские консультационные услуги 
                    общего характера с целью улучшения эмоционального фона и межличностной коммуникации 
                    в рамках коучинговой деятельности.
                  </p>
                  <p>2.2. В услуги входят:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>индивидуальные консультации по вопросам отношений;</li>
                    <li>парные консультации для улучшения коммуникации;</li>
                    <li>поддержка в чате в оговорённый период;</li>
                    <li>обучение навыкам эмоционального интеллекта и осознанности.</li>
                  </ul>
                  <p>
                    2.3. <strong>Важно:</strong> услуги не являются медицинскими, психологическими 
                    или психиатрическими; Исполнитель не ставит диагнозы и не осуществляет лечение.
                  </p>
                </div>
              </section>

              {/* Стоимость и порядок оплаты */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">3. Стоимость и порядок оплаты</h2>
                <div className="text-gray-700 space-y-4">
                  <p>3.1. Стоимость услуг, размещённая на Сайте:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Услуга</th>
                          <th className="border border-gray-300 p-3 text-left">Длительность</th>
                          <th className="border border-gray-300 p-3 text-left">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Индивидуальная сессия</td>
                          <td className="border border-gray-300 p-3">60 мин</td>
                          <td className="border border-gray-300 p-3">3 000 ₽</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Сессия для пары</td>
                          <td className="border border-gray-300 p-3">90 мин</td>
                          <td className="border border-gray-300 p-3">5 000 ₽</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Поддержка в чате</td>
                          <td className="border border-gray-300 p-3">7 дней</td>
                          <td className="border border-gray-300 p-3">4 000 ₽</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Расширенный план</td>
                          <td className="border border-gray-300 p-3">—</td>
                          <td className="border border-gray-300 p-3">стоимость определяется индивидуально</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    3.2. Исполнитель вправе оказывать услуги на индивидуальных условиях в рамках тарифа «Расширенный план». Стоимость такой услуги согласуется сторонами до начала работы и подтверждается Заказчиком самостоятельной оплатой согласованной суммы через форму на Сайте.
                  </p>
                  <p>
                    3.3. Согласование условий и цены происходит в электронной переписке 
                    (email, мессенджеры, чат Сайта). Согласованная сумма считается подтверждённой 
                    в момент её оплаты.
                  </p>
                  <p>
                    3.4. Оплата производится предварительно через платёжную систему ЮKassa банковской картой. 
                    Электронный чек формируется и направляется на email, указанный при оплате, 
                    в соответствии с Федеральным законом № 54-ФЗ.
                  </p>
                  <p>3.5. Услуга считается оказанной:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>для консультаций — с момента проведения сессии;</li>
                    <li>для поддержки в чате — с момента предоставления доступа;</li>
                    <li>при невозможности связаться с Заказчиком в течение 7 дней после оплаты услуга также считается оказанной.</li>
                  </ul>
                </div>
              </section>

              {/* Права и обязанности сторон */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">4. Права и обязанности сторон</h2>
                <div className="text-gray-700 space-y-4">
                  <p><strong>4.1. Исполнитель обязуется:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>предоставить услуги в объёме и сроки, согласованные с Заказчиком;</li>
                    <li>сохранять конфиденциальность полученной информации;</li>
                    <li>связаться с Заказчиком в течение 24 часов после оплаты.</li>
                  </ul>
                  <p><strong>4.2. Заказчик обязуется:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>предоставить достоверные контактные данные;</li>
                    <li>выполнять договорённости о времени сессий;</li>
                    <li>учитывать немедицинский характер услуг.</li>
                  </ul>
                </div>
              </section>

              {/* Возврат средств */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">5. Возврат средств</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    5.1. Заказчик вправе отказаться от услуги и требовать возврат денег в течение 14 дней 
                    с момента оплаты, если услуга ещё не была оказана (ст. 32 Закона РФ «О защите прав потребителей»).
                  </p>
                  <p>
                    5.2. Запрос направляется письменно на hello@workstab.com; возврат производится 
                    тем же способом оплаты в течение 10 рабочих дней.
                  </p>
                </div>
              </section>

              {/* Конфиденциальность */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">6. Конфиденциальность и персональные данные</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    6.1. Исполнитель обеспечивает конфиденциальность всей информации, полученной от Заказчика.
                  </p>
                  <p>
                    6.2. Персональные данные обрабатываются по ФЗ-152 и Политике конфиденциальности 
                    (https://workstab.com/privacy).
                  </p>
                </div>
              </section>

              {/* Ответственность */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">7. Ответственность</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    7.1. Исполнитель не гарантирует конкретного результата; итог зависит от личных усилий Заказчика.
                  </p>
                  <p>
                    7.2. Стороны несут ответственность, предусмотренную законодательством РФ.
                  </p>
                </div>
              </section>

              {/* Заключительные положения */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">8. Заключительные положения</h2>
                <div className="text-gray-700 space-y-4">
                  <p>8.1. Договор вступает в силу с момента акцепта оферты (оплаты).</p>
                  <p>
                    8.2. Споры решаются путём переговоров; при недостижении согласия — в суде 
                    по месту регистрации Исполнителя.
                  </p>
                  <p>8.3. Контакты Исполнителя:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>E-mail: hello@workstab.com</li>
                    <li>Телефон: 89147521875</li>
                  </ul>
                  <p>
                    Актуальная редакция оферты опубликована на{' '}
                    <a href="https://workstab.com/offer" className="text-primary hover:underline">
                      https://workstab.com/offer
                    </a>.
                  </p>
                </div>
              </section>

              {/* Дата */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Дата публикации: 03 августа 2025 года
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

export default Offer;