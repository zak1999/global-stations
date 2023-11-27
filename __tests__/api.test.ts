// Assuming your file with these functions is named stationApi.ts

import { getStationData, collectAllStationData, BASE_URL } from '@/app/api';

describe('getStationData', () => {
  it('fetches the station data successfully', async () => {
    const mockSlug = 'classicfm';
    const mockResponse = {
      "id": "fGJM",
      "logo": "https://herald.musicradio.com/media/f2fb7e11-4a9e-4d53-a081-aab79779ea04.png",
      "name": "Classic FM",
      "slug": "classicfm",
      "tagline": "The World's Greatest Music",
      "streamUrl": "https://media-ssl.musicradio.com/ClassicFM"
  };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getStationData(mockSlug);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/station/${mockSlug}`);
    expect(result).toEqual(mockResponse);
  });

  it('throws an error when fetching station data fails', async () => {
    const mockSlug = 'test-slug';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, //mock it doesnt come back ok
    });

    await expect(getStationData(mockSlug)).rejects.toThrowError('Failed fetching the data for station');
  });
});

describe('collectAllStationData', () => {
  it('fetches all station data successfully', async () => {
    const mockResponse = [
      {
          "id": "KLo",
          "logo": "https://herald.musicradio.com/media/0d3d891d-32f2-4c53-95ee-8d1e35bdd126.png",
          "name": "Capital UK",
          "slug": "capital"
      }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await collectAllStationData();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/stations`);
    expect(result).toEqual(mockResponse);
  });

  it('throws an error when fetching all station data fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(collectAllStationData()).rejects.toThrowError('There was an issue collecting the stations');
  });
});
