import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WrongRoute from './Components/WrongRoute';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
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
