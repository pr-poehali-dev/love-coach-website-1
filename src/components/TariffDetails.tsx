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
    },
    custom: {
      title: "Расширенный план",
      price: "По согласованию",
      duration: "Индивидуально",
      description: "Формат для нестандартных задач, требующих индивидуального подхода",
      benefits: [
        "Полностью персонализированный подход",
        "Гибкие условия работы",
        "Личные встречи при необходимости",
        "Поддержка в любое время суток",
        "Нестандартные форматы взаимодействия",
        "Индивидуальная длительность сессий"
      ],
      process: "Подходит для ситуаций, не укладывающихся в рамки стандартных пакетов. Финальная стоимость и формат работы определяются по договорённости после предварительной консультации. Например: личные встречи с коучем, круглосуточная поддержка, специальные программы работы.",
      icon: "Settings"
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
      <DialogContent className="max-w-2xl h-screen sm:h-auto sm:max-h-[95vh] overflow-y-auto w-screen sm:w-full mx-0 sm:mx-auto p-4 sm:p-6 sm:rounded-lg rounded-none">
        <DialogHeader>
          <DialogTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 bg-primary/10 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
              <Icon name={currentTariff.icon as any} className="h-4 w-4 xs:h-6 xs:w-6 text-primary" />
            </div>
            {currentTariff.title}
          </DialogTitle>
          <DialogDescription className="text-xs xs:text-sm sm:text-base text-gray-600">
            {currentTariff.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 xs:space-y-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 xs:p-4 bg-primary/5 rounded-lg gap-2 xs:gap-3">
            <div>
              <div className="text-xl xs:text-2xl font-bold text-primary">{currentTariff.price}</div>
              <div className="text-xs xs:text-sm text-gray-600">{currentTariff.duration}</div>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm xs:text-base px-3 xs:px-4 py-2 xs:py-3"
              >
                <Icon name="Calendar" className="mr-2 h-5 w-5" />
                Записаться
              </Button>
            )}
          </div>

          {!showForm ? (
            <div className="space-y-4 xs:space-y-6">
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-2 xs:mb-3">Что входит:</h3>
                <ul className="space-y-2">
                  {currentTariff.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-700 text-sm xs:text-base">
                      <Icon name="Check" className="h-4 w-4 xs:h-5 xs:w-5 text-green-500 mr-2 xs:mr-3 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-2 xs:mb-3">Как проходит:</h3>
                <p className="text-gray-700 leading-relaxed text-sm xs:text-base">{currentTariff.process}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 xs:gap-3">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 min-h-[48px] xs:min-h-[56px] sm:min-h-[48px] py-3 xs:py-4 text-sm xs:text-base"
                  size="lg"
                >
                  <Icon name="Calendar" className="mr-1 xs:mr-2 h-4 w-4 xs:h-5 xs:w-5" />
                  Записаться на сессию
                </Button>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px] xs:min-h-[56px] sm:min-h-[48px] py-3 xs:py-4 text-sm xs:text-base"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h3 className="text-base xs:text-lg font-semibold text-gray-900">Записаться на сессию</h3>
                <Button 
                  onClick={() => setShowForm(false)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="ArrowLeft" className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" />
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