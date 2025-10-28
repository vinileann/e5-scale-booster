import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { DiagnosisSection } from "@/components/DiagnosisSection";
import { ServicesSection } from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

const Index = () => {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onOpenLeadModal={() => setLeadModalOpen(true)} />
      <HeroSection onOpenLeadModal={() => setLeadModalOpen(true)} />
      
      <div id="beneficios">
        <BenefitsSection />
      </div>
      
      <div id="calculadora">
        <SavingsCalculator onOpenLeadModal={() => setLeadModalOpen(true)} />
      </div>
      
      <div id="diagnostico">
        <DiagnosisSection onOpenLeadModal={() => setLeadModalOpen(true)} />
      </div>
      
      <div id="servicos">
        <ServicesSection />
      </div>
      
      <Footer onOpenLeadModal={() => setLeadModalOpen(true)} />
      
      <LeadCaptureModal 
        open={leadModalOpen} 
        onOpenChange={setLeadModalOpen} 
      />
    </div>
  );
};

export default Index;
