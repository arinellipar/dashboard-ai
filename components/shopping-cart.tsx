"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  onCartUpdate,
}: ShoppingCartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const updateQuantity = (id: string, change: number) => {
    const cart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    onCartUpdate();
  };

  const removeItem = (id: string) => {
    const cart = cartItems.filter((item) => item.id !== id);
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    onCartUpdate();
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    onCartUpdate();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio", {
        description: "Adicione produtos antes de finalizar",
      });
      return;
    }

    // Redirecionar para página de checkout
    onClose();
    router.push("/checkout");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="cart-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <motion.div
        key="cart-sidebar"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-l-2 border-purple-500/30 shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="relative flex justify-between items-center p-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-7 h-7 text-purple-500" />
              <Sparkles className="w-3 h-3 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Carrinho
              </h2>
              <p className="text-xs text-slate-400">{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="relative inline-block mb-4">
                  <ShoppingBag className="w-20 h-20 text-slate-600 mx-auto" />
                  <div className="absolute inset-0 bg-purple-600/20 blur-2xl" />
                </div>
                <p className="text-slate-400 text-lg">Seu carrinho está vazio</p>
                <p className="text-slate-500 text-sm mt-2">Adicione produtos incríveis!</p>
              </motion.div>
            ) : (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="flex gap-4 glass p-4 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all neon-glow-hover">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 relative z-10">
                      <h3 className="font-semibold text-slate-100 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-green-400 font-bold mb-3">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 bg-slate-800 hover:bg-slate-700 border-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-10 text-center font-bold text-slate-100">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 bg-slate-800 hover:bg-slate-700 border-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="ml-auto h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-600/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="border-t border-slate-700/50 p-6 space-y-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <Separator className="mb-4" />

            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Frete:</span>
                <span className="text-green-400">Grátis</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-slate-100">Total:</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full h-12 text-lg font-semibold group relative overflow-hidden"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Finalizar Compra
            </Button>

            <Button
              onClick={clearCart}
              variant="outline"
              className="w-full border-slate-700 hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Carrinho
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
