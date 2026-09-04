import { ImageResponse } from "next/og";

export const alt = "eVisa ETA - UK Electronic Travel Authorisation Application";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "linear-gradient(135deg, #2D76B5 0%, #1a4d7a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          eVisa ETA
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#EFF6FF",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Apply for UK Electronic Travel Authorisation Online
        </div>
      </div>
    ),
    { ...size }
  );
}
