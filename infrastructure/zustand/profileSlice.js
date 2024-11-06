const initialState = {
  profileData: null,
};

export const profileSlice = (set) => ({
  ...initialState,
  setProfileData: (payload) => {
    set({
      profileData: payload,
    });
  },
});
