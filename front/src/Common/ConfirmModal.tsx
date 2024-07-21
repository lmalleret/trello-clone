import React, { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmModalProps {
  title: string;
  content: ReactNode;
  open: boolean;
  setOpen: (flag: boolean) => void;
  action: (() => void) | null;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  open,
  setOpen,
  action,
}) => {
  const handleClose = () => {
    if (action) action();
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
