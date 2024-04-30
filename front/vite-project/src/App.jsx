import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [mentorName, setMentorName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateMentor = async () => {
    try {
      const response = await axios.post('http://localhost:3000/mentors', { name: mentorName });
      if (response && response.data && response.data._id) {
        setMessage(`Mentor created with ID: ${response.data._id}`);
      } else {
        setMessage('Error creating mentor: Invalid response format');
      }
    } catch (error) {
      setMessage(`Error creating mentor: ${error.response.data.error}`);
    }
  };
  
  

  const handleCreateStudent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/students', { name: studentName, mentorId });
      setMessage(`Student created with ID: ${response.data._id}`);
    } catch (error) {
      setMessage(`Error creating student: ${error.response.data.error}`);
    }
  };

  const handleAssignStudentToMentor = async () => {
    try {
      await axios.post(`http://localhost:3000/mentors/${mentorId}/students`, { studentId });
      setMessage('Student assigned to mentor successfully');
    } catch (error) {
      setMessage(`Error assigning student to mentor: ${error.response.data.error}`);
    }
  };

  const handleSetStudentMentor = async () => {
    try {
      await axios.put(`http://localhost:3000/students/${studentId}/mentor`, { mentorId });
      setMessage('Mentor assigned to student successfully');
    } catch (error) {
      setMessage(`Error setting mentor for student: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h1>Frontend</h1>
      <div>
        <input type="text" placeholder="Mentor Name" value={mentorName} onChange={(e) => setMentorName(e.target.value)} />
        <button onClick={handleCreateMentor}>Create Mentor</button>
      </div>
      <div>
        <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleCreateStudent}>Create Student</button>
      </div>
      <div>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleAssignStudentToMentor}>Assign Student to Mentor</button>
      </div>
      <div>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        <input type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <button onClick={handleSetStudentMentor}>Set Mentor for Student</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

