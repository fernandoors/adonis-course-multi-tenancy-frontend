import { call, put, select } from 'redux-saga/effects'
import { actions as toastrActions } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import api from '~/services/api'
import AuthActions from '../ducks/auth'

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password })
    localStorage.setItem('@fdoors:token', response.data.token)
    yield put(AuthActions.signInSuccess(response.data.token))
    yield put(push('/'))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to sign in',
      message: 'Please, check your email and/or password!'
    }))
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password })
    localStorage.setItem('@fdoors:token', response.data.token)
    yield put(AuthActions.signInSuccess(response.data.token))
    yield put(push('/'))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to sign up',
      message: 'Please, check if you have an invite!'
    }))
  }
}
export function* signOut() {
  localStorage.removeItem('@fdoors:token')
  localStorage.removeItem('@fdoors:team')
  yield put(push('/signin'))
}



export function* getPermissions() {
  const team = yield select(state => state.teams.active)
  const signedIn = yield select(state => state.auth.signedIn)
  if (!signedIn || !team.id) {
    return
  }

  const response = yield call(api.get, 'permissions')
  const { roles, permissions } = response.data

  yield put(AuthActions.getPermissionsSuccess(roles, permissions))
}