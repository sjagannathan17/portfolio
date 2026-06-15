import { ImageResponse } from "next/og";

export const alt = "Srinidhi Jagannathan — AI Builder & Product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #cdecff 0%, #e9f5ff 45%, #fff3df 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 110,
            width: 150,
            height: 150,
            borderRadius: 999,
            background: "#ffd76b",
            opacity: 0.85,
          }}
        />
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#5a6b8c", textTransform: "uppercase" }}>
          A tiny San Francisco
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#1f2a44", marginTop: 16, lineHeight: 1.05 }}>
          Srinidhi Jagannathan
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#3a4a6b", marginTop: 24, maxWidth: 900 }}>
          AI builder &amp; product · MS Business Analytics, Santa Clara University
        </div>
        <div style={{ display: "flex", fontSize: 64, marginTop: 40 }}>🌉 🏛️ 🎡 🌁</div>
      </div>
    ),
    { ...size }
  );
}
