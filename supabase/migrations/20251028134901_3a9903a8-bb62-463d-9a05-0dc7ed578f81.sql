-- Allow anon users to manage leads (for simple admin panel)
-- Note: In production, this should be replaced with proper authentication

CREATE POLICY "Allow anon to view all leads"
  ON public.leads
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon to update leads"
  ON public.leads
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Allow anon to delete leads"
  ON public.leads
  FOR DELETE
  TO anon
  USING (true);