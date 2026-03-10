import styles from './FilterPanel.module.css'
import type {
  ArchitecturePhase,
  ProjectFilters,
  ProjectHealth,
} from '../types/projects.ts'

interface FilterPanelProps {
  filters: ProjectFilters
  typologies: readonly string[]
  leads: readonly string[]
  phases: readonly ArchitecturePhase[]
  healthOptions: readonly ProjectHealth[]
  onFilterChange: (filters: Partial<ProjectFilters>) => void
  onReset: () => void
}

export function FilterPanel({
  filters,
  typologies,
  leads,
  phases,
  healthOptions,
  onFilterChange,
  onReset,
}: FilterPanelProps) {
  return (
    <aside className={styles.panel}>
      <div className={styles.headingBlock}>
        <p className={styles.kicker}>Filter Studio</p>
        <h2>Shift the portfolio lens.</h2>
      </div>

      <label className={styles.field}>
        <span>Search</span>
        <input
          type="search"
          placeholder="Project, client, city, lead"
          value={filters.search}
          onChange={(event) => onFilterChange({ search: event.target.value })}
        />
      </label>

      <label className={styles.field}>
        <span>Phase</span>
        <select
          value={filters.phase}
          onChange={(event) =>
            onFilterChange({ phase: event.target.value as ProjectFilters['phase'] })
          }
        >
          <option value="all">All phases</option>
          {phases.map((phase) => (
            <option key={phase} value={phase}>
              {phase}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Health</span>
        <select
          value={filters.health}
          onChange={(event) =>
            onFilterChange({ health: event.target.value as ProjectFilters['health'] })
          }
        >
          <option value="all">All health states</option>
          {healthOptions.map((health) => (
            <option key={health} value={health}>
              {health}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Typology</span>
        <select
          value={filters.typology}
          onChange={(event) => onFilterChange({ typology: event.target.value })}
        >
          <option value="all">All typologies</option>
          {typologies.map((typology) => (
            <option key={typology} value={typology}>
              {typology}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Lead architect</span>
        <select
          value={filters.leadArchitect}
          onChange={(event) => onFilterChange({ leadArchitect: event.target.value })}
        >
          <option value="all">All leads</option>
          {leads.map((lead) => (
            <option key={lead} value={lead}>
              {lead}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Reset filters
      </button>

      <p className={styles.note}>
        Status changes are session-only in this prototype, so the board always
        resets back to the studio seed set on refresh.
      </p>
    </aside>
  )
}
