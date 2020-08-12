import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TeamsActions from '~/store/ducks/teams'
import AuthActions from '~/store/ducks/auth'

import { Container, TeamList, Team, NewTeam, Logout } from './styles';

import Button from '~/styles/components/Button'
import Modal from '../Modal';

function TeamSwitcher() {
  const [activeTeam, setActiveTeam] = useState('')
  const [newTeam, setNewTeam] = useState('')
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams)
  useEffect(() => {
    dispatch(TeamsActions.getTeamsRequest())
  }, [dispatch])
  useEffect(() => {
    if (!!teams.active) {
      setActiveTeam(teams.active.id)
    }
  }, [teams])
  function handleTeamSelector(team) {
    dispatch(TeamsActions.selectTeam(team))
  }
  function handleNewTeam() {
    dispatch(TeamsActions.openTeamModal())
  }
  function cancelNewTeam() {
    dispatch(TeamsActions.closeTeamModal())
  }
  function handleTeamName(event) {
    setNewTeam(event.target.value)
  }
  function handleCreateTeam(event) {
    event.preventDefault()
    dispatch(TeamsActions.createTeamRequest(newTeam))
  }
  function handleLogout() {
    dispatch(AuthActions.signOut())
  }
  return (
    <Container>
      <TeamList>
        {teams.data.map(team => (
          <Team key={team.id} onClick={() => handleTeamSelector(team)} selected={activeTeam === team.id}>
            <img
              alt={team.name}
              src={`https://ui-avatars.com/api/?font-size=0.33&background=f69723&color=fff&name=${team.name}`}
            />
          </Team>
        ))}
        <NewTeam onClick={handleNewTeam} >New Team</NewTeam>

        {teams.teamModalOpen && (
          <Modal>
            <form onSubmit={handleCreateTeam}>
              <h1>Create Team</h1>

              <span>Name</span>
              <input name='newTeam' value={newTeam} onChange={handleTeamName} />

              <Button size='big' type='submit' onClick={handleCreateTeam} >Save</Button>
              <Button size='small' color='gray' onClick={cancelNewTeam} >Cancel</Button>
            </form>
          </Modal>
        )}
      </TeamList>

      <Logout onClick={handleLogout} >Sign Out</Logout>
    </Container>
  )
}

export default TeamSwitcher;