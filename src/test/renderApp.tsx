import { render } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.tsx'
import { ProjectsProvider } from '../context/ProjectsContext.tsx'

interface RenderAppOptions {
  initialEntries?: string[]
}

function Providers({
  children,
  initialEntries = ['/'],
}: PropsWithChildren<RenderAppOptions>) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <ProjectsProvider>{children}</ProjectsProvider>
    </MemoryRouter>
  )
}

export function renderApp({ initialEntries }: RenderAppOptions = {}) {
  return render(<App />, {
    wrapper: ({ children }) => (
      <Providers initialEntries={initialEntries}>{children}</Providers>
    ),
  })
}
