"use client";

import Link from "next/link";
import {
  Package,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Truck,
  MapPin,
  CreditCard,
  ShoppingCart,
  Clock,
} from "lucide-react";
import { useCart } from "~/app/context/CartContext";

export default function OrdersPage() {
  const { orders } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "Shipped":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "Delivered":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "Cancelled":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock size={20} />;
      case "Shipped":
        return <Truck size={20} />;
      case "Delivered":
        return <CheckCircle size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "gcash":
        return "GCash";
      case "cod":
        return "Cash on Delivery";
      default:
        return method;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👟</span>
            <span className="text-xl font-bold text-white">Premium Shoes</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Cart
            </Link>
            <Link
              href="/orders"
              className="text-white font-bold transition-colors flex items-center gap-2"
            >
              <Package size={20} />
              Orders
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-5xl font-black tracking-tight text-white">
            My <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Orders</span>
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/5 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Package size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-400 mb-8">
              Start shopping to see your orders here
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all"
              >
                {/* Order Header */}
                <div className="bg-white/5 border-b border-white/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <Package size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white">
                            Order {order.id}
                          </h3>
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="text-sm font-semibold">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={16} />
                          <span>
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-white">
                        ₱{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Shipping Information */}
                    {order.shippingInfo && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={18} className="text-gray-400" />
                          <h4 className="font-semibold text-white">
                            Shipping Address
                          </h4>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p className="font-semibold text-white">
                            {order.shippingInfo.firstName}{" "}
                            {order.shippingInfo.lastName}
                          </p>
                          <p>{order.shippingInfo.address}</p>
                          <p>
                            {order.shippingInfo.city}, {order.shippingInfo.province}
                          </p>
                          <p>{order.shippingInfo.postal}</p>
                          <p className="pt-2 text-gray-400">{order.shippingInfo.phone}</p>
                          <p className="text-gray-400">{order.shippingInfo.email}</p>
                        </div>
                      </div>
                    )}

                    {/* Payment Method */}
                    {order.paymentMethod && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard size={18} className="text-gray-400" />
                          <h4 className="font-semibold text-white">
                            Payment Method
                          </h4>
                        </div>
                        <div className="text-sm text-gray-300">
                          <p className="font-semibold text-white">
                            {getPaymentMethodDisplay(order.paymentMethod)}
                          </p>
                          {order.paymentMethod === "card" && (
                            <p className="text-xs text-gray-400 mt-1">
                              Payment processed securely
                            </p>
                          )}
                          {order.paymentMethod === "cod" && (
                            <p className="text-xs text-gray-400 mt-1">
                              Pay ₱{order.total.toLocaleString()} on delivery
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tracking Information */}
                    {order.trackingNumber && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Truck size={18} className="text-gray-400" />
                          <h4 className="font-semibold text-white">
                            Tracking
                          </h4>
                        </div>
                        <div className="text-sm text-gray-300">
                          <p className="text-xs text-gray-400 mb-1">
                            Tracking Number
                          </p>
                          <p className="font-mono font-semibold text-white bg-black/50 px-3 py-2 rounded border border-white/10">
                            {order.trackingNumber}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Order Items ({order.items?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="bg-gradient-to-br from-white to-gray-200 rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0">
                            {item.shoe?.imageUrl ? (
                              <img
                                src={item.shoe.imageUrl}
                                alt={item.shoe.model}
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <div className="text-3xl">👟</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-white mb-1">
                              {item.shoe?.brand} {item.shoe?.model}
                            </h5>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <span>Type: {item.shoe?.type}</span>
                              <span>Size: {item.size}</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">
                              ₱
                              {((item.shoe?.price || 0) * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              ₱{(item.shoe?.price || 0).toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="max-w-md ml-auto space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span className="font-semibold text-white">
                          ₱{order.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span className="text-green-400 font-semibold">
                          FREE
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax</span>
                        <span className="font-semibold text-white">₱0</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-white/20">
                        <span className="text-xl font-bold text-white">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-white">
                          ₱{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 justify-end">
                    <button className="px-6 py-2 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                      Track Order
                    </button>
                    <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      Order Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}