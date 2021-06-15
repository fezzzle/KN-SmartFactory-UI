import FactoryTableContainer from "../components/Factory/Containers/FactoryTableContainer"
import { useSelector } from "react-redux";
import { Spinner } from 'reactstrap';

const Factory = () => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  console.log(isLoading, "INSIDE THE ROOT FACTORY VIEW")
  return isLoading ?
    (<div
      className="d-flex justify-content-center align-items-center"
      data-testid="spinner"
    >
      <Spinner
        style={{ width: "2rem", height: "2rem", marginTop: "10rem" }}
        type="grow"
        color="primary"
      />
    </div>) : (<FactoryTableContainer />)

};

export default Factory;
