import {Home} from "../components/Home/Home";
// import { useAppContext } from '../Context/AppContext'

// import RingLoader from "react-spinners/RingLoader";


function Home_view() {
  // const value = useAppContext();

  return (
    <>
      {/* <RingLoader
        color={"#fff"}
        size={200}
      /> */}
      <div className='container'>
        <Home />
      </div>
    </>
  );
}
export default Home_view;