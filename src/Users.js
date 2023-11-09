import React, { useState } from 'react';

const Users = ({ users, vacations, createUser }) => {
  const [name, setName] = useState('');
  const save = async(ev) => {
    ev.preventDefault();
    const user = {
      name
    }
    await createUser(user);
    setName('')
  }
  return (
    <div>
      <h2>Users ({ users.length })</h2>
      <ul>
        {
          users.map(user => {
            return (
              <li key={ user.id }>
                { user.name }
                ({ vacations.filter(vacation => vacation.user_id == user.id).length })
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={ save }>
        <input placeholder='add name' value={ name } onChange={ev => setName(ev.target.value)}/>
        <button disabled={ !name }>Create User</button>
      </form>
    </div>
  )
};

export default Users;