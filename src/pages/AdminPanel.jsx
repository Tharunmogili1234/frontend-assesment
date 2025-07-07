import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });

  const fetchProducts = async () => {
    const res = await axios.get('https://backend-assesment-mxge.onrender.com/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post(
      'https://backend-assesment-mxge.onrender.com/api/products',
      form,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setForm({ name: '', category: '', price: '', stock: '' });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`https://backend-assesment-mxge.onrender.com/api/products/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    fetchProducts();
  };

  return (
    <div>
      <h2>Admin Panel - Product Management</h2>
      <form onSubmit={addProduct}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price} - {p.stock} in stock
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
