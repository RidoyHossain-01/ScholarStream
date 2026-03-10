import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import Card from "./Card";
import { useEffect, useState } from "react";
import Heading from "../../components/shared/Heading";
import ErrorPage from "../Error/ErrorPage";

const AllScholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const limit = 8;

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, categoryFilter]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-scholarship", currentPage, debouncedSearch, categoryFilter],
    queryFn: async () => {
      const degreeOptions = ["Bachelor", "Masters", "PhD", "Diploma"];

      const params = new URLSearchParams({
        limit,
        skip: (currentPage - 1) * limit,
        search: debouncedSearch,
      });
      // ✅ Send as degree or category depending on value
      if (categoryFilter !== "All") {
        if (degreeOptions.includes(categoryFilter)) {
          params.append("degree", categoryFilter);
        } else {
          params.append("category", categoryFilter);
        }
      }

      const { data } = await axios(
        `${import.meta.env.VITE_base_URL}/all-scholarship?${params.toString()}`,
      );
      return data;
    },
    keepPreviousData: true,
  });

  const scholarShips = data?.result || [];
  const totalScholarship = data?.total || 0;
  const totalPage = Math.ceil(totalScholarship / limit);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <Container classes={"my-5"}>
      <Heading
        title={"Explore Global Scholarships"}
        subtitle={`Search and discover fully funded, partial, and self-funded 
scholarships from top-ranked universities around the world`}
        center={true}
      />

      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center  my-8">
        <h1 className="my-7">
          Scholarship Available:
          {totalScholarship}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered w-full md:w-56"
          >
            <option selected value="All">
              All Scholarships{" "}
            </option>
            <option value="Partial Fund">Partial Fund</option>
            <option value="Full Fund">Full Fund</option>
            <option value="Self Fund">Self Fund</option>
            <option value="Bachelor">Bachelor's Degree</option>
            <option value="PhD">PhD Opportunities</option>
            <option value="Masters">Masters Programs</option>
            <option value="Diploma">Diploma</option>
          </select>
          {/* <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered w-full md:w-56"
          >
            <option selected value="All">
              All Scholarships{" "}
            </option>
            <option value="Partial Fund">Partial Fund</option>
            <option value="Full Fund">Full Fund</option>
            <option value="Self Fund">Self Fund</option>
            <option value="Bachelor">Bachelor's Degree</option>
            <option value="PhD">PhD Opportunities</option>
            <option value="Masters">Masters Programs</option>
            <option value="Diploma">Diploma</option>
          </select> */}

          <label className="input">
            <input
              type="search"
              className="grow"
              placeholder="Search Scholarship"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>

        {/* Search */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
        {scholarShips.length > 0 ? (
          scholarShips.map((scholarShip) => (
            <Card key={scholarShip._id} scholarship={scholarShip} />
          ))
        ) : (
          <p className="col-span-full text-center text-base-content/50">
            No scholarships found.
          </p>
        )}
      </div>

      {/* Pagination */}

      {!debouncedSearch && totalPage > 1 && (
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {currentPage > 1 && (
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          )}

          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-accent"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPage && (
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default AllScholarships;
