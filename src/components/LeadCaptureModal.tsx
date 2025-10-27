import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  businessName: string;
  phone: string;
  email: string;
  segment: string;
  lgpdAccepted: boolean;
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
    lgpdAccepted: false,
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

    if (!formData.lgpdAccepted) {
      newErrors.lgpdAccepted = "Você precisa aceitar receber contato";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulating API call - Replace with actual backend integration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Lead captured:", formData);

      toast({
        title: "Proposta Enviada! 🎉",
        description: "Em breve nossa equipe entrará em contato com você.",
      });

      // Reset form
      setFormData({
        businessName: "",
        phone: "",
        email: "",
        segment: "",
        lgpdAccepted: false,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
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
            Preencha os dados abaixo e descubra como podemos escalar seu negócio
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
                setFormData({ ...formData, segment: value });
                setErrors({ ...errors, segment: "" });
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

          <div className="flex items-start space-x-2">
            <Checkbox
              id="lgpd"
              checked={formData.lgpdAccepted}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, lgpdAccepted: checked as boolean });
                setErrors({ ...errors, lgpdAccepted: "" });
              }}
              className={errors.lgpdAccepted ? "border-destructive" : ""}
            />
            <Label
              htmlFor="lgpd"
              className="text-sm leading-tight cursor-pointer text-muted-foreground"
            >
              Aceito receber contato da E5 Digital Scaling
            </Label>
          </div>
          {errors.lgpdAccepted && (
            <p className="text-sm text-destructive">{errors.lgpdAccepted}</p>
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
              "Receber Proposta Personalizada"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
