"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface StripePaymentProps {
  amount: number;
  cartItems: any[];
  onSuccess: () => void;
}

export default function StripePayment({ amount, cartItems, onSuccess }: StripePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validações básicas
      if (cardData.number.replace(/\s/g, "").length !== 16) {
        throw new Error("Número do cartão inválido");
      }
      if (!cardData.name) {
        throw new Error("Nome do titular é obrigatório");
      }
      if (cardData.expiry.length !== 5) {
        throw new Error("Data de validade inválida");
      }
      if (cardData.cvv.length < 3) {
        throw new Error("CVV inválido");
      }

      // Simulação de pagamento (substituir por integração real com Stripe)
      const token = localStorage.getItem("token");

      // Aqui você faria a chamada real para o Stripe
      // const { token: stripeToken } = await stripe.createToken(card);

      // Criar pedido no backend
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          paymentMethod: "stripe",
          // stripeToken: stripeToken.id, // Em produção
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Pagamento aprovado!", {
          description: `Pedido #${data.data.id.slice(0, 8)} confirmado`,
          duration: 4000,
        });

        // Aguarda 2 segundos para mostrar o toast antes de redirecionar
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        throw new Error(data.message || "Falha no pagamento");
      }
    } catch (error: any) {
      toast.error("Erro no pagamento", {
        description: error.message || "Tente novamente",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Preview */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 text-white shadow-2xl"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"0.5\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23grid)\" /%3E%3C/svg%3E')",
        }}
      >
        <div className="absolute top-4 right-4">
          <CreditCard className="w-8 h-8 opacity-80" />
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 bg-yellow-400 rounded" />
            <div className="text-xs opacity-80">Chip & PIN</div>
          </div>

          <div>
            <div className="text-xl tracking-[0.2em] font-mono">
              {cardData.number || "•••• •••• •••• ••••"}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70 mb-1">Nome do Titular</div>
              <div className="font-medium uppercase">
                {cardData.name || "NOME COMPLETO"}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Validade</div>
              <div className="font-medium">
                {cardData.expiry || "MM/AA"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Número do Cartão</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) =>
              setCardData({ ...cardData, number: formatCardNumber(e.target.value) })
            }
            maxLength={19}
            required
          />
        </div>

        <div>
          <Label htmlFor="cardName">Nome do Titular</Label>
          <Input
            id="cardName"
            placeholder="Como está no cartão"
            value={cardData.name}
            onChange={(e) =>
              setCardData({ ...cardData, name: e.target.value.toUpperCase() })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Validade</Label>
            <Input
              id="expiry"
              placeholder="MM/AA"
              value={cardData.expiry}
              onChange={(e) =>
                setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })
              }
              maxLength={5}
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              value={cardData.cvv}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                })
              }
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="flex items-start gap-3 p-4 glass rounded-xl border border-slate-700">
        <Lock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-400">
          <p className="font-medium text-slate-300 mb-1">Pagamento Seguro</p>
          <p>Seus dados são criptografados e protegidos com tecnologia SSL</p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 text-lg font-semibold"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processando pagamento...
          </>
        ) : (
          <>
            <Check className="w-5 h-5 mr-2" />
            Pagar ${amount.toFixed(2)}
          </>
        )}
      </Button>

      {/* Test Card Info */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p>💳 Ambiente de teste</p>
        <p>Use: 4242 4242 4242 4242 • Qualquer data futura • Qualquer CVV</p>
      </div>
    </form>
  );
}

