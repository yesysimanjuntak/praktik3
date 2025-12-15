// src/components/Header/Header.jsx
import React from "react";
import "./Header.css";

function Header({ admin }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Demo Komponen React dengan Props</h1>
        <p>Pemrograman Web Modern - Pertemuan 3</p>
      </div>

      <div className="header-right">
        <div className="admin-info">
          <p>Halo, {admin}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
