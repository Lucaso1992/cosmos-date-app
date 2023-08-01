import {Match} from "../components/Match/Match";
import {userMatches} from "../flux/DataUser.js";
// import { useAppContext } from '../Context/AppContext'

// import RingLoader from "react-spinners/RingLoader";


function MatchView() {
  // const value = useAppContext();

  return (
    <>
      {/* <RingLoader
        color={"#fff"}
        size={200}
      /> */}
   <div className='container d-flex'>
      {userMatches.map(item => <Match imageName={item.imageName} user_name={item.user_name} user_age={item.user_age} user_city={item.user_city} user_distance={item.user_distance} astro_data={item.astro_data} general_information={item.general_information}/>)}
      </div>
    </>
  );
}
export default MatchView;