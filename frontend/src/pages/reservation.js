import React, { useState } from "react";
import "./reservation.css";

export default function Reservation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    people: 1,
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Your reservation request has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          people: 1,
          email: "",
          phone: "",
          date: "",
          message: "",
        });
      } else {
        alert("❌ An error occurred. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Unable to send the request (connection problem).");
    }
  };

  return (
    <div className="reserver-page">
      <h1>Book a Ride</h1>
      <p>
        Fill out the form below to book your horse riding experience.
        You will receive a confirmation email shortly.
      </p>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Number of People *</label>
            <input
              type="number"
              name="people"
              min="1"
              value={formData.people}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group full">
          <label>Message (optional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Example: I prefer a ride by the beach..."
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Send Request
        </button>
      </form>
    </div>
  );
}
