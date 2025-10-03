import React, { useEffect, useRef } from 'react'

export default function ContextMenu({ menuPosition, setMenuPosition, setExpenses, rowId }) {

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


  const handleDelete = () => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== rowId))
    setMenuPosition({});
  };

  const handleEdit = () => {
    setMenuPosition({});
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