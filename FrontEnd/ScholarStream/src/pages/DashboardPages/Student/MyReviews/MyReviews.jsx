import { useQuery } from "@tanstack/react-query";

import Loader from "../../../../components/shared/Loader";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyReviewCard from "./MyReviewCard";
import ErrorPage from "../../../Error/ErrorPage";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-reviews`);
      return data;
    },
  });

  if (isLoading || loading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">
          You have not submitted any reviews yet.
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <MyReviewCard key={review?._id} review={review} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
