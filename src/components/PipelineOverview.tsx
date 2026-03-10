import styles from './PipelineOverview.module.css'
import type { ArchitecturePhase, Project } from '../types/projects.ts'

interface PipelineOverviewProps {
  phases: readonly ArchitecturePhase[]
  projects: readonly Project[]
}

export function PipelineOverview({ phases, projects }: PipelineOverviewProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>Pipeline View</p>
          <h2>Where the studio workload sits today.</h2>
        </div>
        <p className={styles.caption}>
          Each phase shows how many live projects currently sit in that segment
          of the architectural pipeline.
        </p>
      </div>

      <div className={styles.grid}>
        {phases.map((phase) => {
          const phaseProjects = projects.filter(
            (project) => project.currentPhase === phase,
          )

          return (
            <article key={phase} className={styles.phaseCard}>
              <div className={styles.phaseTop}>
                <span className={styles.count}>{phaseProjects.length}</span>
                <h3>{phase}</h3>
              </div>
              <div className={styles.names}>
                {phaseProjects.length > 0 ? (
                  phaseProjects.map((project) => (
                    <span key={project.id} className={styles.projectBadge}>
                      {project.name}
                    </span>
                  ))
                ) : (
                  <span className={styles.empty}>No active projects</span>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
