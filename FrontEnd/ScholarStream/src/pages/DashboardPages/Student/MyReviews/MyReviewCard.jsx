import toast from "react-hot-toast";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import EditMyReviewModal from "../../../../components/modal/EditMyReviewModal";

const MyReviewCard = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteReview = () => {
    Swal.fire({
      title: "Delete Review?",
      text: `Your review on ${review?.scholarshipName} at ${review?.universityName} will be deleted !`,
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
        {/* Scholarship & University */}
        <div>
          <h3 className="font-semibold text-lg">{review.scholarshipName}</h3>
          <p className="text-sm text-gray-500">{review.universityName}</p>
        </div>

        {/* Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= review.ratingPoint ? "text-yellow-400" : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Review Comment */}
        <p className="text-sm text-gray-700">{review.reviewComment}</p>

        {/* Review Date */}
        <p className="text-xs text-gray-400">Reviewed on {review.reviewDate}</p>
        {/* Edit Date */}
        {review?.reviewEditDate && (
          <p className="text-xs text-gray-400">
            Edited on {review?.reviewEditDate}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm btn-outline btn-warning flex-1"
        >
          <FaEdit /> Edit
        </button>
        <EditMyReviewModal
          reviewId={review?._id}
          isOpen={isOpen}
          closeModal={closeModal}
          ratingPoint={review?.ratingPoint}
          reviewComment={review?.reviewComment}
          refetch={refetch}
        />

        <button
          onClick={() => deleteReview()}
          className="btn btn-sm btn-outline btn-error flex-1"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default MyReviewCard;
