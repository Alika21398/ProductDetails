import React from "react";
import { useApi } from "../App";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const data = useApi();
  const [selectedRange, setSelectedRange] = useState(20);
  const [selectedData, setSelectedData] = useState([]);

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
    const maxItem = data.length
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
    const startIndex = 0;
    const endIndex = rangeValue;
    setSelectedData(data.slice(startIndex, endIndex));
   
    console.log("rangeValue", rangeValue);
  };

  console.log("totalPages", totalPages);
  console.log("selectedRange", selectedRange);
  console.log("selectedData", selectedData);

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
      <div className="px-11 lg:px-44 flex justify-between">
        <div className="flex gap-5">
          <div>Select required data</div>
          <div>
            <select onChange={handleRangeChange} value={selectedRange}>
              {handleRangeDropdown().map((option) => {
                return(
<option key={option} value={option}>
                  {option}
                </option>
                )
                
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-7 px-11 lg:px-44 flex-wrap my-10">
        {selectedData.map((items) => {
          return (
            <div key={items.id} className="w-full md:w-[40%] lg:w-[20%] ">
              <div className=" my-5">
                <img className="w-full rounded-3xl" src={items.url} alt="" />
              </div>
              <div>Product no.{items.id}</div>
              <div>{items.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
