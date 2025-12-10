import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="px-5 py-3"
      style={{
        top: show ? "0" : "-100px",
        position: "fixed",
        width: "100%",
        transition: "top 0.3s, background-color 0.3s",
        backgroundColor: show ? "#FF4500D9" : "#FF45007F",
        color: "white",
        zIndex: 1000,
      }}
    >
      <Navbar.Brand href="/">
        <img src="/suitmedia.jpg" alt="Suitmedia Logo" style={{ height: "60px" }} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          {[
            { name: "Work", path: "/work" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Ideas", path: "/ideas" },
            { name: "Careers", path: "/careers" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Nav.Link key={link.path} as={NavLink} to={link.path} style={{ color: "white" }} className={({ isActive }) => (isActive ? "active-link" : "")}>
              {link.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
