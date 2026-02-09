export const dynamic = "force-dynamic";

const fortitle = "ForgeBuilder";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>{fortitle}</h1>
      <p style={{ marginTop: 8, fontSize: 16 }}>
        ForgeBuilder is deploying. Core system will live under /app.
      </p>
      <div style={{ marginTop: 16 }}>
        <a href="/login">Login</a>{" "}
        <span style={{ margin: "0 8px" }}>|</span>{" "}
        <a href="/app">Open App</a>
      </div>
    </main>
  );
}
