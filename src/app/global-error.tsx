"use client";

/**
 * Last-resort boundary for errors thrown in the root layout itself. It replaces
 * the root layout entirely, so it renders its own <html>/<body> and cannot rely
 * on the stylesheet or i18n provider — styles are inline on purpose.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          background: "#faf9f6",
          color: "#1c1b19",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "#151515" }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#55524a" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              background: "#242424",
              color: "#faf9f6",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
