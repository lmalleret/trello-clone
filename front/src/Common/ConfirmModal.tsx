import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModal(props: any) {
  const { title, content, open, setOpen, action } = props;

  const handleClose = () => {
    action();
    setOpen(false);
  };

  return (
    <>
      <Modal show={open} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
