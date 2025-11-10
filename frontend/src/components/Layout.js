import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../index.css";
import logo from "../images/logo.png";

const Layout = () => {
  return (
    <div>
      {/* ===== Top Bar ===== */}
      <div className="topbar">
        <div className="topbar-content">
          <span>
            📍 <a href="https://maps.app.goo.gl/S1SopVM6oD7UJCfD8" target="_blank" rel="noreferrer">Rabat, Morocco</a>
          </span>
          <span>📞 <a href="tel:+212666123456">+212 6 66 12 34 56</a></span>
          <span>✉️ <a href="mailto:baytAlkhouyoul02@gmail.com">baytAlkhouyoul02@gmail.com</a></span>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Horse Riding Rabat" />
          <span className="site-title">Bayt Al Khouyoul</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <a href="#why">Our Horses</a>
          <Link to="/reservation">Book Now</Link>
        
        </div>
      </nav>

      {/* ===== Main Content ===== */}
      <main style={{ paddingTop: "10.5rem" }}>
        <Outlet />
      </main>

      {/* ===== Footer ===== */}
      <footer>
        <p>© 2025 Bayt Al Khouyoul — All rights reserved</p>
        <p>
          <a href="#contact">Contact</a> |{" "}
          <Link to="/reservation">Book a Ride</Link>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
