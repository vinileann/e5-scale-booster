import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-automation.jpg";

interface HeroSectionProps {
  onOpenLeadModal: () => void;
}

export function HeroSection({ onOpenLeadModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Digital Automation"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-foreground">Automatize.</span>{" "}
            <span className="text-foreground">Escale.</span>{" "}
            <span className="text-primary">Cresça.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluções digitais inteligentes para impulsionar seu negócio com automação,
            dados organizados, páginas de alta conversão e IA's assistentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="hero"
              size="xl"
              onClick={onOpenLeadModal}
              className="group"
            >
              Quero Escalar Meu Negócio
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto pt-12 border-t border-border/50">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-primary">70%</p>
              <p className="text-sm text-muted-foreground">Menos Tempo em Tarefas</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Automação Ativa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
