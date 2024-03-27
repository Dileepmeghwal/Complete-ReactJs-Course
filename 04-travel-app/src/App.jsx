import React, { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackageingList from "./components/PackageingList";
import State from "./components/State";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];
export default function App() {
  const [item, setItem] = useState([]);
  const handleAddItems = (item) => {
    setItem((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItem((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = (item) => {
    const confirmed = window.alert("Are you sure want to delete all items ?");
    if (confirmed) setItem(item);
  };

  return (
    <>
      <div className="apps">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackageingList
          item={item}
          onDeleteItems={handleDeleteItem}
          onToggle={toggleItem}
          onClear={handleClearList}
        />
        <State item={item} />
      </div>
    </>
  );
}
