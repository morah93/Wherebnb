import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './editSpot';

function EditSpotModal() {
  const [editSpotModal, setEditSpotModal] = useState(false);

  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      {editSpotModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
