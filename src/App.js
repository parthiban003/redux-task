import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Form from './Components/Form';


function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Form/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
