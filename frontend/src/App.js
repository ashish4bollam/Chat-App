import logo from './logo.svg';
import './App.css';
import Navig from './components/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import { Chat } from '@material-ui/icons';
import F from './pages/F';
import Chat from './pages/Chat';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppContext,socket } from './myContext/myContext';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);
  return (

    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
    <BrowserRouter>

      <Navig></Navig>
      {/* <Home/> */}
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element ={<Login/>}></Route>
        <Route path='/signup' element ={<SignUp/>}></Route>
        <Route path='/chat' element ={<Chat/>}></Route>
      </Routes>
  
     
      
      </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
