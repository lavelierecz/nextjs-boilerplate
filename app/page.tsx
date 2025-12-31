"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Došlo k chybě, zkuste to prosím znovu.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-serif mb-6 text-gray-900">
        Objev svou rutinu
      </h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-gray-100 text-gray-900 text-right"
                : "bg-gray-200 text-gray-900 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isTyping && (
          <div className="text-gray-500 italic animate-pulse">
            AI píše…
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <textarea
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black resize-none"
            placeholder="Napiš svůj problém s pletí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Odeslat
          </button>
        </form>
      </div>
    </main>
  );
}
