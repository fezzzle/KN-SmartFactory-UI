import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = (props) => {
  const { showModal, removeFromTable, setShowModal } = props;
  return (
    <div>
      <Modal 
      isOpen={showModal}
      >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>Are you sure to delete this?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={removeFromTable}>
            Yes
          </Button>
          <Button color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
