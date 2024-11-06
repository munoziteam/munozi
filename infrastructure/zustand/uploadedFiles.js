const initialState = {
  uploadedFiles: [],
  uploadCleanup: true,
};

export const uploadedFilesSlice = (set, get) => ({
  ...initialState,

  setUploadedFiles: (payload) => {
    const currentFiles = get().uploadedFiles || [];
    set({
      uploadedFiles: [...currentFiles, payload],
    });
  },

  setUploadCleanup: (payload) => {
    set({
      uploadCleanup: payload,
    });
  },
  clearFileState: () => {
    set({
      uploadedFiles: [],
    });
  },

  removeFile: (payload) => {
    set({
      uploadedFiles: get().uploadedFiles.filter(
        ({ url }) => url !== payload.url
      ),
    });
  },
});
