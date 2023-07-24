import {Match} from "../components/Match/Match";
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
      <div className='container'>
        <Match />
      </div>
    </>
  );
}
export default MatchView;