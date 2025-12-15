import React from "react";
import "./UserCard.css";

function UserCard({ name, email, avatar, role, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-info">
        <img src={avatar} alt={name} className="user-avatar" />
        <div className="user-details">
          <h3>{name}</h3>
          <p>{email}</p>
          {role && <p className="user-role">Sebagai: {role}</p>}
        </div>
      </div>

      <div className="user-actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Hapus</button>
      </div>
    </div>
  );
}

export default UserCard;
