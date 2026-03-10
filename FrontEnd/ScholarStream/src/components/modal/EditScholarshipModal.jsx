import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";
import ErrorPage from "../../pages/Error/ErrorPage";

const EditScholarshipModal = ({
  closeModal,
  isOpen,
  scholarship,
  id,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const [posting, isPosting] = useState(false);
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/edit-scholarship/${id}`, payload),

    onSettled: (data) => {
      if (data.data.modifiedCount) {
        mutationReset(); //this is also reset, not for form, from tanstackQuery
      }
    },
    retry: 3,
  });

  const handleEditScholarship = async (data) => {
    const {
      scholarshipName,
      universityName,
      universityCountry,
      universityImage,
      universityCity,
      universityWorldRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline,
    } = data;

    const imageFile = universityImage?.[0];
    // console.log(imageFile);

    Swal.fire({
      title: "Confirm Edit?",
      text: "Please recheck before posting",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#008000",
      confirmButtonText: "Post!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          isPosting(true);
          const imageUrl = imageFile
            ? await imageUpload(imageFile)
            : scholarship.universityImage;

          const scholarshipData = {
            scholarshipName,
            universityName,
            universityImage: imageUrl,
            universityCountry,
            universityCity,
            universityWorldRank: Number(universityWorldRank),
            subjectCategory,
            scholarshipCategory,
            degree,
            tuitionFees: Number(tuitionFees),
            applicationFees: Number(applicationFees),
            serviceCharge: Number(serviceCharge),
            applicationDeadline,
          };
          // console.log(scholarshipData);
          await mutateAsync(scholarshipData);
          refetch(); //from react hook form
          isPosting(false);
          closeModal();
          Swal.fire({
            title: "Congratulation!",
            text: "Scholarship Updated Successfully",
            icon: "success",
          });

          // if (data) {

          // }
        } catch (error) {
          toast.error(
            error.message || "Something went wrong, please wait and try again",
          );
        }
      }
    });
  };

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className={" relative z-10 focus:outline-none"}
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center p-4 min-h-screen ">
          <DialogPanel
            transition
            className="min-w-fit max-w-md bg-base-100 p-6 border border-base-300 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            {/* <DialogTitle as='h3'  className='text-lg font-medium text-center leading-6 text-primary'>
            Scholar<span className="text-accent">Stream</span>
               </DialogTitle> */}

            <div className="w-full">
              <div className="card bg-base-100  shrink-0 shadow-2xl m">
                <div className="card-body">
                  <p className="text-center text-lg">Edit Scholarship </p>
                  <form onSubmit={handleSubmit(handleEditScholarship)}>
                    <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* scholarship name */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Scholarship Name
                        </label>
                        <input
                          defaultValue={scholarship?.scholarshipName}
                          {...register("scholarshipName", {
                            required: "Scholarship name is required",
                          })}
                          type="text"
                          className="input"
                          placeholder="Name of the scholarship"
                        />
                        {errors.scholarshipName && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.scholarshipName.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Univarsity name */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Univarsity Name
                        </label>
                        <input
                          defaultValue={scholarship?.universityName}
                          {...register("universityName", {
                            required: "University name is required",
                          })}
                          type="text"
                          className="input"
                          placeholder="Univarsity Name"
                        />

                        {errors.universityName && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.universityName.message}
                          </p>
                        )}
                      </fieldset>

                      {/* University Country */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          University Country
                        </label>
                        <input
                          defaultValue={scholarship?.universityCountry}
                          {...register("universityCountry", {
                            required: "Country name is required",
                          })}
                          type="text"
                          className="input"
                          placeholder="University Country"
                        />
                        {errors.universityCountry && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.universityCountry.message}
                          </p>
                        )}
                      </fieldset>

                      {/* University Image */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          University Image
                        </label>
                        <input
                          {...register("universityImage", {})}
                          type="file"
                          multiple={false}
                          className="file-input file-input-primary"
                          placeholder="University Image"
                        />
                      </fieldset>

                      {/* University City */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          University City
                        </label>
                        <input
                          defaultValue={scholarship?.universityCity}
                          {...register("universityCity", {
                            required: "City name is required",
                          })}
                          type="text"
                          className="input"
                          placeholder="University City"
                        />
                        {errors.universityCity && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.universityCity.message}
                          </p>
                        )}
                      </fieldset>

                      {/* University Rank */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          University World Rank
                        </label>
                        <input
                          defaultValue={scholarship?.universityWorldRank}
                          {...register("universityWorldRank", {
                            required: "World Rank is required",
                            min: {
                              value: 1,
                              message: "Please write a valid rank",
                            },
                            max: {
                              value: 9999,
                              message: "please write a valid rank",
                            },
                          })}
                          type="number"
                          className="input"
                          placeholder="University World Rank"
                        />
                        {errors.universityWorldRank && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.universityWorldRank.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Subject Category */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Subject Category
                        </label>
                        <input
                          defaultValue={scholarship?.subjectCategory}
                          {...register("subjectCategory", {
                            required: "Subject Category is required",
                          })}
                          type="text"
                          className="input"
                          placeholder="Subject Category"
                        />
                        {errors.subjectCategory && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.subjectCategory.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Scholarship Category */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Scholarship Category
                        </label>
                        <select
                          {...register("scholarshipCategory", {
                            required: "Scholarship Category is required",
                          })}
                          defaultValue={scholarship?.scholarshipCategory}
                          className="select select-primary"
                        >
                          <option value={""} disabled={true}>
                            Select a category
                          </option>
                          <option value={"Full Fund"}>Full Fund</option>
                          <option value={"Partial Fund"}>Partial Fund</option>
                          <option value={"Self Fund"}>Self Fund</option>
                        </select>
                        {errors.scholarshipCategory && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.scholarshipCategory.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Degree */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">Degree</label>
                        <select
                          {...register("degree", {
                            required: "Selecting a degree is required",
                          })}
                          defaultValue={scholarship?.degree}
                          className="select select-primary"
                        >
                          <option value={""} disabled={true}>
                            Select a degree
                          </option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor">Bachelor</option>
                          <option value="Masters">Masters</option>
                          <option value="PhD">PhD</option>
                        </select>
                        {errors.degree && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.degree.message}
                          </p>
                        )}
                      </fieldset>

                      {/* tution fees */}

                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Tution Fees ($) (optional)
                        </label>
                        <input
                          defaultValue={scholarship?.tuitionFees}
                          {...register("tuitionFees", {
                            min: {
                              value: 0,
                              message: "Please enter a valid number",
                            },
                          })}
                          type="number"
                          className="input"
                          placeholder="Tuition Fees"
                        />
                        {errors.tuitionFees && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.tuitionFees.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Application Fees */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Application Fees ($)
                        </label>
                        <input
                          defaultValue={scholarship?.applicationFees}
                          {...register("applicationFees", {
                            required: "Application fees is required",
                            min: {
                              value: 1,
                              message: "Please enter a valid amount",
                            },
                          })}
                          type="number"
                          className="input"
                          placeholder="Application Fees"
                        />
                        {errors.applicationFees && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.applicationFees.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Service Charge */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Service Charge ($)
                        </label>
                        <input
                          defaultValue={scholarship?.serviceCharge}
                          {...register("serviceCharge", {
                            required: "Service Charge is required",
                            min: {
                              value: 1,
                              message: "Please enter a valid amount",
                            },
                          })}
                          type="number"
                          className="input"
                          placeholder="Service Charge"
                        />
                        {errors.serviceCharge && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.serviceCharge.message}
                          </p>
                        )}
                      </fieldset>

                      {/* Application Deadline */}
                      <fieldset className="fieldset">
                        <label className="label font-bold">
                          Application Deadline
                        </label>
                        <input
                          defaultValue={scholarship?.applicationDeadline}
                          min={new Date().toISOString().split("T")[0]}
                          {...register("applicationDeadline", {
                            required: "Deadline is required",
                            //               validate: (value) =>
                            // new Date(value) >= new Date().setHours(0, 0, 0, 0)
                            //   || "Past dates are not allowed"
                          })}
                          type="date"
                          className="input"
                          placeholder="Application Deadline"
                        />
                        {errors.applicationDeadline && (
                          <p className="text-xs font-semibold text-red-500">
                            {errors.applicationDeadline.message}
                          </p>
                        )}
                      </fieldset>
                    </fieldset>
                    <div className="flex flex-col-reverse md:flex-row  w-full gap-2 justify-center ">
                      <Button
                        disabled={isPending || posting}
                        onClick={() => closeModal()}
                        className={"bg-red-500 btn  text-white w-1/2"}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={isPending || posting}
                        type="submit"
                        className={"bg-green-500 btn w-1/2  text-white"}
                      >
                        {isPending || posting ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditScholarshipModal;
