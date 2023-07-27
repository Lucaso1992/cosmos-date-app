import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import {routes} from './Routes/Routes'

import './App.css';

function App() {
  return (
    <BrowserRouter basename='/'>
      <NavBar />

      <Routes>
        { routes.map(route=> <Route {...route} key={route.path} />) }
      </Routes>

      {/* <Footer text="Copyright © Geovanny Valladares 2023"/> */}
    </BrowserRouter>
  );
}

export default App;
