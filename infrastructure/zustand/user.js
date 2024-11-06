const initialState = {
  user: null,
};

export const userSlice = (set, get) => ({
  ...initialState,

  setUser: (payload) => {
    set({
      user: payload,
    });
  },

  clearUser: () => {
    set({
      user: null,
    });
  },
});
