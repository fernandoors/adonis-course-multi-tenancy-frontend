import { call, put } from 'redux-saga/effects'
import { actions as toastrActions } from 'react-redux-toastr'
import api from '~/services/api'
import TeamsActions from '../ducks/teams'

export function* getTeams() {
  try {
    const response = yield call(api.get, 'teams')
    yield put(TeamsActions.getTeamsSuccess(response.data))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to get Teams',
      message: 'Please, contact the administrator!'
    }))
  }
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name })
    yield put(TeamsActions.createTeamSuccess(response.data))
    yield put(TeamsActions.closeTeamModal())
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to save Team',
      message: 'Please, contact the administrator!'
    }))
  }
}