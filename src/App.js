
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Appointments from './components/appointments/Appointments';
import CreateAppointment from './components/appointments/CreateAppointment';
import EditAppointment from './components/appointments/EditAppointment';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Appointments />} />
            <Route path="/new" element={<CreateAppointment />} />
            <Route path="/edit/:id" element={<EditAppointment />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
