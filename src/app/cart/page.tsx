"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ArrowLeft,
  Package,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";
import { useCart } from "~/app/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    completeOrder,
    getCartTotal,
    getTotalItems,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal: "",
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Shipping validation
    if (!shippingInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!shippingInfo.email.trim() || !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!shippingInfo.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!shippingInfo.address.trim())
      newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.province.trim())
      newErrors.province = "Province is required";
    if (!shippingInfo.postal.trim())
      newErrors.postal = "Postal code is required";

    // Payment validation
    if (paymentMethod === "card") {
      if (
        !paymentInfo.cardNumber.trim() ||
        paymentInfo.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber = "Valid 16-digit card number required";
      }
      if (!paymentInfo.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
      if (
        !paymentInfo.expiry.trim() ||
        !/^\d{2}\/\d{2}$/.test(paymentInfo.expiry)
      ) {
        newErrors.expiry = "Valid expiry (MM/YY) required";
      }
      if (!paymentInfo.cvv.trim() || !/^\d{3,4}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = "Valid CVV required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ""));
    setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setPaymentInfo({ ...paymentInfo, expiry: value });
  };

  const handleCompleteOrder = () => {
    if (validateForm()) {
      completeOrder(shippingInfo, paymentMethod);
      alert(
        `✅ Order Completed Successfully!\n\nTotal: ₱${getCartTotal().toLocaleString()}\n\nThank you for your purchase!`
      );
      router.push("/orders");
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
              href="/orders"
              className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <Package size={20} />
              <span>Orders</span>
            </Link>
            <div className="relative flex items-center gap-2 text-white font-bold">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {!showCheckout ? (
          <>
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-5xl font-black tracking-tight text-white">
                Shopping <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Cart</span>
              </h1>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🛒</div>
                <p className="text-2xl text-gray-400 mb-8">Your cart is empty</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/orders"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Package size={20} />
                    View Orders
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex gap-6">
                        <div className="bg-gradient-to-br from-white to-gray-200 rounded-lg w-24 h-24 flex items-center justify-center flex-shrink-0">
                          {item.shoe.imageUrl ? (
                            <img
                              src={item.shoe.imageUrl}
                              alt={item.shoe.model}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <div className="text-4xl">👟</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {item.shoe.brand} {item.shoe.model}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">
                            Type: {item.shoe.type}
                          </p>
                          <p className="text-sm text-gray-400 mb-2">
                            Size: {item.size}
                          </p>
                          <p className="text-lg font-bold text-white mb-3">
                            ₱{item.shoe.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-2">
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="text-white hover:text-gray-300"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-white font-semibold w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="text-white hover:text-gray-300"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 flex items-center gap-2"
                            >
                              <Trash2 size={18} />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            ₱{(item.shoe.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal ({getTotalItems()} items)</span>
                        <span>₱{getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span className="text-green-400 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax</span>
                        <span>₱0</span>
                      </div>
                      <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                        <span className="text-xl font-bold text-white">
                          Total
                        </span>
                        <span className="text-3xl font-bold text-white">
                          ₱{getCartTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      Proceed to Checkout
                    </button>
                    <Link
                      href="/"
                      className="block w-full mt-4 py-3 text-center border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-5xl font-black tracking-tight text-white">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Checkout</span>
              </h1>
            </div>

            {/* Progress Steps */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    <Check size={20} />
                  </div>
                  <span className="font-semibold text-white">Shipping</span>
                </div>
                <div className="flex-1 h-1 bg-white mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="font-semibold text-white">Payment</span>
                </div>
                <div className="flex-1 h-1 bg-white/20 mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-gray-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="font-medium text-gray-400">Review</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.firstName ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="Juan"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.lastName ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="Dela Cruz"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.email ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="juan@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.phone ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="+63 912 345 6789"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 bg-black/50 border ${
                        errors.address ? "border-red-500" : "border-white/20"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                      placeholder="123 Main Street, Barangay Sample"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.city ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="Manila"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Province *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.province}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            province: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.province ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="Metro Manila"
                      />
                      {errors.province && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.province}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postal}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            postal: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 bg-black/50 border ${
                          errors.postal ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                        placeholder="1000"
                      />
                      {errors.postal && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.postal}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock size={20} className="text-gray-400" />
                    <h2 className="text-2xl font-bold text-white">
                      Payment Method
                    </h2>
                  </div>

                  {/* Payment Options */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === "card"
                          ? "border-white bg-white/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <CreditCard
                        className={`mx-auto mb-2 ${
                          paymentMethod === "card"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                        size={28}
                      />
                      <p
                        className={`text-sm font-semibold ${
                          paymentMethod === "card"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        Credit/Debit
                      </p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("gcash")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === "gcash"
                          ? "border-white bg-white/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <div className={`text-3xl mx-auto mb-2`}>💳</div>
                      <p
                        className={`text-sm font-semibold ${
                          paymentMethod === "gcash"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        GCash
                      </p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === "cod"
                          ? "border-white bg-white/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <Package
                        className={`mx-auto mb-2 ${
                          paymentMethod === "cod"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                        size={28}
                      />
                      <p
                        className={`text-sm font-semibold ${
                          paymentMethod === "cod"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        Cash on Delivery
                      </p>
                    </button>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Lock size={16} />
                        <span>Your payment information is encrypted and secure</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          className={`w-full px-4 py-3 bg-black/50 border ${
                            errors.cardNumber
                              ? "border-red-500"
                              : "border-white/20"
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                        <div className="flex gap-3 mt-2">
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="font-semibold">Visa</span>
                            <span className="font-semibold">Mastercard</span>
                            <span className="font-semibold">Amex</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardName: e.target.value,
                            })
                          }
                          className={`w-full px-4 py-3 bg-black/50 border ${
                            errors.cardName ? "border-red-500" : "border-white/20"
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50`}
                          placeholder="JUAN DELA CRUZ"
                        />
                        {errors.cardName && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={paymentInfo.expiry}
                            onChange={handleExpiryChange}
                            className={`w-full px-4 py-3 bg-black/50 border ${
                              errors.expiry ? "border-red-500" : "border-white/20"
                            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiry && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.expiry}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value
                                  .replace(/\D/g, "")
                                  .substring(0, 4),
                              })
                            }
                            className={`w-full px-4 py-3 bg-black/50 border ${
                              errors.cvv ? "border-red-500" : "border-white/20"
                            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "gcash" && (
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <div className="text-5xl mb-4">💳</div>
                      <p className="text-lg font-semibold text-white mb-2">
                        Pay with GCash
                      </p>
                      <p className="text-sm text-gray-400">
                        You'll be redirected to GCash to complete your payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className="text-green-400 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="font-semibold text-white mb-2">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-400">
                            Pay with cash when your order is delivered. Please
                            prepare the exact amount of ₱
                            {getCartTotal().toLocaleString()}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="bg-gradient-to-br from-white to-gray-200 rounded w-16 h-16 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">👟</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {item.shoe.brand} {item.shoe.model}
                          </p>
                          <p className="text-xs text-gray-400">
                            Size {item.size} × {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-white mt-1">
                            ₱{(item.shoe.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/20 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Subtotal</span>
                      <span>₱{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Shipping</span>
                      <span className="text-green-400 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Tax</span>
                      <span>₱0</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-white">
                        ₱{getCartTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors mb-3"
                  >
                    Complete Order
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}