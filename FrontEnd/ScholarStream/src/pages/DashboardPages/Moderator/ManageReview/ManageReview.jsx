import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/shared/Loader";
import ManageReviewCard from "./ManageReviewCard";
import useRole from "../../../../hooks/useRole";
import useAuth from "../../../../hooks/useAuth";

const ManageReview = () => {
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const { user, loading } = useAuth();

  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: role === "Moderator",
    queryKey: ["all-reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-reviews");
      return data;
    },
  });
  if (isLoading || isRoleLoading || loading) {
    return <Loader />;
  }
  if (isError) {
    return "Error ";
  }

  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">All Student Reviews</h2>

      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review) => (
          <ManageReviewCard
            key={review?._id}
            review={review}
            refetch={refetch}
          />
        ))}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            No reviews available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReview;
