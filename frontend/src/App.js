
import './App.css';

import {  BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Form from './pages/Form';
import { ToastContainer } from 'react-toastify';
import Navbar from './component/Navbar';
import Yourpost from './pages/Yourpost';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Setting from './pages/Setting';
import Singlepage from './pages/Singlepage';


function App() {
  let store=useContext(AuthContext)
  // console.log(store)
console.log(store.userDetail.login)
 let value=store.userDetail.login
  return (
    <div className="App">
<BrowserRouter>
<Navbar/>
<Routes>
{value &&<Route path='/' element={<Home/>}/>}
{!value &&<Route path='/' element={<Navigate to={'/login'}/>}/>}
   {!value && <Route path='/login' element={<Login/>}/>}

   {value && <Route path='/login' element={<Navigate to={'/'}/>}/>}
    <Route path='/form' element={<Form/>}/>
    <Route path='/signup' element={<Signup/>}/>
    {value &&<Route path='/mypost' element={<Yourpost/>}/>}
    {!value &&<Route path='/mypost' element={<Navigate to={'/login'}/>}/>}
    <Route path='/setting' element={<Setting/>}/>
    <Route path='/single' element={<Singlepage/>}/>
</Routes>
  <ToastContainer />
</BrowserRouter>


    </div>
  );
}

export default App;
