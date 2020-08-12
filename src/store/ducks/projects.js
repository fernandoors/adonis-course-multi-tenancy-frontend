import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  createProjectRequest: ['title'],
  createProjectSuccess: ['project'],
})

export const ProjectsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
})

export const getSuccess = (state, { data }) => state.merge({ data })


export const openProjectModal = (state) => state.merge({ projectModalOpen: true })
export const closeProjectModal = (state) => state.merge({ projectModalOpen: false })
export const createProjectSuccess = (state, { project }) => {
  return state.merge({ data: [...state.data, project] })
}
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: getSuccess,
  [Types.OPEN_PROJECT_MODAL]: openProjectModal,
  [Types.CLOSE_PROJECT_MODAL]: closeProjectModal,
  [Types.CREATE_PROJECT_SUCCESS]: createProjectSuccess,
})
