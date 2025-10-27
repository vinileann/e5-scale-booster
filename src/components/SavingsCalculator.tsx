import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface CalculatorResult {
  hoursWeek: number;
  hoursMonth: number;
  hoursYear: number;
  savingsWeek: number;
  savingsMonth: number;
  savingsYear: number;
}

interface SavingsCalculatorProps {
  onOpenLeadModal: () => void;
}

export function SavingsCalculator({ onOpenLeadModal }: SavingsCalculatorProps) {
  const [formData, setFormData] = useState({
    employees: 1,
    avgSalary: 3000,
    workHours: 8,
    timesPerDay: 10,
    activity: "",
    timePerExecution: 5,
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    setResult(null);
  };

  const calculateSavings = () => {
    const { employees, avgSalary, workHours, timesPerDay, timePerExecution } = formData;

    // Total daily time in minutes
    const totalDailyMinutes = timesPerDay * timePerExecution * employees;
    
    // Convert to hours
    const hoursDay = totalDailyMinutes / 60;
    const hoursWeek = hoursDay * 5; // 5 working days
    const hoursMonth = hoursWeek * 4.33; // Average weeks per month
    const hoursYear = hoursMonth * 12;

    // Calculate hourly cost
    const workingDaysMonth = 22;
    const monthlyHours = workHours * workingDaysMonth;
    const costPerHour = avgSalary / monthlyHours;

    // Calculate savings
    const savingsWeek = hoursWeek * costPerHour;
    const savingsMonth = hoursMonth * costPerHour;
    const savingsYear = hoursYear * costPerHour;

    setResult({
      hoursWeek,
      hoursMonth,
      hoursYear,
      savingsWeek,
      savingsMonth,
      savingsYear,
    });
  };

  return (
    <section className="py-24 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Descubra Quanto Você Pode Economizar
          </h2>
          <p className="text-xl text-muted-foreground">
            Calcule o impacto da automação no seu negócio
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card-glass">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="employees">Número de funcionários</Label>
                <Input
                  id="employees"
                  type="number"
                  min="1"
                  value={formData.employees}
                  onChange={(e) => handleInputChange("employees", parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgSalary">Média salarial mensal (R$)</Label>
                <Input
                  id="avgSalary"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.avgSalary}
                  onChange={(e) => handleInputChange("avgSalary", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workHours">Jornada de trabalho diária (horas)</Label>
                <Input
                  id="workHours"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.workHours}
                  onChange={(e) => handleInputChange("workHours", parseInt(e.target.value) || 8)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timesPerDay">Quantas vezes ao dia realiza a atividade?</Label>
                <Input
                  id="timesPerDay"
                  type="number"
                  min="1"
                  value={formData.timesPerDay}
                  onChange={(e) => handleInputChange("timesPerDay", parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="activity">Qual atividade? (opcional)</Label>
                <Input
                  id="activity"
                  placeholder="Ex: Confirmar consultas via WhatsApp"
                  value={formData.activity}
                  onChange={(e) => handleInputChange("activity", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePerExecution">Tempo por execução (minutos)</Label>
                <Input
                  id="timePerExecution"
                  type="number"
                  min="1"
                  value={formData.timePerExecution}
                  onChange={(e) => handleInputChange("timePerExecution", parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <Button
              variant="cta"
              size="lg"
              className="w-full mb-8"
              onClick={calculateSavings}
            >
              Calcular Economia
            </Button>

            {result && (
              <div className="space-y-8 animate-scale-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-primary/10 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Horas Economizadas / Semana</p>
                    <p className="text-3xl font-bold text-primary">{result.hoursWeek.toFixed(1)}h</p>
                  </Card>
                  <Card className="p-6 bg-primary/10 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Horas Economizadas / Mês</p>
                    <p className="text-3xl font-bold text-primary">{result.hoursMonth.toFixed(1)}h</p>
                  </Card>
                  <Card className="p-6 bg-primary/10 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Horas Economizadas / Ano</p>
                    <p className="text-3xl font-bold text-primary">{result.hoursYear.toFixed(0)}h</p>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-card-glass border-border">
                    <p className="text-sm text-muted-foreground mb-2">Economia / Semana</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(result.savingsWeek)}</p>
                  </Card>
                  <Card className="p-6 bg-card-glass border-border">
                    <p className="text-sm text-muted-foreground mb-2">Economia / Mês</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(result.savingsMonth)}</p>
                  </Card>
                  <Card className="p-6 bg-card-glass border-border">
                    <p className="text-sm text-muted-foreground mb-2">Economia / Ano</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(result.savingsYear)}</p>
                  </Card>
                </div>

                <div className="text-center space-y-4 pt-4">
                  <p className="text-xl text-foreground font-semibold">
                    Imagine o que você poderia fazer com esse tempo e dinheiro economizados!
                  </p>
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={onOpenLeadModal}
                  >
                    Quero Descobrir Como Automatizar
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
