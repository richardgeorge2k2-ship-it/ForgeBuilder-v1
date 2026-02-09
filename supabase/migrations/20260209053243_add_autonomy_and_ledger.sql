BEGIN;

-- 1. Add autonomy settings to projects
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS autonomy_mode TEXT DEFAULT 'off' CHECK (autonomy_mode IN ('off', 'recommend', 'execute')),
ADD COLUMN IF NOT EXISTS global_autonomy_enabled BOOLEAN DEFAULT true;

-- 2. Create system_actions ledger
CREATE TABLE IF NOT EXISTS public.system_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    risk TEXT NOT NULL CHECK (risk IN ('low', 'medium', 'high')),
    confidence_score INTEGER NOT NULL,
    executed_at TIMESTAMPTZ DEFAULT now(),
    reverted BOOLEAN DEFAULT false,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Add index for performance
CREATE INDEX IF NOT EXISTS idx_system_actions_project_id ON public.system_actions(project_id);

COMMIT;