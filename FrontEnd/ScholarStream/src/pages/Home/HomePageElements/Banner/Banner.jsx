import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      interval={4000}
      showThumbs={false}
      showStatus={false}
    >
      <div className="relative w-full">
        <img
          src="https://i.ibb.co.com/TMGtLNkk/668609889-16-9.avif"
          className="w-full h-full object-cover"
          alt="Scholarship Banner"
        />
        <div className="absolute inset-0 text-center font-bold md:pl-10 flex flex-col   justify-center items-center md:justify-end md:items-start md:pb-20">
          <h2 className="text-3xl md:text-5xl lg:text-7xl  text-white">
            Unlock Global <span className="text-accent">Opportunities</span>
          </h2>
          <p className="text-lg text-white lg:text-3xl my-1 md:my-4 ">
            Find Fully Funded Scholarships Worldwide...
          </p>
          <Link
            to={"all-scholarships"}
            className="btn mb-6 btn-sm md:btn-md hover:btn-accent hover:text-white animation mx-auto md:mx-0"
          >
            View Scholarships
          </Link>
        </div>
      </div>

      <div className="relative w-full">
        <img
          src="https://i.ibb.co.com/zV2tW7ws/Study-Abroad-Scholarships-1.jpg"
          className="w-full h-full object-cover"
          alt="Scholarship Banner"
        />
        <div className="absolute inset-0 text-center font-bold md:pl-10 flex flex-col  justify-center items-center md:justify-end md:items-start md:pb-20">
          <h2 className="text-3xl md:text-5xl lg:text-7xl  text-primary">
            Scholar<span className="text-accent">Stream</span>
          </h2>
          <p className="text-lg text-accent lg:text-3xl my-1 md:my-4 ">
            Your Gateway to Academic Excellence...
          </p>
          <Link
            to={"all-scholarships"}
            className="btn mb-6 btn-sm md:btn-md hover:btn-accent hover:text-white animation mx-auto md:mx-0"
          >
            View Scholarships
          </Link>
        </div>
      </div>

      <div className="relative w-full">
        <img
          src="https://i.ibb.co.com/KzjvjSdf/Getty-Images-542075463.webp"
          className="w-full h-full object-cover"
          alt="Scholarship Banner"
        />
        <div className="absolute inset-0 text-center font-bold md:pl-10 flex flex-col  justify-center items-center md:justify-end md:items-start md:pb-20">
          <h2 className="text-3xl md:text-5xl lg:text-7xl  text-white">
            Shape Your <span className="text-accent">Future</span>{" "}
          </h2>
          <p className="text-lg text-white lg:text-3xl my-1 md:my-4 ">
            Apply to Your Desired Top Ranked Universities...
          </p>
          <Link
            to={"all-scholarships"}
            className="btn mb-6 btn-sm md:btn-md hover:btn-accent hover:text-white animation mx-auto md:mx-0"
          >
            View Scholarships
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
