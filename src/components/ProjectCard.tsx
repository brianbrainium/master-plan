import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'
import type { Project } from '../types/projects.ts'
import { formatCurrency, formatDisplayDate } from '../utils/projects.ts'

interface ProjectCardProps {
  project: Project
  isSelected: boolean
  onSelect: (projectId: string) => void
}

export function ProjectCard({
  project,
  isSelected,
  onSelect,
}: ProjectCardProps) {
  const healthClassName = project.health.toLowerCase().replace(/\s+/g, '')

  return (
    <Link
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      to={`/projects/${project.id}`}
      onClick={() => onSelect(project.id)}
      aria-label={`Open ${project.name}`}
    >
      <div className={styles.topRow}>
        <span className={styles.typology}>{project.typology}</span>
        <span className={`${styles.health} ${styles[healthClassName]}`}>
          {project.health}
        </span>
      </div>

      <div className={styles.identity}>
        <h3>{project.name}</h3>
        <p>
          {project.client} · {project.location}
        </p>
      </div>

      <div className={styles.metaGrid}>
        <div>
          <span className={styles.metaLabel}>Current phase</span>
          <strong>{project.currentPhase}</strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Lead architect</span>
          <strong>{project.leadArchitect}</strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Budget</span>
          <strong>
            {formatCurrency(project.budget.spent)} /{' '}
            {formatCurrency(project.budget.allocated)}
          </strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Next review</span>
          <strong>{formatDisplayDate(project.nextReviewDate)}</strong>
        </div>
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.progressHeader}>
          <span>Completion</span>
          <strong>{project.completionPercent}%</strong>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <span
            className={styles.progressFill}
            style={{ width: `${project.completionPercent}%` }}
          />
        </div>
      </div>

      <p className={styles.nextAction}>{project.nextAction}</p>
    </Link>
  )
}
