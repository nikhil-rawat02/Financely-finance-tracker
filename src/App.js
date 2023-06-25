import './App.css';
import {Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/dashbord' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route />
        </Routes>
    </div>
  );
}

export default App;
