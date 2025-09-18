import { NextResponse } from "next/server";

const WEB_A_URL = process.env.WEB_A_URL ?? "http://localhost:3000";

// Types for responses
interface Phone {
  id: string;
  brand: string;
  storage: string;
  cpu: string;
  price: number;
  imageUrl?: string;
  revoked?: boolean;
}

interface KeysResponse {
  items?: Phone[];
  error?: string;
}

// Proxy GET → Web A /api/keys
export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? "";

    const res = await fetch(`${WEB_A_URL}/api/keys`, {
      headers: { "x-api-key": apiKey },
    });

    const data: KeysResponse = await res.json();

    // Only return the first key associated with this API key
    if (res.ok && data.items && data.items.length > 0) {
      return NextResponse.json(data.items[0], { status: 200 });
    }

    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  } catch (error) {
    console.error("Proxy GET failed:", error);
    return NextResponse.json(
      { error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}

// Proxy POST → Web A /api/keys
export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? "";
    const body = (await req.json()) as Partial<Phone>;

    const res = await fetch(`${WEB_A_URL}/api/keys`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const data: Phone | { error: string } = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy POST failed:", error);
    return NextResponse.json(
      { error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}
