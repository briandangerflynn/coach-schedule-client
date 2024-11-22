import { useAuth } from "../../context/AuthContext";
import StudentButtons from "./StudentButtons";
import CoachButtons from "./CoachButtons";
import { appointmentComplete } from "./utils";

export default function ActionButtons({appointment, setAppointments}) {
  const { user } = useAuth();
  const bookable = user?.role === "student" && 
    appointment.student_id === null && 
    !appointmentComplete(appointment.end_time);

  if(user?.role === "coach"){
    return(
      <CoachButtons appointmentId={appointment.id} setAppointments={setAppointments} />
    ) 
  } else if(bookable){
    return (
      <StudentButtons appointmentId={appointment.id} setAppointments={setAppointments} />
    )
  };

  return null;
}