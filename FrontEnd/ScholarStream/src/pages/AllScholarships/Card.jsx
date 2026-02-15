import { Link } from "react-router";
import Button from "../../components/shared/Button/Button";

const Card = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    scholarshipCategory,
    applicationFees,
    degree,
    applicationDeadline,
  } = scholarship;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl hover:scale-105 animation   transition-shadow duration-300 h-full">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-5 flex flex-col">
        {/* Scholarship Title */}
        <h2 className="text-lg font-bold line-clamp-2">{scholarshipName}</h2>

        {/* University */}
        <p className="text-sm text-gray-500">{universityName}</p>

        {/* Location */}
        <p className="text-sm">
          📍 {universityCity}, {universityCountry}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-outline badge-sm">{degree}</span>
          <span className="badge badge-primary badge-sm">
            {scholarshipCategory}
          </span>
        </div>

        {/* Fees & Deadline */}
        <div className="mt-4 text-sm space-y-1">
          <p>
            <span className="font-semibold">Application Fee:</span>{" "}
            {applicationFees === 0 ? "Free" : `$${applicationFees}`}
          </p>
          <p>
            <span className="font-semibold">Deadline:</span>{" "}
            {applicationDeadline}
          </p>
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">
          <Link to={`/scholarship/${_id}`}>
            {/* <Button label={'View Details'} full_Width={true}/> */}
            <button className="btn btn-primary btn-sm w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
