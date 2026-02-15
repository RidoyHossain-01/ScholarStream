import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import Container from "../../components/shared/Container";

import Loader from "../../components/shared/Loader";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";
import HowToApply from "../../components/shared/HowToApply";
import { useMemo, useState } from "react";
import useRole from "../../hooks/useRole";
import { useEffect } from "react";
import ErrorPage from "../Error/ErrorPage";
import { FaStar } from "react-icons/fa";
import ReviewByScholarship from "./ReviewByScholarship";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const [role] = useRole();

  const [deadLineCrossed, setDeadLineCrossed] = useState(false);

  const {
    data: scholarship = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/scholarship/${id}`);
      return data;
    },
  });
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
  } = scholarship;

  useEffect(() => {
    if (applicationDeadline) {
      const currentDate = new Date().toISOString().slice(0, 10);

      setDeadLineCrossed(currentDate > applicationDeadline); // true if deadline passed
    }
  }, [applicationDeadline]);

  const {
    data: applications = [],
    isLoading: isApplyLoading,
    isError: isApplyError,
  } = useQuery({
    queryKey: ["my-application", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-applications`);
      return data;
    },
  });

  const applied = useMemo(() => {
    return applications.some((a) => a.scholarshipId === id);
  }, [applications, id]);

  const handlePayment = async () => {
    Swal.fire({
      title: "Apply?",
      text: `Please know that by clicking this button, you are applying for this scholarship.You can cancel your application from "My Applications" page on Dashboard. You will be charged $${applicationFees + serviceCharge} to apply( service charge may include)`,
      icon: "warning",
      confirmButtonColor: "#008000",
      confirmButtonText: "Go to Payment",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const applicationInfo = {
          scholarshipId: _id,
          scholarshipName,
          universityName,
          subjectCategory,
          scholarshipCategory,
          degree: degree,
          applicationFees,
          tuitionFees: tuitionFees,
          serviceCharge: serviceCharge,
          universityImage,
          applicationDate: new Date().toISOString().slice(0, 10),
          paymentStatus: "Due",
          applicationStatus: "Pending",
          student: {
            name: user?.displayName,
            email: user?.email,
          },
        };

        const { data } = await axiosSecure.post(
          `/application`,
          applicationInfo,
        );

        //this object is prepared for stripe
        const paymentInfo = {
          scholarshipId: _id,
          applicationId: data.insertedId,
          scholarshipName,
          universityImage,
          universityName,
          applicationFees,
          serviceCharge,
          studentName: user?.displayName,
          studentEmail: user?.email,
        };

        const { data: result } = await axiosSecure.post(
          "/create-checkout-session",
          paymentInfo,
        );
        //can't do navigate or something like that for external links , so we do windo.location.href=LINK
        window.location.href = result?.url;

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <ErrorPage />;
  }

  return (
    <div>
      <Container>
        <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden">
          {/* Header Image */}
          <div className="h-64 md:h-80 w-full">
            <img
              src={universityImage}
              alt={universityName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {scholarshipName}
              </h1>
              <p className="text-gray-500 mt-1">{universityName}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary">{scholarshipCategory}</span>
              <span className="badge badge-outline">{degree}</span>
              <span className="badge badge-outline">{subjectCategory}</span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Location</p>
                <p>
                  {universityCity}, {universityCountry}
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">World Rank</p>
                <p>#{universityWorldRank}</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Degree Level</p>
                <p>{degree}</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Application Fee</p>
                <p>{applicationFees === 0 ? "Free" : `$${applicationFees}`}</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Service Charge</p>
                <p>${serviceCharge}</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Tuition Fees</p>
                <p>{tuitionFees === 0 ? "Fully Covered" : `$${tuitionFees}`}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold">Posted On</p>
                <p>{scholarshipPostDate}</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <p className="font-semibold text-error">Application Deadline</p>
                <p>{applicationDeadline}</p>
              </div>
            </div>

            {/* Action */}
            {role === "Student" && (
              <div className="pt-6 border-t">
                {!deadLineCrossed && !applied && (
                  <button
                    onClick={handlePayment}
                    className="btn btn-primary w-full md:w-auto"
                  >
                    Apply for Scholarship
                  </button>
                )}

                {deadLineCrossed && !applied && (
                  <button
                    disabled
                    className="btn btn-primary w-full md:w-auto text-red-300"
                  >
                    Scholarship is no longer Available!
                  </button>
                )}

                {((deadLineCrossed && applied) || applied) && (
                  <>
                    <button
                      disabled
                      className="btn  w-full md:w-auto text-green-900"
                    >
                      Applied
                    </button>{" "}
                    <Link
                      to={"/dashboard/my-applications"}
                      className="btn btn-primary"
                    >
                      Go to Applications
                    </Link>
                  </>
                )}

                {/* <Button label={"Apply for Scholarship"}/> */}
              </div>
            )}
          </div>
        </div>

        <HowToApply />

        {<ReviewByScholarship id={id} />}
      </Container>
    </div>
  );
};

export default ScholarshipDetails;
