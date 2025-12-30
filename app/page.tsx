export default function Page() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      fontFamily: "system-ui"
    }}>
      <div style={{ maxWidth: 480, width: "100%", padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>
          La Velière – Skin Routine Assistant
        </h1>

        <p style={{ marginTop: 12, color: "#444" }}>
          Ahoj 👋  
          Pomohu ti sestavit ideální skincare rutinu.
        </p>

        <input
          placeholder="Napiš mi, co řešíš (pleť, akné, citlivost...)"
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc"
          }}
        />

        <button
          style={{
            marginTop: 12,
            width: "100%",
            padding: 12,
            background: "black",
            color: "white",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Pokračovat
        </button>
      </div>
    </main>
  );
}
