// ...
import { useState } from "react";
import { Modal } from "@mui/material";
const PopupForm = ({ isOpen, onRequestClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [unitComment, setUnitComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue, unitComment); // Pass both values to onSubmit
    setInputValue('');
    setUnitComment('');
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        {/* ... other form fields ... */}
        <input
          type="text"
          value={unitComment}
          onChange={(e) => setUnitComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default PopupForm;
