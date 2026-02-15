import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageReviewCard = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Review?",
      text: `${review.studentName}'s review on ${review?.scholarshipName} at ${review?.universityName} will be deleted !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/review/${review._id}`);
          toast.success("Review Deleted Successfully");
          refetch();
        } catch (error) {
          toast.error(error.message || "Error");
        }
      }
    });
  };

  return (
    <div className="bg-base-100 shadow rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition">
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
            <p className="text-xs text-gray-400">{review?.studentEmail}</p>
          </div>
        </div>

        {/* Scholarship Info */}
        <div>
          <h3 className="font-semibold text-lg">{review?.scholarshipName}</h3>
          <p className="text-sm text-gray-500">{review?.universityName}</p>
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
        <p className="text-xs text-gray-400">Posted on {review?.reviewDate}</p>
      </div>

      {/* Delete Button */}
      <div className="mt-4">
        <button
          onClick={() => handleDelete()}
          className="btn btn-sm btn-outline btn-error w-full"
        >
          <FaTrash /> Delete Review
        </button>
      </div>
    </div>
  );
};

export default ManageReviewCard;
