import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaCommentDots, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import ApplicationDetailsModal from "../../../../components/modal/ApplicationDetailsModal";
import ApplicationFeedback from "../../../../components/modal/ApplicationFeedback";
import Swal from "sweetalert2";

const ApplicationCard = ({ application, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register } = useForm();
  let [isOpen, setIsOpen] = useState(false);
  let [feedbackOpen, setFeedbackOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const closeFeedback = () => {
    setFeedbackOpen(false);
  };
  const handleRejectApplication = () => {
    Swal.fire({
      title: "Reject?",
      text: `Reject the application of ${application?.student?.name} at ${application?.universityName}`,
      icon: "warning",
      confirmButtonText: "Reject",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/application-status/${application._id}`, {
            applicationStatus: "Rejected",
          });
          refetch();
          toast.success("Application Regected");
        } catch (error) {
          toast.error(` Error Message ${error.message} `);
        }
      }
    });
  };
  // console.log(application._id);

  return (
    <tbody>
      <tr>
        {/* Name */}
        <td className="font-medium">{application?.student?.name}</td>

        {/* Email */}
        <td className="text-sm">{application?.student?.email}</td>

        {/* University */}
        <td>{application?.universityName}</td>

        {/* Feedback */}
        <td>
          {application?.feedback ? (
            <span className="badge badge-success badge-outline">Provided</span>
          ) : (
            <span className="badge badge-warning badge-outline">None</span>
          )}
        </td>

        {/* Application Status */}
        <td>
          <span
            className={`badge ${
              application?.applicationStatus === "Pending"
                ? "badge-warning"
                : application?.applicationStatus === "Processing"
                  ? "badge-info"
                  : application?.applicationStatus === "Completed"
                    ? "badge-success"
                    : "badge-error"
            }`}
          >
            {application?.applicationStatus}
          </span>
        </td>

        {/* Payment Status */}
        <td>
          <span
            className={`badge ${
              application?.paymentStatus === "Paid"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {application?.paymentStatus}
          </span>
        </td>

        {/* Actions */}
        <td>
          <div className="flex flex-wrap gap-2 justify-center">
            {/* Details */}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-xs btn-outline btn-primary gap-1"
            >
              <FaEye />
              Details
            </button>
            <ApplicationDetailsModal
              application={application}
              closeModal={closeModal}
              isOpen={isOpen}
            />

            {/* Feedback */}
            {application?.applicationStatus !== "Rejected" &&
              application?.paymentStatus === "Paid" && (
                <>
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="btn btn-xs btn-outline btn-secondary gap-1"
                  >
                    <FaCommentDots />
                    Feedback
                  </button>
                  <ApplicationFeedback
                    closeFeedback={closeFeedback}
                    feedbackOpen={feedbackOpen}
                    applicationId={application._id}
                    studentName={application?.student?.name}
                    refetch={refetch}
                  />

                  {/* Status Update */}

                  <select
                    {...register("applicationStatus", {
                      onChange: async (e) => {
                        const newStatus = e.target.value;
                        // console.log(newStatus);
                        try {
                          await axiosSecure.patch(
                            `/application-status/${application._id}`,
                            { applicationStatus: newStatus },
                          );
                          refetch();
                          toast.success("Status Updated Successfully");
                        } catch (error) {
                          toast.error(` Error Message ${error.message} `);
                        }
                      },
                    })}
                    defaultValue={application?.applicationStatus}
                    className="btn bg-cyan-100 outline-0 btn-xs"
                  >
                    <option value={""} disabled={true}>
                      Update
                    </option>
                    <option value={"Pending"}>Pending</option>
                    <option value={"Processing"}>Processing</option>
                    <option value={"Completed"}>Completed</option>
                  </select>

                  {/* Cancel */}
                  {application?.applicationStatus !== "Completed" && (
                    <button
                      onClick={() => handleRejectApplication()}
                      className="btn btn-xs btn-outline btn-error gap-1"
                    >
                      <FaTimesCircle />
                      Cancel
                    </button>
                  )}
                </>
              )}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ApplicationCard;
