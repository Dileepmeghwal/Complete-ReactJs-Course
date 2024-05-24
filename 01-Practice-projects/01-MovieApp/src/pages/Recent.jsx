import React, { useEffect, useState } from "react";
import { items as defaultItems } from "../item";

const Recent = () => {
  const [items, setItems] = useState(defaultItems);
  const [filteredItems, setFilteredItems] = useState(defaultItems);
  const [activeFilters, setActiveFilters] = useState([]);
  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  const handleFilterButtonClick = (item) => {
    if (activeFilters.includes(item)) {
      let filters = activeFilters.filter((el) => el !== item);
      setActiveFilters(filters);
    } else {
      setActiveFilters([...activeFilters, item]);
    }
    console.log(item);
  };

  const filterItems = () => {
    if (activeFilters.length > 0) {
      let tempItems = activeFilters.map((el) => {
        let temp = items.filter((item) => item.category === el);
        return temp;
      });
      console.log(`tempoItems`, tempItems.flat());
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...items]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [activeFilters]);
  return (
    <div>
      <header>AlgoChurn Filters</header>
      <div className="buttons-container">
        {filters.map((el, idx) => (
          <button
            key={`filters-${idx}`}
            className={`button ${
              activeFilters.includes(el) ? "active-btn" : ""
            }`}
            onClick={() => handleFilterButtonClick(el)}
          >
            {el}
          </button>
        ))}
      </div>

      <div className="items-container">
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} className="item">
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
