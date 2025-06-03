import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [isActive, setIsActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '', mobile: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setSuccessMessage(' Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('https://682c6773d29df7a95be6e6ee.mockapi.io/RegisterUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(' Registered Successfully!');
        setFormData({
          name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '', mobile: '', 
        });
      } else {
        setSuccessMessage(' Registration failed. Try again.');
      }
    } catch (err) {
      setSuccessMessage(' Server error.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage('');

    try {
      const res = await fetch('https://682c6773d29df7a95be6e6ee.mockapi.io/RegisterUsers');
      const users = await res.json();
      const matchedUser = users.find(
        (user) => user.email === loginData.email && user.password === loginData.password
      );

      if (matchedUser) {
        localStorage.setItem('authToken', JSON.stringify({
          email: matchedUser.email,
          profilePic: 'https://i.pravatar.cc/100?u=' + matchedUser.email
        }));

        setLoginMessage(' Login Successful!');

        setTimeout(() => {
          setIsLoading(false);
          navigate('/profile');
        }, 2000);
      } else {
        setIsLoading(false);
        setLoginMessage(' Invalid email or password.');
      }
    } catch (err) {
      setIsLoading(false);
      setLoginMessage(' Login failed. Try again later.');
    }
  };


  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      {isLoading && <div className="loader">Loading...</div>}

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
          {successMessage && <p style={{ color: successMessage.startsWith('') ? 'green' : 'red' }}>{successMessage}</p>}
          <button type="submit" className='button'>Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <span>or use your email password</span>
          <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
          <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange}  required />
          <a href="#">Forget Your Password?</a>
          {loginMessage && <p style={{ color: loginMessage.startsWith('') ? 'green' : 'red' }}>{loginMessage}</p>}
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
