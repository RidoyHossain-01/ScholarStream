import { Oval, Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center">
        <Oval
          height="60"
          width="60"
          color="#D71313"
          secondaryColor="#2C344E"
          animationDuration={1}
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
