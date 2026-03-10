export const architecturePhases = [
  'Concept',
  'Schematic',
  'Design Development',
  'Construction Documents',
  'Permitting',
  'Construction Administration',
  'Closeout',
] as const

export const projectHealthOptions = ['On Track', 'Watch', 'At Risk'] as const

export type ArchitecturePhase = (typeof architecturePhases)[number]
export type ProjectHealth = (typeof projectHealthOptions)[number]

export interface TeamMember {
  name: string
  role: string
}

export interface Milestone {
  id: string
  label: string
  dueDate: string
  status: 'Complete' | 'In Progress' | 'Upcoming'
  owner: string
}

export interface BudgetSnapshot {
  allocated: number
  spent: number
}

export interface Project {
  id: string
  name: string
  client: string
  typology: string
  location: string
  description: string
  siteArea: string
  leadArchitect: string
  team: TeamMember[]
  currentPhase: ArchitecturePhase
  completionPercent: number
  health: ProjectHealth
  budget: BudgetSnapshot
  targetCompletion: string
  nextReviewDate: string
  milestones: Milestone[]
  blockers: string[]
  nextAction: string
}

export interface ProjectFilters {
  search: string
  phase: ArchitecturePhase | 'all'
  health: ProjectHealth | 'all'
  typology: string | 'all'
  leadArchitect: string | 'all'
}

export interface DashboardMetrics {
  activeProjects: number
  phasesInPlay: number
  atRiskCount: number
  upcomingReviews: number
}

export interface ProjectStatusUpdate {
  currentPhase?: ArchitecturePhase
  health?: ProjectHealth
  completionPercent?: number
  nextReviewDate?: string
}
