import React from "react";
import MainContainer from "../components/MainContainer";
import { getStationData } from "../api";
import { Station } from "../page";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const station = (await getStationData(slug)) as Station;
  console.log(station);

  return (
    <MainContainer>
      <a
        href="/"
        className="hover:underline mb-4 text-xl font-bold leading-none tracking-tight text-gray-900"
      >
        back to other stations
      </a>
      <div className="w-full max-w-md bg-slate-50 border border-gray-200 rounded-lg shadow  ">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="bg-white w-24 h-24 mb-3 rounded-full shadow-lg"
            src={station.logo}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {station.name}
          </h5>
          <div className="flex mt-4 md:mt-6">
            <audio controls src={station.streamUrl}></audio>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Page;
