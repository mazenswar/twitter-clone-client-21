import React, { useContext, useState } from 'react';

import { Context as AuthContext } from '../context/AuthContext';

const ProfileEdit = ({ history, modal, setModal }) => {
  const {
    state: { user: currentUser },
    deleteUserFromDB,
    updateUserToDB,
  } = useContext(AuthContext);

  const [editForm, setEditForm] = useState({ ...currentUser });

  //
  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  //
  const handleDeleteUser = () => {
    deleteUserFromDB(editForm.id);
    history.push('/');
  };

  const handleEdit = async (user) => {
    await updateUserToDB(user);
    setModal(!modal);
  };

  return (
    <>
      <div className="modal">
        <div className="edit-form">
          <button className="close-modal" onClick={() => setModal(!modal)}>
            X
          </button>
          <button onClick={() => handleEdit(editForm)}>Save Changes</button>
          <button onClick={handleDeleteUser}>Delete User</button>
          <input
            type="text"
            name="email"
            value={editForm.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            value={editForm.username}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
