import { useSelector } from "react-redux";
import { isLoading } from "./allSelector";

export default function Loader() {
  const roleLoader = useSelector(isLoading);
  return (
    <>
      {roleLoader && (
        <div className="mainLoader">
          <div className="lds-ripple">
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
