import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const userMessage = body.message;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
Jsi kosmetický poradce značky La Velière.
Mluvíš přátelsky, jemně, bez lékařských tvrzení.
Pomáháš lidem pochopit jejich pleť a doporučit rutinu.
Nikdy nedáváš lékařské rady.
`
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content
  });
}
