import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem('authToken'))?.email;
  const profilePic = localStorage.getItem('profilePic');
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_URL = 'https://682c6773d29df7a95be6e6ee.mockapi.io/RegisterUsers';

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const user = data.find((user) => user.email === email);
        if (user) {
          setUserData(user);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        alert('User data updated successfully!');
        setEditing(false);
      }
    } catch (error) {
      alert('Update failed.');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${userData.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Account deleted successfully!');
        localStorage.clear();
        navigate('/');
      }
    } catch (error) {
      alert('Delete failed.');
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

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
              <button onClick={handleLogout} className="logout-btn" readonly>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main className="profile-main">
        <h2 className="welcome-message">Welcome, {email}!</h2>
        <img src={profilePic} alt="profile" className="profile-main-pic" />

        <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
          <div className="edit-form-row">
            <input
              type="text"
              name="name"
              value={userData?.name || ''}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Name"
            />
            <input
              type="date"
              name="dob"
              value={userData?.dob || ''}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="edit-form-row">
            <input
              type="email"
              name="email"
              value={userData?.email || ''}
              onChange={handleChange}
              disabled
              placeholder="Email"
            />
            <input
              type="number"
              name="mobile"
              value={userData?.mobile || ''}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Mobile Number"
            />
          </div>

          <div className="edit-form-row">
            <select
              name="gender"
              value={userData?.gender || ''}
              onChange={handleChange}
              disabled={!editing}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="edit-form-buttons">
            {!editing ? (
              <button onClick={() => setEditing(true)} className="edit-btn">Edit</button>
            ) : (
              <>
                <button onClick={handleUpdate} className="save-btn">Save</button>
                <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
              </>
            )}
            <button onClick={handleDelete} className="delete-btn">Delete Account</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
