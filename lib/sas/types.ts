export type SASMode = 'Observe' | 'Recommend' | 'Act'

export type SignalSeverity = 'low' | 'medium' | 'high'

export type SignalCategory = 'conversion' | 'revenue' | 'retention' | 'deliverability' | 'growth'

export type AutonomyAction =
  | 'queue_optimize'
  | 'signal_suppress'
  | 'project_duplicate'
  | 'cadence_adjust'
  | 'signal_reweight'

export type ActionRisk = 'low' | 'medium' | 'high'

export interface GrowthSignal {
  id: string
  severity: SignalSeverity
  category: SignalCategory
  title: string
  detail: string
  recommended_action: string
  status: 'open' | 'dismissed' | 'resolved'
  confidence_score: number // 0-100
  evidence_json?: Record<string, any>
  dismiss_count?: number
  created_at: string
}
