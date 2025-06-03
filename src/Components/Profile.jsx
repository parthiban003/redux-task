import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem('authToken'))?.email;
  const profilePic = localStorage.getItem('profilePic');

  useEffect(() => {
    if (!email) navigate('/');
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-avatar-wrapper">
          <img
            src={profilePic}
            alt="profile"
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-avatar"
          />
          {showDropdown && (
            <div className="profile-dropdown">
              <p className="profile-email">{email}</p>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </header>
      <main className="profile-main">
        <h2 className="welcome-message">Welcome, {email}!</h2>
        <img src={profilePic} alt="profile" className="profile-main-pic" />
      </main>
    </div>
  );
};

export default Profile;
