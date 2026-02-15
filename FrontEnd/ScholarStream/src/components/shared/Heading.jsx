const Heading = ({ title, subtitle, center }) => {
  return (
    <div
      className={`${center ? "text-center" : "text-start"} poppins-original`}
    >
      <div className="text-5xl font-bold text-primary">{title}</div>
      <div className="font-light mt-2 text-base text-secondary">{subtitle}</div>
    </div>
  );
};

export default Heading;
