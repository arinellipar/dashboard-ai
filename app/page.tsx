"use client";

import { motion } from "framer-motion";
import { Shield, ShoppingBag, TrendingUp, Zap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects are in layout.tsx */}


      {/* Admin Panel Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => router.push("/admin/login")}
          className="relative flex items-center gap-2 px-6 py-6 text-base shadow-2xl neon-glow group overflow-hidden"
          size="lg"
        >
          <Shield className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Painel Admin</span>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo/Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="relative inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-emerald-500/50"
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(16, 185, 129, 0.3)",
                  "0 10px 40px rgba(59, 130, 246, 0.5)",
                  "0 10px 30px rgba(16, 185, 129, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ShoppingBag className="w-10 h-10 text-white" />
              </motion.div>
              {/* Trending indicator */}
              <motion.div
                className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </motion.div>
              {/* Zap indicator */}
              <motion.div
                className="absolute -bottom-1 -left-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold mb-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #a855f7, #3b82f6, #10b981, #3b82f6, #a855f7)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Arinelli&apos;z Shop
            </motion.h1>
            <p className="text-slate-400 text-lg">Experiência e-commerce futurista 2026</p>
          </motion.div>

          {/* Auth Form */}
          <AuthForm />

          {/* Footer */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              <p>Tecnologia de ponta • Design futurista • UX 2026</p>
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
