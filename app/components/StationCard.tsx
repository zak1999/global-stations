"use client";
import { FC, useState } from "react";
import { Station } from "../page";
import { getStationData } from "../api";

const StationCard: FC<{ station: Station }> = ({ station }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extraData, setExtraData] = useState<Station | null>(null);

  const collectMoreInfo = async () => {
    // if the data has beeen collected for this specific station, we have it in state and dont need to refetch
    if (extraData !== null) return;

    setLoading(true);
    const xtraData = (await getStationData(station.slug)) as Station;
    setExtraData(xtraData);
    setLoading(false);
  };

  return (
    <div className="rounded-xl bg-slate-50 border border-gray-200 shadow-md p-4 flex flex-col sm:flex-row items-center space-x-4 justify-between flex-nowrap">
      {/* Logo */}
      <div className="bg-white order-first flex flex-col items-center h-18 w-18 sm:w-24 sm:h-24 overflow-hidden rounded-full">
        <img
          src={station.logo}
          alt={`${station.name}'s logo`}
          className="sm:w-24 sm:h-24 mb-3 rounded-full shadow-lg"
        />
      </div>

      {/* Station Info */}
      <div className="flex flex-col w-full items-center sm:items-start">
        {/* 'Extra' Btn */}
        <button
          onClick={() => {
            collectMoreInfo();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className=" hover:bg-slate-200 text-gray-600 px-5 text-lg font-bold flex justify-between bg-white w-full p-2 rounded-t-lg border-b-2"
        >
          <h2 className="text-xl font-semibold ">{station.name}</h2>
          {isDropdownOpen ? "-" : "+"}{" "}
        </button>

        {/* Extra Info Tab */}
        {isDropdownOpen &&
          (loading ? (
            <div className="flex w-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className=" bg-slate-100 w-full justify-self-end py-6 text-sm font-mono">
              <p className="capitalize">- "{extraData?.tagline}"</p>
              <p className="">
                - Listen{" "}
                <a className="underline" href={`/${station.slug}`}>
                  here
                </a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default StationCard;

// this is from here: https://reactsvgicons.com/
// I added tailwind animate and changed the height/width
const Loader = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2em"
      width="2em"
      className="animate-spin"
    >
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
    </svg>
  );
};
