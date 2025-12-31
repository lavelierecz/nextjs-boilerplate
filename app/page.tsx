"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

const userMessage = {
  role: "user" as const,
  content: input,
};
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    ssetMessages((prev) => [
  ...prev,
  { role: "assistant" as const, content: data.reply },
]);
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-serif mb-6">Objev svou rutinu</h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-gray-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Napiš svůj problém s pletí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Odeslat
          </button>
        </div>
      </div>
    </main>
  );
}
