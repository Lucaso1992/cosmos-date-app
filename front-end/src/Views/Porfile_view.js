import {Porfile} from "../components/Porfile/Porfile";
// import { useAppContext } from '../Context/AppContext'

// import RingLoader from "react-spinners/RingLoader";


function PorfileView() {
  // const value = useAppContext();

  return (
    <>
      {/* <RingLoader
        color={"#fff"}
        size={200}
      /> */}
      <div className='container'>
        <Porfile />
      </div>
    </>
  );
}
export default PorfileView;