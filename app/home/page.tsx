"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/protected-route";
import ProductGrid from "@/components/product-grid";
import ShoppingCart from "@/components/shopping-cart";
import {
  LogOut,
  Shield,
  ShoppingCart as CartIcon,
  Search,
  Sparkles,
} from "lucide-react";

function HomeContent() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Animated orbs */}
      <motion.div
        className="fixed top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TechStore</h1>
                {userName && (
                  <p className="text-xs text-blue-300">Welcome, {userName}</p>
                )}
              </div>
            </motion.div>

            <div className="flex gap-3 items-center">
              <motion.button
                onClick={() => setCartOpen(true)}
                className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CartIcon className="w-5 h-5 text-white" />
                <AnimatePresence>
                  {cartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cartItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={handleAdminClick}
                className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Shield className="w-4 h-4 text-white relative z-10" />
                <span className="text-white font-semibold text-sm relative z-10">
                  Admin
                </span>
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-colors border border-red-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span className="font-semibold text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h2
              className="text-5xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-blue-200 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Next-generation tech products at your fingertips
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="relative group"
              animate={{
                scale: searchFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-400 transition-colors z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: searchFocused ? 1 : 0,
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Products Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ProductGrid onCartUpdate={updateCartCount} searchQuery={searchQuery} />
      </div>

      {/* Shopping Cart */}
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
