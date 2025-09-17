"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface Phone {
  id: string;
  brand: string;
  storage: string;
  cpu: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  revoked: boolean;
}

export default function HomePage() {
  const [apiKey, setApiKey] = useState("");
  const [phone, setPhone] = useState<Phone | null>(null);
  const [postBody, setPostBody] = useState(
    '{"brand":"Samsung","storage":"128GB","cpu":"Snapdragon 8 Gen 2","price":799,"imageUrl":"https://example.com/s22.jpg"}'
  );
  const [message, setMessage] = useState("");

  // GET → fetch the single key
  async function runGET() {
    if (!apiKey) {
      setMessage("❌ Please enter your API Key");
      return;
    }
    try {
      const res = await fetch("/api/proxy", {
        headers: { "x-api-key": apiKey },
      });
      const data = await res.json();

      if (res.ok) {
        setPhone(data);
        setMessage("✅ Key fetched successfully");
      } else {
        setPhone(null);
        setMessage("❌ " + (data.error || "Failed to fetch key"));
      }
    } catch (err) {
      setPhone(null);
      setMessage("❌ Error: " + (err as Error).message);
    }
  }

  // POST → add a phone
  async function runPOST() {
    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        body: postBody,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Phone added successfully!");
        runGET(); // fetch the new phone
      } else {
        setMessage("❌ " + (data.error || "Failed to add phone"));
      }
    } catch (err) {
      setMessage("❌ Error: " + (err as Error).message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mb-6 shadow-2xl">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            INVENTORY COMMAND CENTER
          </h1>
          <p className="text-2xl text-slate-300 font-light">
            Advanced Phone Management Dashboard
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-emerald-400 font-medium">Website B → Website A Integration</span>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main Control Panel */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* API Configuration */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">🔑</span>
                </div>
                <h2 className="text-2xl font-bold text-white">API Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-300 mb-3">
                    Authentication Key
                  </label>
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your sk_live_xxx API key from Website A"
                    className="h-14 text-lg bg-slate-800/80 border-2 border-slate-600 text-white rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button 
                    onClick={runGET} 
                    className="h-16 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
                  >
                    <span className="mr-2">📥</span>
                    FETCH DATA
                  </Button>
                  <Button 
                    onClick={runPOST} 
                    className="h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                  >
                    <span className="mr-2">📤</span>
                    SEND DATA
                  </Button>
                </div>
              </div>
            </div>

            {/* Payload Editor */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">💾</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Data Payload</h2>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-slate-300 mb-3">
                  JSON Configuration
                </label>
                <Textarea
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  rows={8}
                  className="text-base bg-slate-800/80 border-2 border-slate-600 text-green-400 font-mono rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="Enter your JSON payload here..."
                />
              </div>
            </div>
          </div>

          {/* Status Panel */}
          {message && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-center">
                  <div className="text-xl font-bold text-center text-amber-400">
                    {message}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Display */}
          {phone && (
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Device Inventory</h2>
              </div>

              {/* Large Card Display */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/30">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Image Section */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative">
                      {phone.imageUrl ? (
                        <div className="relative">
                          <img
                            src={phone.imageUrl}
                            alt={phone.brand}
                            className="w-48 h-48 object-cover rounded-2xl border-4 border-slate-600 shadow-2xl"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                      ) : (
                        <div className="w-48 h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-4 border-slate-600 shadow-2xl flex items-center justify-center">
                          <span className="text-6xl text-slate-500">📱</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">BRAND</div>
                        <div className="text-2xl font-bold text-white">{phone.brand}</div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">PRICE</div>
                        <div className="text-2xl font-bold text-emerald-400">${phone.price}</div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">STORAGE</div>
                        <div className="text-xl font-semibold text-white">{phone.storage}</div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">PROCESSOR</div>
                        <div className="text-xl font-semibold text-white">{phone.cpu}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">STATUS</div>
                        <div className="flex items-center">
                          {phone.revoked ? (
                            <>
                              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                              <span className="text-red-400 font-semibold">REVOKED</span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                              <span className="text-green-400 font-semibold">ACTIVE</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                        <div className="text-sm text-slate-400 mb-2">CREATED</div>
                        <div className="text-lg text-white font-medium">
                          {new Date(phone.createdAt).toLocaleDateString()} 
                          <div className="text-sm text-slate-400 mt-1">
                            {new Date(phone.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}