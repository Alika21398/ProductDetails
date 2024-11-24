import React, { useState, useEffect } from "react";
import { useApi } from "../App";
import { Link, useParams } from "react-router-dom";
import leftarrow from "../assets/leftarrow.svg";
import rightarrow from "../assets/rightarrow.svg";

const Home = () => {
  const { id } = useParams();
  const data = useApi();
  const [selectedRange, setSelectedRange] = useState(50);
  const [selectedData, setSelectedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");

  //  to display data
  useEffect(() => {
    const displayData = data.slice(0, selectedRange);

    setSelectedData(displayData);
  }, [data, selectedRange]);

  //  calculating total page based on selected range means according to how many user wants data to be displayed on screen
  const totalPages = Math.ceil(data.length / selectedRange);

  // to handle range selection for dropdown

  const handleRangeDropdown = () => {
    const option = [];
    const maxItem = data.length;
    for (let i = 50; i <= maxItem; i += 50) {
      option.push(i);
    }
    console.log("option", option);
    return option;
  };

  // for handling to display data on page according to change of range
  const handleRangeChange = (e) => {
    const rangeValue = parseInt(e.target.value, 10);
    setSelectedRange(rangeValue);
    setCurrentPage(1);
    const startIndex = 0;
    const endIndex = rangeValue;
    setSelectedData(data.slice(startIndex, endIndex));

    console.log("rangeValue", rangeValue);
  };

  //   showing the pagination for how many pages
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // for displaying data when page is change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * selectedRange;
    const endIndex = startIndex + selectedRange;
    setSelectedData(data.slice(startIndex, endIndex));
  };

  const goToFirstPage = (page) => {
    setCurrentPage(1);
    const startIndex = 0;
    const endIndex = selectedRange;
    setSelectedData(data.slice(startIndex, endIndex));
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
    const startIndex = (totalPages - 1) * selectedRange;
    const endIndex = data.length;
    setSelectedData(data.slice(startIndex, endIndex));
  };
  // handling data when page number is enteres
  const goToPage = () => {
    const pageNumber = Number(pageInput);
    if (pageInput >= 1 && pageInput <= totalPages) {
      setCurrentPage(pageNumber);
      setPageInput("");
      // updating selectedData state so it displays data acc to page entered
      const startIndex = (pageNumber - 1) * selectedRange;
      const endIndex = startIndex + selectedRange;
      setSelectedData(data.slice(startIndex, endIndex));
    } else {
      alert(`Please enter valued page number between 1 and ${totalPages}`);
    }
  };

  console.log("totalPages", totalPages);
  console.log("selectedRange", selectedRange);
  console.log("selectedData", selectedData);
  console.log("pages", pages);
  console.log("id", id);

  return (
    <>
      <h1 className="px-11 lg:px-44 text-2xl lg:text-5xl font-bold text-center py-5 md:py-10">
        Explore the Ideas
      </h1>
      <div className="px-11 lg:px-44 text-center">
        <p>
          Click on any image to explore more and get to know about the product.
        </p>
      </div>

      {/* dropdown and pagination  */}
      <div className="px-11 lg:px-44 flex justify-between gap-40 items-center border">
        {/* dropdown */}
        <div className="flex gap-5 items-center border">
          <div>Select required data</div>

          <select onChange={handleRangeChange} value={selectedRange}>
            {handleRangeDropdown().map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* pagination */}
        {/* <div className="flex flex-wrap gap-5 border">{pages.map((items)=>{return(
            <div key={items.id}> {items}</div>
        )})}</div> */}

        <div className="flex">
          <button onClick={goToFirstPage}>f</button>
          <button
            className="w-[25px]"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage == 1}
          >
            <img src={leftarrow} alt="" />
          </button>
          {currentPage}
          <button
            className="w-[25px]"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage == totalPages}
          >
            <img src={rightarrow} alt="" />
          </button>
          <button onClick={goToLastPage}>f</button>
          <div>
            {currentPage} of {totalPages}
          </div>
        </div>
        <div>
          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && goToPage()}
            placeholder="enter page"
          />
          <button onClick={goToPage}>search</button>
        </div>
      </div>
      <div className="flex justify-between gap-7 px-11 lg:px-44 flex-wrap my-10">
        {selectedData.map((items) => {
          return (
            <div key={items.id} className="w-full md:w-[40%] lg:w-[20%] ">
              <Link to={`/details/${items.id}`}>
                <div className=" my-5">
                  <img className="w-full rounded-3xl" src={items.url} alt="" />
                </div>
                <div>Product no.{items.id}</div>
                <div>{items.title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
