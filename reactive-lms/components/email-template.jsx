export const EmailTemplate = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#2563eb",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "28px",
            }}
          >
            Reactive Learning
          </h1>

          <p
            style={{
              color: "#dbeafe",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            Learn. Build. Grow.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "32px" }}>
          <p
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            © {new Date().getFullYear()} Reactive Learning. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};