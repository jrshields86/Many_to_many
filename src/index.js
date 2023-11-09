import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Vacations from './Vacations';
import VacationForm from './VacationForm';
import Users from './Users';
import Places from './Places';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [vacations, setVacations] = useState([]);

  const dict = vacations.reduce((acc, vacation)=>{
    acc[vacation.place_id] = acc[vacation.place_id] || 0;
    acc[vacation.place_id]++;
    return acc;
  }, {});
  const max = Math.max(...Object.values(dict));
  const entries = Object.entries(dict);
  const popularIds = entries.filter(entry => entry[1] === max).map(entry => entry[0]*1);
  const popular = places.filter(place => popularIds.includes(place.id));


  useEffect(() => {
    const fetchData = async ()=> {
      const response = await axios.get('/api/vacations');
      setVacations(response.data)
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async ()=> {
      const response = await axios.get('/api/users');
      setUsers(response.data)
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async ()=> {
      const response = await axios.get('/api/places');
      setPlaces(response.data)
    }
    fetchData();
  }, []);

  const bookVacation = async(vacation)=> {
    const response = await axios.post('/api/vacations', vacation);
    setVacations([...vacations, response.data])
  };

  const cancelVacation = async (vacation)=> {
    await axios.delete(`/api/vacations/${ vacation.id }`)
    setVacations(vacations.filter(_vacation => _vacation.id !== vacation.id))
  };

  const createUser = async(user)=> {
    const response = await axios.post('/api/users', user);
    setUsers([...users, response.data])
  };
  
  return (
    <div>
      <h1>Vacation Planner</h1>

      {
        popular.length ?
      (<div>Most popular trips are: {
        popular.map(place => {
          return(
            <span key={place.id}>{ place.name },</span>
          );
        })
      }</div>)
      : null
    }
      <VacationForm places={ places } users={ users } bookVacation={ bookVacation }/>
      <main>
        <Vacations vacations={ vacations } places={ places } cancelVacation={ cancelVacation } users={ users }/>
        <Users users={ users } vacations={ vacations } createUser={ createUser }/>
        <Places places={ places } vacations={ vacations }/>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
