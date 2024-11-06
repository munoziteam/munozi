const initialState = {
  isLoading: null,
};

export const pageLoadingSlice = (set) => ({
  ...initialState,
  setIsLoading: (payload) => {
    set({
      isLoading: payload,
    });
  },
});
