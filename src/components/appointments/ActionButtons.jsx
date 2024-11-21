import { useAuth } from "../../context/AuthContext";
import StudentButtons from "./StudentButtons";
import CoachButtons from "./CoachButtons";

export default function ActionButtons({appointment, setAppointments}) {
  const { user } = useAuth();

  if(user?.role === "coach"){
    return(
      <CoachButtons appointmentId={appointment.id} setAppointments={setAppointments} />
    ) 
  } else if(user?.role === "student" && appointment.student_id === null){
    return (
      <StudentButtons appointmentId={appointment.id} setAppointments={setAppointments} />
    )
  };

  return null;
}