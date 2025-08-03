import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import ContactForm from "@/components/ContactForm";

interface TariffDetailsProps {
  tariff: string | null;
  isOpen: boolean;
  onClose: () => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  setShowContactForm: (show: boolean) => void;
}

const TariffDetails = ({ tariff, isOpen, onClose, showForm, setShowForm, setShowContactForm }: TariffDetailsProps) => {
  const tariffData = {
    individual: {
      title: "Индивидуальная сессия",
      price: "3 000 ₽",
      duration: "60 минут",
      description: "Персональная работа с коучем один на один",
      benefits: [
        "Глубокая проработка личных проблем",
        "Индивидуальный подход",
        "Конфиденциальность",
        "Гибкий график",
        "Быстрые результаты"
      ],
      process: "Работаем с вашими внутренними блоками, помогаем найти причины проблем в отношениях и разработать стратегию их решения.",
      icon: "User"
    },
    couple: {
      title: "Сессия для пары",
      price: "5 000 ₽",
      duration: "90 минут",
      description: "Совместная работа над отношениями",
      benefits: [
        "Улучшение коммуникации",
        "Разрешение конфликтов",
        "Восстановление близости",
        "Общие цели",
        "Крепкие отношения"
      ],
      process: "Работаем с парой, учим эффективному общению, помогаем найти компромиссы и восстановить эмоциональную связь.",
      icon: "Users"
    },
    support: {
      title: "Поддержка 7 дней",
      price: "4 000 ₽",
      duration: "Неделя поддержки",
      description: "Круглосуточная поддержка в чате",
      benefits: [
        "Постоянная поддержка",
        "Быстрые ответы",
        "Экстренная помощь",
        "Доступность",
        "Практические советы"
      ],
      process: "Получаете доступ к личному чату с коучем на неделю. Отвечаем на вопросы, даём советы и поддерживаем в трудные моменты.",
      icon: "MessageSquare"
    }
  };

  const currentTariff = tariff ? tariffData[tariff as keyof typeof tariffData] : null;

  const handleBooking = () => {
    setShowForm(false);
    setShowContactForm(true);
    onClose();
  };

  if (!currentTariff) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <Icon name={currentTariff.icon as any} className="h-6 w-6 text-primary" />
            </div>
            {currentTariff.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            {currentTariff.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div>
              <div className="text-2xl font-bold text-primary">{currentTariff.price}</div>
              <div className="text-sm text-gray-600">{currentTariff.duration}</div>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Calendar" className="mr-2 h-5 w-5" />
                Записаться
              </Button>
            )}
          </div>

          {!showForm ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Что входит:</h3>
                <ul className="space-y-2">
                  {currentTariff.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Как проходит:</h3>
                <p className="text-gray-700 leading-relaxed">{currentTariff.process}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-2 h-5 w-5" />
                  Записаться на сессию
                </Button>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Записаться на сессию</h3>
                <Button 
                  onClick={() => setShowForm(false)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                  Назад
                </Button>
              </div>
              <ContactForm />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TariffDetails;