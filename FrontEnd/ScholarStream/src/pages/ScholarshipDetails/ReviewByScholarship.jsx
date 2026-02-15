import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaStar } from "react-icons/fa";
import Loader from "../../components/shared/Loader";

const ReviewByScholarship = ({ id }) => {
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    enabled: !!id,
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_base_URL}/scholarship-review/${id}`,
      );
      return data;
    },
  });
  // console.log(reviews);

  if (reviewsLoading) {
    return <Loader />;
  }
  if (reviewsError) {
    return <p className="text-center text-red-300"> Couldn't load reviews </p>;
  }
  if (!reviews.length) {
    return (
      <p className="text-center font-bold text-lg">
        No review available for this Scholarship
      </p>
    );
  }

  return (
    <section className=" my-6">
      <h2 className="text-xl text-center font-bold">Student Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review) => (
          <div
            key={review?._id}
            className="bg-base-100 shadow rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            {/* Top Section */}
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={review?.studentImage}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review?.studentName}</p>
                  <p className="text-xs text-gray-400">{review.studentEmail}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= review?.ratingPoint
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-sm text-gray-700">{review?.reviewComment}</p>

              {/* Review Date */}
              <p className="text-xs text-gray-400">
                Posted on {review?.reviewDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewByScholarship;
