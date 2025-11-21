"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Hash,
  Tag,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validações
      if (!formData.name.trim()) {
        throw new Error("Nome do produto é obrigatório");
      }
      if (!formData.price || Number(formData.price) <= 0) {
        throw new Error("Preço deve ser maior que zero");
      }
      if (!formData.stock || Number(formData.stock) < 0) {
        throw new Error("Estoque não pode ser negativo");
      }
      if (!formData.category.trim()) {
        throw new Error("Categoria é obrigatória");
      }

      const token = localStorage.getItem("token");

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category.trim(),
          imageUrl: formData.imageUrl.trim() || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Produto criado com sucesso!", {
          description: `${formData.name} foi adicionado ao catálogo`,
          duration: 3000,
        });

        // Aguarda 1 segundo antes de redirecionar
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        throw new Error(data.message || "Falha ao criar produto");
      }
    } catch (error: any) {
      toast.error("Erro ao criar produto", {
        description: error.message || "Tente novamente",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Eletrônicos",
    "Smartphones",
    "Computadores",
    "Acessórios",
    "Gaming",
    "Áudio",
    "Câmeras",
    "Smart Home",
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Admin
          </Button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl neon-glow">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Adicionar Produto
              </h1>
              <p className="text-slate-400">Preencha os dados do novo produto</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-slate-700/50">
            <CardHeader>
              <CardTitle>Informações do Produto</CardTitle>
              <CardDescription>
                Todos os campos marcados com * são obrigatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-400" />
                    Nome do Produto *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: iPhone 15 Pro Max"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Descrição
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Descreva as características e benefícios do produto..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full min-h-[120px] px-3 py-2 bg-slate-900/50 border-2 border-slate-700 rounded-md text-slate-100 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>

                <Separator />

                {/* Preço e Estoque */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Preço (USD) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="99.99"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-blue-400" />
                      Estoque *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="100"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <Separator />

                {/* Categoria */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" />
                    Categoria *
                  </Label>
                  <div className="relative">
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                      className="w-full h-12 px-3 bg-slate-900/50 border-2 border-slate-700 rounded-md text-slate-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* URL da Imagem */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                    URL da Imagem
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="h-12"
                  />
                  <p className="text-xs text-slate-500">
                    Cole o link de uma imagem pública do produto
                  </p>
                </div>

                {/* Preview da Imagem */}
                {formData.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-2"
                  >
                    <Label>Preview da Imagem</Label>
                    <div className="relative w-full h-48 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="flex items-center justify-center h-full text-red-400">
                              <p>Erro ao carregar imagem</p>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                <Separator />

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 text-base font-semibold"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Criando produto...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Criar Produto
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin")}
                    disabled={loading}
                    className="flex-1 h-12"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card className="border-2 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <p className="font-medium text-slate-300 mb-1">💡 Dicas:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use nomes descritivos e específicos</li>
                    <li>Adicione descrições detalhadas para melhor conversão</li>
                    <li>Imagens em alta qualidade aumentam a confiança</li>
                    <li>Categorias ajudam os clientes a encontrar produtos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

