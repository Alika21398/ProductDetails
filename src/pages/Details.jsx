import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../App";
import axios from "axios";
import { baseUrl } from "../../config/constant";

const Details = () => {
  const { id } = useParams();
  // const { data, API } = useApi();
  const [detailData, setDetailData] = useState([]);

  const detailsAPI = async () => {
    try {
      const res = await axios.get(baseUrl + "/photos/" + id);
      setDetailData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    detailsAPI();
  }, [id]);

  console.log("id", id);
  console.log("detailData", detailData);

  return (
    <>
      {/* {detailData.map((items)=>{
    return(
        <div key={items.id}>{items.title}</div>
    )
   })} */}

      {detailData.title}
    </>
  );
};

export default Details;
