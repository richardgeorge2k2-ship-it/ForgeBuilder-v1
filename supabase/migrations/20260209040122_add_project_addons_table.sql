BEGIN;

-- 1. Create project_addons table
CREATE TABLE IF NOT EXISTS public.project_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    addon_code TEXT NOT NULL REFERENCES public.addons(code) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('inactive', 'active', 'canceled')),
    stripe_subscription_item_id TEXT,
    activated_at TIMESTAMPTZ,
    canceled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (project_id, addon_code)
);

-- 2. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_addons_project_id ON public.project_addons(project_id);
CREATE INDEX IF NOT EXISTS idx_project_addons_addon_code ON public.project_addons(addon_code);
CREATE INDEX IF NOT EXISTS idx_project_addons_status ON public.project_addons(status);

COMMIT;