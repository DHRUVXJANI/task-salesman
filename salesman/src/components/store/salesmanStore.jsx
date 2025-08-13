import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useSalesmanStore = create(
  devtools(
    (set, get) => ({
      // State
      salesmen: [],
      selectedSalesman: null,
      visibleSalesmen: [],
      searchTerm: '',
      isLoading: false,
      error: null,
      
      // Historical tracking state
      historicalData: null,
      playbackState: {
        isPlaying: false,
        currentPosition: 0,
        speed: 1,
        progress: 0,
      },

      // Actions
      setSalesmen: (salesmen) => set({ salesmen }),
      
      setSelectedSalesman: (salesman) => set({ selectedSalesman: salesman }),
      
      setVisibleSalesmen: (visibleIds) => set({ visibleSalesmen: visibleIds }),
      
      toggleSalesmanVisibility: (salesmanId) => set((state) => {
        const visible = state.visibleSalesmen.includes(salesmanId);
        if (visible) {
          return {
            visibleSalesmen: state.visibleSalesmen.filter(id => id !== salesmanId)
          };
        } else {
          return {
            visibleSalesmen: [...state.visibleSalesmen, salesmanId]
          };
        }
      }),
      
      setSearchTerm: (term) => set({ searchTerm: term }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      // Historical tracking actions
      setHistoricalData: (data) => set({ historicalData: data }),
      
      updatePlaybackState: (updates) => set((state) => ({
        playbackState: { ...state.playbackState, ...updates }
      })),
      
      // Computed selectors
      getFilteredSalesmen: () => {
        const { salesmen, searchTerm } = get();
        if (!searchTerm) return salesmen;
        
        return salesmen.filter(salesman =>
          salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salesman.phone.includes(searchTerm)
        );
      },
      
      getVisibleSalesmenData: () => {
        const { salesmen, visibleSalesmen } = get();
        return salesmen.filter(salesman => visibleSalesmen.includes(salesman.id));
      },
      
      getOnlineSalesmen: () => {
        const { salesmen } = get();
        return salesmen.filter(salesman => salesman.isOnline);
      },
      
      getOfflineSalesmen: () => {
        const { salesmen } = get();
        return salesmen.filter(salesman => !salesman.isOnline);
      },

      // Utility actions
      initializeVisibleSalesmen: () => {
        const { salesmen } = get();
        const allIds = salesmen.map(s => s.id);
        set({ visibleSalesmen: allIds });
      },

      showAllSalesmen: () => {
        const { salesmen } = get();
        const allIds = salesmen.map(s => s.id);
        set({ visibleSalesmen: allIds });
      },

      hideAllSalesmen: () => set({ visibleSalesmen: [] }),

      resetPlayback: () => set({
        playbackState: {
          isPlaying: false,
          currentPosition: 0,
          speed: 1,
          progress: 0,
        }
      }),
    }),
    {
      name: 'salesman-store',
    }
  )
);

export default useSalesmanStore;
