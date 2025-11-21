"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, Sparkles, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
}

interface ProductGridProps {
  onCartUpdate: () => void;
  searchQuery: string;
}

export default function ProductGrid({
  onCartUpdate,
  searchQuery,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data.products);

        const uniqueCategories = Array.from(
          new Set(data.data.products.map((p: Product) => p.category))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  interface CartItem {
    id: string;
    quantity: number;
  }

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    onCartUpdate();

    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Sparkles className="w-12 h-12 text-blue-400" />
        </motion.div>
        <p className="text-blue-200 mt-4">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Results Info */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-2xl backdrop-blur-sm"
          >
            <p className="text-blue-200">
              Found{" "}
              <span className="font-bold text-white">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"} matching
              &quot;
              <span className="font-semibold text-white">{searchQuery}</span>
              &quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 text-blue-200 hover:bg-white/10 border border-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Products
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-white/5 text-blue-200 hover:bg-white/10 border border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all">
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />

                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-16 h-16 text-blue-300/50" />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-500/80 backdrop-blur-sm text-white rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-blue-200/70 text-sm mb-4 line-clamp-2">
                    {product.description || "No description available"}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-blue-300/70">
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <ShoppingCart className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Add</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      <AnimatePresence>
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center py-12"
          >
            <Package className="w-16 h-16 text-blue-300/50 mx-auto mb-4" />
            <p className="text-blue-200">
              {searchQuery
                ? `No products found matching "${searchQuery}"`
                : "No products found in this category"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
