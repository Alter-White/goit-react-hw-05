import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
