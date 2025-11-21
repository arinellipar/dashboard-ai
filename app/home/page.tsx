"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import ProductGrid from "@/components/product-grid";
import ShoppingCart from "@/components/shopping-cart";
import { LogOut, Shield, ShoppingCart as CartIcon } from "lucide-react";

function HomeContent() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email);
        setIsAdmin(userData.role === "ADMIN");
      }
    };
    loadUser();

    // Load cart count
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      setCartItems(cartData.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push("/admin/login");
    }
  };

  const updateCartCount = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      setCartItems(cartData.length);
    } else {
      setCartItems(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Arinelli'z</h1>
              {userName && (
                <p className="text-sm text-gray-600">Welcome, {userName}!</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <CartIcon className="w-6 h-6" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              <button
                onClick={handleAdminClick}
                className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg animate-pulse"
              >
                <Shield className="w-4 h-4" />
                Admin
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Arinelli&apos;z Store
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Discover the latest tech products this christmas !
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name..."
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid onCartUpdate={updateCartCount} searchQuery={searchQuery} />
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCartUpdate={updateCartCount}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
