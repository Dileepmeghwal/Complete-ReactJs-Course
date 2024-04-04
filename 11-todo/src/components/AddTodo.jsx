import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function AddTodo() {
  return (
    <div className="add-btn">
      <button type="submit">
        <IoMdAddCircleOutline size={30} color="#f8f8f8" />
      </button>
    </div>
  );
}

export default AddTodo;
