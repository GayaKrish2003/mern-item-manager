function ItemList({ items, loading, onEdit, onDelete }) {
  if (loading) return <div className="loading">Loading items...</div>;
  if (items.length === 0) {
    return <div className="empty-state">No items yet. Add your first item above!</div>;
  }

  return (
    <div>
      <h2>All Items <span className="count-badge">{items.length}</span></h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="meta">Price: LKR {Number(item.price).toFixed(2)}</p>
            <p className="meta">Discount: {item.discount}</p>

            {/* TODO (Task 2): Display Discount Percentage here */}
            {/* HINT:
              {item.discountPercentage !== undefined && (
                <p className="meta">Discount: {item.discountPercentage}%</p>
              )}
            */}

            <div className="item-actions">
              <button className="btn btn-warning btn-sm" onClick={() => onEdit(item)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
