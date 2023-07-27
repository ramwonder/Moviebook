import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Front from './Components/Front';
import Login from './Components/login';
import Register  from './Components/register'

//import Dash from './Components/Dash';
 import User from './Components/User/Getmovie';
 import Search1 from './Components/User/searchbyuser';
 import Admin from './Components/Admin/Getmovie';
 import Search from './Components/Admin/search';
 import Success from './Components/sucess';
 import MovieSeatPicker from './Components/User/Movieseatbook';
import Forgetpwd from './Components/forget';

import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
   
    <BrowserRouter>
    <div>
     
    
      <Routes>
        <Route path='/' element={<Front/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/register1' element={<Register/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/search'element={<Search/>}/>
        <Route path='/searchmovie'element={<Search1/>}/>
        <Route path='/success'element={<Success/>}/>
        <Route path='/movieseat'element={<MovieSeatPicker/>}/>
        <Route path='/forget'element={<Forgetpwd/>}/>

      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
