const Container = ({ children, classes }) => {
  return (
    <div
      className={`max-w-screen-2xl mx-auto xl:px-20 md:px-5 sm:px-2 px-2 ${classes}`}
    >
      {children}
    </div>
  );
};

export default Container;
