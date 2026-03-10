import { execFileSync } from 'node:child_process'

const packageName = 'master-plan'
const sharedOptions = {
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_BASE_PATH: `/${packageName}/`,
    VITE_OUT_DIR: 'docs',
  },
}

if (process.platform === 'win32') {
  execFileSync('cmd.exe', ['/c', 'npm.cmd', 'run', 'build'], sharedOptions)
} else {
  execFileSync('npm', ['run', 'build'], sharedOptions)
}
