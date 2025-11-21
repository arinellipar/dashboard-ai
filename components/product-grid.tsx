"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Package } from "lucide-react";

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

        // Extract unique categories
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

    // Show success message
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((p) => {
    // Filter by category
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    // Filter by search query
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            Found <span className="font-bold">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"} matching
            &quot;
            <span className="font-semibold">{searchQuery}</span>&quot;
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description || "No description available"}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchQuery
              ? `No products found matching "${searchQuery}"`
              : "No products found in this category"}
          </p>
          {searchQuery && (
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
