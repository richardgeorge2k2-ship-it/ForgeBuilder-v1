BEGIN;

-- 1. Update projects table with enterprise controls
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS sas_permissions JSONB DEFAULT '{"queue_optimize": false, "signal_suppress": false, "project_duplicate": false, "cadence_adjust": false, "signal_reweight": false}'::jsonb,
ADD COLUMN IF NOT EXISTS approval_mode TEXT DEFAULT 'none' CHECK (approval_mode IN ('none', 'first_time', 'always')),
ADD COLUMN IF NOT EXISTS compliance_mode BOOLEAN DEFAULT false;

-- 2. Update system_actions table for audit and approval
ALTER TABLE public.system_actions
ADD COLUMN IF NOT EXISTS approval_state TEXT DEFAULT 'not_required' CHECK (approval_state IN ('not_required', 'pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS approved_by UUID;

COMMIT;