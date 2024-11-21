import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function CreateAppointment(){
  const { token, user } = useAuth();
  const [start_time, setStartTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      appointment: { 
        start_time, 
        coach_id: user.id 
      },
    };

    try {
      await axios.post('http://localhost:3000/appointments', newAppointment, {
        headers: { Authorization: `Bearer ${token}` },
      })

      navigate('/');
    } catch (err) {
      console.error('Error creating appointment:', err);
    };
  };

  return (
    <div>
      <h2>Add a New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={start_time}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};
