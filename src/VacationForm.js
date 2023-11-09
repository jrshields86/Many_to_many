import React, { useState } from 'react';


const VacationForm = ({ places, users, bookVacation }) => {
  const [placeId, setPlaceId] = useState('');
  const [userId, setUserId] = useState('');
  const [note, setNote] = useState('');

  const save = async(ev) => {
    ev.preventDefault();
    const vacation = {
      user_id: userId,
      place_id: placeId,
      note
    };
    await bookVacation(vacation);
    setPlaceId('');
    setUserId('');
    setNote('');
  }
  return (
    <form onSubmit={ save }>
      <select value={ userId } onChange={ ev => setUserId(ev.target.value)}>
        <option value={''}>-- choose a user --</option>
        {
          users.map(user => {
            return (
              <option key={ user.id } value={ user.id }>{ user.name }</option>
            )
          })
        }
      </select>
      <select value={ placeId } onChange={ ev => setPlaceId(ev.target.value) }>
        <option value={''}>-- choose a place --</option>
        {
          places.map(place => {
            return (
              <option key={ place.id} value={ place.id }>{ place.name }</option>
            )
          })
        }
      </select>
      <input value={ note } onChange={ev => setNote(ev.target.value)}/>
      <button disabled={ !placeId || !userId || !note }>Create</button>
    </form>
  )
}

export default VacationForm;