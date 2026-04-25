import { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/items`);
      const data = Array.isArray(res.data) ? res.data : [];
      setItems(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch items. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/items/${editingItem._id}`, formData);
        setEditingItem(null);
      } else {
        await axios.post(`${API_URL}/items`, formData);
      }
      fetchItems();
    } catch (err) {
      setError("Failed to save item. Check all fields are correct.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      <p className="subtitle">Manage your item records</p>
      {error && <div className="error-msg">{error}</div>}
      <ItemForm
        onSubmit={handleSubmit}
        editingItem={editingItem}
        onCancelEdit={() => setEditingItem(null)}
      />
      <ItemList
        items={items}
        loading={loading}
        onEdit={setEditingItem}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
