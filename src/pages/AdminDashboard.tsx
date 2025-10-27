import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Calendar,
  TrendingUp,
  Target,
  Search,
  Download,
  RefreshCw,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  segmento: string;
  status: string;
  data_cadastro: string;
  observacoes: string | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  // Metrics
  const [metrics, setMetrics] = useState({
    total: 0,
    today: 0,
    week: 0,
    conversion: 0,
  });

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    fetchLeads();
  }, [navigate]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("data_cadastro", { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateMetrics(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (leadsData: Lead[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayLeads = leadsData.filter(
      (lead) => new Date(lead.data_cadastro) >= today
    );
    const weekLeads = leadsData.filter(
      (lead) => new Date(lead.data_cadastro) >= weekAgo
    );
    const contatados = leadsData.filter(
      (lead) => lead.status !== "Novo"
    );

    setMetrics({
      total: leadsData.length,
      today: todayLeads.length,
      week: weekLeads.length,
      conversion: leadsData.length > 0 ? Math.round((contatados.length / leadsData.length) * 100) : 0,
    });
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.telefone.includes(searchTerm) ||
          lead.segmento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      toast.success("Status atualizado!");
      fetchLeads();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erro ao atualizar status");
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Tem certeza que deseja deletar este lead?")) return;

    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) throw error;

      toast.success("Lead deletado!");
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Erro ao deletar lead");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Deletar ${selectedLeads.length} leads selecionados?`)) return;

    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .in("id", selectedLeads);

      if (error) throw error;

      toast.success(`${selectedLeads.length} leads deletados!`);
      setSelectedLeads([]);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting leads:", error);
      toast.error("Erro ao deletar leads");
    }
  };

  const handleUpdateLead = async () => {
    if (!editingLead) return;

    try {
      const { error } = await supabase
        .from("leads")
        .update({
          nome: editingLead.nome,
          telefone: editingLead.telefone,
          email: editingLead.email,
          segmento: editingLead.segmento,
          status: editingLead.status,
          observacoes: editingLead.observacoes,
        })
        .eq("id", editingLead.id);

      if (error) throw error;

      toast.success("Lead atualizado!");
      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Erro ao atualizar lead");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const exportToCSV = () => {
    const headers = ["Nome", "Telefone", "Email", "Segmento", "Status", "Data Cadastro"];
    const rows = filteredLeads.map((lead) => [
      lead.nome,
      lead.telefone,
      lead.email,
      lead.segmento,
      lead.status,
      format(new Date(lead.data_cadastro), "dd/MM/yyyy HH:mm", { locale: ptBR }),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `leads_e5_digital_${format(new Date(), "ddMMyyyy")}.csv`;
    link.click();
    toast.success("CSV exportado!");
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${cleanPhone}`, "_blank");
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead.id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">E5</span>{" "}
            <span className="text-foreground">Painel de Leads</span>
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-card-glass border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Leads</p>
                <p className="text-3xl font-bold text-blue-500">{metrics.total}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card-glass border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Leads Hoje</p>
                <p className="text-3xl font-bold text-green-500">{metrics.today}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card-glass border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Leads Esta Semana</p>
                <p className="text-3xl font-bold text-yellow-500">{metrics.week}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-yellow-500/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card-glass border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-primary">{metrics.conversion}%</p>
              </div>
              <Target className="w-12 h-12 text-primary/30" />
            </div>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="p-6 bg-card-glass border-border">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome, email, telefone ou segmento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <Label htmlFor="status">Filtrar por Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Contatado">Contatado</SelectItem>
                  <SelectItem value="Diagnóstico Agendado">Diagnóstico Agendado</SelectItem>
                  <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                  <SelectItem value="Fechado">Fechado</SelectItem>
                  <SelectItem value="Perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={fetchLeads}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="default" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {selectedLeads.length > 0 && (
            <div className="mt-4 flex gap-2">
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Deletar {selectedLeads.length} Selecionados
              </Button>
            </div>
          )}
        </Card>

        {/* Table */}
        <Card className="p-6 bg-card-glass border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredLeads.length > 0 &&
                      selectedLeads.length === filteredLeads.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Segmento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    Nenhum lead encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLeads([...selectedLeads, lead.id]);
                          } else {
                            setSelectedLeads(selectedLeads.filter((id) => id !== lead.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(lead.data_cadastro), "dd/MM/yy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{lead.nome}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.telefone}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(lead.telefone)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {lead.email}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(lead.email)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{lead.segmento}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => handleStatusChange(lead.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novo">Novo</SelectItem>
                          <SelectItem value="Contatado">Contatado</SelectItem>
                          <SelectItem value="Diagnóstico Agendado">
                            Diagnóstico Agendado
                          </SelectItem>
                          <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                          <SelectItem value="Fechado">Fechado</SelectItem>
                          <SelectItem value="Perdido">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingLead(lead)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openWhatsApp(lead.telefone)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(lead.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingLead} onOpenChange={() => setEditingLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
          </DialogHeader>
          {editingLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome</Label>
                  <Input
                    id="edit-nome"
                    value={editingLead.nome}
                    onChange={(e) =>
                      setEditingLead({ ...editingLead, nome: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-telefone">Telefone</Label>
                  <Input
                    id="edit-telefone"
                    value={editingLead.telefone}
                    onChange={(e) =>
                      setEditingLead({ ...editingLead, telefone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingLead.email}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, email: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-segmento">Segmento</Label>
                  <Select
                    value={editingLead.segmento}
                    onValueChange={(value) =>
                      setEditingLead({ ...editingLead, segmento: value })
                    }
                  >
                    <SelectTrigger id="edit-segmento">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pet Shop">Pet Shop</SelectItem>
                      <SelectItem value="Clínica de Estética">Clínica de Estética</SelectItem>
                      <SelectItem value="Clínica de Odontologia">Clínica de Odontologia</SelectItem>
                      <SelectItem value="Escritório de Advocacia">Escritório de Advocacia</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingLead.status}
                    onValueChange={(value) =>
                      setEditingLead({ ...editingLead, status: value })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Contatado">Contatado</SelectItem>
                      <SelectItem value="Diagnóstico Agendado">Diagnóstico Agendado</SelectItem>
                      <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                      <SelectItem value="Fechado">Fechado</SelectItem>
                      <SelectItem value="Perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-observacoes">Observações</Label>
                <Textarea
                  id="edit-observacoes"
                  rows={4}
                  value={editingLead.observacoes || ""}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, observacoes: e.target.value })
                  }
                  placeholder="Adicione observações sobre este lead..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLead(null)}>
              Cancelar
            </Button>
            <Button variant="cta" onClick={handleUpdateLead}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
