import './App.css';
import {Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WrongRoute from './Components/WrongRoute';
function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<WrongRoute />} />
          <Route />
        </Routes>
    </div>
  );
}

export default App;
