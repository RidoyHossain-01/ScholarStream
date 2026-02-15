import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import StarRating from "./StarRating";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loader from "../shared/Loader";

const ReviewModal = ({
  closeReviewModal,
  isReviewOpen,
  applicationId,
  scholarshipId,
  student,
  scholarshipName,
  universityName,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Review  cannot be empty");
      return;
    }

    const reviewData = {
      applicationId: applicationId,
      scholarshipId: scholarshipId,
      scholarshipName,
      universityName,
      ratingPoint: rating,
      reviewComment,
      studentName: student?.name,
      studentEmail: student?.email,
      studentImage: user?.photoURL,
      reviewDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success(
        "We appreciate your feedback! Your review has been submitted.",
      );
    } catch (error) {
      toast.error(error.message || "Error");
    }

    closeReviewModal();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Dialog
      open={isReviewOpen}
      as="div"
      className={" relative z-10 focus:outline-none"}
      onClose={closeReviewModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
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
                className="textarea textarea-bordered w-full"
                placeholder="Write your review..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
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

export default ReviewModal;
