import { sql } from "drizzle-orm";
import { index, pgTableCreator, varchar, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `midterm-project_${name}`);

// Shoes table - stores fetched shoes from Web A
export const shoes = createTable(
  "shoe",
  (d) => ({
    id: d.varchar({ length: 256 }).primaryKey(), // Use the ID from Web A
    type: d.varchar({ length: 256 }).notNull(),
    brand: d.varchar({ length: 256 }).notNull(),
    model: d.varchar({ length: 256 }).notNull(),
    size: d.varchar({ length: 50 }).notNull(),
    price: d.integer().notNull(),
    imageUrl: d.varchar({ length: 512 }),
    revoked: d.boolean().default(false),
    createdAt: d.timestamp({ withTimezone: true }).notNull(),
    fetchedAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  }),
  (t) => [
    index("brand_idx").on(t.brand),
    index("type_idx").on(t.type),
  ]
);

// Orders table - stores completed orders
export const orders = createTable(
  "order",
  (d) => ({
    id: d.varchar({ length: 256 }).primaryKey(),
    orderDate: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    total: d.integer().notNull(),
    status: d.varchar({ length: 50 }).notNull().default("Processing"),
    trackingNumber: d.varchar({ length: 256 }).notNull(),
    paymentMethod: d.varchar({ length: 50 }).notNull(),
    
    // Shipping info as JSON
    shippingInfo: d.json().notNull().$type<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      province: string;
      postal: string;
    }>(),
    
    // Order items as JSON array
    items: d.json().notNull().$type<Array<{
      id: string;
      shoe: {
        id: string;
        brand: string;
        model: string;
        type: string;
        price: number;
        imageUrl?: string;
      };
      size: string;
      quantity: number;
    }>>(),
    
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("order_date_idx").on(t.orderDate),
    index("status_idx").on(t.status),
  ]
);