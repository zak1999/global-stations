// THESE TESTS DONT WORK AND ARE PSUEDO CODED, RAN OUT OF TIME

import { render, screen, waitFor } from '@testing-library/react';
import { Station } from '@/app/page';
import { collectAllStationData } from '@/app/api';

jest.mock('./api', () => ({
  collectAllStationData: jest.fn(),
}));

const mockStations: Station[] = [
  {
      "id": "KLo",
      "logo": "https://herald.musicradio.com/media/0d3d891d-32f2-4c53-95ee-8d1e35bdd126.png",
      "name": "Capital UK",
      "slug": "capital"
  }];

describe('Home Component', () => {

  beforeEach(() => {
    // Reset the mock before eachh test
    collectAllStationData.mockReset();
  });

  it('renders the component with station cards', async () => {
    collectAllStationData.mockResolvedValue(mockStations);

    // render the component
    render(<Home />);

    // Wait for the async data fetching to complete
    // async expect(collectAllStationData).toHaveBeenCalledTimes(1);

    // Check if the component renders correctly with the mocked data
    expect(screen.getByText("Global's Stations")).toBeInTheDocument();
    expect(screen.getAllByTestId('station-card')).toHaveLength(mockStations.length);
  });

  it('renders an error message when data fetching fails', async () => {
    collectAllStationData.mockRejectedValue(new Error('Failed to fetch data'));

    render(<Home />);

    // Wait for the async data fetching to complete
    // async expect(collectAllStationData).toHaveBeenCalledTimes(1);

  });
});
