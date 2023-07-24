import Home from '../Views/Home_view';
import LandingView from '../Views/Landing_view';
import MatchView from '../Views/Match_view';
import PorfileView from '../Views/Porfile_view';


 export const routes = [
  {
    path: '/',
    element: <LandingView />
  },
  {
    path: '/Home',
    element: <Home />
  },
  {
    path: '/Match',
    element: <MatchView />
  },
  {
    path: '/Porfile',
    element: <PorfileView />
  }
]