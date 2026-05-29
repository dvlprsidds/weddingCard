import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, count, isAttending, message } = body;

    // Direct schema validations
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid guest name." },
        { status: 400 }
      );
    }

    // Simulate database write / network lag (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("RSVP Submission Received Successfully:", { name, count, isAttending, message });

    return NextResponse.json({
      success: true,
      message: `Dearest ${name}, your RSVP has been recorded. Thank you!`,
    });
  } catch (error) {
    console.error("RSVP endpoint error:", error);
    return NextResponse.json(
      { success: false, error: "Server failed to process RSVP. Please try again." },
      { status: 500 }
    );
  }
}
