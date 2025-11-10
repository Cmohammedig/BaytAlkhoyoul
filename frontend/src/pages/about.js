import React, { useEffect, useState } from "react";
import "./about.css";
import club1 from "../images/hamza2.png";
import club2 from "../images/hamza1.png";
import club3 from "../images/hamza1.png";

export default function About() {
  const images = [club1, club2, club3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Switch image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about-page">
      {/* Left section: slideshow */}
      <div className="about-left">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Bayt Al Khouyoul club"
            className={`slideshow-image ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Right section: text content */}
      <div className="about-right">
        <h1>Who We Are</h1>
        <p>
          Welcome to <strong>Bayt Al Khouyoul</strong>, a horse-riding club founded
          by passionate lovers of horses and nature. Our mission is to share the
          beauty, nobility, and serenity of the equestrian world with every one of
          our visitors.
        </p>
        <p>
          Whether you are a beginner or an experienced rider, we offer horseback
          rides, introductory lessons, and authentic experiences in an exceptional
          natural setting.
        </p>
        <p>
          Our horses are well-trained, calm, and balanced — ensuring a safe and
          rewarding experience. Come and feel the harmony between humans and horses
          in a peaceful and welcoming environment.
        </p>
      </div>
    </div>
  );
}
