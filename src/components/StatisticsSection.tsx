import Icon from "@/components/ui/icon";

const StatisticsSection = () => {
  const stats = [
    {
      icon: "Users",
      iconColor: "text-primary",
      bgColor: "bg-primary/20",
      number: "500+",
      label: "Довольных клиентов"
    },
    {
      icon: "Heart",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/20",
      number: "95%",
      label: "Улучшили отношения"
    },
    {
      icon: "Star",
      iconColor: "text-primary",
      bgColor: "bg-primary/20",
      number: "4.9",
      label: "Средняя оценка"
    },
    {
      icon: "Clock",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/20",
      number: "3 года",
      label: "Опыт работы"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                <Icon name={stat.icon as any} className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{stat.number}</div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;