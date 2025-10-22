import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { shoes } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Get all shoes from database
    const allShoes = await db.query.shoes.findMany({
      orderBy: [desc(shoes.createdAt)],
    });

    return NextResponse.json(allShoes, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shoes from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch shoes" },
      { status: 500 }
    );
  }
}