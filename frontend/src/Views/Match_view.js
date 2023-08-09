// import  {Match}  from "../components/Match/Match.js";
import { MatchTwo } from "../components/Match/Match.js";
// import { useAppContext } from '../Context/AppContext's

// import RingLoader from "react-spinners/RingLoader";


function MatchView() {
  // const value = useAppContext();

  return (
    <>
      {/* <RingLoader
        color={"#fff"}
        size={200}
      /> */}
      <div className='container d-flex justify-content-center align-items-center'>
      <MatchTwo/>
      </div>
    </>
  );
}
export default MatchView;