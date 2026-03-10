import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx'

function App() {
  return (
    <div className={styles.shell}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={`${styles.shape} ${styles.redCircle}`} />
        <span className={`${styles.shape} ${styles.blueSquare}`} />
        <span className={`${styles.shape} ${styles.yellowBar}`} />
        <span className={styles.axisLine} />
      </div>
      <header className={styles.header}>
        <div className={styles.brand}>
          <p className={styles.kicker}>Master Plan</p>
          <h1>Architectural projects in a Bauhaus cadence.</h1>
          <p className={styles.summary}>
            Track studio work from concept to closeout with geometric clarity,
            sharp hierarchy, and session-based status updates.
          </p>
        </div>
        <div className={styles.manifesto}>
          <span className={styles.manifestoLabel}>Studio Grid</span>
          <p>
            Portfolio overview, phase momentum, and project detail live in a
            single visual system designed for fast decision-making.
          </p>
        </div>
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
