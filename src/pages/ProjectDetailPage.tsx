import { Link, useParams } from 'react-router-dom'
import { architecturePhases, projectHealthOptions } from '../types/projects.ts'
import { useProjects } from '../context/ProjectsContext.tsx'
import { PhaseRail } from '../components/PhaseRail.tsx'
import { ProjectStatusEditor } from '../components/ProjectStatusEditor.tsx'
import { formatCurrency, formatDisplayDate } from '../utils/projects.ts'
import styles from './ProjectDetailPage.module.css'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const { projects, updateProjectStatus } = useProjects()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <section className={styles.notFound}>
        <p className={styles.kicker}>Project Not Found</p>
        <h2>The requested project record is not in this session.</h2>
        <Link to="/" className={styles.backLink}>
          Return to portfolio
        </Link>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>
          Back to portfolio
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroPrimary}>
          <p className={styles.kicker}>{project.typology}</p>
          <h2>{project.name}</h2>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.heroMeta}>
          <div>
            <span>Client</span>
            <strong>{project.client}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{project.location}</strong>
          </div>
          <div>
            <span>Site area</span>
            <strong>{project.siteArea}</strong>
          </div>
          <div>
            <span>Target completion</span>
            <strong>{formatDisplayDate(project.targetCompletion)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.summaryStrip}>
        <article>
          <span>Current phase</span>
          <strong>{project.currentPhase}</strong>
        </article>
        <article>
          <span>Health</span>
          <strong>{project.health}</strong>
        </article>
        <article>
          <span>Completion</span>
          <strong>{project.completionPercent}%</strong>
        </article>
        <article>
          <span>Budget spent</span>
          <strong>{formatCurrency(project.budget.spent)}</strong>
        </article>
      </section>

      <section className={styles.phasePanel}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Phase Track</p>
          <h3>From concept to closeout.</h3>
        </div>
        <PhaseRail phases={architecturePhases} currentPhase={project.currentPhase} />
      </section>

      <div className={styles.detailGrid}>
        <section className={styles.infoColumn}>
          <article className={styles.panel}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Milestones</p>
              <h3>Upcoming and recent checkpoints.</h3>
            </div>
            <div className={styles.milestones}>
              {project.milestones.map((milestone) => (
                <div key={milestone.id} className={styles.milestoneCard}>
                  <span>{milestone.status}</span>
                  <strong>{milestone.label}</strong>
                  <p>
                    {formatDisplayDate(milestone.dueDate)} · {milestone.owner}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Studio Team</p>
              <h3>Who owns the next move.</h3>
            </div>
            <div className={styles.teamList}>
              {project.team.map((member) => (
                <div key={member.name} className={styles.teamMember}>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Risks + Next Action</p>
              <h3>Active blockers and immediate response.</h3>
            </div>
            <div className={styles.alertStrip}>{project.nextAction}</div>
            <div className={styles.blockerList}>
              {project.blockers.length > 0 ? (
                project.blockers.map((blocker) => (
                  <p key={blocker} className={styles.blocker}>
                    {blocker}
                  </p>
                ))
              ) : (
                <p className={styles.blocker}>No active blockers.</p>
              )}
            </div>
          </article>
        </section>

        <ProjectStatusEditor
          project={project}
          phases={architecturePhases}
          healthOptions={projectHealthOptions}
          onSubmit={(payload) => updateProjectStatus(project.id, payload)}
        />
      </div>
    </section>
  )
}
