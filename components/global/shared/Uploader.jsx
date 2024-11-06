import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState, useRef } from "react";
import { storage } from "@/infrastructure/firebase/firebase";

import { RiUploadCloudLine } from "react-icons/ri";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { useGlobalStore } from "@/infrastructure/zustand/store";

export default function Uploader({ uploadedFile }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [route, setRoute] = useState("start");
  const fileInputRef = useRef(null);

  const { setUploadedFiles, removeFile } = useGlobalStore();

  const uploadFile = async (file) => {
    if (!file) return;

    const filesFolderRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(filesFolderRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedFiles({ url: downloadURL });
          setRoute("finished");
        });
      }
    );
  };

  const handleUploadIconClick = () => {
    // on icon click
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      // Check if the file size is less than or equal to 1MB
      if (file.size > 1024 * 1024) {
        toast.error("File size exceeds the limit of 1MB.");
        return;
      }

      setRoute("uploading");
      uploadFile(file);
    }
  };

  const handleDeleteImage = async () => {
    if (uploadedFile) {
      const fileRef = ref(storage, uploadedFile.url);
      try {
        await deleteObject(fileRef);
        setRoute("start");
        setUploadProgress(0);
        removeFile(uploadedFile);
      } catch (error) {
        console.error("Error deleting the file:", error);
        toast.error("Failed to delete the image. Please try again.");
      }
    }
  };

  return (
    <>
      {route === "start" && (
        <div
          onClick={handleUploadIconClick}
          className="cursor-pointer border-2 rounded-xl w-[75px] h-[75px] center"
        >
          <RiUploadCloudLine />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
          />
        </div>
      )}

      {route === "uploading" && (
        <div className="w-[75px] h-[75px] rounded-xl border-2 flex flex-col gap-1 items-center justify-center">
          <p className="scale-75 text-center text-xs">Uploading..</p>
          <p className="text-xs">{uploadProgress.toFixed(2)}%</p>
        </div>
      )}
      {route === "finished" && (
        <div className="relative border-accent border-2 p-[1px] w-fit rounded-xl center">
          <Image
            src={uploadedFile?.url}
            width={75}
            height={75}
            alt="pics"
            className="w-[75px] h-[75px] rounded-xl"
          />
          <MdCancel
            className="absolute top-[-7px] left-[-2px] bg-white rounded-full z-[10] cursor-pointer"
            onClick={handleDeleteImage}
          />
        </div>
      )}
    </>
  );
}
