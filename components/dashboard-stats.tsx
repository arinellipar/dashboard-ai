"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        <span className="ml-3 text-slate-400">Carregando estatísticas...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-slate-400">
        Falha ao carregar estatísticas
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats.totalProducts,
      icon: Package,
      gradient: "from-blue-600 to-cyan-600",
      bgGlow: "bg-blue-600/20",
    },
    {
      title: "Total de Pedidos",
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: "from-green-600 to-emerald-600",
      bgGlow: "bg-green-600/20",
    },
    {
      title: "Receita Total",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-purple-600 to-pink-600",
      bgGlow: "bg-purple-600/20",
    },
    {
      title: "Crescimento",
      value: "+12.5%",
      icon: TrendingUp,
      gradient: "from-orange-600 to-red-600",
      bgGlow: "bg-orange-600/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden border-2 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group neon-glow-hover">
            {/* Animated Background */}
            <div className={`absolute inset-0 ${stat.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Gradient Accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-slate-400 font-medium">{stat.title}</p>
                  <motion.p
                    className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <div className={`relative p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="w-7 h-7 text-white" />
                  <div className={`absolute inset-0 ${stat.bgGlow} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>

              {/* Bottom shimmer effect */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
