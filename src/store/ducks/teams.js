import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: ['data'],
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
  createTeamRequest: ['name'],
  createTeamSuccess: ['team'],
})

export const TeamsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  data: [],
  teamModalOpen: false,
  active: JSON.parse(localStorage.getItem('@fdoors:team')) || {}
})

export const getSuccess = (state, { data }) => state.merge({ data })
export const selectTeam = (state, { team }) => {
  localStorage.setItem('@fdoors:team', JSON.stringify(team))
  return state.merge({ active: team })
}

export const openTeamModal = (state) => state.merge({ teamModalOpen: true })
export const closeTeamModal = (state) => state.merge({ teamModalOpen: false })

export const createTeamSuccess = (state, { team }) => {
  return state.merge({ data: [...state.data, team] })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAMS_SUCCESS]: getSuccess,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openTeamModal,
  [Types.CLOSE_TEAM_MODAL]: closeTeamModal,
  [Types.CREATE_TEAM_SUCCESS]: createTeamSuccess,
})
