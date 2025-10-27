import { Zap, Database, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Zap,
    title: "Automações Inteligentes",
    description:
      "Reduza até 70% do tempo gasto em tarefas repetitivas com automações personalizadas. Integre WhatsApp, email, CRM e muito mais com ou sem inteligência artificial.",
    features: [
      "Automação de WhatsApp",
      "Integração com IA",
      "Fluxos personalizados",
      "Relatórios automáticos",
    ],
  },
  {
    icon: Database,
    title: "Gestão de Dados",
    description:
      "Organize, estruture e gerencie seus dados em planilhas avançadas ou bancos SQL. Tenha controle total sobre as informações do seu negócio.",
    features: [
      "Planilhas inteligentes",
      "Banco de dados SQL",
      "Dashboards visuais",
      "Backups automáticos",
    ],
  },
  {
    icon: Globe,
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas otimizadas para capturar leads e impulsionar suas vendas. Design profissional, rápidas e prontas para converter visitantes em clientes.",
    features: [
      "Design responsivo",
      "SEO otimizado",
      "Formulários inteligentes",
      "Analytics integrado",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground">
            Soluções completas para transformar seu negócio digitalmente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card-glass hover:scale-105 transition-all duration-300 hover:shadow-red-glow"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-border/50">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
