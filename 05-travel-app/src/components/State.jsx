function State({ item }) {
  if (!item.length)
    return (
      <p className="footer">
        <em>Start adding items to your list</em>
      </p>
    );
  const numItems = item.length;
  const numPacked = item.filter((item) => item?.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="state">
      <em>
        {percent === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, 
            and you already packed ${numPacked} ${numItems.packed} (${percent}%)
           `}
      </em>
    </footer>
  );
}

export default State;
