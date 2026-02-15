import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import Card from "./Card";
import { useEffect, useState } from "react";
import Heading from "../../components/shared/Heading";

const AllScholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 6;

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-scholarship", currentPage, debouncedSearch],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_base_URL}/all-scholarship?limit=${limit}&skip=${(currentPage - 1) * limit}&search=${debouncedSearch}`,
      );
      return data;
    },
    keepPreviousData: true,
  });

  const scholarShips = data?.result || [];
  const totalScholarship = data?.total || 0;
  const totalPage = Math.ceil(totalScholarship / limit);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error happened</p>;

  return (
    <Container classes={"my-5"}>
      <Heading
        title={"Explore Global Scholarships"}
        subtitle={`Search and discover fully funded, partial, and self-funded 
scholarships from top-ranked universities around the world`}
        center={true}
      />

      <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center ">
        <h1 className="my-7">
          Scholarship Available:
          {debouncedSearch ? scholarShips.length : totalScholarship}
        </h1>

        {/* Search */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {scholarShips.length > 0 ? (
          scholarShips.map((scholarShip) => (
            <Card key={scholarShip._id} scholarship={scholarShip} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
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
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
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

// const AllScholarships = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 6;
//   const [searchText,setSearchText] = useState('');

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["all-scholarship", currentPage,searchText],
//     queryFn: async () => {
//       const { data } = await axios(
//         `${import.meta.env.VITE_base_URL}/all-scholarship?limit=${limit}&skip=${(currentPage - 1) * limit}&search=${searchText}`
//       );
//       return data;
//     },
//     keepPreviousData: true, //for smooth page switching
//   });

//   const scholarShips = data?.result || [];
//   const [totalScholarship,setTotalScholarship] = useState(0);
//   const totalPage = Math.ceil(totalScholarship / limit);

//   if (isLoading) return <Loader />;
//   if (isError) return <p>Error happened</p>;

//   return (
//     <Container>

//       <h1 className="my-7">
//         Scholarship Available {totalScholarship}
//       </h1>
//       <label className="input">
//   <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <g
//       strokeLinejoin="round"
//       strokeLinecap="round"
//       strokeWidth="2.5"
//       fill="none"
//       stroke="currentColor"
//     >
//       <circle cx="11" cy="11" r="8"></circle>
//       <path d="m21 21-4.3-4.3"></path>
//     </g>
//   </svg>
//   <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search Scholarship" />
// </label>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//         {scholarShips.map((scholarShip) => (
//           <Card key={scholarShip._id} scholarship={scholarShip} />
//         ))}

//       </div>

//       {/* Pagination */}
// {
//   totalScholarship && <div className="flex justify-center flex-wrap gap-2 mt-8">
//         {
//           currentPage>1 && <button className="btn btn-sm" onClick={()=>setCurrentPage(currentPage-1)} >Prev</button>
//         }

//         {[...Array(totalPage)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`btn btn-sm ${
//               currentPage === i + 1 ? "btn-primary" : "btn-outline"
//             }`}

//           >
//             {i + 1}
//           </button>
//         ))}
//           {
//           currentPage <totalPage && <button className="btn btn-sm" onClick={()=>setCurrentPage(currentPage+1)} >Next</button>
//         }
//       </div>
// }

//     </Container>
//   );
// };

export default AllScholarships;
