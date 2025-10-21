import { NextResponse } from "next/server";

const WEB_A_URL =
  process.env.NODE_ENV === "production"
    ? "https://activity-project-usky.vercel.app"
    : "http://localhost:3000";

export async function GET() {
  try {
    const res = await fetch(`${WEB_A_URL}/api/keys`, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.items) {
      return NextResponse.json({ error: "No shoes found" }, { status: 404 });
    }

    return NextResponse.json(data.items, { status: 200 });
  } catch (error) {
    console.error("Proxy GET failed:", error);
    return NextResponse.json(
      { error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}
