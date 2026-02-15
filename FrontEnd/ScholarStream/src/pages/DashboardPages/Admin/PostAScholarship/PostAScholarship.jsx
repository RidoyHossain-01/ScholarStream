import Swal from "sweetalert2";

import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import Button from "../../../../components/shared/Button/Button";
import { imageUpload } from "../../../../utils";
import Loader from "../../../../components/shared/Loader";
import { useNavigate } from "react-router";

const PostAScholarship = () => {
  const [posting, isPosting] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post("/scholarship", payload),

    onSettled: (data) => {
      if (data.data.insertedId) {
       // console.log("from on satteled ----->", data.data.insertedId);
        mutationReset(); //this is also reset, not for form, from tanstackQuery
      }
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const scholarshipCategory = useWatch({
    control,
    name: "scholarshipCategory",
  });
  useEffect(() => {
    if (scholarshipCategory === "Full Fund") {
      setValue("tuitionFees", 0);
    }
  }, [scholarshipCategory, setValue]);
  const navigate = useNavigate();

  const handlePostAScholarship = async (data) => {
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
      title: "Post the Scholarship?",
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
          const imageUrl = await imageUpload(imageFile);

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
            tuitionFees: Number(
              tuitionFees || scholarshipCategory !== "Full Fund"
                ? tuitionFees
                : 0,
            ),
            applicationFees: Number(applicationFees),
            serviceCharge: Number(serviceCharge),
            applicationDeadline,
            scholarshipPostDate: new Date().toISOString().slice(0, 10),
            postedUserEmail: user?.email,
          };

          await mutateAsync(scholarshipData);
          reset(); //from react hook form
          isPosting(false);
          navigate("/dashboard/manage-scholarships");
          Swal.fire({
            title: "Congratulation!",
            text: "The scholarship has been posted.",
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

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return "Error happened";
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100  shrink-0 shadow-2xl m">
        <div className="card-body">
          <button className=" text-primary text-2xl animation font-bold">
            Scholar<span className="text-accent">Stream</span>
          </button>
          <p className="text-center text-lg">Post a new scholarship Program </p>
          <form onSubmit={handleSubmit(handlePostAScholarship)}>
            <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* scholarship name */}
              <fieldset className="fieldset">
                <label className="label font-bold">Scholarship Name</label>
                <input
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
                <label className="label font-bold">Univarsity Name</label>
                <input
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
                <label className="label font-bold">University Country</label>
                <input
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
                <label className="label font-bold">University Image</label>
                <input
                  {...register("universityImage", {
                    required: "Image is required",
                    validate: {
                      fileType: (files) =>
                        files?.[0]?.type?.startsWith("image/") ||
                        "Only image files are allowed",
                      fileSize: (files) =>
                        files?.[0]?.size <= 10 * 1024 * 1024 ||
                        "Image size must be less than 10MB",
                    },
                  })}
                  type="file"
                  multiple={false}
                  className="file-input file-input-primary"
                  placeholder="University Image"
                />
                {errors.universityImage && (
                  <p className="text-xs font-semibold text-red-500">
                    {errors.universityImage.message}
                  </p>
                )}
              </fieldset>

              {/* University City */}
              <fieldset className="fieldset">
                <label className="label font-bold">University City</label>
                <input
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
                <label className="label font-bold">University World Rank</label>
                <input
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
                <label className="label font-bold">Subject Category</label>
                <input
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
                <label className="label font-bold">Scholarship Category</label>
                <select
                  {...register("scholarshipCategory", {
                    required: "Scholarship Category is required",
                  })}
                  defaultValue=""
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
                  defaultValue={""}
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
              {scholarshipCategory !== "Full Fund" && (
                <fieldset className="fieldset">
                  <label className="label font-bold">
                    Tution Fees ($) (optional)
                  </label>
                  <input
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
              )}

              {/* Application Fees */}
              <fieldset className="fieldset">
                <label className="label font-bold">Application Fees ($)</label>
                <input
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
                <label className="label font-bold">Service Charge ($)</label>
                <input
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
                <label className="label font-bold">Application Deadline</label>
                <input
                  min={new Date().toISOString().split("T")[0]}
                  {...register("applicationDeadline", {
                    required: "Deadline is required",
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

            <Button
              disabled={isPending || posting ? true : false}
              label={"Post Scholarship"}
              full_Width={true}
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAScholarship;
