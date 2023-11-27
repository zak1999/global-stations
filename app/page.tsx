import StationCard from "./components/StationCard";
import { collectAllStationData } from "./api";
import MainContainer from "./components/MainContainer";

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

  return (
    <MainContainer>
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
    </MainContainer>
  );
}
