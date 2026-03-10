import styles from './MetricsBand.module.css'
import type { DashboardMetrics } from '../types/projects.ts'

interface MetricsBandProps {
  metrics: DashboardMetrics
}

const metricCards = [
  { key: 'activeProjects', label: 'Active Projects', accentClass: 'red' },
  { key: 'phasesInPlay', label: 'Phases In Play', accentClass: 'blue' },
  { key: 'atRiskCount', label: 'At Risk', accentClass: 'yellow' },
  { key: 'upcomingReviews', label: 'Upcoming Reviews', accentClass: 'ink' },
] as const

export function MetricsBand({ metrics }: MetricsBandProps) {
  return (
    <section className={styles.grid} aria-label="Portfolio metrics">
      {metricCards.map((card) => (
        <article key={card.key} className={styles.card}>
          <span className={`${styles.accent} ${styles[card.accentClass]}`} />
          <p className={styles.value}>{metrics[card.key]}</p>
          <p className={styles.label}>{card.label}</p>
        </article>
      ))}
    </section>
  )
}
