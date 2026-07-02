import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "7px",
          border: "1px solid #7f1d1d",
          fontSize: "15px",
          fontWeight: 900,
          letterSpacing: "-1px",
        }}
      >
        <span style={{ color: "#dc2626" }}>D</span>
        <span style={{ color: "#ffffff" }}>C</span>
      </div>
    ),
    { ...size }
  );
}
