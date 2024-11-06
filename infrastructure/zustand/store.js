import { createWithEqualityFn } from "zustand/traditional";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { modalSlice } from "./modalSlice";
import { shallow } from "zustand/shallow";
import { profileSlice } from "./profileSlice";
import { uploadedFilesSlice } from "./uploadedFiles";
import { pageLoadingSlice } from "./pageLoadingSlice";
import { onboardSlice } from "./onboardSlice";
import { userSlice } from "./user";

export const useGlobalStore = createWithEqualityFn(
  subscribeWithSelector(
    persist(
      immer((...a) => ({
        ...modalSlice(...a),
        ...profileSlice(...a),
        ...uploadedFilesSlice(...a),
        ...pageLoadingSlice(...a),
        ...onboardSlice(...a),
        ...userSlice(...a),
      })),
      { name: "appState" }
    )
  ),

  shallow
);
