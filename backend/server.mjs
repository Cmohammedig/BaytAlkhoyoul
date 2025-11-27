// Reservation.jsx
import React, { useState } from "react";
import "./reservation.css";

/**
 * Reservation component (complete)
 * - Transparent overlay (Bayt Al Khouyoul message)
 * - Prevent double submit + Idempotency-Key header
 * - Accessible labels and aria-live
 * - Uses your API endpoint at https://baytalkhoyoul.onrender.com/api/reservation
 */

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isDone) return; // safety

    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      prenom: formData.firstName,
      nom: formData.lastName,
      personnes: formData.people,
      email: formData.email,
      telephone: formData.phone,
      date: formData.date,
      message: formData.message,
    };

    // generate Idempotency-Key: use crypto.randomUUID when available
    const idemKey =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

    try {
      const res = await fetch("https://baytalkhoyoul.onrender.com/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idemKey,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsDone(true);
        setIsSubmitting(false);

        // clear form (optional UX choice)
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
        // try to extract server message
        const err = await res.json().catch(() => ({}));
        const msg = err.error || err.message || "Server error, please try again later.";
        setServerError(msg);
        setIsSubmitting(false);
        // small visible notification
        alert(msg);
      }
    } catch (error) {
      console.error("Network error:", error);
      setServerError("Network error. Please check your connection.");
      setIsSubmitting(false);
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="reserver-page">
      <h1>Book a Ride</h1>
      <p>
        Fill out the form below to book your horse riding experience.
        You will receive a confirmation email shortly.
      </p>

      <form
        className={`reservation-form ${isDone ? "disabled" : ""}`}
        onSubmit={handleSubmit}
        aria-disabled={isSubmitting || isDone}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="people">Number of People *</label>
            <input
              id="people"
              name="people"
              type="number"
              min="1"
              value={formData.people}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting || isDone}
            />
          </div>
        </div>

        <div className="form-group full">
          <label htmlFor="message">Message (optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Example: I prefer a ride by the beach..."
            disabled={isSubmitting || isDone}
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitting || isDone}
          aria-live="polite"
        >
          {isSubmitting ? "Sending..." : isDone ? "Request Sent" : "Send Request"}
        </button>
      </form>

      {/* Transparent overlay (no animation) */}
      {(isSubmitting || isDone) && (
        <div className={`overlay ${isDone ? "done" : ""}`} role="status" aria-live="polite">
          <div className="overlay-card">
            <div className="overlay-text">
              {isSubmitting && (
                <>
                  <h2>Bayt Al Khouyoul thanks you</h2>
                  <p>We welcome you! Please wait a moment…</p>
                </>
              )}

              {isDone && (
                <>
                  <h2>Reservation Sent</h2>
                  <p>Thank you! We will contact you shortly.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {serverError && (
        <div className="server-error" role="alert" style={{ marginTop: 12 }}>
          {serverError}
        </div>
      )}
    </div>
  );
}
