import { useEffect, useState } from 'react'
import styles from './ProjectStatusEditor.module.css'
import type {
  ArchitecturePhase,
  Project,
  ProjectHealth,
} from '../types/projects.ts'

interface ProjectStatusEditorProps {
  project: Project
  phases: readonly ArchitecturePhase[]
  healthOptions: readonly ProjectHealth[]
  onSubmit: (payload: {
    currentPhase: ArchitecturePhase
    health: ProjectHealth
    completionPercent: number
    nextReviewDate: string
  }) => void
}

export function ProjectStatusEditor({
  project,
  phases,
  healthOptions,
  onSubmit,
}: ProjectStatusEditorProps) {
  const [phase, setPhase] = useState(project.currentPhase)
  const [health, setHealth] = useState(project.health)
  const [completionPercent, setCompletionPercent] = useState(
    String(project.completionPercent),
  )
  const [nextReviewDate, setNextReviewDate] = useState(project.nextReviewDate)

  useEffect(() => {
    setPhase(project.currentPhase)
    setHealth(project.health)
    setCompletionPercent(String(project.completionPercent))
    setNextReviewDate(project.nextReviewDate)
  }, [project])

  return (
    <form
      className={styles.panel}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          currentPhase: phase,
          health,
          completionPercent: Number(completionPercent),
          nextReviewDate,
        })
      }}
    >
      <div className={styles.heading}>
        <p className={styles.kicker}>Status Console</p>
        <h2>Update the live studio read.</h2>
      </div>

      <label className={styles.field}>
        <span>Phase</span>
        <select
          value={phase}
          onChange={(event) => setPhase(event.target.value as ArchitecturePhase)}
        >
          {phases.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Health</span>
        <select
          value={health}
          onChange={(event) => setHealth(event.target.value as ProjectHealth)}
        >
          {healthOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Completion %</span>
        <input
          type="number"
          min="0"
          max="100"
          value={completionPercent}
          onChange={(event) => setCompletionPercent(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span>Next review date</span>
        <input
          type="date"
          value={nextReviewDate}
          onChange={(event) => setNextReviewDate(event.target.value)}
        />
      </label>

      <button type="submit" className={styles.submitButton}>
        Apply session update
      </button>
    </form>
  )
}
