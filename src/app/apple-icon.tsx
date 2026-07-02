import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000000 0%, #1a0000 60%, #000000 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "84px",
            fontWeight: 900,
            letterSpacing: "-6px",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#dc2626" }}>D</span>
          <span style={{ color: "#ffffff" }}>C</span>
        </div>
        <div
          style={{
            width: "72px",
            height: "5px",
            marginTop: "16px",
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
