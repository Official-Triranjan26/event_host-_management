import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";

const ImageModal = ({imageUrl,openModal,setOpenModal}) => {
//   const [openModal, setOpenModal] = useState(true);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img src={imageUrl} alt="imageUrl" className="w-full" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}><RxCross1/></Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageModal;
