import { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    // TODO (Task 2): Add discountPercentage field here with an initial value of ""
    // discountPercentage: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        category: editingItem.category || "",
        price: editingItem.price || "",
        price: editingItem.discount || "",
        // TODO (Task 2): Populate discountPercentage when editing
        // discountPercentage: editingItem.discountPercentage || "",
      });
    } else {
      setFormData({ name: "", category: "", price: "", discount: "" });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingItem) setFormData({ name: "", category: "", price: "" });
  };

  return (
    <div className="form-card">
      <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Price (LKR) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Discount (%) *</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        {/* TODO (Task 2): Add the Discount Percentage input field here */}
        {/* HINT:
          <div className="form-group">
            <label>Discount Percentage (%)</label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              placeholder="Enter discount % (0-100)"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        */}

        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
          <button type="submit" className="btn btn-primary">
            {editingItem ? "Update Item" : "Add Item"}
          </button>
          {editingItem && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
