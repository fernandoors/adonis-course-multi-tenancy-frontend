import { call, put } from 'redux-saga/effects'
import { actions as toastrActions } from 'react-redux-toastr'
import api from '~/services/api'
import ProjectsActions from '../ducks/projects'

export function* getProjects() {
  try {
    const response = yield call(api.get, 'projects')
    yield put(ProjectsActions.getProjectsSuccess(response.data))
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to sign in',
      message: 'Please, contact the administrator!'
    }))
  }
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title })
    yield put(ProjectsActions.createProjectSuccess(response.data))
    yield put(ProjectsActions.closeProjectModal())
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Error to save Project',
      message: 'Please, contact the administrator!'
    }))
  }
}