export const runtime = "nodejs";

import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Jsi profesionální kosmetický poradce značky La Velière. Mluv česky, přátelsky a odborně. Nikdy nezmiňuj AI.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return new Response(
      JSON.stringify({ reply: completion.choices[0].message.content }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Došlo k chybě při zpracování požadavku." }),
      { status: 500 }
    );
  }
}
