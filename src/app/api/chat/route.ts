import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatPayload {
  messages?: ChatMessage[];
  session?: string;
}

const SYSTEM_PROMPT = `You are the friendly, knowledgeable eye-care assistant for Islamabad Optical & Clinic, a trusted optical shop and eye clinic in the Islamabad/Rawalpindi area of Pakistan.

Your job:
- Help visitors with general eye-care tips (screen strain, UV protection, dry eyes, kids' vision, etc.).
- Explain our services clearly: comprehensive eye exams, prescription glasses & frames, contact lenses, pediatric eye care, retinal imaging, and management of common conditions.
- Answer FAQ-style questions about visits, what to bring, how long exams take, insurance, and turnaround for glasses.
- Warmly guide users toward booking an appointment whenever they describe a specific symptom, recurring discomfort, vision changes, or a need for new glasses/lenses.

Important rules:
- You are NOT a doctor and must NOT give definitive medical diagnoses or prescribe treatment. For anything that sounds like a specific medical concern, recommend booking an in-clinic eye exam so our optometrists can examine the patient properly.
- Keep replies concise (2-5 short paragraphs max), warm, and easy to read. Use short sentences and an empathetic tone.
- Mention appointment booking naturally when relevant (e.g. "Would you like to book an eye exam? You can do it right here on the site.").
- Our clinic phone is +92 51 111 000 111 for urgent inquiries.
- Do not invent prices; suggest users contact the clinic for current pricing.

Always stay within the eye-care / optical domain. If a question is completely unrelated, politely steer the conversation back to eye care.`;

const FALLBACK_REPLY =
  "I'm having trouble connecting right now. Please call us at +92 51 111 000 111 or book an appointment online.";

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        m !== null &&
        typeof m === "object" &&
        typeof (m as ChatMessage).role === "string" &&
        typeof (m as ChatMessage).content === "string" &&
        ["user", "assistant", "system"].includes((m as ChatMessage).role),
    )
    .map((m) => ({
      role: m.role,
      content: m.content,
    }));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatPayload;
    const incomingMessages = sanitizeMessages(body.messages);

    if (incomingMessages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array." },
        { status: 400 },
      );
    }

    const session =
      typeof body.session === "string" && body.session.trim().length > 0
        ? body.session.trim()
        : crypto.randomUUID();

    // Pull the latest user message (for logging + as a fallback if all is missing).
    const latestUser = [...incomingMessages]
      .reverse()
      .find((m) => m.role === "user");
    const userContent = latestUser?.content ?? "";

    // Build the message list for the SDK. The z-ai-web-dev-sdk uses the
    // 'assistant' role for the system prompt, so prepend it that way.
    const sdkMessages: { role: "assistant" | "user"; content: string }[] = [
      { role: "assistant", content: SYSTEM_PROMPT },
      ...incomingMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "system" ? "assistant" : (m.role as "user" | "assistant"),
          content: m.content,
        })),
    ];

    let reply = "";
    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: sdkMessages,
        thinking: { type: "disabled" },
      });
      reply = completion.choices[0]?.message?.content ?? "";
    } catch (sdkError) {
      console.error("[api/chat] SDK error:", sdkError);
      reply = FALLBACK_REPLY;
    }

    if (!reply.trim()) {
      reply = FALLBACK_REPLY;
    }

    // Persist a simplified log of the latest exchange (user + assistant).
    try {
      await db.$transaction([
        db.chatLog.create({
          data: { role: "user", content: userContent, session },
        }),
        db.chatLog.create({
          data: { role: "assistant", content: reply, session },
        }),
      ]);
    } catch (logError) {
      // Logging is best-effort; never fail the request because of it.
      console.error("[api/chat] log persist error:", logError);
    }

    return NextResponse.json({ reply, session }, { status: 200 });
  } catch (error) {
    console.error("[api/chat] POST error:", error);
    // Graceful fallback so the UI doesn't crash.
    const session = crypto.randomUUID();
    return NextResponse.json(
      { reply: FALLBACK_REPLY, session },
      { status: 200 },
    );
  }
}
