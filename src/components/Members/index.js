import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import api from '~/services/api'

import MembersActions from '~/store/ducks/members'
import Modal from '~/components/Modal'
import Can from '~/components/Can'
import Button from '~/styles/components/Button'
import { MembersList, Invite } from './styles';

function Members() {
  const [roles, setRoles] = useState([])
  const [invite, setInvite] = useState('')
  const dispatch = useDispatch()
  const members = useSelector(state => state.members.data)
  useEffect(() => {
    async function getRoles() {
      const { data } = await api.get('roles')
      setRoles(data)
    }
    getRoles()
  }, [])

  useEffect(() => {
    dispatch(MembersActions.getMembersRequest())
  }, [dispatch])

  function handleMembersModal() {
    dispatch(MembersActions.closeMemberModal())
  }
  function handleRoleChange(memberId, roles) {
    dispatch(MembersActions.updateMemberRequest(memberId, roles))
  }
  function handleInviteChange(event) {
    setInvite(event.target.value)
  }
  function handleInvite(event) {
    event.preventDefault()
    dispatch(MembersActions.inviteMemberRequest(invite))
  }
  return (
    <Modal size='big'>
      <h1>Members</h1>
      <Can checkPermission='invites_create'>
        <Invite onSubmit={handleInvite}>
          <input name='invite' placeholder='Share this team' value={invite} type='email' onChange={handleInviteChange} />
          <Button onClick={handleInvite} >Share</Button>
        </Invite>
      </Can>
      <form>
        <MembersList>
          {members.map(member => (
            <li key={member.id}>
              <strong>{member.user.name}</strong>
              <Can checkRole='administrator'>
                {can => (
                  <Select
                    isMulti
                    isDisabled={!can}
                    options={roles}
                    value={member.roles}
                    getOptionLabel={role => role.name}
                    getOptionValue={role => role.id}
                    onChange={value => handleRoleChange(member.id, value)}
                  />
                )}
              </Can>
            </li>
          ))}
        </MembersList>

        <Button filled={false} color='gray' onClick={handleMembersModal} >Cancel</Button>
      </form>

    </Modal>
  )
}

export default Members;