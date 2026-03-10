import Marquee from "react-fast-marquee";
import BBC from "../assets/Images/BBC.png";

const logos = [
  { src: BBC, alt: "BBC" },
  {
    src: "https://i.ibb.co/kVhBsn4L/Princeton-University.png",
    alt: "Princeton University",
  },
  {
    src: "https://i.ibb.co/JRY2nnJK/University-of-Toronto.webp",
    alt: "University of Toronto",
  },
  { src: "https://i.ibb.co/4ZKYX8Zs/ETH-Zurich.jpg", alt: "ETH Zurich" },
  {
    src: "https://i.ibb.co/ZzMPDNGk/Berlin-Technical-Institute.jpg",
    alt: "Berlin Technical Institute",
  },
  { src: "https://i.ibb.co/4nk3Zxhk/MIT.png", alt: "MIT" },
  {
    src: "https://i.ibb.co/nqpyySSx/harvard-university-logo-png-seeklogo-284458.png",
    alt: "Harvard University",
  },
];

const Partners = () => (
  <div className="py-10">
    <p className="text-center text-sm uppercase tracking-widest text-base-content/50 mb-6">
      Trusted by top institutions
    </p>
    <Marquee pauseOnHover speed={50}>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="mx-8 w-24 md:w-32 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
        />
      ))}
    </Marquee>
  </div>
);

export default Partners;
