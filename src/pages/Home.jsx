import React, { useState, useEffect } from "react";
import { useApi } from "../App";
import { Link, useParams } from "react-router-dom";
import leftarrow from "../assets/leftarrow.svg";
import rightarrow from "../assets/rightarrow.svg";
import doublerightarrow from "../assets/doublelrightarrow.svg";
import doubleleftarrow from "../assets/doubleleftarrow.svg";

const Home = () => {
  const data = useApi();
  const [selectedRange, setSelectedRange] = useState(20); //to handle how many to display per page
  const [selectedData, setSelectedData] = useState([]); //to store array of data that will be displayed
  const [currentPage, setCurrentPage] = useState(1); //stores current page number
  const [pageInput, setPageInput] = useState(""); //stores page number that users enter on input

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
    for (let i = 20; i <= maxItem; i += 20) {
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

  return (
    <>
      <h1 className="px-11 lg:px-44 text-2xl lg:text-5xl font-bold text-center py-5 md:py-10">
        Explore the Ideas
      </h1>
      <div className="px-11 lg:px-44 text-center mb-3">
        <p>
          Click on any image to explore more and get to know about the product.
        </p>
      </div>

      {/* dropdown and pagination  */}
      <div className=" mx-11 lg:mx-44 py-3 flex justify-between gap-40 items-center border-y border-black">
        {/* dropdown */}
        <div className="flex gap-5 items-center ">
          <div>Select required data</div>

          <select
            className="border border-black"
            onChange={handleRangeChange}
            value={selectedRange}
          >
            {handleRangeDropdown().map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* arrows and pagination for current page */}
        <div className="flex gap-10 ">
          <div className="flex">
            <button className="w-[25px]" onClick={goToFirstPage}>
              <img src={doubleleftarrow} alt="" />
            </button>
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
            <button className="w-[25px]" onClick={goToLastPage}>
              <img src={doublerightarrow} alt="" />
            </button>

            {/* shows total datas and currents datas */}
          </div>
          <div>
            {(currentPage - 1) * selectedRange + 1} -{" "}
            {currentPage * selectedRange} of {data.length}
          </div>
        </div>
      </div>

      {/* for page number input */}

      <div className="px-11 lg:px-44 flex justify-end gap-3 mt-3">
        <input
          className="border-black border pl-3"
          type="text"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && goToPage()}
          placeholder="enter page number"
        />
        <button
          className="px-4 py-2 rounded-lg bg-slate-500 text-white"
          onClick={goToPage}
        >
          search
        </button>
      </div>

      {/* displaying data */}
      <div className="flex justify-between gap-7 px-11 lg:px-44 flex-wrap my-10 overflow-auto h-[1000px]">
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
