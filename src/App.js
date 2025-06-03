import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Form from './Components/Form';
import './Components/Form.css'

import Profile from './Components/Profile';


function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/Profile' element={<Profile/>}/>

      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
