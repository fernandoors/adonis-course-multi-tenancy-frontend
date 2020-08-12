import { call, put } from 'redux-saga/effects'
import { actions as toastrActions } from 'react-redux-toastr'
import api from '~/services/api'
import MembersActions from '../ducks/members'

export function* getMembers() {
  try {
    const response = yield call(api.get, 'members')
    yield put(MembersActions.getMembersSuccess(response.data))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to get Members',
      message: 'Please, contact the administrator!'
    }))
  }
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) })
    yield put(toastrActions.add({
      type: 'success',
      title: 'Roles Updated',
      message: 'Success to update user Role'
    }))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to update roles',
      message: 'Please, contact the administrator!'
    }))
  }
}


export function* inviteMember({ email }) {
  try {
    yield call(api.post, `invites`, { invites: [email] })
    yield put(toastrActions.add({
      type: 'success',
      title: 'Team Shared',
      message: 'Success to share this team'
    }))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to send invite',
      message: 'Please, contact the administrator!'
    }))
  }
}

