import React, { useEffect, useRef } from 'react'

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  setExpenses,
  expenses,
  rowId,
  setExpense,
  setEditableRow
}) {

  const menuRef = useRef();

  //Close ContextMenu when user click outside of menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition({});
      }
    }

    if (menuPosition) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuPosition]);


  /*
    The handleDelete function filters out an expense with a specific id from the expenses array and
    resets the menu position.
   */
  const handleDelete = () => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== rowId))
    setMenuPosition({});
  };

  /*
    The `handleEdit` function resets the menu position, retrieves specific expense data based on the
    row ID, and sets the retrieved data as the editable expense row.
   */
  const handleEdit = () => {
    setMenuPosition({});

    const { title, category, amount } = expenses.find((exp) => exp.id === rowId);
    setExpense({ title, category, amount });
    setEditableRow(rowId);
  };

  //Close ContextMenu when position are null/empty
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={menuPosition} ref={menuRef}>
      <div onClick={handleEdit}>Edit</div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  )
}