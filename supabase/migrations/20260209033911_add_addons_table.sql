BEGIN;

CREATE TABLE IF NOT EXISTS public.addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    monthly_price_cents INTEGER NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Initial Add-ons
INSERT INTO public.addons (code, name, monthly_price_cents, description)
VALUES 
('white_label', 'White-label mode', 3900, 'Remove ForgeBuilder branding.'),
('audit_logs', 'Advanced audit logs', 1900, 'Extended event history and exports.'),
('priority_queue', 'Priority automation queue', 2900, 'Faster SAS™ execution.')
ON CONFLICT (code) DO NOTHING;

COMMIT;