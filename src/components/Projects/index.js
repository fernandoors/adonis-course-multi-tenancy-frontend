import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ProjectsActions from '~/store/ducks/projects'
import MembersActions from '~/store/ducks/members'

import Button from '~/styles/components/Button'
import { Container, Project } from './styles';

import Modal from '~/components/Modal'
import Members from '~/components/Members';
import Can from '~/components/Can';

function Projects() {
  const dispatch = useDispatch()
  const [newProject, setNewProject] = useState('')
  const team = useSelector(state => state.teams.active)
  const projects = useSelector(state => state.projects)
  const members = useSelector(state => state.members)
  useEffect(() => {
    if (!!team.id) {
      dispatch(ProjectsActions.getProjectsRequest())
    }
  }, [dispatch, team.id])
  function handleProjectName(event) {
    setNewProject(event.target.value)
  }
  function handleNewProject() {
    dispatch(ProjectsActions.openProjectModal())
  }
  function cancelNewProject() {
    dispatch(ProjectsActions.closeProjectModal())
  }
  function handleCreateProject(event) {
    event.preventDefault()
    dispatch(ProjectsActions.createProjectRequest(newProject))
    setNewProject('')
  }
  function handleMembersModal() {
    dispatch(MembersActions.openMemberModal())
  }

  if (!team) return null
  return (
    <Container>
      <header>
        <h1>{team.name}</h1>
        <div>
          <Can checkPermission='projects_create'>
            <Button onClick={handleNewProject}>New</Button>
          </Can>
          <Button onClick={handleMembersModal}>Members</Button>
        </div>
      </header>
      {projects.data.map(project => (
        <Project key={project.id}>
          <p>{project.title}</p>
        </Project>
      ))}

      {projects.projectModalOpen &&
        <Modal>
          <form onSubmit={handleCreateProject}>
            <h1>Create Project</h1>

            <span>Name</span>
            <input name='newProject' value={newProject} onChange={handleProjectName} />

            <Button size='big' type='submit' onClick={handleCreateProject} >Save</Button>
            <Button size='small' color='gray' onClick={cancelNewProject} >Cancel</Button>
          </form>
        </Modal>
      }
      {members.memberModalOpen && (
        <Members />
      )}
    </Container>
  )
}

export default Projects;