import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      id: "item-1",
      question: "Как проходят сессии?",
      answer: "Сессии проходят онлайн в удобное для вас время. Мы используем безопасные платформы для видеозвонков. Каждая сессия структурирована и направлена на достижение конкретных целей."
    },
    {
      id: "item-2",
      question: "Сколько нужно сессий?",
      answer: "Количество сессий зависит от сложности ситуации. Обычно первые результаты видны уже после 2-3 встреч, полная проработка может занять 5-10 сессий."
    },
    {
      id: "item-3",
      question: "Гарантируете ли вы результат?",
      answer: "Мы гарантируем профессиональный подход и качественную работу. Результат зависит от вашего желания работать над отношениями и применять полученные инструменты."
    },
    {
      id: "item-4",
      question: "Можно ли работать только с одним партнёром?",
      answer: "Да, можно работать и индивидуально. Даже работа с одним партнёром может значительно улучшить отношения, так как меняется модель поведения и коммуникации."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
          <p className="text-xl text-gray-600">Ответы на самые популярные вопросы</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;