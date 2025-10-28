import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenLeadModal: () => void;
}

export function Header({ onOpenLeadModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              E5
            </span>
            <span className="ml-2 text-sm font-medium hidden sm:inline">
              Digital Scaling
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection("calculadora")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection("diagnostico")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Diagnóstico
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <Button onClick={onOpenLeadModal} variant="cta" size="sm">
              Solicitar Diagnóstico
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("beneficios")}
                className="text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection("calculadora")}
                className="text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Calculadora
              </button>
              <button
                onClick={() => scrollToSection("diagnostico")}
                className="text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Diagnóstico
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Serviços
              </button>
              <Button onClick={onOpenLeadModal} variant="cta" className="w-full">
                Solicitar Diagnóstico
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
