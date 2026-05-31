import { useModals } from "@mantine/modals";

import type { ComponentType } from "react";

interface FormProps {
  onSuccess: () => void | undefined;
}

export interface IGenericModalProps {
  title: string;
  Form: ComponentType<FormProps>;
}

export const useGenericModal = () => {
  const modals = useModals();

  const openGenericModal = ({ title, Form }: IGenericModalProps) => {
    modals.openModal({
      title: title,
      size: "xg",
      centered: true,
      children: (
        <Form
          onSuccess={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  };
  return openGenericModal;
};
