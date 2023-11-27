import { FC } from "react";

const collectAllStationData = async () => {
  const res = await fetch ('https://75750e17-4c6f-43f1-9a65-e4290c99700a.mock.pstmn.io/stations')
  if (!res.ok){
    throw new Error('There was an issue collecting the stations')
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="">Global's Stations</h1>
      <ul>
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
return <a href={`/${station.slug}`}>{station.name}</a>;
}
