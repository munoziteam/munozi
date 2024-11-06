const initialState = {
  modalActive: false,
  ModalChild: null,
  modalData: null,
};

export const modalSlice = (set) => ({
  ...initialState,
  openModal: (ModalChild, modalData) => {
    set({
      modalActive: true,
      ModalChild,
      modalData,
    });
  },
  closeModal: () => {
    set({
      ...initialState,
    });
  },
});