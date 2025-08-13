import { useQuery } from '@tanstack/react-query';
import { generateSalesmenData, updateSalesmanLocations } from '../utils/mockData';

const SALESMEN_COUNT = 8;

export const useSalesmanData = () => {
  return useQuery({
    queryKey: ['salesmen'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate or update salesmen data
      let salesmen = generateSalesmenData(SALESMEN_COUNT);
      
      // Simulate real-time location updates
      salesmen = updateSalesmanLocations(salesmen);
      
      return salesmen;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};
