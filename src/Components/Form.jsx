import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearMessages, loginUser, registerUser } from '../Redux/Actions';

const Form = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '', mobile: ''
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { successMessage, loginMessage, loading } = useSelector((state) => state);

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearMessages());
  };


  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    dispatch(clearMessages());
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    dispatch(registerUser(formData));
    setFormData({
      name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '', mobile: ''
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData, navigate));
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      {loading && <div className="loader">Loading...</div>}

      <div className="form-container sign-up">
        <form onSubmit={handleSubmit} autoComplete='off'>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          <select className='gender' name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <input name="mobile" type="number" placeholder="Mobile No" value={formData.mobile} onChange={handleChange} required />
          {successMessage && <p style={{ color: successMessage.includes('Success') ? 'green' : 'red' }}>{successMessage}</p>}
          <button type="submit" className='button'>Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <span>or use your email password</span>
          <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
          <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
          <a href="#">Forget Your Password?</a>
          {loginMessage && <p style={{ color: loginMessage.includes('Success') ? 'green' : 'red' }}>{loginMessage}</p>}
          <button type="submit" className='button'>Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
