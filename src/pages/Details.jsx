import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../App";
import axios from "axios";
import { baseUrl } from "../../config/constant";

const Details = () => {
  const { id } = useParams();

  const [detailData, setDetailData] = useState({});

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
      <div className="px-11 lg:px-44 ">
        <div className="flex gap-5 mt-5 pt-3 border-black border-b-2 items-center">
          <div className="w-[40px]">
            <img className="w-full" src={detailData.thumbnailUrl} alt="" />
          </div>
          <div>
            <h2 className="text-[14px]">AlbumId:{detailData.albumId}</h2>
            <h2 className="text-[14px]">Product no. {detailData.id}</h2>
          </div>
        </div>
        <div className="text-2xl lg:text-5xl font-bold mb-10 mt-5">
          {detailData.title}
        </div>
        <div className="w-full mt-10 h-[600px] object-cover border ">
          <img className="w-full h-full" src={detailData.url} alt="" />
        </div>
        <div className="my-5 text-xs"> {detailData.title}</div>
      </div>
    </>
  );
};

export default Details;
