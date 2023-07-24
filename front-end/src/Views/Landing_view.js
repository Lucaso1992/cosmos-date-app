import {LandingPage} from "../components/Landing_Page/LandingPage";
// import { useAppContext } from '../Context/AppContext'

// import RingLoader from "react-spinners/RingLoader";


function LandingView() {
  // const value = useAppContext();

  return (
    <>
      {/* <RingLoader
        color={"#fff"}
        size={200}
      /> */}
      <div className='container'>
        <LandingPage />
      </div>
    </>
  );
}
export default LandingView;