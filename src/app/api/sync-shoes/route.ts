import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { shoes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const WEB_A_URL = process.env.WEB_A_URL!;

export async function POST() {
  try {
    console.log("Syncing shoes from:", `${WEB_A_URL}/api/keys`);

    const res = await fetch(`${WEB_A_URL}/api/keys`, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.items) {
      console.error("Failed response:", data);
      return NextResponse.json({ error: "No shoes found from Web A" }, { status: 404 });
    }

    // Insert or update shoes in database
    const syncedShoes = [];
    
    for (const shoe of data.items) {
      const shoeData = {
        id: shoe.id,
        type: shoe.type,
        brand: shoe.brand,
        model: shoe.model,
        size: shoe.size,
        price: shoe.price,
        imageUrl: shoe.imageUrl || null,
        revoked: shoe.revoked || false,
        createdAt: new Date(shoe.createdAt),
        fetchedAt: new Date(),
      };

      // Check if shoe exists
      const existing = await db.query.shoes.findFirst({
        where: eq(shoes.id, shoe.id),
      });

      if (existing) {
        // Update existing shoe
        await db.update(shoes)
          .set(shoeData)
          .where(eq(shoes.id, shoe.id));
      } else {
        // Insert new shoe
        await db.insert(shoes).values(shoeData);
      }

      syncedShoes.push(shoeData);
    }

    return NextResponse.json({ 
      success: true, 
      synced: syncedShoes.length,
      shoes: syncedShoes 
    }, { status: 200 });

  } catch (error) {
    console.error("Sync failed:", error);
    return NextResponse.json(
      { error: "Failed to sync shoes from Web A" },
      { status: 500 }
    );
  }
}

// Optional: GET route to manually trigger sync
export async function GET() {
  return POST();
}