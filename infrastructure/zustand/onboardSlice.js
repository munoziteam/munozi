const initialState = {
  onboardData: null,
};

export const onboardSlice = (set, get) => ({
  ...initialState,

  setOnboardData: (payload) => {
    const currentData = get().onboardData || {};
    set({
      onboardData: { ...currentData, ...payload },
    });
  },

  clearOnboardState: () => {
    set({
      onboardData: null,
    });
  },
});
