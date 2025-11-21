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
  ShoppingBag,
  TrendingUp,
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
    <div className="min-h-screen">
      {/* Background effects are in layout.tsx */}

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 glass border-b-2 border-slate-700/50 shadow-xl"
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
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg neon-glow"
                animate={{
                  boxShadow: [
                    "0 4px 20px rgba(147, 51, 234, 0.5)",
                    "0 4px 30px rgba(59, 130, 246, 0.6)",
                    "0 4px 20px rgba(147, 51, 234, 0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <ShoppingBag className="w-7 h-7 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-0.5"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Arinelli&apos;z
                </h1>
                {userName && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Olá, {userName}
                  </p>
                )}
              </div>
            </motion.div>

            <div className="flex gap-3 items-center">
              <motion.button
                onClick={() => setCartOpen(true)}
                className="relative p-3 glass border-2 border-slate-700/50 hover:border-purple-500/50 rounded-xl transition-all neon-glow-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CartIcon className="w-6 h-6 text-slate-100" />
                <AnimatePresence>
                  {cartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg neon-glow"
                    >
                      {cartItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={handleAdminClick}
                className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg neon-glow overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-5 h-5 text-white relative z-10" />
                <span className="text-white font-semibold relative z-10">
                  Admin
                </span>
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 glass border-2 border-red-500/30 hover:border-red-500/50 hover:bg-red-600/20 text-red-300 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Sair</span>
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
              className="text-7xl md:text-8xl font-black mb-6 tracking-tight font-[family-name:var(--font-orbitron)]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="relative inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(110deg, #00f5ff 0%, #ff00ff 25%, #00ff88 50%, #ff0099 75%, #00f5ff 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 80px rgba(0, 245, 255, 0.5)",
                }}
              >
                DESCUBRA
                {/* Glow effect layers */}
                <motion.span
                  className="absolute inset-0 blur-3xl opacity-70 -z-10"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: "linear-gradient(110deg, #00f5ff 0%, #ff00ff 25%, #00ff88 50%, #ff0099 75%, #00f5ff 100%)",
                    backgroundSize: "200% 200%",
                    filter: "blur(40px)",
                  }}
                  aria-hidden="true"
                />
              </motion.span>
              <br />
              <motion.span
                className="relative inline-block"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(110deg, #ff00ff 0%, #00f5ff 25%, #ff0099 50%, #00ff88 75%, #ff00ff 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                O FUTURO
                {/* Glow effect */}
                <motion.span
                  className="absolute inset-0 blur-3xl opacity-70 -z-10"
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: "linear-gradient(110deg, #ff00ff 0%, #00f5ff 25%, #ff0099 50%, #00ff88 75%, #ff00ff 100%)",
                    backgroundSize: "200% 200%",
                    filter: "blur(40px)",
                  }}
                  aria-hidden="true"
                />
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-2xl text-cyan-300/90 mb-8 flex items-center justify-center gap-3 font-medium tracking-wide"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                textShadow: "0 0 20px rgba(0, 245, 255, 0.3)",
              }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Sparkles className="w-6 h-6 text-cyan-400" style={{ filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.8))" }} />
              </motion.span>
              <span className="uppercase text-lg font-semibold tracking-widest">
                Tecnologia de Ponta • Design Futurista • 2026
              </span>
              <motion.span
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 1
                }}
              >
                <Sparkles className="w-6 h-6 text-pink-400" style={{ filter: "drop-shadow(0 0 8px rgba(255, 0, 255, 0.8))" }} />
              </motion.span>
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Buscar produtos incríveis..."
                className="w-full pl-12 pr-4 py-5 glass border-2 border-slate-700/50 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
