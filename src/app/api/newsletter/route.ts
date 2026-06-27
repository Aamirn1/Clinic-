import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface NewsletterPayload {
  email?: unknown;
}

// Simple, pragmatic email validation regex.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as NewsletterPayload;

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { success: true, alreadySubscribed: true },
        { status: 200 },
      );
    }

    await db.newsletterSubscriber.create({ data: { email } });

    return NextResponse.json(
      { success: true, alreadySubscribed: false },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/newsletter] POST error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 },
    );
  }
}
