"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <h1>La Velière – Skin Assistant</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Popiš mi svou pleť..."
        style={{ width: "100%", minHeight: 100 }}
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        Zeptat se
      </button>

      {response && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <strong>Odpověď:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
