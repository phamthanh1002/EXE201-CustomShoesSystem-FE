import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onFinish();
        }, 700);
      }, 1300);
    }, 2200);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s ease-in-out",
      }}
    >
      <div style={styles.textContainer}>
        <span
          style={{
            ...styles.text,
            transform: animate
              ? "translateX(-150%) scale(1.2)"
              : "translateX(0) scale(1)",
            opacity: animate ? 0 : 1,
            transition: "transform 1.3s ease, opacity 0.5s ease",
          }}
        >
          Design
        </span>
        <span
          style={{
            ...styles.text,
            transform: animate
              ? "translateX(150%) scale(1.2)"
              : "translateX(0) scale(1)",
            opacity: animate ? 0 : 1,
            transition: "transform 1.3s ease, opacity 0.5s ease",
          }}
        >
          MyKicks
        </span>
      </div>
      <div style={styles.cinematicLine}></div>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'Cinzel', serif",
  },
  textContainer: {
    display: "flex",
    fontSize: "48px",
    fontWeight: "700",
    color: "#fff",
    gap: "20px",
    letterSpacing: "6px",
    overflow: "hidden",
  },
  text: {
    display: "inline-block",
    minWidth: "140px",
  },
  spinner: {
    marginTop: "40px",
    width: "36px",
    height: "36px",
    border: "4px solid rgba(255, 255, 255, 0.2)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  cinematicLine: {
    marginTop: "30px",
    width: "60%",
    height: "2px",
    backgroundColor: "#fff",
    opacity: 0.2,
    animation: "glowLine 2s ease-in-out infinite alternate",
  },
};

const addKeyframes = () => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes glowLine {
      0% { opacity: 0.2; width: 40%; }
      100% { opacity: 0.8; width: 60%; }
    }
  `;
  document.head.appendChild(styleEl);
};

addKeyframes();

export default LoadingScreen;
