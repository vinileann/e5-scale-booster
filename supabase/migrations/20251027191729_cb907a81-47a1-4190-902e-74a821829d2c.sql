-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  segmento TEXT NOT NULL,
  status TEXT DEFAULT 'Novo' CHECK (status IN ('Novo', 'Contatado', 'Diagnóstico Agendado', 'Proposta Enviada', 'Fechado', 'Perdido')),
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  origem TEXT DEFAULT 'landing_page',
  observacoes TEXT,
  contatado BOOLEAN DEFAULT false,
  data_ultimo_contato TIMESTAMP WITH TIME ZONE,
  aceite_lgpd BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads (from form submission)
CREATE POLICY "Allow public to insert leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_leads_data_cadastro ON public.leads(data_cadastro DESC);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_segmento ON public.leads(segmento);