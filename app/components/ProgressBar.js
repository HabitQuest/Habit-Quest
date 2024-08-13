export default function ProgressBar({ progress, colorType }) {
  return (
    <div
      style={{
        width: "100%",
        height: "18px",
        borderRadius: "16px",
        border: "1px solid #000",
        background: "linear-gradient(90deg, #EAE6E6 77.5%, #848181 100%)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
      }}
    >
      <div
        className="transition-all duration-500"
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `${colorType}`,
          borderRadius: "16px",
        }}
      ></div>
    </div>
  );
}
