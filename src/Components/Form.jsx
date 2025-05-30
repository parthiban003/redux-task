import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitForm } from './Components/Store';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm(formData));
    setFormData({ name: '', email: '' }); 
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Redux Form with Two Inputs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;