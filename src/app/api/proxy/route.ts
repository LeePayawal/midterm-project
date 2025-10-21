import { NextResponse } from "next/server";

const WEB_A_URL = process.env.WEB_A_URL!; // ✅ Use environment variable directly

export async function GET() {
  try {
    console.log("Fetching from:", `${WEB_A_URL}/api/keys`);

    const res = await fetch(`${WEB_A_URL}/api/keys`, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.items) {
      console.error("Failed response:", data);
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
