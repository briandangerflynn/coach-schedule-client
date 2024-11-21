import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function StudentButtons({appointmentId, setAppointments}){
  const { token, user } = useAuth();

  const handleBookAppointment = async (appointmentId) => {
    try {
      const resp = await axios.put(`http://localhost:3000/appointments/${appointmentId}`, { appointment: { student_id: user.id } },{
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookedAppointment = resp.data;

      setAppointments(prevAppointments => {
        return prevAppointments.map(appointment =>
          appointment.id === appointmentId ? bookedAppointment : appointment
        );
      });
    } catch (err) {
      console.error('Error booking appointment:', err);
    };
  };

  return <button onClick={()=> handleBookAppointment(appointmentId)}>Book Appointment</button>;
}