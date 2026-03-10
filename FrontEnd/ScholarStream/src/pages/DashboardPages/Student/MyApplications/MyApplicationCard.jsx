import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaCreditCard, FaStar } from "react-icons/fa";
import ApplicationDetailsModal from "../../../../components/modal/ApplicationDetailsModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ReviewModal from "../../../../components/modal/ReviewModal";

const MyApplicationCard = ({ app, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  let [isReviewOpen, setIsReviewOpen] = useState(false);
  const closeReviewModal = () => {
    setIsReviewOpen(false);
  };

  const axiosSecure = useAxiosSecure();
  const handlePayment = async () => {
    const paymentInfo = {
      scholarshipId: app?.scholarshipId,
      applicationId: app._id,
      scholarshipName: app?.scholarshipName,
      universityImage: app?.universityImage,
      universityName: app?.universityName,
      applicationFees: app?.applicationFees,
      serviceCharge: app?.serviceCharge,
      studentName: app?.student?.name,
      studentEmail: app?.student?.email,
    };

    try {
      const { data: result } = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      window.location.href = result?.url;
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  const handleDeleteApplication = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Your application for ${app.universityName} will be canceled even if you've paid!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#008000",
      confirmButtonText: "Delete It",
      cancelButtonText: "Keep",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/application/${app?._id}`);
          toast.success("Your application was deleted successfully");
          refetch();
        } catch (error) {
          toast.error(error.message || "Error");
        }
      }
    });
  };

  return (
    <>
      <tr>
        {/* University Name */}
        <td className="font-semibold">{app.universityName}</td>

        {/* Subject Category */}
        <td>{app?.subjectCategory}</td>

        {/* Feedback */}
        <td>
          {app?.feedback ? (
            <span className="text-success font-medium ">{app?.feedback}</span>
          ) : (
            <span className="text-base-content/50 italic">No feedback</span>
          )}
        </td>

        {/* Fees */}
        <td>${app?.applicationFees}</td>

        {/* Status Badge */}
        <td>
          <span
            className={`badge ${
              app?.applicationStatus === "Pending"
                ? "badge-warning"
                : app?.applicationStatus === "Processing"
                  ? "badge-info"
                  : app?.applicationStatus === "Completed"
                    ? "badge-success"
                    : "badge-error"
            }`}
          >
            {app?.applicationStatus}
          </span>
        </td>

        {/* Actions */}
        <td>
          <div className="flex flex-wrap gap-2 justify-center">
            {/* Details Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-xs btn-outline btn-info"
            >
              <FaEye /> Details
            </button>
            <ApplicationDetailsModal
              application={app}
              closeModal={closeModal}
              isOpen={isOpen}
            />

            {/* Edit (Only Pending) */}
            {app.applicationStatus === "Pending" && (
              <button
                onClick={() => {
                  toast.error(
                    "Nothing to edit at this moment as we've collected all your data through server",
                  );
                }}
                className="btn btn-xs btn-outline btn-warning"
              >
                <FaEdit /> Edit
              </button>
            )}

            {/* Pay (Pending + Due) */}
            {app?.applicationStatus === "Pending" &&
              app?.paymentStatus === "Due" && (
                <button
                  onClick={() => handlePayment()}
                  className="btn btn-xs btn-outline btn-primary"
                >
                  <FaCreditCard /> Pay
                </button>
              )}

            {/* Delete (Only Pending) */}
            {app?.applicationStatus === "Pending" && (
              <button
                onClick={() => handleDeleteApplication()}
                className="btn btn-xs btn-outline btn-error"
              >
                <FaTrash /> Delete
              </button>
            )}

            {/* Add Review (Only Completed) */}
            {app?.applicationStatus === "Completed" && (
              <button
                onClick={() => setIsReviewOpen(true)}
                className="btn btn-xs btn-outline btn-success"
              >
                <FaStar /> Add Review
              </button>
            )}
            <ReviewModal
              isReviewOpen={isReviewOpen}
              closeReviewModal={closeReviewModal}
              scholarshipId={app.scholarshipId}
              applicationId={app?._id}
              scholarshipName={app?.scholarshipName}
              universityName={app?.universityName}
              student={app?.student}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default MyApplicationCard;
