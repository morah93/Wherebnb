import AddReview from "../addReview/addReview";
import { Modal } from "../../context/Modal";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateReviewModal = () => {
  const [createReviewModal, setCreateReviewModal] = useState(false);
  return (
    <>
      {createReviewModal && (
        <Modal onClose={() => setCreateReviewModal(false)}>
          {sessionUser && <AddReview />}
        </Modal>
      )}
    </>
  );
};
export default CreateReviewModal
