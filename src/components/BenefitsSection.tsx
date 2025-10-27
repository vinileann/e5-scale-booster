import { Clock, TrendingUp, Database, Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    icon: Clock,
    title: "Economize até 70% do Tempo",
    description: "Automatize tarefas repetitivas e libere sua equipe para o que realmente importa",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Aumente sua Receita",
    description: "Capture mais leads e converta mais clientes com landing pages otimizadas",
    color: "text-primary",
  },
  {
    icon: Database,
    title: "Organize seus Dados",
    description: "Tenha controle total das informações do seu negócio em um só lugar",
    color: "text-primary",
  },
  {
    icon: Bot,
    title: "Inteligência Artificial",
    description: "Faça o diagnóstico do seu negócio e entenda onde a IA pode fazer a diferença",
    color: "text-primary",
  },
];

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Como Soluções Digitais Impulsionam Seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground">
            Transforme processos manuais em sistemas automatizados e inteligentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-card-glass rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-red-glow ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  <div className={`${benefit.color} w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
