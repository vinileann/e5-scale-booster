import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Video, Search, FileText, Gift } from "lucide-react";

interface DiagnosisSectionProps {
  onOpenLeadModal: () => void;
}

export function DiagnosisSection({ onOpenLeadModal }: DiagnosisSectionProps) {
  const steps = [
    {
      icon: Calendar,
      number: "1",
      title: "Agende sua Reunião",
      description: "Preencha o formulário abaixo e nossa equipe entrará em contato em até 24h para agendar sua call de diagnóstico",
    },
    {
      icon: Video,
      number: "2",
      title: "Diagnóstico Personalizado (30-45 min)",
      description: "Conversamos com você para entender seu negócio, processos atuais e dores específicas. Sem enrolação, sem compromisso.",
    },
    {
      icon: Search,
      number: "3",
      title: "Receba o Diagnóstico",
      description: "Identificamos oportunidades de automação, organização de dados e uso de IA específicas para seu negócio",
    },
    {
      icon: FileText,
      number: "4",
      title: "Proposta Sob Medida",
      description: "Apresentamos um escopo detalhado, prazos e investimento. Você decide se quer seguir em frente. Simples assim.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Seu Negócio Merece um Diagnóstico Digital Gratuito
          </h2>
          <p className="text-xl text-muted-foreground">
            Entenda exatamente onde a tecnologia pode impulsionar seus resultados
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line - hidden on mobile, shown on larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
                  )}
                  
                  <Card className="relative z-10 p-6 bg-card-glass border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Number Badge */}
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free Diagnosis Highlight */}
        <div className="max-w-3xl mx-auto mb-8">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  O Diagnóstico é 100% Gratuito
                </h3>
                <p className="text-lg text-muted-foreground">
                  Não cobramos nada pela análise. O escopo e orçamento só vêm depois que você entender o valor que podemos entregar.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="cta"
            size="xl"
            onClick={onOpenLeadModal}
            className="shadow-red-glow animate-glow"
          >
            Quero Meu Diagnóstico Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
