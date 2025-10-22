import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { shoes } from "~/server/db/schema";
import { desc, eq, notInArray } from "drizzle-orm";

const WEB_A_URL = process.env.WEB_A_URL!;

export async function GET() {
  try {
    // Always try to fetch from Web A first
    console.log("Fetching from:", `${WEB_A_URL}/api/keys`);
    
    const res = await fetch(`${WEB_A_URL}/api/keys`, { 
      cache: "no-store",
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (res.ok) {
      const data = await res.json();
      
      if (data.items && Array.isArray(data.items)) {
        const activeShoeIds: string[] = [];
        
        // Sync active shoes to database
        for (const shoe of data.items) {
          // Only process non-revoked shoes
          if (!shoe.revoked) {
            activeShoeIds.push(shoe.id);
            
            const shoeData = {
              id: shoe.id,
              type: shoe.type,
              brand: shoe.brand,
              model: shoe.model,
              size: shoe.size,
              price: shoe.price,
              imageUrl: shoe.imageUrl || null,
              revoked: false,
              createdAt: new Date(shoe.createdAt),
              fetchedAt: new Date(),
            };

            await db.insert(shoes).values(shoeData).onConflictDoNothing();
          }
        }

        // Remove shoes that are no longer in the active list (revoked or deleted)
        if (activeShoeIds.length > 0) {
          await db.delete(shoes).where(notInArray(shoes.id, activeShoeIds));
        } else {
          // If no active shoes, clear all
          await db.delete(shoes);
        }

        // Return only non-revoked shoes
        const activeShoes = data.items.filter((shoe: any) => !shoe.revoked);
        console.log(`✅ Fetched ${activeShoes.length} active shoes from Web A`);
        return NextResponse.json(activeShoes, { status: 200 });
      }
    }

    // If Web A fails, fallback to database (filter out any revoked items)
    console.log("⚠️ Web A unavailable, falling back to database");
    const dbShoes = await db.query.shoes.findMany({
      orderBy: [desc(shoes.createdAt)],
    });

    // Filter out revoked shoes from cache
    const activeDbShoes = dbShoes.filter(shoe => !shoe.revoked);

    if (activeDbShoes.length > 0) {
      console.log(`📦 Returning ${activeDbShoes.length} shoes from database cache`);
      return NextResponse.json(activeDbShoes, { status: 200 });
    }

    return NextResponse.json({ error: "No shoes available" }, { status: 404 });
    
  } catch (error) {
    console.error("Error fetching from Web A:", error);
    
    // Fallback to database on error
    try {
      const dbShoes = await db.query.shoes.findMany({
        orderBy: [desc(shoes.createdAt)],
      });

      // Filter out revoked shoes
      const activeDbShoes = dbShoes.filter(shoe => !shoe.revoked);

      if (activeDbShoes.length > 0) {
        console.log(`📦 Error fallback: ${activeDbShoes.length} shoes from database`);
        return NextResponse.json(activeDbShoes, { status: 200 });
      }
    } catch (dbError) {
      console.error("Database fallback also failed:", dbError);
    }

    return NextResponse.json(
      { error: "Failed to fetch shoes" },
      { status: 500 }
    );
  }
}