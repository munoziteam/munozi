"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useGlobalStore } from "../zustand/store";
import Text from "@/components/ui/shared/Text";

export default function Modal() {
  const { closeModal, modalActive, ModalChild, modalData } = useGlobalStore();

  return (
    <Credenza
      open={modalActive}
      onOpenChange={() => {
        closeModal();
      }}
    >
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className=" text-center">
            <Text size={"header"}>{modalData?.modalTitle ?? "Modal"}</Text>
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>{ModalChild && <ModalChild />}</CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
