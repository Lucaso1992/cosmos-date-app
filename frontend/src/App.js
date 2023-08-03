import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import {routes} from './Routes/Routes'
import {Chats} from './components/Chats/Chats'

import './App.css';

function App() {
  return (
    <BrowserRouter basename='/'>
      <NavBar />

      <Routes>
        { routes.map(route=> <Route {...route} key={route.path} />) }
      </Routes>

      <Chats />
    </BrowserRouter>
  );
}

export default App;
