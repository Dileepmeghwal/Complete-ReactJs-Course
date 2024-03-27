import { useState } from "react";

function PackageingList({ item, onDeleteItems, onToggle, onClear }) {
  const [sortBy, setSortBy] = useState("");

  let sortedItems;
  if (sortBy === "input") sortedItems = item;
  if (sortBy === "description")
    sortedItems = item.slice().sort((a, b) => a.description.localeCompare);

  if (sortBy === "packed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item) => (
          <Items
            list={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggle={onToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={() => onClear([])}>Clear list</button>
      </div>
    </div>
  );
}

export default PackageingList;
