import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

function getPagesBasePath() {
  const explicitBasePath = process.env.VITE_BASE_PATH

  if (explicitBasePath) {
    return explicitBasePath
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

  return repositoryName ? `/${repositoryName}/` : '/master-plan/'
}

function getBuildOutDir() {
  return process.env.VITE_OUT_DIR ?? 'dist'
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? getPagesBasePath() : '/',
  build: {
    outDir: getBuildOutDir(),
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}))
