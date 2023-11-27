const BASE_URL = "https://75750e17-4c6f-43f1-9a65-e4290c99700a.mock.pstmn.io";
export const getStationData = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/station/${slug}`);
  if (!res.ok) {
    throw new Error("Failed fetching the data for station");
  }

  return res.json();
};
export const collectAllStationData = async () => {
  const res = await fetch(`${BASE_URL}/stations`);
  if (!res.ok) {
    throw new Error("There was an issue collecting the stations");
  }
  return res.json();
};
