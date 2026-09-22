

// import React, { useEffect, useRef, useState } from "react";
// import "./ClientStories.css";
// import vector from "./vector.png";

// // NOTE: apne folder structure ke hisaab se ye relative path adjust kar lein
// // (jaisa AdminDashboard.jsx aur AdminProjects.jsx mein use ho raha hai,
// // usi reviewApi.js file ko yahan bhi import kar rahe hain)
// import { getReviews, getReviewImageUrl } from "../../api/reviewApi";

// // Kitni der mein agla card apne aap aaye (milliseconds)
// const AUTO_SLIDE_INTERVAL = 4000;

// // Rating ko safe tareeqay se stars mein convert karta hai —
// // rating missing/galat ho to bhi crash nahi karega
// const renderStars = (rating) => {
//   const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));
//   return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
// };

// export default function ClientStories() {
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Hover state ko ref mein rakha hai taake interval callback
//   // hamesha latest value dekhe (stale closure issue se bachne ke liye)
//   const isHoveredRef = useRef(false);

//   // =====================================================
//   // FETCH REVIEWS FROM BACKEND
//   // =====================================================

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const data = await getReviews();

//         // Backend { success, data } bhejta hai — kayi shapes
//         // safely handle kar rahe hain taake kabhi crash na ho
//         const list = Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.reviews)
//           ? data.reviews
//           : Array.isArray(data)
//           ? data
//           : [];

//         setCards(list);
//         setActiveIndex(0);
//       } catch (err) {
//         console.error("Client stories fetch error:", err);
//         setError("Client stories abhi load nahi ho sakin.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // =====================================================
//   // AUTO SLIDE — har AUTO_SLIDE_INTERVAL ke baad agla card,
//   // aakhri card ke baad wapas pehle pe loop ho jata hai.
//   // Hover karte waqt slide rukk jati hai.
//   // =====================================================

//   useEffect(() => {
//     if (cards.length <= 1) return; // 0 ya 1 card ho to slide karne ki zaroorat nahi

//     const intervalId = setInterval(() => {
//       if (isHoveredRef.current) return;

//       setActiveIndex((previous) => (previous + 1) % cards.length);
//     }, AUTO_SLIDE_INTERVAL);

//     return () => clearInterval(intervalId);
//   }, [cards.length]);

//   const goToSlide = (index) => {
//     setActiveIndex(index);
//   };

//   // Safe index — cards.length badalne (jaise refetch) ke baad
//   // bhi kabhi array ke bahar wala index access nahi hoga
//   const safeIndex = cards.length > 0 ? activeIndex % cards.length : 0;
//   const translateXPercent = -(safeIndex * 50);

//   return (
//     <section className="client-stories-section">

//       <div className="client-stories-left">

//         <div className="spot_line"></div>

//         <h2 className="client-title">My Client's Stories</h2>

//         <p className="client-desc">
//           Empowering people in new a digital journey
//           <br />
//           with my super services
//         </p>

//         <span className="client-list">

//           {loading ? (
//             <li>Loading...</li>
//           ) : cards.length === 0 ? (
//             <li>No reviews yet.</li>
//           ) : (
//             cards.slice(0, 3).map((card, i) => (
//               <li key={card._id || card.id || i}>
//                 <div className="client-name">
//                   {card.name || "Anonymous"}
//                 </div>{" "}
//                 <br />
//                 <div className="client-note">
//                   ({card.profession || "Client"})
//                 </div>
//               </li>
//             ))
//           )}

//         </span>

//       </div>


//       <div className="client-stories-right">

//         {loading ? (

//           <div className="testimonial-slider-container">
//             <p style={{ padding: "40px", textAlign: "center" }}>
//               Loading client stories...
//             </p>
//           </div>

//         ) : error ? (

//           <div className="testimonial-slider-container">
//             <p style={{ padding: "40px", textAlign: "center" }}>
//               {error}
//             </p>
//           </div>

//         ) : cards.length === 0 ? (

//           <div className="testimonial-slider-container">
//             <p style={{ padding: "40px", textAlign: "center" }}>
//               No client stories yet.
//             </p>
//           </div>

//         ) : (

//           <>

//             <div
//               className="testimonial-slider-container"
//               onMouseEnter={() => {
//                 isHoveredRef.current = true;
//               }}
//               onMouseLeave={() => {
//                 isHoveredRef.current = false;
//               }}
//             >

//               <div
//                 className="testimonial-slider"
//                 style={{
//                   transform: `translateX(${translateXPercent}%)`,
//                 }}
//               >

//                 {cards.map((card, idx) => (

//                   <div
//                     className="testimonial-card"
//                     key={card._id || card.id || idx}
//                   >

//                     <div className="img-main">
//                       <img
//                         className="testimonial-img"
//                         src={getReviewImageUrl(card.image)}
//                         alt={`${card.name || "Client"} profile`}
//                         onError={(e) => {
//                           e.currentTarget.style.visibility = "hidden";
//                         }}
//                       />
//                     </div>

//                     <div className="testimonial-header">
//                       <span className="testimonial-company">
//                         {renderStars(card.rating)}
//                       </span>
//                     </div>

//                     <div className="boss">
//                       <img className="ho" src={vector} alt="" />
//                       <img className="hi" src={vector} alt="" />
//                     </div>

//                     <div className="testimonial-text">
//                       "{card.message}"
//                     </div>

//                     <div className="testimonial-author">
//                       <span className="testimonial-name">
//                         {card.name || "Anonymous"}
//                       </span>

//                       <span className="testimonial-role">
//                         {card.profession || ""}
//                       </span>
//                     </div>

//                   </div>

//                 ))}

//               </div>

//             </div>


//             <div className="slider-dots">

//               {cards.map((_, i) => (
//                 <button
//                   key={i}
//                   className={`dot ${safeIndex === i ? "active" : ""}`}
//                   onClick={() => goToSlide(i)}
//                   aria-label={`Show slide ${i + 1}`}
//                 />
//               ))}

//             </div>

//           </>

//         )}

//       </div>

//     </section>
//   );
// }






































import React, { useEffect, useRef, useState } from "react";
import { getReviews, getReviewImageUrl } from "../../api/reviewApi";

// =====================================================
// COLOR TOKENS — same dark / purple-violet scheme
// observed across the dashboard. Change ONLY these
// values if your exact brand hex codes differ.
// =====================================================
const COLORS = {
  // bg: "#0d0712",
  surface: "#170c20",
  surfaceAlt: "#1f1129",
  border: "rgba(168, 121, 255, 0.22)",
  primary: "#9b5cf6",
  primaryLight: "#c9a8ff",
  primarySoft: "rgba(155, 92, 246, 0.15)",
  text: "#f4eefc",
  textMuted: "#b3a3c4",
};

const AUTO_SLIDE_INTERVAL = 4500;

const cardShellStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "26px",
  padding: "60px 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const renderStars = (rating) => {
  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));
  return (
    <span style={{ letterSpacing: "3px", fontSize: "16px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < safeRating ? COLORS.primaryLight : "rgba(255,255,255,0.15)",
            textShadow: i < safeRating ? `0 0 10px ${COLORS.primarySoft}` : "none",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

export default function ClientStories() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const isHoveredRef = useRef(false);

  // =====================================================
  // FETCH REVIEWS FROM BACKEND
  // =====================================================
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getReviews();

        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.reviews)
          ? data.reviews
          : Array.isArray(data)
          ? data
          : [];

        setCards(list);
        setActiveIndex(0);
      } catch (err) {
        console.error("Client stories fetch error:", err);
        setError("Client stories abhi load nahi ho sakin.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // =====================================================
  // AUTO SLIDE (pauses on hover)
  // =====================================================
  useEffect(() => {
    if (cards.length <= 1) return;

    const intervalId = setInterval(() => {
      if (isHoveredRef.current) return;
      setActiveIndex((previous) => (previous + 1) % cards.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [cards.length]);

  const safeIndex = cards.length > 0 ? activeIndex % cards.length : 0;

  const goToSlide = (index) => setActiveIndex(index);
  const goNext = () =>
    setActiveIndex((previous) => (previous + 1) % Math.max(cards.length, 1));
  const goPrev = () =>
    setActiveIndex(
      (previous) => (previous - 1 + cards.length) % Math.max(cards.length, 1)
    );

  const activeCard = cards[safeIndex];

  return (
    <section
      style={{
        background: COLORS.bg,
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        gap: "56px",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
      }}
    >
      {/* decorative glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-100px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.15,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-140px",
          right: "-100px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: COLORS.primary,
          opacity: 0.12,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes cs2-fade-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cs2-ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${COLORS.primarySoft}; }
          50% { box-shadow: 0 0 0 10px rgba(155, 92, 246, 0); }
        }
        .cs2-chip {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .cs2-chip:hover {
          transform: translateX(4px);
          border-color: ${COLORS.primary} !important;
        }
        .cs2-arrow {
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .cs2-arrow:hover {
          transform: scale(1.08);
          background: ${COLORS.primary} !important;
          border-color: ${COLORS.primary} !important;
        }
        .cs2-dot {
          transition: width 0.3s ease, background 0.3s ease, opacity 0.3s ease;
        }
        .cs2-card-fade {
          animation: cs2-fade-in 0.5s ease both;
        }
      `}</style>

      {/* ================= LEFT PANEL ================= */}
      <div
        style={{
          flex: "1 1 320px",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: "999px",
            background: COLORS.primarySoft,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.primaryLight,
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          Feedback
        </span>

        <h2
          style={{
            color: COLORS.text,
            fontSize: "36px",
            fontWeight: 800,
            margin: "0 0 14px",
            lineHeight: 1.2,
          }}
        >
          My Client's Stories
        </h2>

        <p
          style={{
            color: COLORS.textMuted,
            fontSize: "15px",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          Empowering people in a new digital journey with my super services.
        </p>

        {loading ? (
          <p style={{ color: COLORS.textMuted }}>Loading...</p>
        ) : cards.length === 0 ? (
          <p style={{ color: COLORS.textMuted }}>No reviews yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {cards.slice(0, 6).map((card, i) => {
              const isActive = i === safeIndex;
              return (
                <button
                  key={card._id || card.id || i}
                  className="cs2-chip"
                  onClick={() => goToSlide(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    border: `1px solid ${isActive ? COLORS.primary : COLORS.border}`,
                    background: isActive ? COLORS.surfaceAlt : COLORS.surface,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: isActive ? COLORS.primary : "rgba(255,255,255,0.06)",
                      color: isActive ? "#fff" : COLORS.textMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {initials(card.name)}
                  </span>

                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        color: COLORS.text,
                        fontSize: "14px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.name || "Anonymous"}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: COLORS.textMuted,
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.profession || "Client"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= RIGHT: CARD ================= */}
      <div
        style={{
          flex: "1 1 420px",
          maxWidth: "540px",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => (isHoveredRef.current = false)}
      >
        {loading ? (
          <div style={cardShellStyle}>
            <p style={{ color: COLORS.textMuted, textAlign: "center" }}>
              Loading client stories...
            </p>
          </div>
        ) : error ? (
          <div style={cardShellStyle}>
            <p style={{ color: COLORS.textMuted, textAlign: "center" }}>{error}</p>
          </div>
        ) : cards.length === 0 ? (
          <div style={cardShellStyle}>
            <p style={{ color: COLORS.textMuted, textAlign: "center" }}>
              No client stories yet.
            </p>
          </div>
        ) : (
          <>
            <div
              key={activeCard._id || activeCard.id || safeIndex}
              className="cs2-card-fade"
              style={{
                position: "relative",
                background: `linear-gradient(160deg, ${COLORS.surfaceAlt}, ${COLORS.surface})`,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "26px",
                padding: "44px 36px 32px",
                overflow: "hidden",
                boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px ${COLORS.border}`,
              }}
            >
              {/* giant decorative quote mark */}
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "24px",
                  fontSize: "120px",
                  lineHeight: 1,
                  color: COLORS.primary,
                  opacity: 0.08,
                  fontFamily: "Georgia, serif",
                  pointerEvents: "none",
                }}
              >
                "
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    padding: "3px",
                    background: `linear-gradient(135deg, ${COLORS.primary}, transparent)`,
                    animation: "cs2-ring-pulse 2.4s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                >
                  {activeCard.image ? (
                    <img
                      src={getReviewImageUrl(activeCard.image)}
                      alt={`${activeCard.name || "Client"} profile`}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        background: COLORS.surface,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: COLORS.surface,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.primaryLight,
                        fontWeight: 700,
                      }}
                    >
                      {initials(activeCard.name)}
                    </div>
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ color: COLORS.text, fontSize: "17px", fontWeight: 700 }}>
                    {activeCard.name || "Anonymous"}
                  </div>
                  <div
                    style={{
                      color: COLORS.textMuted,
                      fontSize: "13px",
                      marginBottom: "6px",
                    }}
                  >
                    {activeCard.profession || "Client"}
                  </div>
                  {renderStars(activeCard.rating)}
                </div>
              </div>

              <p
                style={{
                  color: COLORS.text,
                  fontSize: "16px",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                "{activeCard.message}"
              </p>
            </div>

            {/* controls: prev - dots - next */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
                marginTop: "26px",
              }}
            >
              <button
                className="cs2-arrow"
                onClick={goPrev}
                aria-label="Previous story"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface,
                  color: COLORS.text,
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ‹
              </button>

              <div style={{ display: "flex", gap: "8px" }}>
                {cards.map((_, i) => (
                  <button
                    key={i}
                    className="cs2-dot"
                    onClick={() => goToSlide(i)}
                    aria-label={`Show story ${i + 1}`}
                    style={{
                      width: safeIndex === i ? "26px" : "9px",
                      height: "9px",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      background: safeIndex === i ? COLORS.primary : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>

              <button
                className="cs2-arrow"
                onClick={goNext}
                aria-label="Next story"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface,
                  color: COLORS.text,
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
