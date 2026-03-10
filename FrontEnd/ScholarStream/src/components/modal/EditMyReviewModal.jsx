import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import StarRating from "./StarRating";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditMyReviewModal = ({
  reviewId,
  closeModal,
  isOpen,
  ratingPoint,
  reviewComment,
  refetch,
}) => {
  const [rating, setRating] = useState(ratingPoint);
  const [review, setReview] = useState(reviewComment);
  const axiosSecure = useAxiosSecure();

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!review.trim()) {
      toast.error("Review  cannot be empty");
      return;
    }

    if (review === reviewComment && rating === ratingPoint) {
      toast.error("Can not submit without updating");
      return;
    }

    const updatedReviewData = {
      ratingPoint: rating,
      review,
      reviewEditDate: new Date().toISOString().split("T")[0],
    };
    //     console.log(updatedReviewData);

    try {
      await axiosSecure.patch(`/review/${reviewId}`, updatedReviewData);

      toast.success(
        "We appreciate your feedback! Your review has been submitted.",
      );
      refetch();
      closeModal();
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className={" relative z-10 focus:outline-none"}
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-base-100 p-6 border border-base-300 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-xl font-semibold text-center leading-6 text-primary"
            >
              Add Review
            </DialogTitle>

            <div className="p-6 space-y-4">
              {/* ⭐ Star Rating */}
              <div>
                <p className="font-medium mb-2">Your Rating</p>
                <StarRating rating={rating} setRating={setRating} />
              </div>

              {/* Review Comment */}
              <textarea
                defaultValue={review}
                className="textarea textarea-bordered w-full"
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              {/* Submit */}
              <button
                onClick={handleSubmitReview}
                className="btn btn-primary w-full"
                disabled={rating === 0}
              >
                Submit Review
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditMyReviewModal;
