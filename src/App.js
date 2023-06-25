import './App.css';
import {Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard/index';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/dashbord' element={<Dashboard />} />
          <Route />
        </Routes>
    </div>
  );
}

export default App;
