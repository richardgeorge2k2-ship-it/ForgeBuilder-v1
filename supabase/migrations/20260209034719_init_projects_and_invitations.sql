BEGIN;

-- Create projects table first since it's missing
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_type TEXT DEFAULT 'Starter',
    status TEXT DEFAULT 'active',
    earned_credits_months INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create invitations table to track the growth loop
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'accepted', 'activated')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_invitations_project_id ON public.invitations(project_id);

COMMIT;