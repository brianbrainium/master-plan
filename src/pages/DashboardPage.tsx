import { architecturePhases, projectHealthOptions } from '../types/projects.ts'
import { defaultFilters } from '../data/mockProjects.ts'
import { useProjects } from '../context/ProjectsContext.tsx'
import { getDashboardMetrics, getFilteredProjects } from '../utils/projects.ts'
import { FilterPanel } from '../components/FilterPanel.tsx'
import { MetricsBand } from '../components/MetricsBand.tsx'
import { PipelineOverview } from '../components/PipelineOverview.tsx'
import { ProjectCard } from '../components/ProjectCard.tsx'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { projects, filters, selectedProjectId, selectProject, setFilters } =
    useProjects()
  const filteredProjects = getFilteredProjects(projects, filters)
  const metrics = getDashboardMetrics(filteredProjects)
  const typologies = Array.from(new Set(projects.map((project) => project.typology)))
  const leads = Array.from(
    new Set(projects.map((project) => project.leadArchitect)),
  )

  return (
    <section className={styles.page}>
      <MetricsBand metrics={metrics} />

      <div className={styles.layout}>
        <FilterPanel
          filters={filters}
          typologies={typologies}
          leads={leads}
          phases={architecturePhases}
          healthOptions={projectHealthOptions}
          onFilterChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        <div className={styles.content}>
          <PipelineOverview phases={architecturePhases} projects={filteredProjects} />

          <section className={styles.projectsPanel}>
            <div className={styles.projectsHeader}>
              <div>
                <p className={styles.kicker}>Portfolio Board</p>
                <h2>{filteredProjects.length} project views in play.</h2>
              </div>
              <p className={styles.caption}>
                Open any project to inspect milestones, team composition, and
                update the session status console.
              </p>
            </div>

            {filteredProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No projects match this combination.</h3>
                <p>Reset the filters to bring the full studio roster back.</p>
                <button type="button" onClick={() => setFilters(defaultFilters)}>
                  Reset filters
                </button>
              </div>
            ) : (
              <div className={styles.projectGrid}>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProjectId === project.id}
                    onSelect={selectProject}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
