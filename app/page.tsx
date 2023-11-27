import { FC } from "react";

const collectAllStationData = async () => {
  const res = await fetch(
    "https://75750e17-4c6f-43f1-9a65-e4290c99700a.mock.pstmn.io/stations"
  );
  if (!res.ok) {
    throw new Error("There was an issue collecting the stations");
  }
  return res.json();
};

type Station = {
  id: string;
  logo: string;
  name: string;
  slug: string;
};

export default async function Home() {
  // This runs server-side (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
  const allStations = (await collectAllStationData()) as Station[];
  console.log(allStations);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 max-w-5xl m-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight ">
        Global's Stations
      </h1>
      <ul className="w-full gap-4 flex flex-col">
        {allStations.map((stat, index) => (
          <li key={`${stat.id}_${index}`}>
            <StationCard station={stat} />
          </li>
        ))}
      </ul>
    </main>
  );
}

const StationCard: FC<{ station: Station }> = ({ station }) => {
  return (
    <div className="rounded-xl bg-slate-50 border border-gray-200 shadow-md p-4 flex flex-col sm:flex-row items-center space-x-4 justify-between flex-nowrap">
      <div className="bg-white h-18 w-18 sm:w-24 sm:h-24 overflow-hidden rounded-full">
        <img
          src={station.logo}
          alt={`${station.name}'s logo`}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <a href={`/${station.slug}`}>
          <h2 className="text-xl font-semibold">{station.name}</h2>
        </a>
      </div>
    </div>
  );
};
