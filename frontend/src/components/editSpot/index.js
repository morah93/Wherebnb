import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './editSpot';
import './editSpot.css'

function EditSpotModal() {
  const [editSpotModal, setEditSpotModal] = useState(false);

  return (
    <>
      {editSpotModal && (
        <Modal onClose={() => setEditSpotModal(false)}>
          <EditSpot />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
