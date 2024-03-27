const Items = ({ list, onDeleteItems, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={list?.packed}
        onChange={() => onToggle(list.id)}
      />
      <span style={list?.packed ? { textDecoration: "line-through" } : {}}>
        {list.quantity} {list.description}
      </span>
      <button onClick={() => onDeleteItems(list.id)}>✖️</button>
    </li>
  );
};
