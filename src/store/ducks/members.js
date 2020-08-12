import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  openMemberModal: null,
  closeMemberModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
})

export const MembersTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  data: [],
  memberModalOpen: false,
})

export const getSuccess = (state, { data }) => state.merge({ data })

export const openMemberModal = (state) => state.merge({ memberModalOpen: true })
export const closeMemberModal = (state) => state.merge({ memberModalOpen: false })

export const updateMember = (state, { id, roles }) => {
  const members = state.data.map(member => member.id === id ? { ...member, roles } : member)
  return state.merge({ data: members })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.OPEN_MEMBER_MODAL]: openMemberModal,
  [Types.CLOSE_MEMBER_MODAL]: closeMemberModal,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
})
