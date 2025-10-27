import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  onOpenLeadModal: () => void;
}

export function Footer({ onOpenLeadModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hero-gradient border-t border-border/50">
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 border-b border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pronto para Escalar seu Negócio?
          </h2>
          <p className="text-xl text-muted-foreground">
            Fale com nossa equipe e descubra como podemos ajudar
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={onOpenLeadModal}
          >
            Solicitar Proposta
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-primary">E5</span>{" "}
              <span className="text-foreground">Digital Scaling</span>
            </h3>
            <p className="text-muted-foreground">
              Escale seu negócio com soluções digitais inteligentes
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beneficios" className="text-muted-foreground hover:text-primary transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#calculadora" className="text-muted-foreground hover:text-primary transition-colors">
                  Calculadora
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenLeadModal}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>contato@e5digital.com.br</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} E5 Digital Scaling. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
