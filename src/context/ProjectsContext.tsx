import {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from 'react'
import { defaultFilters, mockProjects } from '../data/mockProjects.ts'
import type {
  Project,
  ProjectFilters,
  ProjectStatusUpdate,
} from '../types/projects.ts'

interface ProjectsState {
  projects: Project[]
  filters: ProjectFilters
  selectedProjectId: string | null
}

type ProjectsAction =
  | { type: 'setFilters'; payload: Partial<ProjectFilters> }
  | { type: 'selectProject'; payload: string }
  | {
      type: 'updateProjectStatus'
      payload: { projectId: string; updates: ProjectStatusUpdate }
    }

interface ProjectsContextValue extends ProjectsState {
  setFilters: (filters: Partial<ProjectFilters>) => void
  selectProject: (projectId: string) => void
  updateProjectStatus: (projectId: string, updates: ProjectStatusUpdate) => void
}

const initialState: ProjectsState = {
  projects: mockProjects,
  filters: defaultFilters,
  selectedProjectId: mockProjects[0]?.id ?? null,
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined)

function clampCompletion(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function projectsReducer(state: ProjectsState, action: ProjectsAction): ProjectsState {
  switch (action.type) {
    case 'setFilters':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }
    case 'selectProject':
      return {
        ...state,
        selectedProjectId: action.payload,
      }
    case 'updateProjectStatus':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                ...action.payload.updates,
                completionPercent:
                  action.payload.updates.completionPercent === undefined
                    ? project.completionPercent
                    : clampCompletion(action.payload.updates.completionPercent),
              }
            : project,
        ),
      }
    default:
      return state
  }
}

export function ProjectsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(projectsReducer, initialState)

  const value: ProjectsContextValue = {
    ...state,
    setFilters: (filters) => dispatch({ type: 'setFilters', payload: filters }),
    selectProject: (projectId) =>
      dispatch({ type: 'selectProject', payload: projectId }),
    updateProjectStatus: (projectId, updates) =>
      dispatch({ type: 'updateProjectStatus', payload: { projectId, updates } }),
  }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectsContext)

  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }

  return context
}
