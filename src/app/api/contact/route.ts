import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const subject = isNonEmptyString(body.subject) ? body.subject.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";
    const phone =
      typeof body.phone === "string" && body.phone.trim().length > 0
        ? body.phone.trim()
        : null;

    const missing: string[] = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!subject) missing.push("subject");
    if (!message) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    await db.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[api/contact] POST error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
