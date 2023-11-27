import StationCard from "./components/StationCard";
import { collectAllStationData } from "./api";

export type Station = {
  id: string;
  logo: string;
  name: string;
  slug: string;
  tagline?: string;
  streamUrl?: string;
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
