import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple client-side validation - Note: This is for demo purposes only
    // In production, use proper server-side authentication
    if (username === "enigma5km" && password === "admin") {
      sessionStorage.setItem("admin_authenticated", "true");
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard");
    } else {
      toast.error("❌ Usuário ou senha incorretos");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card-glass">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">E5</span>{" "}
            <span className="text-foreground">Digital Scaling</span>
          </h1>
          <h2 className="text-xl text-muted-foreground">Painel Administrativo</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary"
          >
            ← Voltar para a Landing Page
          </Button>
        </div>
      </Card>
    </div>
  );
}
