import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";
import Heading from "../../../components/shared/Heading";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: degrees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship-degree-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/scholarships/subjects/stats");
      return data;
    },
  });

  const {
    data: scholarshipData,
    isLoading: isScholarshipLoading,
    isError: isScholarshipError,
  } = useQuery({
    queryKey: ["all-scholarship"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_base_URL}/all-scholarship`,
      );
      return data; // return full object
    },
  });

  const scholarshipCount = scholarshipData?.total || 0;

  if (isLoading || isScholarshipLoading) {
    return (
      <div className="flex justify-center items-center h-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || isScholarshipError) {
    return (
      <div className="text-center text-red-500 mt-10">Failed to load data.</div>
    );
  }

  // Format data for PieChart
  const formattedData = degrees.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const COLORS = ["#2563EB", "#16A34A", "#9333EA", "#F59E0B", "#DC2626"];

  return (
    <div>
      <Heading title={"Admin Panel"} center={true} />

      <div className="p-6 bg-base-200 min-h-screen flex flex-col md:flex-row md:justify-around rounded-xl">
        <div className="card shadow-sm h-36 border border-base-300 bg-base-100">
          <div className="card-body flex items-center">
            <h3 className="text-xl"> Total Scholarship</h3>
            <p className="text-5xl font-bold text-accent">{scholarshipCount}</p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8 text-base-content">
            Scholarship Degree Distribution
          </h1>

          <div className="bg-base-100 shadow-lg border border-base-300 rounded-2xl p-6 max-w-3xl">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={formattedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  label
                >
                  {formattedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
