import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({});
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authToken'));
    const profilePic = localStorage.getItem('profilePic');
    if (!authData) {
      navigate('/');
    } else {
      setUser({ ...authData, profilePic });
      setEditForm(authData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDelete = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('authToken', JSON.stringify(editForm));
    setUser({ ...editForm, profilePic: user.profilePic });
    setEditing(false);
  };

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-end align-items-center mb-3">
        <img
          src={user.profilePic}
          alt="profile"
          onClick={() => setShowDropdown(!showDropdown)}
          className="rounded-circle"
          style={{ width: 50, height: 50, cursor: 'pointer' }}
        />
        {showDropdown && (
          <div className="dropdown-menu show" style={{ position: 'absolute', top: 60, right: 20 }}>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div className="card shadow p-4">
        <h3 className="mb-4"style={{marginLeft:'8%'}}>User Profile</h3>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src={user.profilePic} alt="profile" className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            {editing ? (
              <>
                <div className="form-group mb-2">
                  <label>Name</label>
                  <input name="name" value={editForm.name || ''} onChange={handleEditChange} className="form-control" />
                </div>
                <div className="form-group mb-2">
                  <label>Email</label>
                  <input name="email" value={editForm.email || ''} onChange={handleEditChange} className="form-control" />
                </div>
                <div className="form-group mb-2">
                  <label>Gender</label>
                  <input name="gender" value={editForm.gender || ''} onChange={handleEditChange} className="form-control" />
                </div>
                <div className="form-group mb-2">
                  <label>DOB</label>
                  <input type="date" name="dob" value={editForm.dob || ''} onChange={handleEditChange} className="form-control" />
                </div>
                <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>DOB:</strong> {user.dob}</p>
                <div className="mt-3">
                  <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Edit</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
