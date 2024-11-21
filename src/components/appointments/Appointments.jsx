import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Appointment from "./Appointment";
import { sortAppointments } from "./utils";

export default function Appointments(){
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      };
    }

    if (token) {
      getAppointments();
    } else {
      navigate("/login")
    }
  }, [token]);

  const sortedAppointments = sortAppointments(appointments);

  return(
      <div>
        <h2>Appointments</h2>
        {user?.role === "coach" && <Link to="/new"><button>Add Availability</button></Link>}
        {sortedAppointments.length > 0 && sortedAppointments.map((appointment)=>(
          <div key={appointment.id + Math.random()} className="appointment">
            <Appointment 
              appointment={appointment}
              user={user}
              setAppointments={setAppointments}
            />
          </div>
        ))}
      </div>
  )
}