import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditScholarshipModal from "../../../../components/modal/EditScholarshipModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const ManageScholarshipCard = ({ scholarship, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const axiosSecure = useAxiosSecure();
  const handleDelete = async () => {
    Swal.fire({
      title: "Delete Scholarship?",
      text: `Please check again before deleting the scholarship post for Subject: ${scholarship?.subjectCategory} at ${scholarship?.universityName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/scholarship/${scholarship._id}`);
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: `Your upload has been deleted`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Error");
        }
      }
    });
  };

  return (
    <>
      <tr className="hover">
        {/* University */}
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-10 h-10">
                <img src={scholarship?.universityImage} alt="University" />
              </div>
            </div>
            <div>
              <div className="font-semibold">{scholarship?.universityName}</div>
            </div>
          </div>
        </td>

        {/* Scholarship Name */}
        <td className="font-medium">{scholarship?.scholarshipName}</td>

        {/* Category */}
        <td>
          <span className="">{scholarship?.scholarshipCategory}</span>
        </td>

        {/* Subject */}
        <td>{scholarship?.subjectCategory}</td>

        {/* Degree */}
        <td>
          <span className="badge badge-info badge-outline">
            {scholarship?.degree}
          </span>
        </td>

        {/* Tuition */}
        <td>${scholarship?.tuitionFees}</td>

        {/* Application Fee */}
        <td>${scholarship?.applicationFees}</td>

        {/* Actions */}
        <td>
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setIsOpen(true)}
              title="Edit"
              className="btn btn-xs btn-warning"
            >
              <FaEdit />
            </button>
            <EditScholarshipModal
              scholarship={scholarship}
              closeModal={closeModal}
              id={scholarship?._id}
              isOpen={isOpen}
              refetch={refetch}
            />

            <button
              onClick={() => handleDelete()}
              title="Delete"
              className="btn btn-xs btn-error"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ManageScholarshipCard;
