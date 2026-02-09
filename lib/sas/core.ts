import { GrowthSignal, AutonomyAction, ActionRisk, SASMode } from './types'

/**
 * SAS™ Core Contract v1.0
 * 
 * The headless engine interface for governed operational autonomy.
 */

export interface SASConfig {
  projectId: string
  plan: 'Starter' | 'Pro' | 'Elite' | 'Enterprise'
  autonomyMode: 'off' | 'recommend' | 'execute'
  permissions: Record<AutonomyAction, boolean>
  approvalMode: 'none' | 'first_time' | 'always'
  complianceMode: boolean
  globalAutonomyEnabled: boolean
}

export interface SASResult {
  signals: Partial<GrowthSignal>[]
  actionsTaken: string[]
  confidenceDrift: boolean
}

export interface SASCore {
  /**
   * Primary execution loop.
   * Observes state, generates recommendations, and executes permitted actions.
   */
  process(context: any): Promise<SASResult>

  /**
   * Reverts a specific system action.
   */
  revert(actionId: string): Promise<boolean>

  /**
   * Generates a proof-of-value report.
   */
  getValueReport(): Promise<Record<string, any>>
}

/**
 * SAS™ Licensing Tiers (Internal Definition)
 * 
 * 1. SAS Core: Observation + Recommendation only.
 * 2. SAS Governed: Adds low-risk autonomy + basic ledger.
 * 3. SAS Enterprise: Adds approval modes, audit exports, and compliance gates.
 */
export const SAS_TIERS = {
  CORE: {
    modes: ['off', 'recommend'],
    actions: [] as AutonomyAction[],
    features: ['signals']
  },
  GOVERNED: {
    modes: ['off', 'recommend', 'execute'],
    actions: ['queue_optimize', 'signal_suppress'] as AutonomyAction[],
    features: ['signals', 'low_risk_autonomy', 'ledger']
  },
  ENTERPRISE: {
    modes: ['off', 'recommend', 'execute'],
    actions: ['queue_optimize', 'signal_suppress', 'project_duplicate', 'cadence_adjust', 'signal_reweight'] as AutonomyAction[],
    features: ['signals', 'full_autonomy', 'ledger', 'approval_modes', 'audit_export', 'compliance_mode']
  }
}
