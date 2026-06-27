import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface AppointmentPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AppointmentPayload;

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : "";
    const service = isNonEmptyString(body.service) ? body.service.trim() : "";
    const date = isNonEmptyString(body.date) ? body.date.trim() : "";
    const time = isNonEmptyString(body.time) ? body.time.trim() : "";
    const notes =
      typeof body.notes === "string" && body.notes.trim().length > 0
        ? body.notes.trim()
        : null;

    const missing: string[] = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!phone) missing.push("phone");
    if (!service) missing.push("service");
    if (!date) missing.push("date");
    if (!time) missing.push("time");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const appointment = await db.appointment.create({
      data: { name, email, phone, service, date, time, notes },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        service: true,
        date: true,
        time: true,
        notes: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, appointment },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/appointments] POST error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment. Please try again later." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const grouped = await db.appointment.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    let total = 0;
    let pending = 0;
    let confirmed = 0;

    for (const row of grouped) {
      total += row._count._all;
      if (row.status === "pending") pending = row._count._all;
      else if (row.status === "confirmed") confirmed = row._count._all;
    }

    return NextResponse.json({ total, pending, confirmed }, { status: 200 });
  } catch (error) {
    console.error("[api/appointments] GET error:", error);
    return NextResponse.json(
      { error: "Failed to load appointment stats." },
      { status: 500 },
    );
  }
}
