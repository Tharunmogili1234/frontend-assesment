import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMessage('Item added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch {
      setMessage('Error adding to cart.');
    }
  };

  return (
    <div>
      <h2>Shop</h2>
      {message && <p>{message}</p>}
      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
