import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-assesment-mxge.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>

      <h1>Products</h1>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
