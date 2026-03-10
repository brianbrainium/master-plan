import styles from './PhaseRail.module.css'
import { getPhaseIndex } from '../utils/projects.ts'
import type { ArchitecturePhase } from '../types/projects.ts'

interface PhaseRailProps {
  phases: readonly ArchitecturePhase[]
  currentPhase: ArchitecturePhase
}

export function PhaseRail({ phases, currentPhase }: PhaseRailProps) {
  const currentIndex = getPhaseIndex(currentPhase)

  return (
    <div className={styles.rail} aria-label="Project phase rail">
      {phases.map((phase, index) => {
        const stateClassName =
          index < currentIndex
            ? styles.complete
            : index === currentIndex
              ? styles.current
              : styles.upcoming

        return (
          <div key={phase} className={`${styles.phase} ${stateClassName}`}>
            <span className={styles.index}>{index + 1}</span>
            <div>
              <p>{phase}</p>
              <span>
                {index < currentIndex
                  ? 'Complete'
                  : index === currentIndex
                    ? 'Current'
                    : 'Upcoming'}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
