export const formattedDate = (date) => {
  return `${date.toLocaleDateString('en-US', {timeZone: 'UTC' })} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}`;
};

export const printName = (user) => {
  return user ? `${user.first_name} ${user.last_name}` : "TBD";
};

export const appointmentComplete = (endDate) => {
  const currentTime = new Date();
  const appointmentEndTime = new Date(endDate.slice(0, -1));
  console.log(currentTime)
  console.log(appointmentEndTime)

  return appointmentEndTime < currentTime;
};

export const sortAppointments = (appointments) => {
  return appointments.sort((a, b) => {
    // First, sort by whether student_id is null (appointments without student_id come first)
    if (a.student_id === null && b.student_id !== null) {
      return -1; // a should come before b
    } else if (a.student_id !== null && b.student_id === null) {
      return 1; // b should come before a
    }
  
    // If both have or both don't have student_id, sort by start_time
    return new Date(a.start_time) - new Date(b.start_time);
  });
}


