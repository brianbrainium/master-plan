import { architecturePhases } from '../types/projects.ts'
import type {
  ArchitecturePhase,
  DashboardMetrics,
  Project,
  ProjectFilters,
} from '../types/projects.ts'

const demoReferenceDate = new Date('2026-03-10T00:00:00')

export function getFilteredProjects(projects: Project[], filters: ProjectFilters) {
  const normalizedSearch = filters.search.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [
        project.name,
        project.client,
        project.location,
        project.typology,
        project.leadArchitect,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)

    const matchesPhase =
      filters.phase === 'all' || project.currentPhase === filters.phase
    const matchesHealth =
      filters.health === 'all' || project.health === filters.health
    const matchesTypology =
      filters.typology === 'all' || project.typology === filters.typology
    const matchesLead =
      filters.leadArchitect === 'all' ||
      project.leadArchitect === filters.leadArchitect

    return (
      matchesSearch &&
      matchesPhase &&
      matchesHealth &&
      matchesTypology &&
      matchesLead
    )
  })
}

export function getDashboardMetrics(projects: Project[]): DashboardMetrics {
  return {
    activeProjects: projects.length,
    phasesInPlay: new Set(projects.map((project) => project.currentPhase)).size,
    atRiskCount: projects.filter((project) => project.health === 'At Risk').length,
    upcomingReviews: projects.filter((project) =>
      isUpcoming(project.nextReviewDate),
    ).length,
  }
}

function isUpcoming(date: string) {
  const reviewDate = new Date(date)
  const difference = reviewDate.getTime() - demoReferenceDate.getTime()
  const daysAway = difference / (1000 * 60 * 60 * 24)
  return daysAway >= 0 && daysAway <= 21
}

export function getPhaseDistribution(projects: Project[]) {
  return architecturePhases.map((phase) => ({
    phase,
    count: projects.filter((project) => project.currentPhase === phase).length,
  }))
}

export function getPhaseIndex(phase: ArchitecturePhase) {
  return architecturePhases.indexOf(phase)
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(value)
}

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
