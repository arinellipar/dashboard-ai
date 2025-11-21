import DashboardStats from "@/components/dashboard-stats";
import ProductList from "@/components/product-list";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          E-Commerce Dashboard
        </h1>
        <DashboardStats />
        <ProductList />
      </div>
    </div>
  );
}
