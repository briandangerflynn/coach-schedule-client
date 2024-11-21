import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appointmentComplete } from "./utils";

export default function EditAppointment(){
  const { token } = useAuth()
  const navigate = useNavigate();
  const { id } = useParams();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rating, setRating] = useState(null);
  const [notes, setNotes] = useState(null);

  const getAppointment = async ()  => {
    try {
      const resp = await axios.get(`http://localhost:3000/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appointment = resp.data;
      setStartTime(appointment.start_time);
      setEndTime(appointment.end_time);
      setRating(appointment.rating);
      setNotes(appointment.notes);
    } catch (error) {
      console.error('Error fetching appointment:', error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAppointment = {
      appointment: {
        start_time: startTime,
        rating,
        notes
      }
    };

    try {
      const resp = await axios.put(`http://localhost:3000/appointments/${id}`, updatedAppointment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const appointment = resp.data;

      setStartTime(appointment.start_time);
      setRating(appointment.rating);
      setNotes(appointment.notes);

      navigate('/');
    } catch (err) {
      console.error('Error editing appointment:', err);
    }
  }

  useEffect(() => {
    getAppointment();
  }, [])

  return (
    <div>
      <h3>Edit Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <p><label htmlFor="startTime">StartTime:</label></p>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime ? new Date(startTime) : new Date()}
              onChange={(e) => setStartTime(e.target.value)}
            />
        </div>

        {appointmentComplete(endTime) &&
          <>
            <div>
              <p><label htmlFor="rating">Rating:</label></p>
              <input
                id="rating"
                type="number" 
                min="1" 
                max="5" 
                step="1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <p><label htmlFor="notes">Notes</label></p>
              <textarea
                type="textbox"
                id="notes"
                checked={notes}
                onChange={(e) => setNotes(e.target.value)}
              />    
            </div>
          </>
        }
        <br />

        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
}
