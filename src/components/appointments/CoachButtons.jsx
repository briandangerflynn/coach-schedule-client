import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function CoachButtons({ appointmentId, setAppointments }){
  const { token } = useAuth();

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    } catch (err) {
      console.error('Error fetching appointments:', err);
    };
  };

  return(
    <div>
      <Link to={`/edit/${appointmentId}`}><button>Edit</button></Link>
      <button onClick={() => handleDelete(appointmentId)}>Delete</button>
    </div>
  )
}