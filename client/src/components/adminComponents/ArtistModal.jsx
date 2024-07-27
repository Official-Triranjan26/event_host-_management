import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";
const ArtistModal = ({artistModalOpen,setArtistModalOpen,details}) => {
  return (
    <>
      <Modal show={artistModalOpen} onClose={() => setArtistModalOpen(false)}>
        <Modal.Header>{details?.artistName}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img src={details?.artistPicUrl} alt="artistPicUrl" className="w-full" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setArtistModalOpen(false)}><RxCross1/></Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ArtistModal