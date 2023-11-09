import React from 'react';

const Places = ({ places, vacations }) => {
  return (
    <div>
      <h2>Places ({ places.length })</h2>
      <ul>
        {
          places.map( place => {
            return(
              <li key={ place.id }>
                { place.name }
                ({ vacations.filter(vacation => vacation.place_id == place.id).length })
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};

export default Places;