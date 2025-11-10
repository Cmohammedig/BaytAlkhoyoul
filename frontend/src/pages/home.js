import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import calme from "../images/calme.png";
import tbourida from "../images/tbourida.png";
import nature from "../images/nature.png";
import aniv from "../images/aniv.png";

export default function Home() {
  const [showBottomCta, setShowBottomCta] = useState(true);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("reveal-in")),
      { threshold: 0.80 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* ===== WHY / CARDS ===== */}
      <section className="why" id="why">
        <div className="container">
          <h2 data-reveal>
            لماذا تختارنا؟<br />
            <span className="en">Why Choose Us?</span>
          </h2>

          <div className="cards">
            {/* ---- Card 1 ---- */}
            <article className="card" data-reveal>
              <div
                className="card-media"
                style={{ backgroundImage: `url(${tbourida})` }}
                aria-label="تعلم التبوريدة"
              />
              <h3>
                تعلم التبوريدة<br />
                <span className="en">Learn Traditional Horse Riding (Tbourida)</span>
              </h3>
            </article>

            {/* ---- Card 2 ---- */}
            <article className="card" data-reveal>
              <div
                className="card-media"
                style={{ backgroundImage: `url(${aniv})` }}
                aria-label="أنشطة ترفيهية أو مدرسية"
              />
              <h3>
                أنشطة ترفيهية أو مدرسية<br />
                <span className="en">Recreational or School Activities</span>
              </h3>
            </article>

            {/* ---- Card 3 ---- */}
            <article className="card" data-reveal>
              <div
                className="card-media"
                style={{ backgroundImage: `url(${calme})` }}
                aria-label="خيول عربية بربرية هادئة"
              />
              <h3>
                خيول عربية بربرية هادئة<br />
                <span className="en">Calm Arabian-Barb Horses</span>
              </h3>
              <p>
                مناسبة للأطفال والكبار، مع معدات نظيفة ومريحة.<br />
                <span className="en">Perfect for children and adults, with clean and comfortable equipment.</span>
              </p>
            </article>

            {/* ---- Card 4 ---- */}
            <article className="card" data-reveal>
              <div
                className="card-media"
                style={{ backgroundImage: `url(${nature})` }}
                aria-label="مناظر طبيعية"
              />
              <h3>
                مناظر طبيعية<br />
                <span className="en">Beautiful Natural Views</span>
              </h3>
              <p>
                منطقة زعير<br />
                <span className="en">Located in the Zaer region</span>
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== RÉSERVER ===== */}
      <section className="reservation" id="reserver" data-reveal>
        <div className="container">
          <h2>
            جاهز للركوب؟<br />
            <span className="en">Ready to Ride?</span>
          </h2>
          <p>
            احجز جولة اليوم وعيش تجربة فروسية دافئة وآمنة.<br />
            <span className="en">Book your ride today and enjoy a warm and safe equestrian experience.</span>
          </p>
          <Link to="/reserver" className="btn">
            احجز الآن<br />
            <span className="en">Book a Ride</span>
          </Link>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <div className={`bottom-cta ${showBottomCta ? "show" : ""}`}>
        <div className="bottom-cta-inner">
          <span>
            واش باغي دابا تركب؟<br />
            <span className="en">Want to go for a ride?</span>
          </span>
          <Link to="/reservation" className="btn small">
            احجز<br />
            <span className="en">Reserve</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
