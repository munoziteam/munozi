"use client";

import LabelInput from "@/components/global/shared/LabelInput";
import RouteHeader from "@/components/global/shared/RouteHeader";
import { Button } from "@/components/ui/button";
import COLLECTIONS from "@/infrastructure/models/collection";
import { useListDocuments } from "@/infrastructure/reactQuery/utils/useDocument";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import { useState } from "react";
import db from "@/infrastructure/appwrite/database"; // Assume db is the database utility you've set up
import { toast } from "sonner";
import { useInvalidate } from "@/infrastructure/reactQuery/utils/InvalidationContext";
import { Query } from "appwrite";

type Props = {};

export default function ProfileEdit({}: Props) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const { user, setIsLoading } = useGlobalStore();

  const { InvalidateRules } = useInvalidate();

  const queries = [Query.equal("user_id", [`${user?.$id}`])];

  const { data: { documents: profileResult } = {} } = useListDocuments(
    COLLECTIONS.profile,
    queries
  );
  const profileData = profileResult?.[0];

  // Handle submit with partial update
  const handleSubmit = async () => {
    if (!profileData) {
      toast.error("No Input Detected");
      return;
    }

    setIsLoading(true);

    const payload = {} as any;

    // Add only fields with values
    if (first_name) payload.first_name = first_name;
    if (last_name) payload.last_name = last_name;
    if (phone_number) payload.phone_number = phone_number;
    if (country) payload.country = country;
    if (gender) payload.gender = gender;
    if (address) payload.address = address;

    try {
      // Update the document with partial fields; create fields if they don't exist
      //@ts-ignore
      await db[COLLECTIONS.profile].updatePartial(profileData.$id, payload);
      InvalidateRules(COLLECTIONS.profile);
      toast.success("Profile Updated Succefully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <RouteHeader info="Edit Profile" />
      <div className="flex flex-col gap-5 p-5">
        <LabelInput
          label="First Name"
          setter={setFirst_name}
          placeholder={profileData?.first_name || ""}
        />
        <LabelInput
          label="Last Name"
          setter={setLast_name}
          placeholder={profileData?.last_name || ""}
        />
        <LabelInput
          label="Email"
          setter={setEmail}
          placeholder={profileData?.email || ""}
          isDisabled={true}
        />
        <LabelInput
          label="Phone Number"
          setter={setPhone_number}
          placeholder={profileData?.phone_number || ""}
        />
        <div className="flex w-full justify-between items-center gap-4">
          <LabelInput
            label="Country"
            setter={setCountry}
            placeholder={profileData?.country || ""}
          />
          <LabelInput
            label="Gender"
            setter={setGender}
            placeholder={profileData?.gender || ""}
          />
        </div>
        <LabelInput
          label="Address"
          setter={setAddress}
          placeholder={profileData?.address || ""}
        />
        <Button className="" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
