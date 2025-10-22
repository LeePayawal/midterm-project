import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { orders } from "~/server/db/schema";
import { desc } from "drizzle-orm";

// POST - Save a new order to database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const orderData = {
      id: body.id,
      orderDate: new Date(body.date),
      total: body.total,
      status: body.status,
      trackingNumber: body.trackingNumber,
      paymentMethod: body.paymentMethod,
      shippingInfo: body.shippingInfo,
      items: body.items,
      createdAt: new Date(),
    };

    await db.insert(orders).values(orderData);

    return NextResponse.json({ 
      success: true, 
      order: orderData 
    }, { status: 201 });

  } catch (error) {
    console.error("Failed to save order:", error);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}

// GET - Retrieve all orders from database
export async function GET() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: [desc(orders.orderDate)],
    });

    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}