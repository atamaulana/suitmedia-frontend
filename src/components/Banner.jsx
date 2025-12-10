// src/components/Banner.jsx
import React from "react";
import "./banner.css"; // CSS terpisah agar mudah diatur

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-text">
          <h1>Ideas</h1>
          <p>Where all our great things begin</p>
        </div>
      </div>
    </div>
  );
}
