import { useEffect } from "react";
import Uploader from "./Uploader";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import { deleteFiles } from "@/lib/utils";

export default function UploadWrapper({ limit = 5 }) {
  const {
    uploadedFiles = [],
    uploadCleanup,
    clearFileState,
  } = useGlobalStore();

  const uploadedlength = uploadedFiles.length;

  // useEffect(() => {
  //   if (uploadCleanup && uploadedlength > 0) {
  //     return () => {
  //       deleteFiles(uploadedFiles.map(({ url }) => url));
  //       clearFileState();
  //     };
  //   }
  // }, [uploadCleanup]);

  useEffect(() => {
    return () => {
      clearFileState();
    };
  }, []);

  const remaining = limit - uploadedlength;

  const show = limit - remaining + (uploadedlength < limit ? 1 : 0);

  const array = Array(show).fill("");

  return (
    <div className=" flex items-center gap-4">
      {array.map((data, index) => {
        return <Uploader uploadedFile={uploadedFiles[index]} />;
      })}
    </div>
  );
}

// Instructions
// always setUploadCleanup to false to prevent cleanup after upload
