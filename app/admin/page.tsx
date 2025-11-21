"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/protected-route";
import AdminUserManagement from "@/components/admin-user-management";
import ChangePasswordModal from "@/components/change-password-modal";
import DashboardStats from "@/components/dashboard-stats";
import ProductList from "@/components/product-list";
import {
  LogOut,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Key,
  Store,
  Shield,
  Plus,
  FileText,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

function AdminContent() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email);
        setIsAdmin(userData.role === "ADMIN");
      }
      setIsLoading(false);
    };
    checkAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-500 animate-pulse mx-auto mb-4" />
            <div className="absolute inset-0 bg-purple-600/20 blur-3xl animate-pulse" />
          </div>
          <p className="text-slate-400">Carregando Admin Panel...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl neon-glow"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-slate-400 flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Bem-vindo, {userName}!
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(true)}
                className="border-purple-500/50 hover:bg-purple-600/20"
              >
                <Key className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/home")}
                className="border-blue-500/50 hover:bg-blue-600/20"
              >
                <Store className="w-4 h-4 mr-2" />
                Loja
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-pink-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          <Badge variant="outline" className="border-green-500/50 text-green-400">
            ● Admin Ativo
          </Badge>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardStats />
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "Gerenciar Produtos",
              subtitle: "Produtos",
              icon: Package,
              gradient: "from-blue-600 to-cyan-600",
              bgGlow: "bg-blue-600/20",
              onClick: () => router.push("/admin/products/new"),
            },
            {
              title: "Gerenciar Pedidos",
              subtitle: "Pedidos",
              icon: ShoppingCart,
              gradient: "from-green-600 to-emerald-600",
              bgGlow: "bg-green-600/20",
            },
            {
              title: "Gerenciar Usuários",
              subtitle: "Usuários",
              icon: Users,
              gradient: "from-purple-600 to-pink-600",
              bgGlow: "bg-purple-600/20",
            },
            {
              title: "Configurações",
              subtitle: "Sistema",
              icon: Settings,
              gradient: "from-orange-600 to-red-600",
              bgGlow: "bg-orange-600/20",
            },
          ].map((item, index) => (
            <motion.div
              key={item.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className="relative overflow-hidden border-2 border-slate-700/50 hover:border-purple-500/50 transition-all cursor-pointer group neon-glow-hover"
                onClick={item.onClick}
              >
                <div className={`absolute inset-0 ${item.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />

                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{item.title}</p>
                      <p className="text-2xl font-bold text-slate-100">{item.subtitle}</p>
                    </div>
                    <motion.div
                      className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                      <div className={`absolute inset-0 ${item.bgGlow} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ProductList />
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-2 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-500" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/admin/products/new")}
                variant="outline"
                className="w-full justify-start h-auto p-4 border-blue-500/30 hover:bg-blue-600/10"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <Plus className="w-4 h-4 text-blue-400" />
                    Adicionar Produto
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Criar novo produto no catálogo
                  </p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-green-500/30 hover:bg-green-600/10"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <ShoppingCart className="w-4 h-4 text-green-400" />
                    Processar Pedidos
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Ver e gerenciar pedidos pendentes
                  </p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-orange-500/30 hover:bg-orange-600/10"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <BarChart3 className="w-4 h-4 text-orange-400" />
                    Ver Relatórios
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Acessar analytics e relatórios
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Gerenciamento
              </CardTitle>
              <CardDescription>Administração avançada do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserManagement />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}
