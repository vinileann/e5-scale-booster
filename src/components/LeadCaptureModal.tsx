import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  businessName: string;
  phone: string;
  email: string;
  segment: string;
  customSegment: string;
}

const businessSegments = [
  "Pet Shop",
  "Clínica de Estética",
  "Clínica de Odontologia",
  "Escritório de Advocacia",
  "Outro",
];

export function LeadCaptureModal({ open, onOpenChange }: LeadCaptureModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    phone: "",
    email: "",
    segment: "",
    customSegment: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Nome do negócio é obrigatório";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.segment) {
      newErrors.segment = "Segmento é obrigatório";
    }

    if (formData.segment === "Outro" && !formData.customSegment.trim()) {
      newErrors.customSegment = "Por favor, especifique o segmento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert([
        {
          nome: formData.businessName,
          telefone: formData.phone,
          email: formData.email,
          segmento: formData.segment === "Outro" ? formData.customSegment : formData.segment,
          aceite_lgpd: true,
        },
      ]);

      if (error) throw error;

      toast.success("Proposta Enviada! 🎉", {
        description: "Nossa equipe entrará em contato em até 24h para agendar seu diagnóstico gratuito.",
      });

      // Reset form
      setFormData({
        businessName: "",
        phone: "",
        email: "",
        segment: "",
        customSegment: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Erro ao enviar", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Receba sua Proposta Personalizada
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados e nossa equipe entrará em contato em até 24h para agendar seu diagnóstico gratuito
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Nome do Negócio ou Pessoa</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => {
                setFormData({ ...formData, businessName: e.target.value });
                setErrors({ ...errors, businessName: "" });
              }}
              className={errors.businessName ? "border-destructive" : ""}
              placeholder="Ex: Clínica Sorrir Bem"
            />
            {errors.businessName && (
              <p className="text-sm text-destructive">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone de Contato</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setFormData({ ...formData, phone: formatted });
                setErrors({ ...errors, phone: "" });
              }}
              className={errors.phone ? "border-destructive" : ""}
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email de Contato</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              className={errors.email ? "border-destructive" : ""}
              placeholder="contato@empresa.com.br"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="segment">Segmento do Negócio</Label>
            <Select
              value={formData.segment}
              onValueChange={(value) => {
                setFormData({ ...formData, segment: value, customSegment: "" });
                setErrors({ ...errors, segment: "", customSegment: "" });
              }}
            >
              <SelectTrigger className={errors.segment ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione seu segmento" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {businessSegments.map((segment) => (
                  <SelectItem key={segment} value={segment}>
                    {segment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.segment && (
              <p className="text-sm text-destructive">{errors.segment}</p>
            )}
          </div>

          {/* Custom Segment Field - Shows when "Outro" is selected */}
          {formData.segment === "Outro" && (
            <div className="space-y-2">
              <Label htmlFor="customSegment">Qual o seu segmento?</Label>
              <Input
                id="customSegment"
                value={formData.customSegment}
                onChange={(e) => {
                  setFormData({ ...formData, customSegment: e.target.value });
                  setErrors({ ...errors, customSegment: "" });
                }}
                className={errors.customSegment ? "border-destructive" : ""}
                placeholder="Digite o segmento do seu negócio"
              />
              {errors.customSegment && (
                <p className="text-sm text-destructive">{errors.customSegment}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar Diagnóstico Gratuito"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
