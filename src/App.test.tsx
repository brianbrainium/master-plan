import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.tsx'

describe('Master Plan dashboard', () => {
  it('filters the project board by health state', async () => {
    const user = userEvent.setup()

    renderApp()

    await user.selectOptions(screen.getByLabelText(/health/i), 'At Risk')

    expect(
      screen.getByRole('heading', { name: /forge campus/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /harbor house/i }),
    ).not.toBeInTheDocument()
  })

  it('renders the project detail route', () => {
    renderApp({ initialEntries: ['/projects/civic-atrium'] })

    expect(
      screen.getByRole('heading', { name: /civic atrium/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /from concept to closeout/i }),
    ).toBeInTheDocument()
  })

  it('shows a not found message for an unknown project id', () => {
    renderApp({ initialEntries: ['/projects/unknown-id'] })

    expect(screen.getByText(/project not found/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /return to portfolio/i }),
    ).toBeInTheDocument()
  })

  it('applies session status updates and reflects them on the dashboard', async () => {
    const user = userEvent.setup()

    renderApp({ initialEntries: ['/projects/harbor-house'] })

    await user.selectOptions(screen.getByLabelText(/^health$/i), 'At Risk')
    await user.clear(screen.getByLabelText(/completion %/i))
    await user.type(screen.getByLabelText(/completion %/i), '88')
    await user.click(screen.getByRole('button', { name: /apply session update/i }))
    await user.click(screen.getByRole('link', { name: /back to portfolio/i }))

    const harborHouseCard = screen.getByRole('link', {
      name: /open harbor house/i,
    })

    expect(harborHouseCard).toHaveTextContent('At Risk')
    expect(harborHouseCard).toHaveTextContent('88%')
  })
})
