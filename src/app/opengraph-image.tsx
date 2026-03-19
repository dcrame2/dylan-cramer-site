import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dylan Cramer - Ironman Athlete, Ultrarunner & Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #000000 0%, #1a0000 30%, #000000 60%, #0a0000 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top red line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1,
              display: "flex",
              gap: "16px",
            }}
          >
            <span style={{ color: "#dc2626" }}>DYLAN</span>
            <span style={{ color: "#ffffff" }}>CRAMER</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "8px",
              color: "#666666",
              textTransform: "uppercase",
              marginTop: "16px",
            }}
          >
            Ironman Athlete &bull; Ultrarunner &bull; Creator
          </div>

          {/* Go One More */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#dc2626",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "32px",
              textShadow: "0 0 40px rgba(220,38,38,0.5)",
            }}
          >
            GO ONE MORE
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "40px",
            }}
          >
            {[
              { number: "140.6mi", label: "Ironman" },
              { number: "100mi", label: "Ultra" },
              { number: "13:54", label: "IM PR" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#dc2626",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "4px",
                    color: "#555",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom red line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
