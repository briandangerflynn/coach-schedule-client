import { useAuth } from "../../context/AuthContext";
import ActionButtons from "./ActionButtons";
import { appointmentComplete, formattedDate, printName } from "./utils";

export default function Appointment({appointment, setAppointments}){
  const { user } = useAuth();
  const { coach, student, start_time, end_time, rating, notes} = appointment;

  return(
    <>
      {student && <span className="tag booked-tag">Booked</span>}
      {!student && !appointmentComplete(end_time) && <span className="tag open-tag">Open for Booking</span>}
      {appointmentComplete(end_time) && <span className="tag complete-tag">Complete</span>}

      <h3>Coach: {printName(coach)}</h3>
      <h3>Student: {printName(student)}</h3>
      <p>Time: {formattedDate(new Date(start_time))} &ndash; {formattedDate(new Date(end_time))}</p>
      <p>Coach Phone: {student ? coach.phone : "TBD"}</p>
      <p>Student Phone: {student ? student.phone : "TBD"}</p>
      { user?.role === "coach" &&
        <>
          <p>Satisfaction Rating: {rating || "TBD"}</p>
          <p>Notes: {notes || "TBD"}</p>
        </>
      }
      <ActionButtons
        appointment={appointment}
        setAppointments={setAppointments}
      />
    </>
  )
}