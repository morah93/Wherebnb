import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './addReview';
import './addReview.css'

function AddReviewModal() {
  const [addReviewModal, setAddReviewModal] = useState(false);

  return (
    <>
      {addReviewModal && (
        <Modal onClose={() => setAddReviewModal(false)}>
          <AddReview />
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
